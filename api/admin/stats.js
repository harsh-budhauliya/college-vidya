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
    
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const oneMinuteAgo = new Date(now.getTime() - 60000);
    const fiveMinutesAgo = new Date(now.getTime() - 300000);

    // Active right now (within 1 min)
    const activeRightNow = await prisma.session.count({ 
      where: { lastActivity: { gte: oneMinuteAgo } } 
    });

    // Idle (1 to 5 mins ago)
    const idleSessions = await prisma.session.count({
      where: { lastActivity: { gte: fiveMinutesAgo, lt: oneMinuteAgo } }
    });

    // Online = Active + Idle
    const online = activeRightNow + idleSessions;
    
    // Offline = Total Employees - Online (Ensure it doesn't go negative)
    const offline = Math.max(0, totalEmployees - online);

    // Working today (sessions created or active today)
    const workingToday = await prisma.session.count({
      where: { lastActivity: { gte: startOfToday } }
    });

    const totalTodaysVisits = await prisma.pageView.count({
      where: { timestamp: { gte: startOfToday } }
    });

    // New vs Returning (based on IP or session)
    // For simplicity, let's say sessions created today that don't share an IP with older sessions are New.
    // Instead of complex queries, we'll estimate:
    const todaysSessions = await prisma.session.findMany({
      where: { loginTime: { gte: startOfToday } },
      select: { ip: true }
    });
    
    const previousSessions = await prisma.session.findMany({
      where: { loginTime: { lt: startOfToday } },
      select: { ip: true }
    });

    const previousIps = new Set(previousSessions.map(s => s.ip).filter(Boolean));
    let newEmployees = 0;
    let returningEmployees = 0;
    
    const uniqueTodaysIps = new Set(todaysSessions.map(s => s.ip).filter(Boolean));
    uniqueTodaysIps.forEach(ip => {
      if (previousIps.has(ip)) returningEmployees++;
      else newEmployees++;
    });

    // Average Session Time (today)
    const todaySessionsFull = await prisma.session.findMany({
      where: { loginTime: { gte: startOfToday } },
      select: { loginTime: true, lastActivity: true }
    });

    let totalDurationMs = 0;
    todaySessionsFull.forEach(s => {
      totalDurationMs += (new Date(s.lastActivity) - new Date(s.loginTime));
    });
    
    const avgSessionSecs = todaySessionsFull.length > 0 ? Math.floor(totalDurationMs / todaySessionsFull.length / 1000) : 0;
    const avgSessionFormatted = `${Math.floor(avgSessionSecs / 60)}m ${avgSessionSecs % 60}s`;

    // Activity chart (last 7 days pageviews)
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
      employeesOnline: online,
      employeesOffline: offline,
      activeRightNow,
      employeesIdle: idleSessions,
      workingToday,
      avgSessionTime: avgSessionFormatted,
      totalTodaysVisits,
      liveSessions: activeRightNow,
      newEmployees,
      returningEmployees,
      activityChart
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
}
