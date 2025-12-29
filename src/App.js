import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import "./styles/styles.css";

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [user, setUser] = useState(null); // null means no user logged in

  const handleSignupSuccess = () => {
    setShowLogin(true);
  };

  // Called on successful login, user info passed
  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setShowLogin(true);
  };

  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="app-container">
      <h1>React Login & Signup Assignment</h1>

      {showLogin ? (
        <>
          <Login onLoginSuccess={handleLoginSuccess} />
          <p>
            Don't have an account?{" "}
            <button className="link-button" onClick={() => setShowLogin(false)}>
              Sign up
            </button>
          </p>
        </>
      ) : (
        <>
          <Signup onSignupSuccess={handleSignupSuccess} />
          <p>
            Already have an account?{" "}
            <button className="link-button" onClick={() => setShowLogin(true)}>
              Login
            </button>
          </p>
        </>
      )}
    </div>
  );
}

export default App;
