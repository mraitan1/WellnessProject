import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const qualityOptions = [
    { label: "Terrible", emoji: "😵" },
    { label: "Poor", emoji: "😞" },
    { label: "Okay", emoji: "😐" },
    { label: "Good", emoji: "😊" },
    { label: "Great", emoji: "🌟" },
];

function calculateDuration(bedtime, waketime) {
    if (!bedtime || !waketime) {
        return null;
    }

    const bedParts = bedtime.split(":");
    const wakeParts = waketime.split(":");

    const bedHours = Number(bedParts[0]);
    const bedMinutes = Number(bedParts[1]);
    const wakeHours = Number(wakeParts[0]);
    const wakeMinutes = Number(wakeParts[1]);

    let bedTotal = bedHours * 60 + bedMinutes;
    let wakeTotal = wakeHours * 60 + wakeMinutes;

    if (wakeTotal <= bedTotal) {
        wakeTotal = wakeTotal + 24 * 60;
    }

    const diff = wakeTotal - bedTotal;
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    return hours + "h " + minutes + "m";
}

function SleepJournal() {
    const navigate = useNavigate();

    const [bedtime, setBedtime] = useState("");
    const [waketime, setWaketime] = useState("");
    const [quality, setQuality] = useState(null);
    const [notes, setNotes] = useState("");
    const [entries, setEntries] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const duration = calculateDuration(bedtime, waketime);

    function handleSubmit() {
        if (!bedtime || !waketime) {
            alert("Please enter both bedtime and wake time!");
            return;
        }
        if (!quality) {
            alert("Please select a sleep quality!");
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
            bedtime: bedtime,
            waketime: waketime,
            duration: duration,
            quality: quality,
            notes: notes,
        };

        setEntries([newEntry, ...entries]);
        setBedtime("");
        setWaketime("");
        setQuality(null);
        setNotes("");
        setSubmitted(true);
        setTimeout(function() {
            setSubmitted(false);
        }, 3000);
    }

    return (
        <div className="home-container">
            <div className="home-card" style={{ width: "min(600px, 90vw)", gap: "24px" }}>
                <button className="back-btn" onClick={() => navigate("/home")}>← Back</button>
                <h1 className="home-title" style={{ fontSize: "2.5rem", marginBottom: 0 }}>Sleep Journal</h1>
                <p className="home-subtitle" style={{ marginBottom: 0 }}>How did you sleep?</p>

                {/* Bedtime & Wake Time */}
                <div style={{ width: "100%", display: "flex", gap: "20px" }}>
                    <div style={{ flex: 1 }}>
                        <p className="login-label">Bedtime</p>
                        <input
                            type="time"
                            value={bedtime}
                            onChange={(e) => setBedtime(e.target.value)}
                            className="login-input"
                            style={{ width: "auto" }}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <p className="login-label">Wake Time</p>
                        <input
                            type="time"
                            value={waketime}
                            onChange={(e) => setWaketime(e.target.value)}
                            className="login-input"
                            style={{ width: "auto" }}
                        />
                    </div>
                </div>

                {/* Auto-calculated Duration */}
                {duration && (
                    <div style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.15)",
                        borderRadius: "14px",
                        padding: "14px 20px",
                        textAlign: "center",
                    }}>
                        <p className="journal-entry">
                            😴 Total Sleep: {duration}
                        </p>
                    </div>
                )}

                {/* Sleep Quality */}
                <div style={{ width: "100%" }}>
                    <p className="login-label">Sleep Quality</p>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
                        {qualityOptions.map(function(q) {
                            return (
                                <div
                                    key={q.label}
                                    onClick={() => setQuality(q)}
                                    className="text-color"
                                    style={{
                                        cursor: "pointer",
                                        padding: "10px 14px",
                                        borderRadius: "14px",
                                        background: quality?.label === q.label ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)",
                                        border: quality?.label === q.label ? "2px solid white" : "2px solid transparent",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: "4px",
                                        transition: "all 0.2s",
                                    }}
                                >
                                    <span style={{ fontSize: "1.8rem" }}>{q.emoji}</span>
                                    <span className="journal-label">{q.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Notes */}
                <div style={{ width: "100%" }}>
                    <p className="login-label">Notes</p>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any thoughts before bed, dreams, or things that affected your sleep..."
                        rows={4}
                        className="text-color"
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "12px",
                            border: "none",
                            background: "rgba(255,255,255,0.2)",
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
                    <p className="text-color" style={{ fontWeight: 700 }}>✅ Entry saved!</p>
                )}
            </div>

            {/* Past Entries */}
            {entries.length > 0 && (
                <div style={{ width: "min(600px, 90vw)", marginTop: "40px", display: "flex", flexDirection: "column", gap: "20px" }}>
                    <h2 className="text-color" style={{ fontFamily: "arial, sans-serif", textAlign: "center" }}>Past Entries</h2>
                    {entries.map(function(entry, i) {
                        return (
                            <div key={i} className="home-card" style={{ alignItems: "flex-start", gap: "12px" }}>
                                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", margin: 0 }}>{entry.date}</p>
                                <p className="journal-entry">
                                    {entry.quality.emoji} {entry.quality.label} Sleep
                                </p>
                                <p className="text-color" style={{ margin: 0, fontSize: "0.9rem" }}>
                                    🛏️ {entry.bedtime} → ⏰ {entry.waketime} &nbsp;|&nbsp; 😴 {entry.duration}
                                </p>
                                {entry.notes && (
                                    <p className="text-color" style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.5" }}>{entry.notes}</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default SleepJournal;