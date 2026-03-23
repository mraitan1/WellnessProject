import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import './Styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <div className="orangeToBlue">
            <App />
        </div>
    </BrowserRouter>
)