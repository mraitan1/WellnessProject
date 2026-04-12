import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAYS_SHORT = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getSleepColor(hours) {
    if (hours >= 7) return "#5cb85c";
    if (hours >= 5) return "#f0ad4e";
    return "#d9534f";
}

function getMonthData(year, month) {
    return { firstDay: new Date(year, month, 1).getDay(), daysInMonth: new Date(year, month + 1, 0).getDate() };
}

function buildSampleEntries(year, month) {
    const entries = {};
    const days = new Date(year, month + 1, 0).getDate();
    for (let d = 1; d <= days; d++) {
        if (Math.random() > 0.25) {
            entries[d] = {
                hours: Math.floor(Math.random() * 6) + 4,
                wokeUp: Math.random() > 0.4,
                dreamt: ["Yes","No","Cannot remember"][Math.floor(Math.random() * 3)],
            };
        }
    }
    return entries;
}

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
                    const bg = entry ? getSleepColor(entry.hours) : day ? "rgba(255,255,255,0.06)" : "transparent";
                    return (
                        <div key={i} style={{ borderRadius: "10px", background: bg, border: isToday ? "2px solid white" : "1px solid rgba(255,255,255,0.15)", padding: day ? "8px 10px" : 0, boxSizing: "border-box", minHeight: "80px" }}>
                            {day && <>
                                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: entry ? "white" : "inherit", textShadow: entry ? "0 1px 2px rgba(0,0,0,0.4)" : "none", marginBottom: "5px" }} className={entry ? "" : "cal-text"}>{day}</div>
                                {entry && <div style={{ fontSize: "0.75rem", color: "white", lineHeight: 1.6, textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}>
                                    <div><strong>Hours:</strong> {entry.hours}</div>
                                    <div><strong>Woke up:</strong> {entry.wokeUp ? "Yes" : "No"}</div>
                                    <div><strong>Dreamt:</strong> {entry.dreamt}</div>
                                </div>}
                            </>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function WeekView({ year, month, entries, today, weekOffset }) {
    const firstOfMonth = new Date(year, month, 1);
    const startOfWeek = new Date(firstOfMonth);
    startOfWeek.setDate(firstOfMonth.getDate() - firstOfMonth.getDay() + weekOffset * 7);
    const weekDays = Array.from({ length: 7 }, (_, i) => { const d = new Date(startOfWeek); d.setDate(startOfWeek.getDate() + i); return d; });

    return (
        <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "6px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px" }}>
                {weekDays.map((d, i) => (
                    <div key={i} className="cal-day-header" style={{ textAlign: "center", fontWeight: 700, fontSize: "1rem", padding: "10px 0", borderRadius: "8px", border: d.toDateString() === today.toDateString() ? "2px solid white" : "none" }}>
                        <div>{DAYS_SHORT[i]}</div>
                        <div style={{ fontSize: "1.3rem" }}>{d.getDate()}</div>
                    </div>
                ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px", flex: 1 }}>
                {weekDays.map((d, i) => {
                    const day = d.getMonth() === month ? d.getDate() : null;
                    const entry = day ? entries[day] : null;
                    const bg = entry ? getSleepColor(entry.hours) : "rgba(255,255,255,0.06)";
                    return (
                        <div key={i} style={{ borderRadius: "10px", background: bg, padding: "12px 10px", minHeight: "200px", border: "1px solid rgba(255,255,255,0.15)" }}>
                            {entry && <div style={{ fontSize: "0.85rem", color: "white", lineHeight: 1.7, textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}>
                                <div><strong>Hours:</strong> {entry.hours}</div>
                                <div><strong>Woke up:</strong> {entry.wokeUp ? "Yes" : "No"}</div>
                                <div><strong>Dreamt:</strong> {entry.dreamt}</div>
                            </div>}
                            {!entry && day && <div className="cal-text" style={{ fontSize: "0.8rem", opacity: 0.4, marginTop: "8px" }}>No entry</div>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function DayView({ year, month, entries, today, dayOffset }) {
    const base = new Date(year, month, 1 + dayOffset);
    const day = base.getDate();
    const entry = base.getMonth() === month ? entries[day] : null;
    const isToday = base.toDateString() === today.toDateString();

    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="cal-day-header" style={{ textAlign: "center", padding: "16px", borderRadius: "12px", border: isToday ? "2px solid white" : "none" }}>
                <div className="cal-text" style={{ fontSize: "1rem", fontWeight: 700 }}>{DAYS[base.getDay()]}</div>
                <div className="cal-text" style={{ fontSize: "2.5rem", fontWeight: 800 }}>{day}</div>
                <div className="cal-text" style={{ fontSize: "0.9rem" }}>{MONTH_NAMES[base.getMonth()]} {base.getFullYear()}</div>
            </div>
            <div style={{ flex: 1, borderRadius: "12px", background: entry ? getSleepColor(entry.hours) : "rgba(255,255,255,0.06)", padding: "24px", border: "1px solid rgba(255,255,255,0.15)", display: "flex", flexDirection: "column", gap: "12px" }}>
                {entry ? <>
                    <p style={{ color: "white", fontSize: "1.1rem", margin: 0, textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}><strong>Hours slept:</strong> {entry.hours}</p>
                    <p style={{ color: "white", fontSize: "1.1rem", margin: 0, textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}><strong>Woke up during night:</strong> {entry.wokeUp ? "Yes" : "No"}</p>
                    <p style={{ color: "white", fontSize: "1.1rem", margin: 0, textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}><strong>Dreamt:</strong> {entry.dreamt}</p>
                </> : <p className="cal-text" style={{ opacity: 0.5, fontSize: "1rem" }}>No sleep entry for this day.</p>}
            </div>
        </div>
    );
}

function SleepJournalCalendar({ entries: propEntries }) {
    const navigate = useNavigate();
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [view, setView] = useState("month");
    const [weekOffset, setWeekOffset] = useState(0);
    const [dayOffset, setDayOffset] = useState(0);

    const entries = propEntries || buildSampleEntries(year, month);

    function prevPeriod() {
        if (view === "month") { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); }
        else if (view === "week") setWeekOffset(w => w - 1);
        else setDayOffset(d => d - 1);
    }
    function nextPeriod() {
        if (view === "month") { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); }
        else if (view === "week") setWeekOffset(w => w + 1);
        else setDayOffset(d => d + 1);
    }

    function periodLabel() {
        if (view === "month") return `${MONTH_NAMES[month]} ${year}`;
        if (view === "week") {
            const s = new Date(year, month, 1); s.setDate(1 - s.getDay() + weekOffset * 7);
            const e = new Date(s); e.setDate(s.getDate() + 6);
            return `${MONTH_NAMES[s.getMonth()]} ${s.getDate()} – ${MONTH_NAMES[e.getMonth()]} ${e.getDate()}`;
        }
        const d = new Date(year, month, 1 + dayOffset);
        return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }

    return (
        <div style={{ minHeight: "100vh", width: "100%", boxSizing: "border-box", padding: "32px 40px", fontFamily: "Shrikhand, sans-serif", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
                <button className="back-btn" onClick={() => navigate("/sleep")}>← Back</button>
                <h1 className="cal-title home-title" style={{ fontSize: "2rem", margin: 0, flex: 1, textAlign: "center" }}>Journal Your Nightly Sleep — Calendar View</h1>
                <div style={{ display: "flex", gap: "8px" }}>
                    {["month","week","day"].map(v => (
                        <button key={v} className={`cal-view-btn${view === v ? " active" : ""}`} onClick={() => setView(v)}>
                            {v.charAt(0).toUpperCase() + v.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", marginBottom: "16px" }}>
                <button className="cal-nav-btn" onClick={prevPeriod}>‹</button>
                <span className="cal-title" style={{ fontSize: "1.5rem", fontWeight: 800 }}>{periodLabel()}</span>
                <button className="cal-nav-btn" onClick={nextPeriod}>›</button>
            </div>

            {view === "month" && <MonthView year={year} month={month} entries={entries} today={today} />}
            {view === "week" && <WeekView year={year} month={month} entries={entries} today={today} weekOffset={weekOffset} />}
            {view === "day" && <DayView year={year} month={month} entries={entries} today={today} dayOffset={dayOffset} />}

            <div style={{ display: "flex", gap: "16px", marginTop: "20px", justifyContent: "center", paddingBottom: "16px", flexWrap: "wrap" }}>
                {[{ color: "#5cb85c", label: "7+ hrs (Great)" }, { color: "#f0ad4e", label: "5–6 hrs (Okay)" }, { color: "#d9534f", label: "< 5 hrs (Poor)" }].map(({ color, label }) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "18px", height: "18px", borderRadius: "4px", background: color }} />
                        <span className="cal-legend-label">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SleepJournalCalendar;