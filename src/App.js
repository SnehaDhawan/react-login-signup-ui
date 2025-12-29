import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import "./styles/styles.css";

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [user, setUser] = useState(null);

  const handleSignupSuccess = () => setShowLogin(true);
  const handleLoginSuccess = (userData) => setUser(userData);
  const handleLogout = () => {
    setUser(null);
    setShowLogin(true);
  };

  return (
    <div className="app-container">
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : showLogin ? (
        <>
          <Login onLoginSuccess={handleLoginSuccess} />
          <p className="toggle-text">
            Don't have an account?{" "}
            <button
              className="link-button"
              onClick={() => setShowLogin(false)}
              aria-label="Go to signup page"
            >
              Signup here
            </button>
          </p>
        </>
      ) : (
        <>
          <Signup onSignupSuccess={handleSignupSuccess} />
          <p className="toggle-text">
            Already have an account?{" "}
            <button
              className="link-button"
              onClick={() => setShowLogin(true)}
              aria-label="Go to login page"
            >
              Login here
            </button>
          </p>
        </>
      )}
    </div>
  );
}

export default App;
