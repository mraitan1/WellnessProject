import React from "react";
import { useNavigate } from "react-router-dom";

function SleepJournal() {
    const navigate = useNavigate();

    return (
        <div className="page-container">
            <button className="back-btn" onClick={() => navigate("/home")}>← Back</button>
            <h1 className="page-title">This is the Sleep Journal page</h1>
            <p className="page-subtitle">Your recent sleep entries will appear here.</p>
        </div>
    );
}

export default SleepJournal;