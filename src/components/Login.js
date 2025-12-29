import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState(""); // custom alert message
  const [showPassword, setShowPassword] = useState(false);

  // Auto-clear alert after 4 seconds
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setAlertMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setAlertMessage("Password must be at least 6 characters long.");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("userData"));

    if (!storedUser) {
      setAlertMessage("No registered user found. Please sign up first.");
      return;
    }

    if (email !== storedUser.email || password !== storedUser.password) {
      setAlertMessage("Incorrect email or password. Please try again.");
      return;
    }

    setAlertMessage(""); // Clear alert on success

    // Call success callback with user data
    if (onLoginSuccess) {
      onLoginSuccess(storedUser);
    }
  };

  return (
    <div className="form-box">
      <h2>Login</h2>
      {alertMessage && <div className="custom-alert">{alertMessage}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="password-input-container" style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ paddingRight: "40px" }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#555",
              fontSize: "22px",
              userSelect: "none",
            }}
            aria-label={showPassword ? "Hide password" : "Show password"}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
