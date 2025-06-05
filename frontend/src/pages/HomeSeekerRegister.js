import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeSeekerRegister.css";
import logo from "../images/logo_1.png";
import { Hammer, Home, Eye, EyeOff } from "lucide-react";

function HomeSeekerRegister() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    let error = "";

    if ((name === "firstName" || name === "lastName") && !/^[A-Za-z\s]*$/.test(value)) {
      error = "Only letters and spaces are allowed.";
    }

    if (name === "username" && !/^[A-Za-z0-9]{3,16}$/.test(value)) {
      error = "Username must be 3-16 characters and contain only letters and numbers.";
    }

    if (name === "password" && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/.test(value)) {
      error = "Password must be 8-16 characters, including uppercase, lowercase, number, and special character.";
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...formData, role: "homeSeeker" });
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;

    if (strength <= 2) return "Weak";
    if (strength === 3) return "Moderate";
    return "Strong";
  };

  return (
    <div className="seeker-page">
      <div className="form-box">
        <div className="logo"><img src={logo} alt="Logo" /></div>
        <h1 className="heading">Join <span>Ubuntu</span>Homes</h1>
        <p className="subheading">Create your account and start looking for homes</p>

        <div className="toggle-tabs">
          <button className="tab inactive" onClick={() => navigate("/builder-register")}>
            <Hammer size={16} />
            <span>Builder</span>
          </button>
          <button className="tab active">
            <Home size={16} />
            <span>Home Seeker</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="row">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" name="firstName" onChange={handleChange} value={formData.firstName} />
              {errors.firstName && <p className="error-message">{errors.firstName}</p>}
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" name="lastName" onChange={handleChange} value={formData.lastName} />
              {errors.lastName && <p className="error-message">{errors.lastName}</p>}
            </div>
          </div>

          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" onChange={handleChange} value={formData.username} />
            {errors.username && <p className="error-message">{errors.username}</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((p) => !p)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formData.password && (
              <div className={`password-strength ${getPasswordStrength(formData.password).toLowerCase()}`}>
                Strength: {getPasswordStrength(formData.password)}
              </div>
            )}
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          <button type="submit" className="submit-btn">Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default HomeSeekerRegister;