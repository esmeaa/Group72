import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import HouseLogo from "../images/house_1.png";

const EXPRESS_SERVER_URL = "http://localhost:3000";

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.username)) {
      newErrors.username = "Username is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch(EXPRESS_SERVER_URL + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: formData.username,
          user_password: formData.password,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        alert("Login failed: " + errorText);
        return;
      }

      const data = await res.json();
      if (data.login === "success") {
        localStorage.setItem("user_name", formData.username);
        navigate("/ProfilePage");
      }
    } catch (error) {
      alert("An error occurred during login.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="logo">
          <img src={houseLogo} alt="House logo" />
        </div>
        <h1 className="welcome-heading">Welcome Back</h1>
        <p className="subtitle">Sign in to your UbuntuHomes account</p>

        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username</label>
          <input
            type="email"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className={errors.username ? "error" : ""}
          />
          {errors.username && <p className="error-message">{errors.username}</p>}

          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={errors.password ? "error" : ""}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}

          <button type="submit" className="submit-button">
            Sign In
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account? <a href="#">Sign up here</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

