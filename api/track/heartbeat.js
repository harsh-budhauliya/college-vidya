import prisma from '../lib/prisma.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  if (req.method === 'OPTIONS') { return res.status(200).end(); }
  if (req.method !== 'POST') { return res.status(405).json({ error: 'Method Not Allowed' }); }

  try {
    const { sessionId, gpsLocation, tabStatus, tabCount } = req.body;
    if (!sessionId) return res.status(400).json({ error: 'Missing sessionId' });

    const data = { lastActivity: new Date(), status: "ONLINE" };
    if (gpsLocation) { data.gpsLocation = gpsLocation; }
    if (tabStatus) { data.tabStatus = tabStatus; }
    if (tabCount !== undefined) { data.tabCount = parseInt(tabCount) || 1; }

    await prisma.session.update({
      where: { id: sessionId },
      data
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update heartbeat" });
  }
}
