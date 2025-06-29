// src/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    const savedAuth = localStorage.getItem("isAuthenticated") === "true";
    if (savedAuth && savedRole) {
      setIsAuthenticated(true);
      setUserRole(savedRole);
    }
  }, []);

  const login = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem("userRole", role);
    localStorage.setItem("isAuthenticated", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole("");
    localStorage.removeItem("userRole");
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import LoginPage from "./LoginPage";
import CustomerDashboard from "./customer/CustomerDashboard";
import GuideDashboard from "./guide/GuideDashboard";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Customer routes */}
          <Route
            path="/customer/*"
            element={
              <ProtectedRoute>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Guide routes */}
          <Route
            path="/guide/*"
            element={
              <ProtectedRoute>
                <GuideDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

// In LoginPage.js
// Inside handleSubmit in the form submission
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const navigate = useNavigate();
const { login } = useAuth();

// After successful validation:
login(role);
if (role === "customer") navigate("/customer/view-details");
else if (role === "guide") navigate("/guide/view-customers");
