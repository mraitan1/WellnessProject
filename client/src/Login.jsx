import React, { useState } from "react";
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import DayByDayLogo from "./assets/DayByDay.svg";

function Login() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/login", { email, password })
            .then(result => {
                console.log(result)
                if(result.data === "Successful login"){
                    navigate("/home")
                }else{
                    navigate("/signup")
                    alert("This account is not registered")

                }

            })
            .catch(err => console.log(err))
    }


    return (
        <div className="flex-container">
            <div className="flex-child">
                <img src={DayByDayLogo} alt="Day By Day Lettering" className={"logo-img"}></img>
            </div>
            <div className="flex-child" id='divTrans'>
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleSubmit}>
                    <label className="login-label">Email:</label>
                        <input type="text"
                           placeholder='Enter Email'
                           autoComplete='off'
                           name='email'
                           className='login-input'
                           onChange={(e) => setEmail(e.target.value)}
                           required
                        />
                    <label className="login-label">Password:</label>
                        <input type="password"
                           placeholder='Enter Password'
                           name='password'
                           className='login-input'
                           onChange={(e) => setPassword(e.target.value)}
                           required
                        />
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <div className="login-footer">
                    <p>Don't have an account? <Link to="/signup" className="login-link">Sign up</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;