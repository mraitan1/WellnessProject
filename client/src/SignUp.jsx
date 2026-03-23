import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import DayByDayLogo from "./assets/DayByDay.svg";

function Signup() {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/signup", { name, email, password })
            .then(result => {console.log(result)
                if (result.data === "Success") {
                    navigate("/home")
                }else{
                    navigate("/signup")
                    alert("Signup failed, please review information")
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
                    <h2 className="login-title"><center>Sign Up</center></h2>

                    <form onSubmit={handleSubmit}>
                        <div className="login-label">
                            <label htmlFor="email">
                                <strong>Name: </strong>
                            </label>
                            <input type="text"
                                   placeholder='Enter Name'
                                   autoComplete='off'
                                   name='email'
                                   className='login-input'
                                   onChange={(e) => setName(e.target.value)}
                                   required
                            />
                        </div>
                        <div className="login-label">
                            <label htmlFor="email">
                                <strong>Email: </strong>
                            </label>
                            <input type="text"
                                   placeholder='Enter Email'
                                   autoComplete='off'
                                   name='email'
                                   className='login-input'
                                   onChange={(e) => setEmail(e.target.value)}
                                   required
                            />
                        </div>
                        <div className="login-label">
                            <label htmlFor="email">
                                <strong>Password: </strong>
                            </label>
                            <input type="password"
                                   placeholder='Enter Password'
                                   name='password'
                                   className='login-input'
                                   onChange={(e) => setPassword(e.target.value)}
                                   required
                            />
                        </div>
                        <button type="submit" className="login-btn">
                            Sign Up
                        </button>
                    </form>
                    <div className='login-footer'>
                        <p>Already have an account? <Link to="/login" className="login-link"> Login</Link></p>
                    </div>
            </div>
        </div>
    );
}

export default Signup;