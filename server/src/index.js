const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for dev
    methods: ["GET", "POST"]
  }
});

const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey_dev_only";

app.use(cors());
app.use(express.json());

// Basic Route
app.get("/", (req, res) => {
  res.send("Admin Dashboard Analytics API is running.");
});

// Seed admin user if it doesn't exist (Development Helper)
async function seedAdmin() {
  const adminExists = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash("harsh(123)", 10);
    await prisma.user.create({
      data: {
        name: "Admin User",
        email: "harshbudhauliya882@gmail.com",
        password: hashedPassword,
        role: "ADMIN"
      }
    });
    console.log("Seeded default admin (harshbudhauliya882@gmail.com / harsh(123))");
  }
}
seedAdmin().catch(console.error);

// ---------------- REST APIs ----------------

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Get Dashboard Stats (Requires ADMIN)
app.get("/api/admin/stats", verifyToken, async (req, res) => {
  if (req.user.role !== "ADMIN") return res.status(403).json({ error: "Forbidden" });
  
  try {
    const totalEmployees = await prisma.user.count({ where: { role: "EMPLOYEE" } });
    const activeSessions = await prisma.session.count({ where: { status: "ONLINE" } });
    const totalVisits = await prisma.pageView.count();
    
    res.json({
      totalEmployees,
      activeSessions,
      totalVisits
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// Get Employees List
app.get("/api/admin/employees", verifyToken, async (req, res) => {
  if (req.user.role !== "ADMIN") return res.status(403).json({ error: "Forbidden" });
  
  try {
    const employees = await prisma.user.findMany({
      where: { role: "EMPLOYEE" },
      select: { id: true, name: true, email: true, createdAt: true },
    });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

// ---------------- WebSockets (Analytics) ----------------

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  
  // Create a new session tracking entry when user initializes app
  socket.on("init_session", async (data) => {
    // Expected data: { userId, browser, os, screenSize, ip }
    // If no userId, maybe it's a guest? Our requirement said monitor company employees.
    if (!data.userId) return;

    try {
      const session = await prisma.session.create({
        data: {
          userId: data.userId,
          browser: data.browser,
          os: data.os,
          screenSize: data.screenSize,
          ip: socket.handshake.address,
          status: "ONLINE"
        }
      });
      socket.sessionId = session.id;
      socket.emit("session_created", { sessionId: session.id });
      io.emit("live_stats_update"); // broadcast to admins
    } catch (e) {
      console.error(e);
    }
  });

  // Track page view
  socket.on("track_pageview", async (data) => {
    if (!socket.sessionId) return;
    try {
      await prisma.pageView.create({
        data: {
          sessionId: socket.sessionId,
          url: data.url
        }
      });
      // update last activity
      await prisma.session.update({
        where: { id: socket.sessionId },
        data: { lastActivity: new Date(), currentUrl: data.url, status: "ONLINE" }
      });
    } catch (e) {}
  });

  socket.on("heartbeat", async () => {
    if (!socket.sessionId) return;
    try {
      await prisma.session.update({
        where: { id: socket.sessionId },
        data: { lastActivity: new Date(), status: "ONLINE" }
      });
    } catch (e) {}
  });

  // Disconnect
  socket.on("disconnect", async () => {
    console.log("Client disconnected:", socket.id);
    if (socket.sessionId) {
      try {
        await prisma.session.update({
          where: { id: socket.sessionId },
          data: { status: "OFFLINE" }
        });
        io.emit("live_stats_update");
      } catch (e) {}
    }
  });
});

server.listen(PORT, () => {
  console.log(`Analytics API running on http://localhost:${PORT}`);
});
