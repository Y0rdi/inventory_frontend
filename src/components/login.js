import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice'; // Dispatch login action
import { setUser } from '../redux/slices/authSlice'; // Dispatch set user action
import '../styles/login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const action = await dispatch(loginUser({ username, password }));
            if (action.type === 'auth/loginUser/fulfilled') {
                // On successful login, dispatch setUser with the user data
                const user = action.payload; // Assume the user data is returned in the response
                dispatch(setUser(user));
                // Redirect to the user's role-based page (can be handled using React Router)
                window.location.href = `/dashboard/${user.role}`;
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <img src={`${process.env.PUBLIC_URL}/bbz logo.png`} alt="BBZ" className="logo" />
                <img src={`${process.env.PUBLIC_URL}/proma logo.png`} alt="PROMACIDOR " className="logo" />
                <p>BBZ FOODS MANUFACTURING S.C</p>
            </div>

            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="User Name"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
