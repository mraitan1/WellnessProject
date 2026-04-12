import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAYS_SHORT = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const TYPES = ["Running","Weightlifting","Yoga","Swimming","Cycling","HIIT","Hiking","Pilates","Walking"];
const INTENSITIES = ["Very Light","Light","Moderate","Hard","Max Effort"];
const DURATIONS = [20,30,45,60,75,90,120];

function getMonthData(year, month) {
    return {
        firstDay: new Date(year, month, 1).getDay(),
        daysInMonth: new Date(year, month + 1, 0).getDate(),
    };
}

function buildSampleEntries(year, month) {
    const entries = {};
    const days = new Date(year, month + 1, 0).getDate();
    for (let d = 1; d <= days; d++) {
        if (Math.random() > 0.32) {
            entries[d] = Math.random() > 0.12
                ? { type: TYPES[Math.floor(Math.random() * TYPES.length)], duration: DURATIONS[Math.floor(Math.random() * DURATIONS.length)], intensity: INTENSITIES[Math.floor(Math.random() * INTENSITIES.length)], restDay: false }
                : { restDay: true };
        }
    }
    return entries;
}

// ── Month View ──────────────────────────────────────────────────
function MonthView({ year, month, entries, today }) {
    const { firstDay, daysInMonth } = getMonthData(year, month);
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    return (
        <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "6px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px" }}>
                {DAYS.map(d => <div key={d} className="cal-day-header" style={{ textAlign: "center", fontWeight: 700, fontSize: "1rem", padding: "8px 0", borderRadius: "8px" }}>{d}</div>)}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gridTemplateRows: `repeat(${Math.ceil(cells.length / 7)}, 1fr)`, gap: "6px", flex: 1 }}>
                {cells.map((day, i) => {
                    const entry = day ? entries[day] : null;
                    const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                    const bg = entry ? (entry.restDay ? "rgba(255,255,255,0.18)" : "rgba(74,144,217,0.82)") : day ? "rgba(255,255,255,0.06)" : "transparent";
                    return (
                        <div key={i} style={{ borderRadius: "10px", background: bg, border: isToday ? "2px solid white" : "1px solid rgba(255,255,255,0.15)", padding: day ? "8px 10px" : 0, boxSizing: "border-box", minHeight: "80px" }}>
                            {day && <>
                                <div className="cal-text" style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "5px" }}>{day}</div>
                                {entry && (entry.restDay
                                    ? <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.7)", fontStyle: "italic" }}>Rest Day</div>
                                    : <div style={{ fontSize: "0.75rem", color: "white", lineHeight: 1.6 }}>
                                        <div><strong>Type:</strong> {entry.type}</div>
                                        <div><strong>Duration:</strong> {entry.duration}min</div>
                                        <div><strong>Intensity:</strong> {entry.intensity}</div>
                                    </div>
                                )}
                            </>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ── Week View ───────────────────────────────────────────────────
function WeekView({ year, month, entries, today, weekOffset }) {
    const firstOfMonth = new Date(year, month, 1);
    const startOfWeek = new Date(firstOfMonth);
    startOfWeek.setDate(firstOfMonth.getDate() - firstOfMonth.getDay() + weekOffset * 7);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        weekDays.push(d);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "6px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px" }}>
                {weekDays.map((d, i) => {
                    const isToday = d.toDateString() === today.toDateString();
                    const day = d.getMonth() === month ? d.getDate() : null;
                    return (
                        <div key={i} className="cal-day-header" style={{ textAlign: "center", fontWeight: 700, fontSize: "1rem", padding: "10px 0", borderRadius: "8px", border: isToday ? "2px solid white" : "none" }}>
                            <div>{DAYS_SHORT[i]}</div>
                            <div style={{ fontSize: "1.3rem" }}>{d.getDate()}</div>
                        </div>
                    );
                })}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px", flex: 1 }}>
                {weekDays.map((d, i) => {
                    const day = d.getMonth() === month ? d.getDate() : null;
                    const entry = day ? entries[day] : null;
                    const bg = entry ? (entry.restDay ? "rgba(255,255,255,0.18)" : "rgba(74,144,217,0.82)") : "rgba(255,255,255,0.06)";
                    return (
                        <div key={i} style={{ borderRadius: "10px", background: bg, padding: "12px 10px", boxSizing: "border-box", minHeight: "200px", border: "1px solid rgba(255,255,255,0.15)" }}>
                            {entry && (entry.restDay
                                ? <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", fontStyle: "italic", marginTop: "8px" }}>Rest Day</div>
                                : <div style={{ fontSize: "0.85rem", color: "white", lineHeight: 1.7 }}>
                                    <div><strong>Type:</strong> {entry.type}</div>
                                    <div><strong>Duration:</strong> {entry.duration}min</div>
                                    <div><strong>Intensity:</strong> {entry.intensity}</div>
                                </div>
                            )}
                            {!entry && day && <div className="cal-text" style={{ fontSize: "0.8rem", opacity: 0.4, marginTop: "8px" }}>No entry</div>}
                            {!day && <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.2)", marginTop: "8px" }}>—</div>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ── Day View ────────────────────────────────────────────────────
function DayView({ year, month, entries, today, dayOffset }) {
    const base = new Date(year, month, 1);
    base.setDate(1 + dayOffset);
    const day = base.getDate();
    const displayMonth = base.getMonth();
    const displayYear = base.getFullYear();
    const entry = displayMonth === month ? entries[day] : null;
    const isToday = base.toDateString() === today.toDateString();
    const dayName = DAYS[base.getDay()];

    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="cal-day-header" style={{ textAlign: "center", padding: "16px", borderRadius: "12px", border: isToday ? "2px solid white" : "none" }}>
                <div className="cal-text" style={{ fontSize: "1rem", fontWeight: 700 }}>{dayName}</div>
                <div className="cal-text" style={{ fontSize: "2.5rem", fontWeight: 800 }}>{day}</div>
                <div className="cal-text" style={{ fontSize: "0.9rem" }}>{MONTH_NAMES[displayMonth]} {displayYear}</div>
            </div>
            <div style={{ flex: 1, borderRadius: "12px", background: entry ? (entry.restDay ? "rgba(255,255,255,0.18)" : "rgba(74,144,217,0.82)") : "rgba(255,255,255,0.06)", padding: "24px", border: "1px solid rgba(255,255,255,0.15)", display: "flex", flexDirection: "column", gap: "12px" }}>
                {entry ? (entry.restDay
                    ? <p style={{ color: "rgba(255,255,255,0.7)", fontStyle: "italic", fontSize: "1.1rem" }}>Rest Day 🛌</p>
                    : <>
                        <p style={{ color: "white", fontSize: "1.1rem", margin: 0 }}><strong>Type:</strong> {entry.type}</p>
                        <p style={{ color: "white", fontSize: "1.1rem", margin: 0 }}><strong>Duration:</strong> {entry.duration} minutes</p>
                        <p style={{ color: "white", fontSize: "1.1rem", margin: 0 }}><strong>Intensity:</strong> {entry.intensity}</p>
                    </>
                ) : (
                    <p className="cal-text" style={{ opacity: 0.5, fontSize: "1rem" }}>No workout logged for this day.</p>
                )}
            </div>
        </div>
    );
}

// ── Main Component ──────────────────────────────────────────────
function WorkoutJournalCalendar({ entries: propEntries }) {
    const navigate = useNavigate();
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [view, setView] = useState("month");
    const [weekOffset, setWeekOffset] = useState(0);
    const [dayOffset, setDayOffset] = useState(0);

    const entries = propEntries || buildSampleEntries(year, month);

    function prevPeriod() {
        if (view === "month") {
            if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1);
        } else if (view === "week") {
            setWeekOffset(w => w - 1);
        } else {
            setDayOffset(d => d - 1);
        }
    }
    function nextPeriod() {
        if (view === "month") {
            if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1);
        } else if (view === "week") {
            setWeekOffset(w => w + 1);
        } else {
            setDayOffset(d => d + 1);
        }
    }

    function periodLabel() {
        if (view === "month") return `${MONTH_NAMES[month]} ${year}`;
        if (view === "week") {
            const start = new Date(year, month, 1);
            start.setDate(1 - start.getDay() + weekOffset * 7);
            const end = new Date(start); end.setDate(start.getDate() + 6);
            return `${MONTH_NAMES[start.getMonth()]} ${start.getDate()} – ${MONTH_NAMES[end.getMonth()]} ${end.getDate()}`;
        }
        const d = new Date(year, month, 1 + dayOffset);
        return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }

    return (
        <div style={{ minHeight: "100vh", width: "100%", boxSizing: "border-box", padding: "32px 40px", fontFamily: "Shrikhand, sans-serif", display: "flex", flexDirection: "column" }}>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
                <button className="back-btn" onClick={() => navigate("/workout")}>← Back</button>
                <h1 className="cal-title home-title" style={{ fontSize: "2rem", margin: 0, flex: 1, textAlign: "center" }}>Workout Calendar View</h1>
                <div style={{ display: "flex", gap: "8px" }}>
                    {["month","week","day"].map(v => (
                        <button key={v} className={`cal-view-btn${view === v ? " active" : ""}`} onClick={() => setView(v)}>
                            {v.charAt(0).toUpperCase() + v.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Period Nav */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", marginBottom: "16px" }}>
                <button className="cal-nav-btn" onClick={prevPeriod}>‹</button>
                <span className="cal-title" style={{ fontSize: "1.5rem", fontWeight: 800 }}>{periodLabel()}</span>
                <button className="cal-nav-btn" onClick={nextPeriod}>›</button>
            </div>

            {/* View */}
            {view === "month" && <MonthView year={year} month={month} entries={entries} today={today} />}
            {view === "week" && <WeekView year={year} month={month} entries={entries} today={today} weekOffset={weekOffset} />}
            {view === "day" && <DayView year={year} month={month} entries={entries} today={today} dayOffset={dayOffset} />}

            {/* Legend */}
            <div style={{ display: "flex", gap: "16px", marginTop: "20px", justifyContent: "center", paddingBottom: "16px", flexWrap: "wrap" }}>
                {[{ color: "rgba(74,144,217,0.82)", label: "Workout logged" }, { color: "rgba(255,255,255,0.18)", label: "Rest day" }, { color: "rgba(255,255,255,0.06)", label: "No entry" }].map(({ color, label }) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "18px", height: "18px", borderRadius: "4px", background: color, border: "1px solid rgba(255,255,255,0.3)" }} />
                        <span className="cal-legend-label">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WorkoutJournalCalendar;