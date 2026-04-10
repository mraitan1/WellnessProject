import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const defaultHabits = [
    "Exercise", "Read", "Meditate", "Drink Water",
    "Sleep 8hrs", "Eat Healthy", "Journal", "Study"
];

const progressOptions = [
    { label: "Not Started", emoji: "😶" },
    { label: "Just Beginning", emoji: "🌱" },
    { label: "Making Progress", emoji: "📈" },
    { label: "Almost There", emoji: "🔥" },
    { label: "Crushed It", emoji: "🏆" },
];

function PersonalGrowth() {
    const navigate = useNavigate();

    const [goalInput, setGoalInput] = useState("");
    const [goals, setGoals] = useState([]);
    const [checkedHabits, setCheckedHabits] = useState([]);
    const [progress, setProgress] = useState(null);
    const [motivationalNote, setMotivationalNote] = useState("");
    const [entries, setEntries] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    function addGoal() {
        if (!goalInput.trim()) {
            return;
        }
        const newGoal = { text: goalInput.trim(), done: false };
        setGoals([...goals, newGoal]);
        setGoalInput("");
    }

    function toggleGoal(index) {
        const updatedGoals = [];
        for (let i = 0; i < goals.length; i++) {
            if (i === index) {
                updatedGoals.push({ text: goals[i].text, done: !goals[i].done });
            } else {
                updatedGoals.push(goals[i]);
            }
        }
        setGoals(updatedGoals);
    }

    function removeGoal(index) {
        const updatedGoals = [];
        for (let i = 0; i < goals.length; i++) {
            if (i !== index) {
                updatedGoals.push(goals[i]);
            }
        }
        setGoals(updatedGoals);
    }

    function toggleHabit(habit) {
        if (checkedHabits.includes(habit)) {
            setCheckedHabits(checkedHabits.filter(function(h) {
                return h !== habit;
            }));
        } else {
            setCheckedHabits([...checkedHabits, habit]);
        }
    }

    function handleSubmit() {
        if (goals.length === 0) {
            alert("Please add at least one goal!");
            return;
        }
        if (!progress) {
            alert("Please select a progress rating!");
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
            goals: [...goals],
            habits: [...checkedHabits],
            progress: progress,
            note: motivationalNote,
        };

        setEntries([newEntry, ...entries]);
        setGoals([]);
        setCheckedHabits([]);
        setProgress(null);
        setMotivationalNote("");
        setSubmitted(true);
        setTimeout(function() {
            setSubmitted(false);
        }, 3000);
    }

    return (
        <div className="home-container">
            <div className="home-card" style={{ width: "min(600px, 90vw)", gap: "24px" }}>
                <button className="back-btn" onClick={() => navigate("/home")}>← Back</button>
                <h1 className="home-title" style={{ fontSize: "2.5rem", marginBottom: 0 }}>Personal Growth</h1>
                <p className="home-subtitle" style={{ marginBottom: 0 }}>Track your goals & habits</p>

                {/* Goal Setting */}
                <div style={{ width: "100%" }}>
                    <p className="login-label">Your Goals</p>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <input
                            type="text"
                            placeholder="Add a goal..."
                            value={goalInput}
                            onChange={(e) => setGoalInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") { addGoal(); } }}
                            className="login-input"
                            style={{ marginBottom: 0, flex: 1 }}
                        />
                        <button className="login-btn" onClick={addGoal} style={{ width: "auto", padding: "10px 20px", marginTop: 0 }}>
                            Add
                        </button>
                    </div>
                    {goals.length > 0 && (
                        <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                            {goals.map(function(goal, i) {
                                return (
                                    <div key={i} style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        background: "rgba(255,255,255,0.15)",
                                        borderRadius: "12px",
                                        padding: "10px 14px",
                                    }}>
                                        <input
                                            type="checkbox"
                                            checked={goal.done}
                                            onChange={() => toggleGoal(i)}
                                            style={{ width: "18px", height: "18px", cursor: "pointer" }}
                                        />
                                        <span className="text-color" style={{
                                            flex: 1,
                                            fontWeight: 700,
                                            textDecoration: goal.done ? "line-through" : "none",
                                            opacity: goal.done ? 0.6 : 1,
                                        }}>
                                            {goal.text}
                                        </span>
                                        <span
                                            onClick={() => removeGoal(i)}
                                            style={{ cursor: "pointer", color: "rgba(255,255,255,0.6)", fontSize: "1.1rem" }}
                                        >
                                            ✕
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Habit Tracker */}
                <div style={{ width: "100%" }}>
                    <p className="login-label">Daily Habits</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {defaultHabits.map(function(habit) {
                            return (
                                <div
                                    key={habit}
                                    onClick={() => toggleHabit(habit)}
                                    className="text-color"
                                    style={{
                                        cursor: "pointer",
                                        padding: "8px 16px",
                                        borderRadius: "20px",
                                        background: checkedHabits.includes(habit) ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)",
                                        border: checkedHabits.includes(habit) ? "2px solid white" : "2px solid transparent",
                                        fontWeight: 700,
                                        fontSize: "0.85rem",
                                        transition: "all 0.2s",
                                    }}
                                >
                                    {checkedHabits.includes(habit) ? "✅ " : ""}{habit}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Progress Rating */}
                <div style={{ width: "100%" }}>
                    <p className="login-label">Overall Progress</p>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
                        {progressOptions.map(function(option) {
                            return (
                                <div
                                    key={option.label}
                                    onClick={() => setProgress(option)}
                                    style={{
                                        cursor: "pointer",
                                        padding: "10px 14px",
                                        borderRadius: "14px",
                                        background: progress?.label === option.label ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)",
                                        border: progress?.label === option.label ? "2px solid white" : "2px solid transparent",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: "4px",
                                        transition: "all 0.2s",
                                    }}
                                >
                                    <span style={{ fontSize: "1.8rem" }}>{option.emoji}</span>
                                    <span className="text-color" style={{ fontSize: "0.75rem", fontWeight: 700, textAlign: "center" }}>{option.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Motivational Note */}
                <div style={{ width: "100%" }}>
                    <p className="login-label">Motivational Note</p>
                    <textarea
                        value={motivationalNote}
                        onChange={(e) => setMotivationalNote(e.target.value)}
                        placeholder="Write something to motivate yourself..."
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
                                <p className="text-color" style={{ fontWeight: 800, fontSize: "1.1rem", margin: 0 }}>
                                    {entry.progress.emoji} {entry.progress.label}
                                </p>
                                <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "100%" }}>
                                    {entry.goals.map(function(g, j) {
                                        return (
                                            <p key={j} className="text-color" style={{ margin: 0, fontSize: "0.9rem" }}>
                                                {g.done ? "✅" : "⬜"} {g.text}
                                            </p>
                                        );
                                    })}
                                </div>
                                {entry.habits.length > 0 && (
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                        {entry.habits.map(function(h) {
                                            return (
                                                <span key={h} className="text-color" style={{
                                                    background: "rgba(255,255,255,0.2)",
                                                    padding: "4px 12px",
                                                    borderRadius: "20px",
                                                    fontSize: "0.8rem",
                                                    fontWeight: 700,
                                                }}>
                                                    ✅ {h}
                                                </span>
                                            );
                                        })}
                                    </div>
                                )}
                                {entry.note && (
                                    <p className="text-color" style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.5", fontStyle: "italic" }}>
                                        "{entry.note}"
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default PersonalGrowth;