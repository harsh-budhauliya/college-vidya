import prisma from '../lib/prisma.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  if (req.method === 'OPTIONS') { return res.status(200).end(); }
  if (req.method !== 'POST') { return res.status(405).json({ error: 'Method Not Allowed' }); }

  try {
    const { sessionId, url } = req.body;
    if (!sessionId || !url) return res.status(400).json({ error: 'Missing params' });

    const pv = await prisma.pageView.create({
      data: { sessionId, url }
    });

    await prisma.session.update({
      where: { id: sessionId },
      data: { lastActivity: new Date(), currentUrl: url, status: "ONLINE" }
    });

    res.status(200).json({ success: true, id: pv.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to track pageview" });
  }
}
