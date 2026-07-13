import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";

const AnalyticsContext = createContext();

// Connect to the backend socket server
const socket = io("http://localhost:4000");

export function AnalyticsProvider({ children }) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [stats, setStats] = useState({ totalEmployees: 0, activeSessions: 0, totalVisits: 0 });
  const location = useLocation();

  useEffect(() => {
    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));
    
    // Listen for live stat updates from backend
    socket.on("live_stats_update", () => {
      fetchStats();
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("live_stats_update");
    };
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (isConnected) {
      socket.emit("track_pageview", { url: location.pathname });
    }
  }, [location, isConnected]);

  // Initial setup: mock user ID 1 for now (in reality, get from auth)
  useEffect(() => {
    if (isConnected) {
      const getDeviceData = () => ({
        browser: navigator.userAgent,
        os: navigator.platform,
        screenSize: `${window.screen.width}x${window.screen.height}`,
      });
      socket.emit("init_session", { userId: 1, ...getDeviceData() });
    }
  }, [isConnected]);

  // Heartbeat every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (isConnected) socket.emit("heartbeat");
    }, 30000);
    return () => clearInterval(interval);
  }, [isConnected]);

  // Fetch admin stats helper
  const fetchStats = async () => {
    try {
      // In a real app, you would pass the JWT token here
      // For this implementation plan, we will mock the request or rely on public stats for demo
      const res = await fetch("http://localhost:4000/api/admin/stats", {
        headers: {
          // 'Authorization': `Bearer ${token}` 
        }
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (e) {
      console.log("Stats fetch skipped (requires auth token)");
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchStats();
  }, []);

  return (
    <AnalyticsContext.Provider value={{ isConnected, stats }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  return useContext(AnalyticsContext);
}
