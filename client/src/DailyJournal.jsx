import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const activities = [
    "School", "Work", "Studying", "Working Out",
    "Hiking", "Friends", "Alone Time", "Movie", "Hobbies"
];

function DailyJournal() {
    const navigate = useNavigate();

    const [selectedMood, setSelectedMood] = useState(null);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [restedRating, setRestedRating] = useState(null);
    const [journalText, setJournalText] = useState("");
    const [entries, setEntries] = useState([]);
    const [submitted, setSubmitted] = useState(false);

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

        const today = new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });

        const newEntry = {
            date: today,
            mood: selectedMood,
            activities: selectedActivities,
            rested: restedRating,
            text: journalText,
        };

        setEntries([newEntry, ...entries]);
        setSelectedMood(null);
        setSelectedActivities([]);
        setRestedRating(null);
        setJournalText("");
        setSubmitted(true);
        setTimeout(function() {
            setSubmitted(false);
        }, 3000);
    }

    return (
        <div className="home-container">
            <div className="home-card" style={{ width: "min(600px, 90vw)", gap: "24px" }}>
                <button className="back-btn" onClick={() => navigate("/home")}>← Back</button>
                <h1 className="home-title" style={{ fontSize: "2.5rem", marginBottom: 0 }}>Daily Journal</h1>
                <p className="home-subtitle" style={{ marginBottom: 0 }}>How are you doing today?</p>

                {/* Mood Selector */}
                <div style={{ width: "100%" }}>
                    <p className="login-label">How are you feeling?</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
                        {moods.map(function(mood) {
                            return (
                                <div
                                    key={mood.label}
                                    onClick={() => setSelectedMood(mood)}
                                    style={{
                                        cursor: "pointer",
                                        padding: "10px 14px",
                                        borderRadius: "14px",
                                        background: selectedMood?.label === mood.label ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)",
                                        border: selectedMood?.label === mood.label ? "2px solid white" : "2px solid transparent",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: "4px",
                                        transition: "all 0.2s",
                                    }}
                                >
                                    <span style={{ fontSize: "1.8rem" }}>{mood.emoji}</span>
                                    <span style={{ color: "lightgoldenrodyellow", fontSize: "0.75rem", fontWeight: 700 }}>{mood.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Rested Rating */}
                <div style={{ width: "100%" }}>
                    <p className="login-label">How rested do you feel?</p>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                        {[1, 2, 3, 4, 5].map(function(n) {
                            return (
                                <div
                                    key={n}
                                    onClick={() => setRestedRating(n)}
                                    style={{
                                        cursor: "pointer",
                                        width: "44px",
                                        height: "44px",
                                        borderRadius: "50%",
                                        background: restedRating === n ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)",
                                        border: restedRating === n ? "2px solid white" : "2px solid transparent",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "lightgoldenrodyellow",
                                        fontWeight: 800,
                                        fontSize: "1rem",
                                        transition: "all 0.2s",
                                    }}
                                >
                                    {n}
                                </div>
                            );
                        })}
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", textAlign: "center", marginTop: "6px" }}>
                        1 = Exhausted &nbsp;|&nbsp; 5 = Well Rested
                    </p>
                </div>

                {/* Activity Tags */}
                <div style={{ width: "100%" }}>
                    <p className="login-label">What did you do today?</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {activities.map(function(activity) {
                            return (
                                <div
                                    key={activity}
                                    onClick={() => toggleActivity(activity)}
                                    style={{
                                        cursor: "pointer",
                                        padding: "8px 16px",
                                        borderRadius: "20px",
                                        background: selectedActivities.includes(activity) ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)",
                                        border: selectedActivities.includes(activity) ? "2px solid white" : "2px solid transparent",
                                        color: "lightgoldenrodyellow",
                                        fontWeight: 700,
                                        fontSize: "0.85rem",
                                        transition: "all 0.2s",
                                    }}
                                >
                                    {activity}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Journal Text */}
                <div style={{ width: "100%" }}>
                    <p className="login-label">Write about your day</p>
                    <textarea
                        value={journalText}
                        onChange={(e) => setJournalText(e.target.value)}
                        placeholder="What's on your mind?"
                        rows={5}
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "12px",
                            border: "none",
                            background: "rgba(255,255,255,0.2)",
                            color: "white",
                            fontSize: "0.95rem",
                            fontFamily: "arial, sans-serif",
                            resize: "vertical",
                            outline: "none",
                            boxSizing: "border-box",
                        }}
                    />
                </div>

                <button className="login-btn" onClick={handleSubmit}>
                    Save Entry
                </button>
                {submitted && (
                    <p style={{ color: "lightgoldenrodyellow", fontWeight: 700 }}>✅ Entry saved!</p>
                )}
            </div>

            {/* Past Entries */}
            {entries.length > 0 && (
                <div style={{ width: "min(600px, 90vw)", marginTop: "40px", display: "flex", flexDirection: "column", gap: "20px" }}>
                    <h2 style={{ color: "lightgoldenrodyellow", fontFamily: "arial, sans-serif", textAlign: "center" }}>Past Entries</h2>
                    {entries.map(function(entry, i) {
                        return (
                            <div key={i} className="home-card" style={{ alignItems: "flex-start", gap: "12px" }}>
                                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", margin: 0 }}>{entry.date}</p>
                                <p style={{ color: "lightgoldenrodyellow", fontWeight: 800, fontSize: "1.2rem", margin: 0 }}>
                                    {entry.mood.emoji} {entry.mood.label}
                                </p>
                                {entry.rested && (
                                    <p style={{ color: "rgba(255,255,255,0.85)", margin: 0, fontSize: "0.9rem" }}>
                                        😴 Rested: {entry.rested}/5
                                    </p>
                                )}
                                {entry.activities.length > 0 && (
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                        {entry.activities.map(function(a) {
                                            return (
                                                <span key={a} style={{
                                                    background: "rgba(255,255,255,0.2)",
                                                    color: "lightgoldenrodyellow",
                                                    padding: "4px 12px",
                                                    borderRadius: "20px",
                                                    fontSize: "0.8rem",
                                                    fontWeight: 700,
                                                }}>{a}</span>
                                            );
                                        })}
                                    </div>
                                )}
                                {entry.text && (
                                    <p style={{ color: "white", margin: 0, fontSize: "0.95rem", lineHeight: "1.5" }}>{entry.text}</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default DailyJournal;