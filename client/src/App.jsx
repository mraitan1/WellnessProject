import { Routes, Route } from 'react-router-dom'
import Login from './Login.jsx'
import Signup from './SignUp.jsx'
import Home from './Home.jsx'
import DailyJournal from './DailyJournal.jsx'
import SleepJournal from './SleepJournal.jsx'
import WorkoutJournal from './WorkoutJournal.jsx'
import PersonalGrowth from './PersonalGrowth.jsx'
import Profile from './Profile.jsx'
import './assets/Styles.css'
import DailyJournalCalendar from './DailyJournalCalendar.jsx'
import SleepJournalCalendar from './SleepJournalCalendar.jsx'
import WorkoutJournalCalendar from './WorkoutJournalCalendar.jsx'
import {useEffect, useState} from "react";

function App() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
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
            <Route path='/journal/calendar' element={<DailyJournalCalendar />} />
            <Route path='/sleep/calendar' element={<SleepJournalCalendar />} />
            <Route path='/workout/calendar' element={<WorkoutJournalCalendar />} />
        </Routes>
    )
}

export default App;