import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/UserRegistration.css";
import image from "./../assets/dashboard.png"; 
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
 
  const navigate = useNavigate(); 


 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("https://hrms-dasboard-backend.onrender.com/api/auth/register", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword, 
      });

      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login"); 
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
      console.error("Error Response:", error.response);
    }
  };
  return (
    <div className="registration-container">
      {/* Left Section */}
      <div className="form-section">
        <div className="logo">LOGO</div>
        <h2>Welcome to Dashboard</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="full-name">Full name</label>
          <input
            type="text"
            id="full-name"
            name="fullName"
            placeholder="Full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
         

          <label htmlFor="confirm-password">Confirm Password</label>
          <input
             type="password"
            id="confirm-password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="register-btn">
            Register
          </button>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
        {message && <p className="message">{message}</p>}
      </div>

      {/* Right Section */}
      <div className="image-section">
        <img src={image} alt="Dashboard Illustration" />
        <div className="text-overlay">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
        </div>
        <div className="text-description">
          Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;