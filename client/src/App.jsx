import { Routes, Route } from 'react-router-dom'
import Login from './Login.jsx'
import Signup from './SignUp.jsx'
import Home from './Home.jsx'
import DailyJournal from './DailyJournal.jsx'
import SleepJournal from './SleepJournal.jsx'
import WorkoutJournal from './WorkoutJournal.jsx'
import PersonalGrowth from './PersonalGrowth.jsx'
import Profile from './Profile.jsx'

function App() {
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
            <Route path='/profile' element={<Profile />} />
        </Routes>
    )
}

export default App;