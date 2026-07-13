import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

const AnalyticsContext = createContext();

const BACKEND_URL = import.meta.env.VITE_API_URL || ""; // Empty means relative path on Vercel

export function AnalyticsProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [stats, setStats] = useState({ totalEmployees: 0, activeSessions: 0, totalVisits: 0 });
  const location = useLocation();
  const sessionRef = useRef(null); // Keep a ref so closures have the latest ID

  // Fetch admin stats helper (for Dashboard)
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) return; // Only fetch stats if logged in as admin
      
      const res = await fetch(`${BACKEND_URL}/api/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (e) {
      console.log("Stats fetch failed", e);
    }
  };

  // 1. Initialize Session
  useEffect(() => {
    const initSession = async () => {
      try {
        const getDeviceData = () => ({
          browser: navigator.userAgent,
          os: navigator.platform,
          screenSize: `${window.screen.width}x${window.screen.height}`,
        });
        
        const res = await fetch(`${BACKEND_URL}/api/track/init_session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...getDeviceData() }) // anonymous session for now
        });
        
        if (res.ok) {
          const data = await res.json();
          setSessionId(data.sessionId);
          sessionRef.current = data.sessionId;
          setIsConnected(true);
        }
      } catch (err) {
        console.log("Could not initialize analytics session");
        setIsConnected(false);
      }
    };
    
    initSession();
    fetchStats();
  }, []);

  // 2. Track page views
  useEffect(() => {
    if (sessionRef.current) {
      fetch(`${BACKEND_URL}/api/track/pageview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionRef.current, url: location.pathname })
      }).catch(() => {});
    }
  }, [location, sessionId]);

  // 3. Heartbeat & Stats Polling
  useEffect(() => {
    const interval = setInterval(() => {
      // Send heartbeat
      if (sessionRef.current) {
        fetch(`${BACKEND_URL}/api/track/heartbeat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: sessionRef.current })
        }).catch(() => {});
      }
      
      // Poll stats if we are likely on the dashboard (or just always poll)
      fetchStats();
      
    }, 15000); // Poll every 15 seconds for Vercel
    
    return () => clearInterval(interval);
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
