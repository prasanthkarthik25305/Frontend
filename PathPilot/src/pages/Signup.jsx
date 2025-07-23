import React, { useState } from "react";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send form data to your backend API
    setSubmitted(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2.5rem 2rem",
          borderRadius: "20px",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ color: "#3b47ff", fontWeight: 700, marginBottom: 8, textAlign: "center" }}>
          Create your account
        </h2>
        <p style={{ color: "#555", marginBottom: 24, textAlign: "center" }}>
          Sign up to start your learning journey
        </p>
        {submitted ? (
          <div style={{ textAlign: "center", color: "#22c55e", fontWeight: 600 }}>
            Registration complete!<br />You can now sign in.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", marginBottom: 6, fontWeight: 500 }}>
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "border 0.2s",
                }}
              />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", marginBottom: 6, fontWeight: 500 }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "border 0.2s",
                }}
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", marginBottom: 6, fontWeight: 500 }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Create a password"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "border 0.2s",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                background: "linear-gradient(90deg, #3b47ff 0%, #5f8cff 100%)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "1.1rem",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(59, 71, 255, 0.08)",
                marginBottom: 12,
              }}
            >
              Sign Up
            </button>
          </form>
        )}
        <div style={{ textAlign: "center", marginTop: 10, fontSize: "0.97rem" }}>
          Already have an account?{" "}
          <a href="/signin" style={{ color: "#3b47ff", fontWeight: 500, textDecoration: "none" }}>
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;