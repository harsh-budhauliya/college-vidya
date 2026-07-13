import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { userId, browser, os, screenSize } = req.body;
    
    // In Vercel, req.headers['x-forwarded-for'] contains the IP
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const session = await prisma.session.create({
      data: {
        userId,
        browser,
        os,
        screenSize,
        ip,
        status: "ONLINE"
      }
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to initialize session" });
  }
}
