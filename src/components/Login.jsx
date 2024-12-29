// import React, { useState } from "react";
// import "./../styles/UserRegistration.css"; 
// import image from "./../assets/dashboard.png"; 
// import axios from "axios";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [message, setMessage] = useState("");

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/login", {
//         email: formData.email,
//         password: formData.password,
//       });

//       // Handle successful login (e.g., save token to localStorage)
//       localStorage.setItem("token", response.data.token);
//       setMessage("Login successful!");
//       console.log("User Data:", response.data.user);

//       // Redirect to dashboard or another page
//       window.location.href = "/dashboard"; // Replace with your dashboard route
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="registration-container">
//       {/* Left Section */}
//       <div className="form-section">
//         <div className="logo">LOGO</div>
//         <h2>Login to Dashboard</h2>
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="email">Email Address</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />

//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />

//           <button type="submit" className="register-btn">
//             Login
//           </button>
//           <p>
//             Don't have an account? <a href="/">Register</a>
//           </p>
//         </form>
//         {message && <p className="message">{message}</p>}
//       </div>

//       {/* Right Section */}
//       <div className="image-section">
//         <img src={image} alt="Dashboard Illustration" />
//         <div className="text-overlay">
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
//         </div>
//         <div className="text-description">
//           Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
//           quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
//           consequat.
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./../styles/UserRegistration.css";
import image from "./../assets/dashboard.png";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("https://hrms-dasboard-backend.onrender.com/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", response.data.token);
      setMessage("Login successful!");
      console.log("User Data:", response.data.user);

      // Update authentication state
      onLogin();

      // Redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard"); // Use navigate for routing
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid credentials, try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="form-section">
        <div className="logo">LOGO</div>
        <h2>Login to Dashboard</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="register-btn" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <p>
            Don't have an account? <a href="/">Register</a>
          </p>
        </form>
        {message && <p className={`message ${message.includes("successful") ? "success" : "error"}`}>{message}</p>}
      </div>
      <div className="image-section">
        <img src={image} alt="Dashboard Illustration" />
        <div className="text-overlay">Secure your access with ease.</div>
        <div className="text-description">
          Welcome back! Log in to manage your account and explore the dashboard.
        </div>
      </div>
    </div>
  );
};

export default Login;
