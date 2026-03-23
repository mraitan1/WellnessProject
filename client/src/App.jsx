import {Routes, Route} from 'react-router-dom'
import Signup from './SignUp.jsx'
import Login from './Login.jsx'
import Home from './Home.jsx'
import {Activity} from "react";

function App() {

    return (
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/home' element={<Home />}/>
        </Routes>
    )
}

export default App;