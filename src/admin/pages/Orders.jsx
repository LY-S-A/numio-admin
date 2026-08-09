import React from "react"; 
import { FiSearch } from "react-icons/fi";

import StatCard from "../components/StatCard";
import OrdersTable from "../components/OrdersTable";

import {
    FaClipboardList,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
} from "react-icons/fa";

import "../styles/users.css";

const Orders = () => {
    return (
        <div className="users-page">

            {/* =========================
                STATS
            ========================= */}

            <div className="stats-grid">

                <StatCard
                    icon={<FaClipboardList />}
                    title="Total Orders"
                    value="3,842"
                    trend="up"
                    trendText="14.8% from last month"
                    color="purple"
                />

                <StatCard
                    icon={<FaCheckCircle />}
                    title="Completed Orders"
                    value="3,214"
                    trend="up"
                    trendText="83.7% completion rate"
                    color="green"
                />

                <StatCard
                    icon={<FaClock />}
                    title="Active Orders"
                    value="186"
                    trend="up"
                    trendText="4.8% of total orders"
                    color="orange"
                />

                <StatCard
                    icon={<FaTimesCircle />}
                    title="Cancelled Orders"
                    value="442"
                    trend="down"
                    trendText="11.5% of total orders"
                    color="red"
                />

            </div>


            {/* =========================
                FILTERS
            ========================= */}

            <div className="users-toolbar">

                {/* Search */}

                <div className="users-search">

                    <FiSearch />

                    <input
                        type="text"
                        placeholder="Search by order ID, username or email..."
                    />

                </div>


                {/* Filters */}

                <div className="users-filters">

                    <div className="select-wrapper">

                        <select>
                            <option>All Status</option>
                            <option>Finished</option>
                            <option>Expired</option>
                            <option>Cancelled</option>
                        </select>

                    </div>


                    <div className="select-wrapper">

                        <select>
                            <option>All Services</option>
                            <option>WhatsApp</option>
                            <option>Telegram</option>
                            <option>Instagram</option>
                            <option>Facebook</option>
                            <option>TikTok</option>
                        </select>

                    </div>


                    <div className="select-wrapper">

                        <select>
                            <option>Sort By</option>
                            <option>Newest</option>
                            <option>Oldest</option>
                            <option>Highest Price</option>
                            <option>Lowest Price</option>
                        </select>

                    </div>

                </div>

            </div>


            {/* =========================
                ORDERS TABLE
            ========================= */}

            <OrdersTable />

        </div>
    );
};

export default Orders;

