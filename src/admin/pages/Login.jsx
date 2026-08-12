// import {
//   FiMail,
//   FiLock,
// } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { useTheme } from "../context/ThemeContext";

// import logoFavicon from "../assets/logo-favicon.png";
// import logoLightText from "../assets/logo-light-text.png";
// import logoDarkText from "../assets/logo-dark-text.png";

// import "../styles/auth.css";

// export default function Login() {
//   const { darkMode } = useTheme();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // TODO: Add your admin authentication logic here

//     navigate("/");
//   };

//   return (
//     <div className="auth-page">
//       {/* Background Glow */}
//       <div className="auth-glow auth-glow-1"></div>
//       <div className="auth-glow auth-glow-2"></div>

//       {/* Auth Card */}
//       <div className="auth-card">
//         {/* Logo */}
//         <div className="auth-logo">
//           <div className="logo-icon">
//             <img
//               src={logoFavicon}
//               alt="Numio Logo"
//             />
//           </div>

//           <div className="logo-text">
//             <img
//               src={
//                 darkMode
//                   ? logoDarkText
//                   : logoLightText
//               }
//               alt="Numio"
//             />

//             <p>Administration Portal</p>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="auth-content">
//           <h2>Admin Login</h2>

//           <p className="auth-subtitle">
//             Sign in to access the Numio Admin Dashboard and manage users,
//             services, orders, transactions, announcements, and platform
//             settings.
//           </p>

//           <form onSubmit={handleSubmit}>
//             {/* Email */}
//             <div className="form-group">
//               <label>Email Address</label>

//               <div className="input-wrapper">
//                 <FiMail />

//                 <input
//                   type="email"
//                   placeholder="admin@numio.com"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div className="form-group">
//               <label>Password</label>

//               <div className="input-wrapper">
//                 <FiLock />

//                 <input
//                   type="password"
//                   placeholder="Enter your password"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Remember Me */}
//             <div className="form-row">
//               <label className="remember-me">
//                 <input type="checkbox" />
//                 Remember me
//               </label>

//               <a href="/admin/forgot-password">
//                 Forgot Password?
//               </a>
//             </div>

//             {/* Login Button */}
//             <button
//               type="submit"
//               className="auth-btn"
//             >
//               Sign In
//             </button>
//           </form>

//           {/* Footer */}
//           <p className="auth-footer">
//             Authorized administrators only.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

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
            const response = await axios.post(
                `${API_URL}/api/auth/login`,
                {
                    email,
                    password,
                }
            );

            const data = response.data;

            if (!data.success) {
                throw new Error(
                    data.message || "Login failed"
                );
            }

            /*
            ========================================
            CHECK ADMIN ROLE
            ========================================
            */

            if (data.user?.role !== "admin") {
                setError("Admin access denied.");
                return;
            }

            /*
            ========================================
            SAVE AUTH DATA
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
            GO TO ADMIN DASHBOARD
            ========================================
            */

            navigate("/");

        } catch (err) {
            console.error(
                "Admin login error:",
                err
            );

            setError(
                err.response?.data?.message ||
                err.message ||
                "Invalid email or password"
            );
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
                        <div className="auth-error">
                            <FiAlertCircle />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        {/* Email */}
                        <div className="form-group">

                            <label>
                                Email Address
                            </label>

                            <div className="input-wrapper">

                                <FiMail />

                                <input
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

                            <label>
                                Password
                            </label>

                            <div className="input-wrapper">

                                <FiLock />

                                <input
                                    type="password"
                                    placeholder="Enter your password"
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
                            disabled={loading}
                        >

                            {loading ? (
                                <>
                                    <FiLoader className="spin" />
                                    Signing In...
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
