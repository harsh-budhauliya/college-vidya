import prisma from '../../lib/prisma.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey_dev_only";

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  
  if (req.method === 'OPTIONS') { return res.status(200).end(); }
  if (req.method !== 'GET') { return res.status(405).json({ error: 'Method Not Allowed' }); }

  const token = req.headers.authorization?.split(" ")[1];
  let adminUser = null;
  if (token) {
    try { adminUser = jwt.verify(token, JWT_SECRET); } catch(e){}
  }
  
  if (!adminUser || adminUser.role !== 'ADMIN') {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const { employeeId } = req.query;
    
    let whereClause = {};
    if (employeeId) {
      whereClause.userId = employeeId;
    }

    const sessions = await prisma.session.findMany({
      where: whereClause,
      include: {
        pageViews: { orderBy: { timestamp: 'desc' } },
        user: { select: { name: true, email: true, department: true } }
      },
      orderBy: { loginTime: 'desc' },
      take: 50
    });
    
    return res.status(200).json(sessions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch sessions" });
  }
}
