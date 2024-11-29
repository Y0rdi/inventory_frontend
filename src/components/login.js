// src/components/Login.js
import React from 'react';
import '../styles/login.css';

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-left">
                <img src={`${process.env.PUBLIC_URL}/bbz logo.png`} alt="BBZ" className="logo" />
                <img src={`${process.env.PUBLIC_URL}/proma logo.png`} alt="PROMACIDOR " className="logo" />
                <p>BBZ FOODS MANUFACTURING S.C</p>
            </div>
            
            <div className="login-box">
                <h2>Login</h2>
                <form>
                    <input type="text" placeholder="User Name" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
