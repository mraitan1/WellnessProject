import React from "react";
import { useNavigate } from "react-router-dom";
 
const navItems = [
    { label: "Journal", path: "/journal", desc: "Log your thoughts & feelings" },
    { label: "Sleep", path: "/sleep", desc: "Track your sleep schedule" },
    { label: "Workout", path: "/workout", desc: "Monitor your activity" },
    { label: "Personal Growth", path: "/growth", desc: "Track your goals & habits" },
    { label: "Profile", path: "/profile", desc: "View & edit your profile" },
];
 
function Home() {
    const navigate = useNavigate();
 
    return (
        <div className="home-container">
            <div className="home-card">
                <h1 className="home-title">Welcome to DayByDay</h1>
                <p className="home-subtitle">What would you like to track today?</p>
                <div className="nav-grid">
                    {navItems.map((item) => (
                        <div
                            key={item.path}
                            className="nav-card"
                            onClick={() => navigate(item.path)}
                        >
                            <span className="nav-card-label">{item.label}</span>
                            <span className="nav-card-desc">{item.desc}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default Home;
