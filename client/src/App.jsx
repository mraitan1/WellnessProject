import { Routes, Route } from 'react-router-dom'
import Login from './Login.jsx'
import Signup from './SignUp.jsx'
import Home from './Home.jsx'
import DailyJournal from './DailyJournal.jsx'
import SleepJournal from './SleepJournal.jsx'
import WorkoutJournal from './WorkoutJournal.jsx'
import PersonalGrowth from './PersonalGrowth.jsx'
import Profile from './Profile.jsx'
import themes from './Themes.jsx'
import {useEffect, useState} from "react";

function App() {
    const [theme, setTheme] = useState("light");

    function applyTheme(themeName) {
        const existing = document.getElementById("theme-stylesheet");

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.id = "theme-stylesheet-new";
        link.href = `../public/CSS Themes/${themeName}.css`;

        link.onload = () => {
            if (existing) existing.remove();
            link.id = "theme-stylesheet";
        };

        document.head.appendChild(link);
    }

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/home' element={<Home />} />
            <Route path='/journal' element={<DailyJournal />} />
            <Route path='/sleep' element={<SleepJournal />} />
            <Route path='/workout' element={<WorkoutJournal />} />
            <Route path='/growth' element={<PersonalGrowth />} />
            <Route path='/profile' element={<Profile setTheme={setTheme} theme={theme} />} />
        </Routes>
    )
}

export default App;