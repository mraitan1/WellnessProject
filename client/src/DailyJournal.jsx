import React from "react";
import { useNavigate } from "react-router-dom";

function DailyJournal() {
    const navigate = useNavigate();

    return (
        <div className="page-container">
            <button className="back-btn" onClick={() => navigate("/home")}>← Back</button>
            <h1 className="page-title">This is the Daily Journal page</h1>
            <p className="page-subtitle">Your past journal entries will appear here.</p>
        </div>
    );
}

export default DailyJournal;