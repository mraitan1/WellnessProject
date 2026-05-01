import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "./assets/profile.svg";
import { Line } from "react-chartjs-2";
import { getDailyQuote} from "./assets/tempQuotes.js";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const navItems = [
    { label: "Journal", path: "/journal", desc: "Log your thoughts & feelings" },
    { label: "Sleep", path: "/sleep", desc: "Track your sleep schedule" },
    { label: "Workout", path: "/workout", desc: "Monitor your activity" },
    { label: "Personal Growth", path: "/growth", desc: "Track your goals & habits" },
];

function Home() {
    const navigate = useNavigate();
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [chartTextColor, setChartTextColor] = useState("#333");
    const daily = getDailyQuote();

    function handleLogout() {
        navigate("/login");
    }
    function handleProfile(){
        navigate("/profile");
    }
    function todaysDate(){
         return new Date().toLocaleDateString();
    }
    function getQuote(){
        return daily.text;
    }
    function getAuthor(){
        return daily.author;
    }

    React.useEffect(() => {
        const color = getComputedStyle(document.documentElement)
            .getPropertyValue('--text-color').trim();
        if (color) {
            setChartTextColor(color);
        }
    }, []);

    const graphOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: { display: false }
        },
        scales: {
            x: {
                ticks: { color: chartTextColor },
                grid: {
                    color: chartTextColor,
                    borderColor: chartTextColor,
                    drawTicks: false
                }
            },
            y: {
                ticks: { color: chartTextColor, padding: 10 },
                grid: {
                    color: chartTextColor,
                    borderColor: chartTextColor,
                    drawTicks: false
                }
            }
        }
    };

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
                <div className="nav-bar">
                    <div>
                        <h1 className="home-title">Welcome to DayByDay</h1>
                        <p className="home-subtitle">Today is: {todaysDate()}</p>
                    </div>
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
                <div className="nav-graph">
                    <div className="graph-nav-card">
                        <span className="nav-card-label">Mood Graph</span>
                        <div className="home-graph" style={{ height:'150px', width:"100%", minWidth: 0, overflow: "hidden" }}>
                            <Line
                                data={{
                                    labels: ['Two Days Ago', 'Yesterday', 'Today'],
                                    datasets: [{
                                        label: "Mood",
                                        data: [2, 5, 3],
                                        fill: false,
                                        borderColor: 'rgb(75, 192, 192)',
                                        tension: 0.1
                                    }]
                                }}
                                options={graphOptions}
                            />
                        </div>
                        <span className="back-btn" onClick={() => navigate("/journal")}>Need to enter your mood?</span>
                    </div>
                    <div className="graph-nav-card">
                        <span className="nav-card-label">Sleep Graph</span>
                        <div className="home-graph" style={{ height:'150px', width:"100%", minWidth: 0, overflow: "hidden" }}>
                            <Line
                                data={{
                                    labels: ['Two Days Ago', 'Yesterday', 'Today'],
                                    datasets: [{
                                        label: "Sleep",
                                        data: [8, 5, 6],
                                        fill: false,
                                        borderColor: 'rgb(75, 192, 192)',
                                        tension: 0.1
                                    }]
                                }}
                                options={graphOptions}
                            />
                        </div>
                        <span className="back-btn" onClick={() => navigate("/sleep")}>Need to enter slept hours?</span>
                    </div>
                    <div className="graph-nav-card">
                        <span className="nav-card-label">Workout Graph</span>
                        <div className="home-graph" style={{ height:'150px', width:"100%", minWidth: 0, overflow: "hidden" }}>
                            <Line
                                data={{
                                    labels: ['Two Days Ago', 'Yesterday', 'Today'],
                                    datasets: [{
                                        label: "Workout",
                                        data: [42, 35, 52],
                                        fill: false,
                                        borderColor: 'rgb(75, 192, 192)',
                                        tension: 0.1
                                    }]
                                }}
                                options={graphOptions}
                            />
                        </div>
                        <span className="back-btn" onClick={() => navigate("/workout")}>Need to enter your workout?</span>
                    </div>
                </div>
                <div className="nav-bottom-bar">
                    <div className="nav-card" style={{ gridColumn: '2 / 4' }}>
                        <span className="nav-card-label">Got something on your mind?</span>
                        <textarea className="journal-text" placeholder="Write about it..." rows="10" cols="50" maxLength="400"></textarea>
                        <div style={{display: "flex", flexDirection: "row", padding: "5px"}}>
                            <div className="back-btn">Submit</div>
                        </div>
                    </div>
                    <div className="nav-card" style={{ gridColumn: '4 / 6', justifyContent: "center", }}>
                        <span id="quote" className="nav-card-desc" style={{fontSize:"2rem"}}>{getQuote()}</span>
                        <span id="author" className="nav-card-label" style={{fontSize:"2rem"}}>- {getAuthor()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
