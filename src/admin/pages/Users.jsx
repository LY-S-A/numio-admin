import React, {
    useCallback,
    useEffect,
    useState,
} from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

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


/*
========================================
API URL
========================================
*/

const API_URL =
    process.env.REACT_APP_API_URL;


const Users = () => {

    const navigate = useNavigate();


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


    /*
    ========================================
    STATS LOADING
    ========================================
    */

    const [statsLoading, setStatsLoading] =
        useState(true);


    /*
    ========================================
    SEARCH / FILTERS
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
    GET ADMIN TOKEN
    ========================================
    */

    const getToken = useCallback(() => {

        return (
            localStorage.getItem(
                "adminToken"
            ) ||
            localStorage.getItem(
                "token"
            )
        );

    }, []);


    /*
    ========================================
    HANDLE UNAUTHORIZED
    ========================================
    */

    const handleUnauthorized =
        useCallback(() => {

            localStorage.removeItem(
                "adminToken"
            );

            localStorage.removeItem(
                "token"
            );

            localStorage.removeItem(
                "user"
            );

            navigate("/login", {
                replace: true,
            });

        }, [navigate]);


    /*
    ========================================
    FETCH USER STATS
    ========================================
    */

    const fetchUserStats =
        useCallback(
            async () => {

                try {

                    setStatsLoading(true);


                    /*
                    ================================
                    GET TOKEN
                    ================================
                    */

                    const token =
                        getToken();


                    /*
                    ================================
                    NO TOKEN
                    ================================
                    */

                    if (!token) {

                        handleUnauthorized();

                        return;
                    }


                    /*
                    ================================
                    API REQUEST
                    ================================
                    */

                    const response =
                        await axios.get(
                            `${API_URL}/api/admin/users/stats`,
                            {
                                timeout: 15000,

                                headers: {
                                    Authorization:
                                        `Bearer ${token}`,
                                },
                            }
                        );


                    /*
                    ================================
                    SUCCESS
                    ================================
                    */

                    if (
                        response.data.success
                    ) {

                        setStats(
                            response.data.stats
                        );

                    }

                } catch (error) {

                    console.error(
                        "Failed to fetch user stats:",
                        error
                    );


                    /*
                    ================================
                    SESSION EXPIRED
                    ================================
                    */

                    if (
                        error.response?.status ===
                        401
                    ) {

                        handleUnauthorized();

                        return;
                    }


                    /*
                    ================================
                    REQUEST TIMEOUT
                    ================================
                    */

                    if (
                        error.code ===
                        "ECONNABORTED"
                    ) {

                        console.error(
                            "User stats request timed out."
                        );

                    }

                } finally {

                    /*
                    ================================
                    ALWAYS STOP LOADING
                    ================================
                    */

                    setStatsLoading(false);

                }

            },
            [
                getToken,
                handleUnauthorized,
            ]
        );


    /*
    ========================================
    INITIAL LOAD
    ========================================
    */

    useEffect(() => {

        fetchUserStats();

    }, [
        fetchUserStats,
    ]);


    /*
    ========================================
    REFRESH WHEN TAB BECOMES VISIBLE
    ========================================
    */

    useEffect(() => {

        const handleVisibilityChange =
            () => {

                if (
                    document.visibilityState ===
                    "visible"
                ) {

                    fetchUserStats();

                }

            };


        document.addEventListener(
            "visibilitychange",
            handleVisibilityChange
        );


        return () => {

            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );

        };

    }, [
        fetchUserStats,
    ]);


    /*
    ========================================
    REFRESH WHEN WINDOW GETS FOCUS
    ========================================
    */

    useEffect(() => {

        const handleFocus = () => {

            fetchUserStats();

        };


        window.addEventListener(
            "focus",
            handleFocus
        );


        return () => {

            window.removeEventListener(
                "focus",
                handleFocus
            );

        };

    }, [
        fetchUserStats,
    ]);


    /*
    ========================================
    SEARCH
    ========================================
    */

    const handleSearchChange = (
        event
    ) => {

        setSearch(
            event.target.value
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
            : Number(
                stats.totalUsers || 0
            ).toLocaleString();


    const fundedUsers =
        statsLoading
            ? "..."
            : Number(
                stats.fundedUsers || 0
            ).toLocaleString();


    const activeUsers =
        statsLoading
            ? "..."
            : Number(
                stats.activeUsers || 0
            ).toLocaleString();


    const bannedUsers =
        statsLoading
            ? "..."
            : Number(
                stats.bannedUsers || 0
            ).toLocaleString();


    /*
    ========================================
    RENDER
    ========================================
    */

    return (

        <div className="users-page">


            {/* ========================================
                STATS
            ======================================== */}
<div className="stats-grid">

    {statsLoading ? (
        <>
            {/* ====================================
                TOTAL USERS SKELETON
            ==================================== */}

            <div className="stat-card admin-stat-skeleton">
                <div className="admin-skeleton-icon"></div>

                <div className="stats-details">
                    <div className="admin-skeleton-title"></div>

                    <div className="admin-skeleton-value"></div>

                    <div className="admin-skeleton-trend"></div>
                </div>
            </div>


            {/* ====================================
                FUNDED USERS SKELETON
            ==================================== */}

            <div className="stat-card admin-stat-skeleton">
                <div className="admin-skeleton-icon"></div>

                <div className="stats-details">
                    <div className="admin-skeleton-title"></div>

                    <div className="admin-skeleton-value"></div>

                    <div className="admin-skeleton-trend"></div>
                </div>
            </div>


            {/* ====================================
                ACTIVE USERS SKELETON
            ==================================== */}

            <div className="stat-card admin-stat-skeleton">
                <div className="admin-skeleton-icon"></div>

                <div className="stats-details">
                    <div className="admin-skeleton-title"></div>

                    <div className="admin-skeleton-value"></div>

                    <div className="admin-skeleton-trend"></div>
                </div>
            </div>


            {/* ====================================
                BANNED USERS SKELETON
            ==================================== */}

            <div className="stat-card admin-stat-skeleton">
                <div className="admin-skeleton-icon"></div>

                <div className="stats-details">
                    <div className="admin-skeleton-title"></div>

                    <div className="admin-skeleton-value"></div>

                    <div className="admin-skeleton-trend"></div>
                </div>
            </div>
        </>
    ) : (
        <>
            {/* ====================================
                TOTAL USERS
            ==================================== */}

            <StatCard
                icon={<FaUsers />}
                title="Total Users"
                value={totalUsers}
                trend="up"
                trendText="Registered users"
                color="purple"
            />


            {/* ====================================
                FUNDED USERS
            ==================================== */}

            <StatCard
                icon={<FaWallet />}
                title="Funded Users"
                value={fundedUsers}
                trend="up"
                trendText="Users with wallet balance"
                color="green"
            />


            {/* ====================================
                ACTIVE USERS
            ==================================== */}

            <StatCard
                icon={<FaUserClock />}
                title="Active Users"
                value={activeUsers}
                trend="up"
                trendText="Currently active"
                color="orange"
            />


            {/* ====================================
                BANNED USERS
            ==================================== */}

            <StatCard
                icon={<FaUserSlash />}
                title="Banned Users"
                value={bannedUsers}
                trend="down"
                trendText="Currently banned"
                color="red"
            />
        </>
    )}

</div>


            {/* ========================================
                USERS TOOLBAR
            ======================================== */}

            <div className="users-toolbar">


                {/* ====================================
                    SEARCH
                ==================================== */}

                <div className="users-search">

                    <FiSearch />

                    <input
                        type="text"

                        value={
                            search
                        }

                        onChange={
                            handleSearchChange
                        }

                        placeholder="Search by name, email or username..."
                    />

                </div>


                {/* ====================================
                    FILTERS
                ==================================== */}

                <div className="users-filters">


                    {/* ==================================
                        STATUS
                    ================================== */}

                    <div className="select-wrapper">

                        <select
                            value={
                                status
                            }

                            onChange={(
                                event
                            ) =>
                                setStatus(
                                    event.target.value
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


                    {/* ==================================
                        SORT
                    ================================== */}

                    <div className="select-wrapper">

                        <select
                            value={
                                sort
                            }

                            onChange={(
                                event
                            ) =>
                                setSort(
                                    event.target.value
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


            {/* ========================================
                USERS TABLE
            ======================================== */}

            <UsersTable
                search={
                    search
                }

                status={
                    status
                }

                sort={
                    sort
                }
            />


        </div>

    );

};


export default Users;
