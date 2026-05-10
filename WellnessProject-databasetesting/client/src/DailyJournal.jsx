import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const moods = [
    { label: "Happy", emoji: "😊" },
    { label: "Sad", emoji: "😢" },
    { label: "Neutral", emoji: "😐" },
    { label: "Frustrated", emoji: "😤" },
    { label: "Worried", emoji: "😟" },
    { label: "Stressed", emoji: "😰" },
    { label: "Loved", emoji: "🥰" },
    { label: "Confused", emoji: "😕" },
    { label: "Excited", emoji: "🤩" },
    { label: "Anxious", emoji: "😬" },
    { label: "Grateful", emoji: "🙏" },
    { label: "Tired", emoji: "😴" },
    { label: "Angry", emoji: "😠" },
    { label: "Hopeful", emoji: "🌟" },
    { label: "Overwhelmed", emoji: "🤯" },
    { label: "Calm", emoji: "😌" },
];

const restfulOptions = [
    { label: "Exhausted", emoji: "😵" },
    { label: "Sleepy", emoji: "😞" },
    { label: "Rested", emoji: "😊" },
    { label: "Well Rested", emoji: "🌟" },
];

const activities = [
    "School", "Work", "Studying", "Working Out",
    "Hiking", "Friends", "Alone Time", "Movie", "Hobbies"
];

const journalMock = [
    { month: "Jan", avg: 10 },
    { month: "Feb", avg: 23 },
    { month: "Mar", avg: 19 },
    { month: "Apr", avg: 28 },
];

function GoalLineChart({ data }) {
    const maxVal = 35;
    const w = 260;
    const h = 90;
    const padX = 16;
    const padY = 16;
    const plotW = w - padX * 2;
    const plotH = h - padY * 2 - 14;

    const pts = data.map(function(d, i) {
        return {
            x: padX + (i / (data.length - 1)) * plotW,
            y: padY + plotH - (d.avg / maxVal) * plotH,
        };
    });

    const path = pts.map(function(p, i) {
        return (i === 0 ? "M" : "L") + " " + p.x + " " + p.y;
    }).join(" ");

    return (
        <svg viewBox={"0 0 " + w + " " + h} style={{ width: "100%" }}>
            <path d={path} fill="none" stroke="var(--button-bg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {pts.map(function(p, i) {
                return (
                    <g key={i}>
                        <circle cx={p.x} cy={p.y} r="5" fill="var(--button-bg)" />
                        <text x={p.x} y={p.y - 8} textAnchor="middle" fill="var(--text-color)" fontSize="9" fontWeight="bold">{data[i].avg}</text>
                        <text x={p.x} y={h - 1} textAnchor="middle" fill="var(--text-color)" fontSize="9" opacity="0.6">{data[i].month}</text>
                    </g>
                );
            })}
        </svg>
    );
}

