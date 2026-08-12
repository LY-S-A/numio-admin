import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import StatCard from "../components/StatCard";
import SendMail from "../components/SendMail";

import {
    FaUsers,
    FaClipboardList,
    FaExchangeAlt,
    FaMoneyBillWave,
} from "react-icons/fa";

import "../styles/dashboard.css";

const API_URL = process.env.REACT_APP_API_URL;

const Dashboard = () => {
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalOrders: 0,
        totalTransactions: 0,
        totalRevenue: 0,

        trends: {
            users: 0,
            orders: 0,
            transactions: 0,
            revenue: 0,
        },
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                const token =
                    localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await axios.get(
                    `${API_URL}/api/admin/dashboard/stats`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );

                if (response.data.success) {
                    setStats(
                        response.data.stats
                    );
                }

            } catch (error) {
                console.error(
                    "Failed to fetch dashboard stats:",
                    error
                );

                if (
                    error.response?.status ===
                    401
                ) {
                    localStorage.removeItem(
                        "token"
                    );

                    localStorage.removeItem(
                        "user"
                    );

                    navigate("/login");
                }

            } finally {
                setLoading(false);
            }
        };

        fetchDashboardStats();
    }, [navigate]);

    const formatCurrency = (amount) => {
        return `₦${Number(amount || 0).toLocaleString(
            "en-NG",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }
        )}`;
    };

    const getTrendType = (value) => {
        return value >= 0
            ? "up"
            : "down";
    };

    const getTrendText = (value) => {
        const absoluteValue = Math.abs(value);

        return `${absoluteValue}% from last week`;
    };

    return (
        <div className="dashboard-page">

            <div className="stats-grid">

                {/* USERS */}
                <StatCard
                    icon={<FaUsers />}
                    title="Total Users"
                    value={
                        loading
                            ? "..."
                            : stats.totalUsers
                    }
                    color="purple"
                    trend={getTrendType(
                        stats.trends.users
                    )}
                    trendText={getTrendText(
                        stats.trends.users
                    )}
                />

                {/* ORDERS */}
                <StatCard
                    icon={
                        <FaClipboardList />
                    }
                    title="Total Orders"
                    value={
                        loading
                            ? "..."
                            : stats.totalOrders
                    }
                    color="green"
                    trend={getTrendType(
                        stats.trends.orders
                    )}
                    trendText={getTrendText(
                        stats.trends.orders
                    )}
                />

                {/* TRANSACTIONS */}
                <StatCard
                    icon={
                        <FaExchangeAlt />
                    }
                    title="Total Transactions"
                    value={
                        loading
                            ? "..."
                            : stats.totalTransactions
                    }
                    color="orange"
                    trend={getTrendType(
                        stats.trends.transactions
                    )}
                    trendText={getTrendText(
                        stats.trends.transactions
                    )}
                />

                {/* REVENUE */}
                <StatCard
                    icon={
                        <FaMoneyBillWave />
                    }
                    title="Total Revenue"
                    value={
                        loading
                            ? "..."
                            : formatCurrency(
                                stats.totalRevenue
                            )
                    }
                    color="blue"
                    trend={getTrendType(
                        stats.trends.revenue
                    )}
                    trendText={getTrendText(
                        stats.trends.revenue
                    )}
                />

            </div>

            <SendMail />

        </div>
    );
};

export default Dashboard;
