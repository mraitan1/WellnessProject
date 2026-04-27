import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "./assets/settings.svg";

const navItems = [
    { label: "Journal", path: "/journal", desc: "Log your thoughts & feelings" },
    { label: "Sleep", path: "/sleep", desc: "Track your sleep schedule" },
    { label: "Workout", path: "/workout", desc: "Monitor your activity" },
    { label: "Personal Growth", path: "/growth", desc: "Track your goals & habits" },
];
 
function Home() {
    const navigate = useNavigate();
    const [settingsOpen, setSettingsOpen] = useState(false);

    function handleLogout() {
        navigate("/login");
    }
    function handleProfile(){
        navigate("/profile");
    }
    function todaysDate(){
         return new Date().toLocaleDateString();
    }

    return (
        <div className="home-container">
            <div className="home-card">
                <div className="settings-btn" onClick={() => setSettingsOpen(!settingsOpen)}>
                    <img src={SettingsIcon} alt="Settings" className="settings-icon" />
                    {settingsOpen && (
                        <div className="settings-dropdown">
                            <button className="settings-item" onClick={handleProfile}>Profile</button>
                            <button className="settings-item" onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
                <div className="home-nav-bar">
                    <div>
                        <h1 className="home-title">Welcome to DayByDay</h1>
                        <p className="home-subtitle">Today is: {todaysDate()}</p>
                    </div>
                    {navItems.map((item) => (
                        <div
                            key={item.path}
                            className="home-nav-card"
                            onClick={() => navigate(item.path)}
                        >
                            <span className="home-nav-card-label">{item.label}</span>
                            <span className="home-nav-card-desc">{item.desc}</span>
                        </div>
                    ))}
                </div>
                <div className="home-nav-graph">
                    <div className="home-nav-card" onClick={() => navigate("/sleep")}>
                        <span className="home-nav-card-label">Sleep Graph</span>
                        <span className="home-nav-card-desc"></span>
                    </div>
                    <div className="home-nav-card" onClick={() => navigate("/journal")}>
                        <span className="home-nav-card-label">Mood Graph</span>
                        <span className="home-nav-card-desc"></span>
                    </div>
                    <div className="home-nav-card" onClick={() => navigate("/workout")}>
                        <span className="home-nav-card-label">Workout Graph</span>
                        <span className="home-nav-card-desc"></span>
                    </div>
                </div>
                <div className="home-bottom-bar">
                    <div className="home-nav-card" style={{ gridColumn: '2 / 4' }}>

                    </div>
                    <div className="home-nav-card" style={{ gridColumn: '4 / 6' }}>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