function DailyJournal() {
    const navigate = useNavigate();

    const [selectedMood, setSelectedMood] = useState(null);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [restfulness, setRestfulness] = useState(2);
    const [journalText, setJournalText] = useState("");
    const [entries, setEntries] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:5000/journal/${userId}`)
                .then(res => setEntries(res.data))
                .catch(err => console.log(err))
        }
    }, [userId]);

    function toggleActivity(activity) {
        if (selectedActivities.includes(activity)) {
            setSelectedActivities(selectedActivities.filter(function(a) {
                return a !== activity;
            }));
        } else {
            setSelectedActivities([...selectedActivities, activity]);
        }
    }

    function handleSubmit() {
        if (!selectedMood) {
            alert("Please select a mood!");
            return;
        }

        const newEntry = {
            userId: userId,
            mood: selectedMood.label,
            restedRating: restfulness,
            journalText: journalText,
            activities: selectedActivities.map(a => ({ name: a })),
        };

        axios.post("http://localhost:5000/journal", newEntry)
            .then(() => {
                // Re-fetch all entries from the server so the list is always consistent
                return axios.get(`http://localhost:5000/journal/${userId}`)
            })
            .then(res => {
                console.log("userId:", userId);
                console.log("Entries from server:", res.data);
                setEntries(res.data);
                setSelectedMood(null);
                setSelectedActivities([]);
                setRestfulness(null);
                setJournalText("");
                setSubmitted(true);
                setTimeout(function() { setSubmitted(false); }, 3000);
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="home-container" style={{ alignItems: "stretch", justifyContent: "flex-start", padding: "16px" }}>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                <button className="back-btn" onClick={() => navigate("/home")}>← Back</button>
                <h1 className="home-title" style={{ fontSize: "1.8rem", margin: 0 }}>📓 Daily Journal</h1>
                <div style={{ width: "80px" }} />
            </div>

            {/* Main 2-column grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "14px", alignItems: "start" }}>

                {/* LEFT — Log form */}
                <div className="home-card" style={{ padding: "18px", gap: "12px", alignItems: "stretch" }}>
                    <p className="login-label" style={{ fontSize: "0.95rem", margin: 0 }}>How are you doing today?</p>

                    {/* Mood Selector */}
                    <div>
                        <p className="login-label" style={{ fontSize: "0.8rem", marginBottom: "6px" }}>How are you feeling?</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                            {moods.map(function(mood) {
                                return (
                                    <div
                                        key={mood.label}
                                        onClick={() => setSelectedMood(mood)}
                                        style={{
                                            cursor: "pointer",
                                            padding: "8px 10px",
                                            borderRadius: "12px",
                                            background: selectedMood?.label === mood.label ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)",
                                            border: selectedMood?.label === mood.label ? "2px solid white" : "2px solid transparent",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: "3px",
                                            transition: "all 0.2s",
                                        }}
                                    >
                                        <span style={{ fontSize: "1.4rem" }}>{mood.emoji}</span>
                                        <span className="text-color" style={{ fontSize: "0.65rem", fontWeight: 700, textAlign: "center" }}>{mood.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Restfulness */}
                    <div>
                        <p className="login-label" style={{ fontSize: "0.8rem", marginBottom: "6px" }}>Restfulness</p>
                        <div style={{ textAlign: "center", marginBottom: "6px" }}>
                            <span style={{ fontSize: "1.4rem" }}>{restfulOptions[restfulness].emoji}</span>
                            <span className="text-color" style={{ marginLeft: "8px", fontSize: "0.8rem", fontWeight: 700 }}>
                            {restfulOptions[restfulness].label}
                        </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span className="text-color" style={{ fontSize: "0.7rem", fontWeight: 700 }}>{restfulOptions[0].label}</span>
                            <input
                                type="range"
                                min={0}
                                max={restfulOptions.length - 1}
                                step={1}
                                value={restfulness}
                                onChange={(e) => setRestfulness(Number(e.target.value))}
                                style={{ width: "100%" }}
                            />
                            <span className="text-color" style={{ fontSize: "0.7rem", fontWeight: 700 }}>{restfulOptions[restfulOptions.length - 1].label}</span>
                        </div>
                    </div>

                    {/* Activity Tags */}
                    <div>
                        <p className="login-label" style={{ fontSize: "0.8rem", marginBottom: "6px" }}>What did you do today?</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                            {activities.map(function(activity) {
                                return (
                                    <div
                                        key={activity}
                                        onClick={() => toggleActivity(activity)}
                                        className="text-color"
                                        style={{
                                            cursor: "pointer",
                                            padding: "6px 12px",
                                            borderRadius: "20px",
                                            background: selectedActivities.includes(activity) ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)",
                                            border: selectedActivities.includes(activity) ? "2px solid white" : "2px solid transparent",
                                            fontWeight: 700,
                                            fontSize: "0.78rem",
                                            transition: "all 0.2s",
                                        }}
                                    >
                                        {selectedActivities.includes(activity) ? "✅ " : ""}{activity}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Journal Text */}
                    <div>
                        <p className="login-label" style={{ fontSize: "0.8rem", marginBottom: "6px" }}>Write about your day</p>
                        <textarea
                            value={journalText}
                            onChange={(e) => setJournalText(e.target.value)}
                            placeholder="What's on your mind?"
                            rows={3}
                            className="text-color"
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "10px",
                                border: "none",
                                background: "rgba(255,255,255,0.2)",
                                fontSize: "0.88rem",
                                fontFamily: "arial, sans-serif",
                                resize: "vertical",
                                outline: "none",
                                boxSizing: "border-box",
                            }}
                        />
                    </div>

                    <button className="login-btn" onClick={handleSubmit}>Save Entry</button>
                    {submitted && (
                        <p className="text-color" style={{ fontWeight: 700, margin: 0, textAlign: "center" }}>✅ Entry saved!</p>
                    )}
                </div>

                {/* RIGHT — Stats & Past Entries */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

                    {/* Quick stats */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                        {[
                            { label: "Entries", value: `${entries.length}`, sub: "total logged", icon: "📓" },
                            { label: "Streak", value: "5 days", sub: "keep going!", icon: "🔥" },
                            { label: "Mood", value: "😊", sub: "avg this week", icon: "✨" },
                        ].map(s => (
                            <div key={s.label} className="home-card" style={{ padding: "12px 8px", gap: "4px" }}>
                                <div style={{ fontSize: "1.4rem" }}>{s.icon}</div>
                                <div className="login-label" style={{ fontSize: "1rem", margin: 0 }}>{s.value}</div>
                                <div className="text-color" style={{ fontSize: "0.65rem", fontWeight: 700, opacity: 0.6 }}>{s.sub}</div>
                            </div>
                        ))}
                    </div>

                    {/* Past Entries */}
                    {entries.length > 0 && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <p className="login-label" style={{ fontSize: "0.9rem", margin: 0 }}>📖 Past Entries</p>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px" }}>
                                {entries.map(function(entry, i) {
                                    const entryDate = entry.date
                                        ? new Date(entry.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
                                        : "No date";
                                    const moodObj = moods.find(m => m.label === entry.mood);

                                    return (
                                        <div key={i} className="home-card" style={{ padding: "12px", alignItems: "flex-start", gap: "6px" }}>
                                            <p className="profile-label">{entryDate}</p>
                                            <p className="text-color" style={{ fontWeight: 800, fontSize: "0.9rem", margin: 0 }}>
                                                {moodObj ? moodObj.emoji : ""} {entry.mood}
                                            </p>
                                            {typeof entry.restfulness === "number" && (
                                                <p className="text-color" style={{ margin: 0, fontSize: "0.78rem" }}>
                                                    😴 {restfulOptions[entry.restfulness].emoji} {restfulOptions[entry.restfulness].label}
                                                </p>
                                            )}
                                            {entry.activities && entry.activities.length > 0 && (
                                                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                                                    {entry.activities.map(function(a) {
                                                        return (
                                                            <span key={a.name} className="text-color" style={{
                                                                background: "rgba(255,255,255,0.2)",
                                                                padding: "3px 8px",
                                                                borderRadius: "20px",
                                                                fontSize: "0.72rem",
                                                                fontWeight: 700,
                                                            }}>✅ {a.name}</span>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                            {entry.journalText && (
                                                <p className="text-color" style={{ margin: 0, fontSize: "0.78rem", fontStyle: "italic" }}>"{entry.journalText}"</p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    <div>
                        <div className="home-card" style={{ padding: "14px 16px", alignItems: "stretch", gap: "6px" }}>
                            <p className="login-label" style={{ fontSize: "0.9rem", margin: 0 }}>📈 Goals Completed Trend</p>
                            <GoalLineChart data={journalMock} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DailyJournal;