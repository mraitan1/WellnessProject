import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "./assets/settings.svg";

const navItems = [
    { label: "Journal", path: "/journal", desc: "Log your thoughts & feelings" },
    { label: "Sleep", path: "/sleep", desc: "Track your sleep schedule" },
    { label: "Activity", path: "/activity", desc: "Monitor your movement" },
];

function Home(){
    const navigate = useNavigate();
    const [settingsOpen, setSettingsOpen] = useState(false);

    const handleLogout = () => {
        navigate("/login");
    };

    return(
        <div className='home-container'>
            <div className="settings-btn" onClick={() => setSettingsOpen(!settingsOpen)}>
                <img src={SettingsIcon} alt="Settings" className="settings-icon" />
                {settingsOpen && (
                    <div className="settings-dropdown">
                        <button className="settings-item" onClick={handleLogout}>🚪 Logout</button>
                    </div>
                )}
            </div>
            <div className='home-card'>
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
    )
}

export default Home;