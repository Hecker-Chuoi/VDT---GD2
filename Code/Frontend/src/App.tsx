import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import SoftwareInfraDiagram from "./components/SoftwareInfraDiagram";
import LargeSoftwareInfraDiagram from "./components/LargeSoftwareInfraDiagram";
import TopoNode from "./components/nodes/TopoNode";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [waitlist, setWaitlist] = useState<string[]>([]);

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated");
      const loginTime = localStorage.getItem("loginTime");

      if (authStatus === "true" && loginTime) {
        // Optional: Check if session has expired (24 hours)
        const sessionExpiry = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        const isSessionValid = Date.now() - parseInt(loginTime) < sessionExpiry;

        if (isSessionValid) {
          setIsAuthenticated(true);
        } else {
          // Session expired, clear storage
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("loginTime");
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    };

    // Load waitlist from localStorage
    const loadWaitlist = () => {
      const savedWaitlist = localStorage.getItem("waitlist");
      if (savedWaitlist) {
        try {
          setWaitlist(JSON.parse(savedWaitlist));
        } catch (error) {
          console.error("Error loading waitlist:", error);
          setWaitlist([]);
        }
      }
    };

    checkAuth();
    loadWaitlist();
  }, []);

  // Save waitlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("waitlist", JSON.stringify(waitlist));
  }, [waitlist]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleAddToWaitlist = (email: string) => {
    setWaitlist((prev) => [...prev, email]);
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Render login or home page based on authentication status, with routing
  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Home onLogout={handleLogout} waitlist={waitlist} />
          ) : (
            <Login
              onLogin={handleLogin}
              waitlist={waitlist}
              onAddToWaitlist={handleAddToWaitlist}
            />
          )
        }
      />
      <Route path="/test/topology" element={<LargeSoftwareInfraDiagram />} />
      <Route path="/test/diagram" element={<SoftwareInfraDiagram />} />
      <Route
        path="/test"
        element={
          <TopoNode data={{ icon: "/icons/server.png", label: "server" }} />
        }
      />
    </Routes>
  );
}
