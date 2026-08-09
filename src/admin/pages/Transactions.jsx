import React from "react";
import { FiSearch } from "react-icons/fi";

import StatCard from "../components/StatCard";
import TransactionsTable from "../components/TransactionsTable";

import {
    FaExchangeAlt,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
} from "react-icons/fa";

import "../styles/users.css";

const Transactions = () => {
    return (
        <div className="users-page">

            {/* =========================
                STATS
            ========================= */}

            <div className="stats-grid">

                <StatCard
                    icon={<FaExchangeAlt />}
                    title="Total Transactions"
                    value="8,426"
                    trend="up"
                    trendText="16.4% from last month"
                    color="purple"
                />

                <StatCard
                    icon={<FaCheckCircle />}
                    title="Successful"
                    value="7,684"
                    trend="up"
                    trendText="91.2% success rate"
                    color="green"
                />

                <StatCard
                    icon={<FaClock />}
                    title="Pending"
                    value="184"
                    trend="up"
                    trendText="2.2% of transactions"
                    color="orange"
                />

                <StatCard
                    icon={<FaTimesCircle />}
                    title="Failed"
                    value="558"
                    trend="down"
                    trendText="6.6% of transactions"
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
                        placeholder="Search by reference, username or email..."
                    />

                </div>


                {/* Filters */}

                <div className="users-filters">

                    {/* Status */}

                    <div className="select-wrapper">

                        <select>
                            <option>All Status</option>
                            <option>Success</option>
                            <option>Pending</option>
                            <option>Failed</option>
                        </select>

                    </div>


                    {/* Type */}

                    <div className="select-wrapper">

                        <select>
                            <option>All Types</option>
                            <option>Deposit</option>
                            <option>Purchase</option>
                            <option>Refund</option>
                        </select>

                    </div>


                    {/* Sort */}

                    <div className="select-wrapper">

                        <select>
                            <option>Sort By</option>
                            <option>Newest</option>
                            <option>Oldest</option>
                            <option>Highest Amount</option>
                            <option>Lowest Amount</option>
                        </select>

                    </div>

                </div>

            </div>


            {/* =========================
                TRANSACTIONS TABLE
            ========================= */}

            <TransactionsTable />

        </div>
    );
};

export default Transactions;

