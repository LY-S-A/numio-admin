import StatCard from "../components/StatCard";
import SendMail from "../components/SendMail";

import {
    FaUsers,
    FaClipboardList,
    FaExchangeAlt,
    FaMoneyBillWave,
} from "react-icons/fa";

import "../styles/dashboard.css";

const Dashboard = () => {
    return (
        <div className="dashboard-page">
            <div className="stats-grid">
                <StatCard
                    icon={<FaUsers />}
                    title="Total Users"
                    value="12"
                    color="purple"
                    trend="up"
                    trendText="12.5% from last week"
                />

                <StatCard
                    icon={<FaClipboardList />}
                    title="Total Orders"
                    value="48"
                    color="green"
                    trend="up"
                    trendText="8.3% from last week"
                />

                <StatCard
                    icon={<FaExchangeAlt />}
                    title="Total Transactions"
                    value="₦5,152.35"
                    color="orange"
                    trend="down"
                    trendText="10% from last week"
                />

                <StatCard
                    icon={<FaMoneyBillWave />}
                    title="Total Revenue"
                    value="₦1,250,000.00"
                    color="blue"
                    trend="up"
                    trendText="15.8% from last week"
                />
            </div>
            <SendMail />
        </div>
    );
};

export default Dashboard;