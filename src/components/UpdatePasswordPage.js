import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct import
import { updatePassword, resetPasswordState } from '../redux/slices/passwordSlice';
import { message } from 'antd';
import '../styles/login.css';

const UpdatePasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const { loading, success, error } = useSelector((state) => state.password);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let userID; // Declare userID

  // Retrieve and decode the token
  const token = localStorage.getItem('token'); // Get the token from localStorage
  if (token) {
    try {
      const decoded = jwtDecode(token); // Correct usage of jwtDecode
      userID = decoded?.userID; // Use userID instead of userId as returned by the API
    } catch (err) {
      console.error('Error decoding token:', err);
      message.error('Invalid token. Please log in again.');
    }
  }

  useEffect(() => {
    if (success) {
      message.success('Password updated successfully');
      dispatch(resetPasswordState());
      navigate('/login');
    }
    if (error) {
      message.error(error);
    }
  }, [success, error, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userID) {
      message.error('User ID not found. Please log in again.');
      return;
    }

    dispatch(updatePassword({ userID, newPassword }));
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={`${process.env.PUBLIC_URL}/bbz logo.png`} alt="BBZ" className="logo" />
        <img src={`${process.env.PUBLIC_URL}/proma logo.png`} alt="PROMACIDOR" className="logo" />
        <p>BBZ FOODS MANUFACTURING S.C</p>
      </div>

      <div className="login-box">
        <h2>Update Your Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
