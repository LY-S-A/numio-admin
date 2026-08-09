import {
  FiMail,
  FiLock,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import logoFavicon from "../assets/logo-favicon.png";
import logoLightText from "../assets/logo-light-text.png";
import logoDarkText from "../assets/logo-dark-text.png";

import "../styles/auth.css";

export default function Login() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Add your admin authentication logic here

    navigate("/");
  };

  return (
    <div className="auth-page">
      {/* Background Glow */}
      <div className="auth-glow auth-glow-1"></div>
      <div className="auth-glow auth-glow-2"></div>

      {/* Auth Card */}
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <div className="logo-icon">
            <img
              src={logoFavicon}
              alt="Numio Logo"
            />
          </div>

          <div className="logo-text">
            <img
              src={
                darkMode
                  ? logoDarkText
                  : logoLightText
              }
              alt="Numio"
            />

            <p>Administration Portal</p>
          </div>
        </div>

        {/* Content */}
        <div className="auth-content">
          <h2>Admin Login</h2>

          <p className="auth-subtitle">
            Sign in to access the Numio Admin Dashboard and manage users,
            services, orders, transactions, announcements, and platform
            settings.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-group">
              <label>Email Address</label>

              <div className="input-wrapper">
                <FiMail />

                <input
                  type="email"
                  placeholder="admin@numio.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label>Password</label>

              <div className="input-wrapper">
                <FiLock />

                <input
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="form-row">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>

              <a href="/admin/forgot-password">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="auth-btn"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <p className="auth-footer">
            Authorized administrators only.
          </p>
        </div>
      </div>
    </div>
  );
}