import React from "react";
import { FiSearch } from "react-icons/fi";

import StatCard from "../components/StatCard";
import UsersTable from "../components/UsersTable";

import {
    FaUsers,
    FaWallet,
    FaUserClock,
    FaUserSlash,
} from "react-icons/fa";

import "../styles/users.css";

const Users = () => {
    return (
        <div className="users-page">

            {/* Stats */}

            <div className="stats-grid">

                <StatCard
                    icon={<FaUsers />}
                    title="Total Users"
                    value="1,248"
                    trend="up"
                    trendText="12.5% from last month"
                    color="purple"
                />

                <StatCard
                    icon={<FaWallet />}
                    title="Funded Users"
                    value="824"
                    trend="up"
                    trendText="66.1% have funded wallets"
                    color="green"
                />

                <StatCard
                    icon={<FaUserClock />}
                    title="Active Users"
                    value="932"
                    trend="up"
                    trendText="8.7% this month"
                    color="orange"
                />

                <StatCard
                    icon={<FaUserSlash />}
                    title="Banned Users"
                    value="24"
                    trend="down"
                    trendText="1.9% of users"
                    color="red"
                />
            </div>

            {/* Filters */}

            <div className="users-toolbar">

                <div className="users-search">

                    <FiSearch />

                    <input
                        type="text"
                        placeholder="Search by name, email or username..."
                    />

                </div>

                <div className="users-filters">

                    <div className="select-wrapper">
                        <select>
                            <option>All Status</option>
                            <option>Active</option>
                            <option>Inactive</option>
                            <option>Banned</option>
                        </select>
                    </div>

                    <div className="select-wrapper">
                        <select>
                            <option>Sort By</option>
                            <option>Newest</option>
                            <option>Oldest</option>
                            <option>Highest Balance</option>
                            <option>Lowest Balance</option>
                        </select>
                    </div>

                </div>

            </div>

            {/* Table */}

            <UsersTable />

        </div>
    );
};

export default Users;