import prisma from '../lib/prisma.js';
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
    
    // Get page views for the last 7 days for the chart
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentViews = await prisma.pageView.findMany({
      where: { timestamp: { gte: sevenDaysAgo } },
      select: { timestamp: true }
    });

    const chartDataMap = {};
    for(let i=6; i>=0; i--) {
      const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const name = d.toLocaleDateString('en-US', { weekday: 'short' });
      chartDataMap[name] = 0;
    }
    
    recentViews.forEach(v => {
      const name = v.timestamp.toLocaleDateString('en-US', { weekday: 'short' });
      if(chartDataMap[name] !== undefined) chartDataMap[name]++;
    });

    const activityChart = Object.keys(chartDataMap).map(key => ({
      name: key,
      visits: chartDataMap[key]
    }));

    // Device breakdown
    const recentSessions = await prisma.session.findMany({
      where: { loginTime: { gte: sevenDaysAgo } },
      select: { os: true, browser: true }
    });

    res.status(200).json({
      totalEmployees,
      activeSessions,
      totalVisits,
      activityChart
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
}
