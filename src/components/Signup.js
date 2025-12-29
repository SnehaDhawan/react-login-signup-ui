import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Signup({ onSignupSuccess }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  useEffect(() => {
    setValidations({
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*]/.test(password),
    });
  }, [password]);

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

    if (name.trim() === "") {
      setAlertMessage("Name is required.");
      return;
    }

    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(mobile)) {
      setAlertMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!email.includes("@")) {
      setAlertMessage("Please enter a valid email address.");
      return;
    }

    if (
      !validations.length ||
      !validations.uppercase ||
      !validations.number ||
      !validations.specialChar
    ) {
      setAlertMessage(
        "Password does not meet all the requirements. Please check."
      );
      return;
    }

    const userData = { name, mobile, email, password };
    localStorage.setItem("userData", JSON.stringify(userData));

    setAlertMessage("Signup successful! Please login now.");

    if (onSignupSuccess) {
      onSignupSuccess();
    }

    setName("");
    setMobile("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="form-box">
      <h2>Signup</h2>
      {alertMessage && <div className="custom-alert">{alertMessage}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
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

        {password.length > 0 && (
          <div className="password-note-box">
            <p>Password must contain:</p>
            <ul>
              <li className={validations.length ? "valid" : "invalid"}>
                At least 6 characters
              </li>
              <li className={validations.uppercase ? "valid" : "invalid"}>
                At least one uppercase letter
              </li>
              <li className={validations.number ? "valid" : "invalid"}>
                At least one number
              </li>
              <li className={validations.specialChar ? "valid" : "invalid"}>
                At least one special character (!@#$%^&*)
              </li>
            </ul>
          </div>
        )}

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
