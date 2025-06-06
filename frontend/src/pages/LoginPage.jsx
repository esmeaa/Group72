import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./LoginPage.module.css";
import logo from "../images/house_1.png";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Login logic here...
    console.log("Logging in with:", formData);
    navigate("/dashboard");
  };

  return (
    <div className={styles.login_page}>
      <div className={styles.login_card}>
        <img src={logo} alt="logo" className={styles.login_logo} />
        <h2 className={styles.login_heading}>Welcome Back</h2>
        <p className={styles.login_subheading}>Sign in to your UbuntuHomes account</p>

        <form className={styles.login_form} onSubmit={handleLogin}>
          <div className={styles.form_group}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? "error" : null}
              autoComplete="username"
            />
            {errors.username && <span className={styles.error_message}>{errors.username}</span>}
          </div>

          <div className={styles.form_group}>
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? `${styles.error}` : null}
              autoComplete="current-password"
            />
            {errors.password && <span className={styles.error_message}>{errors.password}</span>}
          </div>

          <button type="submit" className={styles.submit_button}>Sign In</button>
        </form>

        <div className={styles.register_redirect}>
          Don’t have an account?{" "}
          <Link to="/builder-register" className={styles.link}>Sign up here</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
