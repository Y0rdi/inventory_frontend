import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, setUser } from '../redux/slices/authSlice'; // Dispatch login action
import { useNavigate } from 'react-router-dom'; // Use navigate for redirection
import '../styles/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Used for navigation
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error message
  
    try {
      // Dispatch the login action and await the response
      const action = await dispatch(loginUser({ username, password }));
  
      if (action.type === 'auth/loginUser/fulfilled') {
        const { user, token } = action.payload;
  
        // Dispatch setUser to update Redux state with user data and token
        dispatch(setUser({ user, token }));
  
        // Redirect based on the role if the password has been updated
        switch (user.role) {
          case 'Admin':
            navigate('/admin');
            break;
          case 'Procurement Officer':
            navigate('/procurement-officer');
            break;
          case 'quality-inspector':
            navigate('/quality-inspector');
            break;
          case 'warehouse':
            navigate('/warehouse');
            break;
          case 'Inventory Manager':
            navigate('/inventory-manager');
            break;
          default:
            navigate('/dashboard');
        }
      } else if (action.type === 'auth/loginUser/rejected') { // Corrected 'else if' condition
        setErrorMessage(action.payload || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Unexpected error occurred. Please try again later.');
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={`${process.env.PUBLIC_URL}/bbz logo.png`} alt="BBZ" className="logo" />
        <img src={`${process.env.PUBLIC_URL}/proma logo.png`} alt="PROMACIDOR" className="logo" />
        <p>BBZ FOODS MANUFACTURING S.C</p>
      </div>

      <div className="login-box">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
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
