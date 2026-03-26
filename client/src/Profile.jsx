import React from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();

    return (
        <div className="page-container">
            <button className="back-btn" onClick={() => navigate("/home")}>← Back</button>
            <h1 className="page-title">This is the Profile page</h1>
            <p className="page-subtitle">View and edit your profile information here.</p>
        </div>
    );
}

export default Profile;