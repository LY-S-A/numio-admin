// import React from "react";
// import { FiSearch } from "react-icons/fi";

// import StatCard from "../components/StatCard";
// import UsersTable from "../components/UsersTable";

// import {
//     FaUsers,
//     FaWallet,
//     FaUserClock,
//     FaUserSlash,
// } from "react-icons/fa";

// import "../styles/users.css";

// const Users = () => {
//     return (
//         <div className="users-page">

//             {/* Stats */}

//             <div className="stats-grid">

//                 <StatCard
//                     icon={<FaUsers />}
//                     title="Total Users"
//                     value="1,248"
//                     trend="up"
//                     trendText="12.5% from last month"
//                     color="purple"
//                 />

//                 <StatCard
//                     icon={<FaWallet />}
//                     title="Funded Users"
//                     value="824"
//                     trend="up"
//                     trendText="66.1% have funded wallets"
//                     color="green"
//                 />

//                 <StatCard
//                     icon={<FaUserClock />}
//                     title="Active Users"
//                     value="932"
//                     trend="up"
//                     trendText="8.7% this month"
//                     color="orange"
//                 />

//                 <StatCard
//                     icon={<FaUserSlash />}
//                     title="Banned Users"
//                     value="24"
//                     trend="down"
//                     trendText="1.9% of users"
//                     color="red"
//                 />
//             </div>

//             {/* Filters */}

//             <div className="users-toolbar">

//                 <div className="users-search">

//                     <FiSearch />

//                     <input
//                         type="text"
//                         placeholder="Search by name, email or username..."
//                     />

//                 </div>

//                 <div className="users-filters">

//                     <div className="select-wrapper">
//                         <select>
//                             <option>All Status</option>
//                             <option>Active</option>
//                             <option>Inactive</option>
//                             <option>Banned</option>
//                         </select>
//                     </div>

//                     <div className="select-wrapper">
//                         <select>
//                             <option>Sort By</option>
//                             <option>Newest</option>
//                             <option>Oldest</option>
//                             <option>Highest Balance</option>
//                             <option>Lowest Balance</option>
//                         </select>
//                     </div>

//                 </div>

//             </div>

//             {/* Table */}

//             <UsersTable />

//         </div>
//     );
// };

// export default Users;

import React, {
    useEffect,
    useState,
} from "react";

import axios from "axios";

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

const API_URL =
    process.env.REACT_APP_API_URL;

const Users = () => {

    /*
    ========================================
    USER STATS
    ========================================
    */

    const [stats, setStats] = useState({
        totalUsers: 0,
        fundedUsers: 0,
        activeUsers: 0,
        bannedUsers: 0,
    });

    const [statsLoading, setStatsLoading] =
        useState(true);


    /*
    ========================================
    FILTERS
    ========================================
    */

    const [search, setSearch] =
        useState("");

    const [status, setStatus] =
        useState("all");

    const [sort, setSort] =
        useState("newest");


    /*
    ========================================
    GET TOKEN
    ========================================
    */

    const getToken = () => {
        return localStorage.getItem(
            "adminToken"
        ) ||
        localStorage.getItem(
            "token"
        );
    };


    /*
    ========================================
    FETCH USER STATS
    ========================================
    */

    const fetchUserStats = async () => {

        try {

            setStatsLoading(true);

            const token = getToken();

            const response =
                await axios.get(
                    `${API_URL}/api/admin/users/stats`,
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
                "Failed to fetch user stats:",
                error
            );

        } finally {

            setStatsLoading(false);

        }
    };


    /*
    ========================================
    LOAD STATS
    ========================================
    */

    useEffect(() => {

        fetchUserStats();

    }, []);


    /*
    ========================================
    SEARCH
    ========================================
    */

    const handleSearchChange = (e) => {

        setSearch(
            e.target.value
        );

    };


    /*
    ========================================
    FORMAT STATS
    ========================================
    */

    const totalUsers =
        statsLoading
            ? "..."
            : stats.totalUsers.toLocaleString();

    const fundedUsers =
        statsLoading
            ? "..."
            : stats.fundedUsers.toLocaleString();

    const activeUsers =
        statsLoading
            ? "..."
            : stats.activeUsers.toLocaleString();

    const bannedUsers =
        statsLoading
            ? "..."
            : stats.bannedUsers.toLocaleString();


    return (
        <div className="users-page">

            {/* =========================
                STATS
            ========================= */}

            <div className="stats-grid">

                <StatCard
                    icon={<FaUsers />}
                    title="Total Users"
                    value={totalUsers}
                    trend="up"
                    trendText="Registered users"
                    color="purple"
                />


                <StatCard
                    icon={<FaWallet />}
                    title="Funded Users"
                    value={fundedUsers}
                    trend="up"
                    trendText="Users with wallet balance"
                    color="green"
                />


                <StatCard
                    icon={<FaUserClock />}
                    title="Active Users"
                    value={activeUsers}
                    trend="up"
                    trendText="Currently active"
                    color="orange"
                />


                <StatCard
                    icon={<FaUserSlash />}
                    title="Banned Users"
                    value={bannedUsers}
                    trend="down"
                    trendText="Currently banned"
                    color="red"
                />

            </div>


            {/* =========================
                FILTERS
            ========================= */}

            <div className="users-toolbar">

                {/* SEARCH */}

                <div className="users-search">

                    <FiSearch />

                    <input
                        type="text"
                        value={search}
                        onChange={
                            handleSearchChange
                        }
                        placeholder="Search by name, email or username..."
                    />

                </div>


                {/* FILTERS */}

                <div className="users-filters">

                    {/* STATUS */}

                    <div className="select-wrapper">

                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(
                                    e.target.value
                                )
                            }
                        >

                            <option value="all">
                                All Status
                            </option>

                            <option value="active">
                                Active
                            </option>

                            <option value="banned">
                                Banned
                            </option>

                        </select>

                    </div>


                    {/* SORT */}

                    <div className="select-wrapper">

                        <select
                            value={sort}
                            onChange={(e) =>
                                setSort(
                                    e.target.value
                                )
                            }
                        >

                            <option value="newest">
                                Newest
                            </option>

                            <option value="oldest">
                                Oldest
                            </option>

                            <option value="highest">
                                Highest Balance
                            </option>

                            <option value="lowest">
                                Lowest Balance
                            </option>

                        </select>

                    </div>

                </div>

            </div>


            {/* =========================
                TABLE
            ========================= */}

            <UsersTable
                search={search}
                status={status}
                sort={sort}
                onTotalChange={(total) => {

                    /*
                    Keep the stat card in sync
                    with the actual user count.

                    Stats endpoint remains the
                    source of truth for the
                    initial value.
                    */

                    if (
                        total === 0 &&
                        !search &&
                        status === "all"
                    ) {
                        setStats((prev) => ({
                            ...prev,
                            totalUsers: 0,
                        }));
                    }

                }}
            />

        </div>
    );
};

export default Users;
