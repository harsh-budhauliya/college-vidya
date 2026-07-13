import prisma from '../../lib/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey_dev_only";

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  
  if (req.method === 'OPTIONS') { return res.status(200).end(); }

  // Verify Admin Token
  const token = req.headers.authorization?.split(" ")[1];
  let adminUser = null;
  if (token) {
    try { adminUser = jwt.verify(token, JWT_SECRET); } catch(e){}
  }
  
  if (!adminUser || adminUser.role !== 'ADMIN') {
    return res.status(403).json({ error: "Forbidden" });
  }

  // GET: Fetch Employees
  if (req.method === 'GET') {
    try {
      const employees = await prisma.user.findMany({
        where: { role: 'EMPLOYEE' },
        include: {
          sessions: {
            orderBy: { lastActivity: 'desc' },
            take: 1
          }
        }
      });
      
      const enrichedEmployees = employees.map(emp => {
        const latestSession = emp.sessions[0];
        const isOnline = latestSession && latestSession.status === 'ONLINE' && (new Date() - new Date(latestSession.lastActivity)) < 60000;
        const isIdle = latestSession && latestSession.status === 'ONLINE' && !isOnline && (new Date() - new Date(latestSession.lastActivity)) < 300000; // 5 mins
        
        return {
          id: emp.id,
          name: emp.name,
          email: emp.email,
          phone: emp.phone,
          department: emp.department,
          designation: emp.designation,
          team: emp.team,
          profilePic: emp.profilePic,
          createdAt: emp.createdAt,
          status: isOnline ? 'Online' : (isIdle ? 'Idle' : 'Offline'),
          lastSeen: latestSession ? latestSession.lastActivity : emp.createdAt,
          currentUrl: latestSession?.currentUrl || '',
          location: latestSession?.location || '',
          device: `${latestSession?.os || ''} ${latestSession?.browser || ''}`.trim()
        };
      });

      return res.status(200).json(enrichedEmployees);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch employees" });
    }
  }
  
  // POST: Create new Employee
  if (req.method === 'POST') {
    try {
      const { name, email, password, phone, department, designation, team } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newEmployee = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          phone,
          department,
          designation,
          team,
          role: 'EMPLOYEE'
        }
      });
      
      // Log audit
      await prisma.auditLog.create({
        data: {
          userId: adminUser.id,
          action: 'CREATED_EMPLOYEE',
          details: `Created employee: ${email}`
        }
      });
      
      return res.status(201).json({ success: true, employee: newEmployee });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to create employee" });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
