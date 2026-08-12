import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import logoDark from "../assets/logo-dark.png";
import logoLight from "../assets/logo-light.png";

import {
    FaChartPie,
    FaUsers,
    FaMobileAlt,
    FaExchangeAlt,
    FaCog,
    FaHeadset,
    FaUserShield,
    FaChevronDown,
    FaSignOutAlt,
} from "react-icons/fa";

import "../styles/sidebar.css";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);

    const isLightTheme =
        document.body.classList.contains("light-theme");

    const admin = JSON.parse(
        localStorage.getItem("admin") || "{}"
    );

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");

        navigate("/");
    };

    const closeSidebar = () => {
        if (window.innerWidth <= 768) {
            setSidebarOpen(false);
        }
    };

    return (
        <>
            {sidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`sidebar ${
                    sidebarOpen ? "sidebar-open" : ""
                }`}
            >
                {/* Logo */}

                <div className="sidebar-logo">
                    <img
                        src={isLightTheme ? logoLight : logoDark}
                        alt="Numio"
                        className="logo-image"
                    />
                </div>

                {/* Navigation */}

                <nav>

                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? "menu-item active"
                                : "menu-item"
                        }
                        onClick={closeSidebar}
                    >
                        <FaChartPie />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/users"
                        className={({ isActive }) =>
                            isActive
                                ? "menu-item active"
                                : "menu-item"
                        }
                        onClick={closeSidebar}
                    >
                        <FaUsers />
                        Users
                    </NavLink>

                    <NavLink
                        to="/orders"
                        className={({ isActive }) =>
                            isActive
                                ? "menu-item active"
                                : "menu-item"
                        }
                        onClick={closeSidebar}
                    >
                        <FaMobileAlt />
                        Orders
                    </NavLink>

                    <NavLink
                        to="/transactions"
                        className={({ isActive }) =>
                            isActive
                                ? "menu-item active"
                                : "menu-item"
                        }
                        onClick={closeSidebar}
                    >
                        <FaExchangeAlt />
                        Transactions
                    </NavLink>

                    <NavLink
                        to="/pricing"
                        className={({ isActive }) =>
                            isActive
                                ? "menu-item active"
                                : "menu-item"
                        }
                        onClick={closeSidebar}
                    >
                        <FaCog />
                        Pricing
                    </NavLink>

                    <NavLink
                        to="/support"
                        className={({ isActive }) =>
                            isActive
                                ? "menu-item active"
                                : "menu-item"
                        }
                        onClick={closeSidebar}
                    >
                        <FaHeadset />
                        Support
                    </NavLink>

                </nav>

                {/* Admin Section */}

                <div className="sidebar-user">

                    <div className="user-info">

                        <div className="user-avatar">
                            <FaUserShield />
                        </div>

                        <div className="user-detail">
                            <div className="user-name">
                                {admin.name || "Super Admin"}
                            </div>

                            <p>
                                {admin.email ||
                                    "admin@numioverify.store"}
                            </p>
                        </div>

                        <button
                            className="user-settings"
                            onClick={() =>
                                setShowMenu(!showMenu)
                            }
                        >
                            <FaChevronDown
                                className={
                                    showMenu
                                        ? "chevron-open"
                                        : ""
                                }
                            />
                        </button>

                    </div>

                    {showMenu && (
                        <div className="account-menu">

                            <button
                                className="account-item"
                                onClick={() => {
                                    navigate("/pricing");
                                    closeSidebar();
                                }}
                            >
                                <FaCog />
                                Settings
                            </button>

                            <button
                                className="account-item signout"
                                onClick={handleLogout}
                            >
                                <FaSignOutAlt />
                                Logout
                            </button>

                        </div>
                    )}

                </div>

            </aside>
        </>
    );
};

export default Sidebar;
