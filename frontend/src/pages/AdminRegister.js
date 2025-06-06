import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminRegister.css";
import logo from "../images/logo_1.png";
import { Eye, EyeOff } from "lucide-react";

function AdminRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate(); 

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

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log({ ...formData, role: "admin" });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optionally: validate here before submitting, return if errors

    console.log("Submitting form data:", { ...formData, role: "admin" });

    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, role: "admin" }),
      });

      const data = await response.json();

      console.log("Response from server:", data);

      if (response.ok) {
        alert("Account created successfully!");
        navigate("/login"); // or wherever you want to redirect
      } else {
        alert(data.message || "Admin Registration failed");
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
      alert("An error occurred. Please try again.");
    }
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
    <div className="admin-page">
      <div className="form-box">
        <div className="logo"><img src={logo} alt="Logo" /></div>
        <h1 className="heading">Admin <span>Registration</span></h1>
        <p className="subheading">Create an administrator account</p>

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

          <button type="submit" className="submit-btn">Create Admin</button>
        </form>
      </div>
    </div>
  );
}

export default AdminRegister;