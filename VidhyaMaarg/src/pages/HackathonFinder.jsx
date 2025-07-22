import React, { useState } from "react";

const sampleHackathons = [
  {
    name: "AI Innovators Hackathon",
    date: "2025-08-10",
    location: "Online",
    description: "Build AI-powered solutions and compete for prizes.",
    link: "https://aihackathon.com"
  },
  {
    name: "Web3 Future Fest",
    date: "2025-09-05",
    location: "Bangalore, India",
    description: "A hackathon for blockchain and Web3 enthusiasts.",
    link: "https://web3fest.com"
  },
  {
    name: "EduTech Sprint",
    date: "2025-07-30",
    location: "Delhi, India",
    description: "Innovate in the education technology space.",
    link: "https://edutechsprint.com"
  }
];

const HackathonFinder = () => {
  const [search, setSearch] = useState("");

  const filteredHackathons = sampleHackathons.filter(h =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
          maxWidth: "600px",
          marginBottom: "32px"
        }}
      >
        <h2 style={{ color: "#3b47ff", fontWeight: 700, marginBottom: 8, textAlign: "center" }}>
          Hackathon Finder
        </h2>
        <p style={{ color: "#555", marginBottom: 24, textAlign: "center" }}>
          Discover upcoming hackathons and boost your skills!
        </p>
        <input
          type="text"
          placeholder="Search by name or location..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            fontSize: "1rem",
            marginBottom: "18px",
            outline: "none"
          }}
        />
        <div>
          {filteredHackathons.length === 0 ? (
            <div style={{ color: "#888", textAlign: "center" }}>No hackathons found.</div>
          ) : (
            filteredHackathons.map((hack, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "18px",
                  marginBottom: "16px",
                  background: "#f9fafb",
                  boxShadow: "0 2px 8px rgba(59, 71, 255, 0.04)"
                }}
              >
                <h3 style={{ margin: 0, color: "#3b47ff", fontWeight: 600 }}>{hack.name}</h3>
                <div style={{ fontSize: "0.97rem", color: "#555", margin: "6px 0" }}>
                  <span role="img" aria-label="calendar">📅</span> {hack.date} &nbsp; | &nbsp;
                  <span role="img" aria-label="location">📍</span> {hack.location}
                </div>
                <div style={{ color: "#444", marginBottom: 8 }}>{hack.description}</div>
                <a
                  href={hack.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#fff",
                    background: "linear-gradient(90deg, #3b47ff 0%, #5f8cff 100%)",
                    padding: "7px 18px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontWeight: 500,
                    fontSize: "0.97rem"
                  }}
                >
                  View Details
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HackathonFinder;