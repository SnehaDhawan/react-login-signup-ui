import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(""), 4000);
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

    setAlertMessage("");

    if (onLoginSuccess) onLoginSuccess(storedUser);
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit} noValidate>
        <h2>Login</h2>
        {alertMessage && <div className="custom-alert">{alertMessage}</div>}

        <div className="input-field">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            required
          />
          <label>Enter your email</label>
        </div>

        <div className="input-field" style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            required
            style={{ paddingRight: "40px" }}
          />
          <label>Enter your password</label>
          <span
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>

        <button type="submit" aria-label="Log In">
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
