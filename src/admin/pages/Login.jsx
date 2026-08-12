import { useState } from "react";
import axios from "axios";

import {
    FiMail,
    FiLock,
    FiAlertCircle,
    FiLoader,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import logoFavicon from "../assets/logo-favicon.png";
import logoLightText from "../assets/logo-light-text.png";
import logoDarkText from "../assets/logo-dark-text.png";

import "../styles/auth.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function Login() {
    const { darkMode } = useTheme();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            /*
            ========================================
            VALIDATE API URL
            ========================================
            */

            if (!API_URL) {
                throw new Error(
                    "API URL is not configured."
                );
            }

            /*
            ========================================
            CLEAR OLD AUTH DATA
            ========================================
            */

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            /*
            ========================================
            ADMIN LOGIN
            ========================================
            */

            const response = await axios.post(
                `${API_URL}/api/admin/login`,
                {
                    email: email.trim(),
                    password,
                }
            );

            const data = response.data;

            /*
            ========================================
            CHECK RESPONSE
            ========================================
            */

            if (!data.success) {
                throw new Error(
                    data.message ||
                    "Admin login failed"
                );
            }

            /*
            ========================================
            CHECK ADMIN ROLE
            ========================================
            */

            if (
                !data.user ||
                data.user.role !== "admin"
            ) {
                throw new Error(
                    "Admin access denied."
                );
            }

            /*
            ========================================
            CHECK TOKEN
            ========================================
            */

            if (!data.token) {
                throw new Error(
                    "Authentication token was not returned."
                );
            }

            /*
            ========================================
            SAVE ADMIN SESSION
            ========================================
            */

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            /*
            ========================================
            OPTIONAL: SAVE LOGIN TYPE
            ========================================
            */

            localStorage.setItem(
                "authType",
                "admin"
            );

            /*
            ========================================
            REDIRECT
            ========================================
            */

            navigate("/");

        } catch (err) {
            console.error(
                "Admin login error:",
                err
            );

            /*
            ========================================
            CLEAR INVALID AUTH DATA
            ========================================
            */

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            /*
            ========================================
            ERROR MESSAGE
            ========================================
            */

            if (err.response?.status === 401) {
                setError(
                    err.response?.data?.message ||
                    "Invalid admin email or password."
                );
            } else if (
                err.response?.status === 403
            ) {
                setError(
                    err.response?.data?.message ||
                    "Admin access denied."
                );
            } else {
                setError(
                    err.response?.data?.message ||
                    err.message ||
                    "Unable to sign in. Please try again."
                );
            }

        } finally {
            setLoading(false);
        }
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

                        <p>
                            Administration Portal
                        </p>

                    </div>

                </div>

                {/* Content */}
                <div className="auth-content">

                    <h2>
                        Admin Login
                    </h2>

                    <p className="auth-subtitle">
                        Sign in to access the Numio Admin
                        Dashboard and manage users,
                        services, orders, transactions,
                        announcements, and platform
                        settings.
                    </p>

                    {/* Error */}
                    {error && (
                        <div
                            className="auth-error"
                            role="alert"
                        >
                            <FiAlertCircle />

                            <span>
                                {error}
                            </span>
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                    >

                        {/* Email */}
                        <div className="form-group">

                            <label htmlFor="admin-email">
                                Email Address
                            </label>

                            <div className="input-wrapper">

                                <FiMail />

                                <input
                                    id="admin-email"
                                    type="email"
                                    placeholder="admin@numio.com"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(
                                            e.target.value
                                        )
                                    }
                                    required
                                    disabled={loading}
                                    autoComplete="email"
                                />

                            </div>

                        </div>

                        {/* Password */}
                        <div className="form-group">

                            <label htmlFor="admin-password">
                                Password
                            </label>

                            <div className="input-wrapper">

                                <FiLock />

                                <input
                                    id="admin-password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(
                                            e.target.value
                                        )
                                    }
                                    required
                                    disabled={loading}
                                    autoComplete="current-password"
                                />

                            </div>

                        </div>

                        {/* Remember Me */}
                        <div className="form-row">

                            <label className="remember-me">

                                <input
                                    type="checkbox"
                                    disabled={loading}
                                />

                                <span>
                                    Remember me
                                </span>

                            </label>

                            <a href="/admin/forgot-password">
                                Forgot Password?
                            </a>

                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="auth-btn"
                            disabled={
                                loading ||
                                !email.trim() ||
                                !password
                            }
                        >

                            {loading ? (
                                <>
                                    <FiLoader className="spin" />

                                    <span>
                                        Signing In...
                                    </span>
                                </>
                            ) : (
                                "Sign In"
                            )}

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
