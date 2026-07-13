import prisma from '../../lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey_dev_only";

// Helper to verify token in serverless functions
const verifyToken = (req) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type')
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const user = verifyToken(req);
  if (!user || user.role !== "ADMIN") {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const totalEmployees = await prisma.user.count({ where: { role: "EMPLOYEE" } });
    
    // Consider sessions active if lastActivity was within the last 60 seconds
    const activeTimeframe = new Date(Date.now() - 60000); 
    const activeSessions = await prisma.session.count({ 
      where: { 
        status: "ONLINE",
        lastActivity: { gte: activeTimeframe }
      } 
    });
    
    const totalVisits = await prisma.pageView.count();
    
    res.status(200).json({
      totalEmployees,
      activeSessions,
      totalVisits
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
}
