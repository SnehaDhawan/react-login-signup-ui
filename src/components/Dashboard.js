import React from "react";

function Dashboard({ user, onLogout }) {
  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.name}!</h2>
      <p>Your registered email: {user.email}</p>
      <p>Your mobile number: {user.mobile}</p>
      <button onClick={onLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
