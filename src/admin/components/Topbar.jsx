import {
  FaBell,
  FaBars,
  FaBullhorn,
} from "react-icons/fa";

import "../styles/topbar.css";

const Topbar = ({ setSidebarOpen }) => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="hamburger"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars />
        </button>

        <div className="welcome-text">
          <h1>Hi Admin 👋</h1>
        </div>
      </div>

      <div className="topbar-center">

      </div>

      <div className="topbar-right">
        <div className="online-status">
          <span className="online-dot"></span>
          <span>Online</span>
        </div>

        <button className="announcement-btn">
          <FaBullhorn />
        </button>

        <FaBell className="top-icon" />

      </div>
    </header>
  );
};

export default Topbar;