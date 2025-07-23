import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 0"
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2.5rem 2rem",
          borderRadius: "20px",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          width: "100%",
          maxWidth: "520px",
        }}
      >
        <h2 style={{ color: "#3b47ff", fontWeight: 700, marginBottom: 8, textAlign: "center" }}>
          Admin Dashboard
        </h2>
        <p style={{ color: "#555", marginBottom: 24, textAlign: "center" }}>
          Welcome, Admin! Manage users, hackathons, resources, and view analytics.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginBottom: 24 }}>
          <Link
            to="/admin/users"
            style={{
              background: "linear-gradient(90deg, #3b47ff 0%, #5f8cff 100%)",
              color: "#fff",
              padding: "12px",
              borderRadius: "8px",
              textAlign: "center",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "1.05rem",
              boxShadow: "0 2px 8px rgba(59, 71, 255, 0.08)"
            }}
          >
            👤 User Management
          </Link>
          <Link
            to="/admin/hackathons"
            style={{
              background: "linear-gradient(90deg, #22c55e 0%, #3b82f6 100%)",
              color: "#fff",
              padding: "12px",
              borderRadius: "8px",
              textAlign: "center",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "1.05rem",
              boxShadow: "0 2px 8px rgba(34, 197, 94, 0.08)"
            }}
          >
            🏆 Hackathon Management
          </Link>
          <Link
            to="/admin/resources"
            style={{
              background: "linear-gradient(90deg, #f59e42 0%, #fbbf24 100%)",
              color: "#fff",
              padding: "12px",
              borderRadius: "8px",
              textAlign: "center",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "1.05rem",
              boxShadow: "0 2px 8px rgba(251, 191, 36, 0.08)"
            }}
          >
            📚 Resource Management
          </Link>
        </div>
        <div style={{
          background: "#f3f4f6",
          borderRadius: "12px",
          padding: "18px",
          textAlign: "center",
          color: "#3b47ff",
          fontWeight: 500,
          fontSize: "1.08rem"
        }}>
          📊 Analytics & Reports<br />
          <span style={{ color: "#555", fontWeight: 400, fontSize: "0.98rem" }}>
            (Coming soon: View platform usage, user stats, and more!)
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;