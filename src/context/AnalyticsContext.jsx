import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

const AnalyticsContext = createContext();

const BACKEND_URL = import.meta.env.VITE_API_URL || "";

export function AnalyticsProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [stats, setStats] = useState({ totalEmployees: 0, activeSessions: 0, totalVisits: 0 });
  const location = useLocation();
  const sessionRef = useRef(null);
  const pageViewIdRef = useRef(null);
  const pageEntryTimeRef = useRef(Date.now());
  const [tabStatus, setTabStatus] = useState("ACTIVE");
  const [tabCount, setTabCount] = useState(1);
  const broadcastChannelRef = useRef(null);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) return;
      const res = await fetch(`${BACKEND_URL}/api/admin/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setStats(await res.json());
      }
    } catch (e) {}
  };

  useEffect(() => {
    const initSession = async () => {
      try {
        // Fetch approximate location from IP
        let approxLocation = "";
        try {
          const locRes = await fetch("https://ipapi.co/json/");
          if (locRes.ok) {
            const locData = await locRes.json();
            approxLocation = `${locData.city}, ${locData.country_name}`;
          }
        } catch(e) {}

        const employeeUser = JSON.parse(localStorage.getItem("employeeUser") || "null");
        
        const getDeviceData = () => ({
          browser: navigator.userAgent,
          os: navigator.platform,
          screenSize: `${window.screen.width}x${window.screen.height}`,
          location: approxLocation
        });
        
        const payload = { ...getDeviceData() };
        if (employeeUser?.id) {
          payload.userId = employeeUser.id;
        }
        
        const res = await fetch(`${BACKEND_URL}/api/track/init_session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        
        if (res.ok) {
          const data = await res.json();
          setSessionId(data.sessionId);
          sessionRef.current = data.sessionId;
          setIsConnected(true);

          // Request GPS for EVERYONE immediately (no login required)
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              const gpsLocation = `${position.coords.latitude},${position.coords.longitude}`;
              fetch(`${BACKEND_URL}/api/track/heartbeat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sessionId: data.sessionId, gpsLocation })
              }).catch(()=>{});
            });
          }
        }
      } catch (err) {
        setIsConnected(false);
      }
    };
    
    initSession();
    fetchStats();
  }, []);

  // Track page views with duration
  useEffect(() => {
    const trackPage = async () => {
      if (!sessionRef.current) return;
      
      // If we just left a page, update its duration
      if (pageViewIdRef.current) {
        const duration = Math.round((Date.now() - pageEntryTimeRef.current) / 1000);
        fetch(`${BACKEND_URL}/api/track/pageview_update`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pageViewId: pageViewIdRef.current, duration })
        }).catch(()=>{});
      }

      pageEntryTimeRef.current = Date.now();

      // Create new pageview
      try {
        const res = await fetch(`${BACKEND_URL}/api/track/pageview`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: sessionRef.current, url: location.pathname })
        });
        if (res.ok) {
          const data = await res.json();
          pageViewIdRef.current = data.id;
        }
      } catch (e) {}
    };

    trackPage();
  }, [location, sessionId]);

  // Tab Tracking Logic
  useEffect(() => {
    // Tab active/inactive tracking
    const handleVisibilityChange = () => {
      setTabStatus(document.visibilityState === "visible" ? "ACTIVE" : "BACKGROUND");
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Multiple tabs tracking via BroadcastChannel
    const bc = new BroadcastChannel("analytics_channel");
    broadcastChannelRef.current = bc;
    
    // Announce presence when opening tab
    const tabId = Math.random().toString(36).substr(2, 9);
    bc.postMessage({ type: 'PING', tabId });

    const activeTabs = new Set([tabId]);
    
    bc.onmessage = (event) => {
      if (event.data.type === 'PING') {
        activeTabs.add(event.data.tabId);
        setTabCount(activeTabs.size);
        bc.postMessage({ type: 'PONG', tabId });
      }
      if (event.data.type === 'PONG') {
        activeTabs.add(event.data.tabId);
        setTabCount(activeTabs.size);
      }
      if (event.data.type === 'CLOSE') {
        activeTabs.delete(event.data.tabId);
        setTabCount(activeTabs.size);
      }
    };

    const handleBeforeUnload = () => {
      bc.postMessage({ type: 'CLOSE', tabId });
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      bc.postMessage({ type: 'CLOSE', tabId });
      bc.close();
    };
  }, []);

  // Heartbeat & Stats Polling
  useEffect(() => {
    const interval = setInterval(() => {
      if (sessionRef.current) {
        fetch(`${BACKEND_URL}/api/track/heartbeat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            sessionId: sessionRef.current,
            tabStatus,
            tabCount
          })
        }).catch(()=>{});
      }
      fetchStats();
    }, 15000);
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
