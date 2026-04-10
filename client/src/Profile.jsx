import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Profile({setTheme, theme}) {
    const navigate = useNavigate();

    const [name, setName] = useState("Your Name");
    const [email, setEmail] = useState("your@email.com");
    const [editing, setEditing] = useState(false);
    const [tempName, setTempName] = useState("Your Name");
    const [tempEmail, setTempEmail] = useState("your@email.com");
    const [profilePic, setProfilePic] = useState(null);
    const [saved, setSaved] = useState(false);
    const fileInputRef = useRef(null);

    const stats = [
        { label: "Journal Entries", emoji: "📓", count: 0 },
        { label: "Sleep Entries", emoji: "😴", count: 0 },
        { label: "Workout Entries", emoji: "💪", count: 0 },
        { label: "Growth Entries", emoji: "🌱", count: 0 },
    ];

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onloadend = function() {
            setProfilePic(reader.result);
        };
        reader.readAsDataURL(file);
    }

    function handleSave() {
        setName(tempName);
        setEmail(tempEmail);
        setEditing(false);
        setSaved(true);
        setTimeout(function() {
            setSaved(false);
        }, 3000);
    }

    function handleCancel() {
        setTempName(name);
        setTempEmail(email);
        setEditing(false);
    }

    function handleEditClick() {
        setTempName(name);
        setTempEmail(email);
        setEditing(true);
    }

    function handleThemeChange(e) {
        setTheme(e.target.value);
    }

    return (
        <div className="home-container">
            <div className="home-card" style={{ width: "min(600px, 90vw)", gap: "24px" }}>
                <button className="back-btn" onClick={() => navigate("/home")}>← Back</button>
                <h1 className="home-title" style={{ fontSize: "2.5rem", marginBottom: 0 }}>My Profile</h1>

                {/* Profile Picture */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                    <div
                        onClick={() => fileInputRef.current.click()}
                        style={{
                            width: "110px",
                            height: "110px",
                            borderRadius: "50%",
                            background: profilePic ? "transparent" : "rgba(255,255,255,0.2)",
                            border: "3px solid rgba(255,255,255,0.5)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            overflow: "hidden",
                            transition: "all 0.2s",
                        }}
                    >
                        {profilePic
                            ? <img src={profilePic} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            : <span style={{ fontSize: "2.5rem" }}>👤</span>
                        }
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                    />
                    <p className="profile-label">
                        Click to change photo
                    </p>
                </div>

                {/* Name & Email */}
                <div style={{ width: "100%" }}>
                    {editing ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <div>
                                <p className="login-label">Name</p>
                                <input
                                    type="text"
                                    value={tempName}
                                    onChange={(e) => setTempName(e.target.value)}
                                    className="login-input"
                                />
                            </div>
                            <div>
                                <p className="login-label">Email</p>
                                <input
                                    type="email"
                                    value={tempEmail}
                                    onChange={(e) => setTempEmail(e.target.value)}
                                    className="login-input"
                                />
                            </div>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <button className="login-btn" onClick={handleSave}>
                                    Save Changes
                                </button>
                                <button
                                    className="login-btn"
                                    onClick={handleCancel}
                                    style={{ background: "rgba(255,255,255,0.2)" }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div style={{
                            background: "rgba(255,255,255,0.15)",
                            borderRadius: "16px",
                            padding: "20px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                        }}>
                            <div>
                                <p className="profile-label">Name: </p>
                                <p className="journal-entry">{name}</p>
                            </div>
                            <div>
                                <p className="profile-label">Email:</p>
                                <p className="journal-entry">{email}</p>
                            </div>
                            <button className="login-btn" onClick={handleEditClick} style={{ marginTop: "8px" }}>
                                ✏️ Edit Profile
                            </button>
                            <select className="theme-switcher" style={{ marginTop: "8px" }} onChange={handleThemeChange} value={theme}>
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="forest">Forest</option>
                                <option value="sky">Sky</option>
                                <option value="retro">Retro</option>
                            </select>
                        </div>
                    )}
                    {saved && (
                        <p className="profile-update">✅ Profile saved!</p>
                    )}
                </div>

                {/* Stats Summary */}
                <div style={{ width: "100%" }}>
                    <p className="login-label">My Stats</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        {stats.map(function(stat) {
                            return (
                                <div key={stat.label} style={{
                                    background: "rgba(255,255,255,0.15)",
                                    borderRadius: "14px",
                                    padding: "16px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "6px",
                                }}>
                                    <span style={{ fontSize: "1.8rem" }}>{stat.emoji}</span>
                                    <span className="journal-entry" style={{ fontSize: "1.5rem" }}>{stat.count}</span>
                                    <span className="nav-card-desc" >{stat.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;