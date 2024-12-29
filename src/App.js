// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import UserRegistration from "./components/UserRegistration";
// import Dashboard from "./components/Dashboard";
// import Login from "./components/Login"; // Assuming you have a Login component

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<UserRegistration />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/Dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React, { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserRegistration from "./components/UserRegistration";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

const AuthContext = createContext();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <Router>
        <Routes>
          <Route path="/" element={<UserRegistration />} />
          <Route path="/login" element={<LoginWithAuth />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

const LoginWithAuth = () => {
  const { login } = useAuth();
  return <Login onLogin={login} />;
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default App;
