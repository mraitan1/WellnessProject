import React from "react";
import { useNavigate } from "react-router-dom";

function WorkoutJournal() {
    const navigate = useNavigate();

    return (
        <div className="page-container">
            <button className="back-btn" onClick={() => navigate("/home")}>← Back</button>
            <h1 className="page-title">This is the Workout Journal page</h1>
            <p className="page-subtitle">Your recent workout entries will appear here.</p>
        </div>
    );
}

export default WorkoutJournal;