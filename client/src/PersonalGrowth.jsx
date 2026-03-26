import React from "react";
import { useNavigate } from "react-router-dom";

function PersonalGrowth() {
    const navigate = useNavigate();

    return (
        <div className="page-container">
            <button className="back-btn" onClick={() => navigate("/home")}>← Back</button>
            <h1 className="page-title">This is the Personal Growth page</h1>
            <p className="page-subtitle">Your goals and habits will be tracked here.</p>
        </div>
    );
}

export default PersonalGrowth;