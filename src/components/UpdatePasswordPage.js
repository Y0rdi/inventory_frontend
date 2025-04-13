import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, resetMessages } from "../redux/slices/updatePasswordSlice";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Import JWT decoder
import '../styles/updatepassword.css'; // Import your updated styles

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    newpassword: "",
  });

  const dispatch = useDispatch();
  const { loading, successMessage, errorMessage } = useSelector(
    (state) => state.updatePassword || {}
  );

  const navigate = useNavigate();

  // Extract userID from the token
  const token = localStorage.getItem("token");
  let userID = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token); // Decode the token to get user info
      userID = decodedToken.userID; // Assuming the token contains userID
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { newpassword } = formData;
    if (userID && newpassword) {
      // Dispatch the updatePassword action with userID and newpassword
      dispatch(updatePassword({ userID, newpassword })).then(() => {
        // After success, clear the token and redirect to login
        localStorage.removeItem("token"); // Remove the token
        navigate("/login"); // Redirect to login
      });
    }
  };

  // Reset success or error message
  const handleReset = () => {
    dispatch(resetMessages());
  };

  useEffect(() => {
    // If success message appears, reset messages after a delay
    if (successMessage) {
      setTimeout(() => {
        dispatch(resetMessages());
      }, 3000);
    }
  }, [successMessage, dispatch]);

  return (
    <div className="update-password-container">
      <div className="update-password-left">
        <img src={`${process.env.PUBLIC_URL}/bbz logo.png`} alt="BBZ" className="logo" />
        <img src={`${process.env.PUBLIC_URL}/proma logo.png`} alt="PROMACIDOR" className="logo" />
        <p>BBZ FOODS MANUFACTURING S.C</p>
      </div>

      <div className="update-password-box">
        <h2>Update Password</h2>
        {successMessage && (
          <p className="success-message">
            {successMessage} <button onClick={handleReset}>Clear</button>
          </p>
        )}
        {errorMessage && (
          <p className="error-message">
            {errorMessage} <button onClick={handleReset}>Clear</button>
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="newpassword"
            placeholder="New Password"
            value={formData.newpassword}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
