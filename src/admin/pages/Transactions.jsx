import React, {
    useCallback,
    useEffect,
    useState,
} from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

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


/*
========================================
API URL
========================================
*/

const API_URL =
    process.env.REACT_APP_API_URL;


/*
========================================
TRANSACTIONS
========================================
*/

const Transactions = () => {

    const navigate = useNavigate();


    /*
    ========================================
    TRANSACTION STATS
    ========================================
    */

    const [stats, setStats] = useState({

        totalTransactions: 0,

        successfulTransactions: 0,

        pendingTransactions: 0,

        failedTransactions: 0,

        successRate: 0,

        pendingRate: 0,

        failedRate: 0,

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
    TRANSACTIONS
    ========================================
    */

    const [transactions, setTransactions] =
        useState([]);


    /*
    ========================================
    TRANSACTIONS LOADING
    ========================================
    */

    const [transactionsLoading, setTransactionsLoading] =
        useState(true);


    /*
    ========================================
    SEARCH
    ========================================
    */

    const [search, setSearch] =
        useState("");


    /*
    ========================================
    STATUS
    ========================================
    */

    const [status, setStatus] =
        useState("all");


    /*
    ========================================
    TYPE
    ========================================
    */

    const [type, setType] =
        useState("all");


    /*
    ========================================
    SORT
    ========================================
    */

    const [sort, setSort] =
        useState("newest");


    /*
    ========================================
    ERROR
    ========================================
    */

    const [error, setError] =
        useState("");


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
    FETCH TRANSACTION STATS
    ========================================
    */

    const fetchTransactionStats =
        useCallback(
            async () => {

                try {

                    setStatsLoading(true);


                    const token =
                        getToken();


                    if (!token) {

                        handleUnauthorized();

                        return;

                    }


                    const response =
                        await axios.get(
                            `${API_URL}/api/admin/transactions/stats`,
                            {
                                timeout: 15000,

                                headers: {
                                    Authorization:
                                        `Bearer ${token}`,
                                },
                            }
                        );


                    if (
                        response.data.success
                    ) {

                        setStats(
                            response.data.stats
                        );

                    }

                } catch (error) {

                    console.error(
                        "Failed to fetch transaction stats:",
                        error
                    );


                    if (
                        error.response?.status ===
                        401
                    ) {

                        handleUnauthorized();

                        return;

                    }


                    if (
                        error.code ===
                        "ECONNABORTED"
                    ) {

                        console.error(
                            "Transaction stats request timed out."
                        );

                    }

                } finally {

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
    FETCH TRANSACTIONS
    ========================================
    */

    const fetchTransactions =
        useCallback(
            async () => {

                try {

                    setTransactionsLoading(
                        true
                    );

                    setError("");


                    const token =
                        getToken();


                    if (!token) {

                        handleUnauthorized();

                        return;

                    }


                    const response =
                        await axios.get(
                            `${API_URL}/api/admin/transactions`,
                            {
                                timeout: 15000,

                                headers: {

                                    Authorization:
                                        `Bearer ${token}`,

                                },

                                params: {

                                    search,

                                    status,

                                    type,

                                    sort,

                                },

                            }
                        );


                    if (
                        response.data.success
                    ) {

                        setTransactions(
                            response.data.transactions ||
                            []
                        );

                    } else {

                        setError(
                            response.data.message ||
                            "Failed to fetch transactions"
                        );

                    }

                } catch (error) {

                    console.error(
                        "Failed to fetch transactions:",
                        error
                    );


                    if (
                        error.response?.status ===
                        401
                    ) {

                        handleUnauthorized();

                        return;

                    }


                    if (
                        error.code ===
                        "ECONNABORTED"
                    ) {

                        setError(
                            "Transaction request timed out. Please try again."
                        );

                    } else {

                        setError(
                            error.response?.data?.message ||
                            "Failed to fetch transactions"
                        );

                    }

                } finally {

                    setTransactionsLoading(
                        false
                    );

                }

            },
            [
                getToken,
                handleUnauthorized,
                search,
                status,
                type,
                sort,
            ]
        );


    /*
    ========================================
    INITIAL LOAD
    ========================================
    */

    useEffect(() => {

        document.title =
            "Transactions - Numio";

        fetchTransactionStats();

    }, [
        fetchTransactionStats,
    ]);


    /*
    ========================================
    TRANSACTIONS LOAD
    ========================================
    */

    useEffect(() => {

        fetchTransactions();

    }, [
        fetchTransactions,
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

                    fetchTransactionStats();

                    fetchTransactions();

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
        fetchTransactionStats,
        fetchTransactions,
    ]);


    /*
    ========================================
    REFRESH WHEN WINDOW GETS FOCUS
    ========================================
    */

    useEffect(() => {

        const handleFocus = () => {

            fetchTransactionStats();

            fetchTransactions();

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
        fetchTransactionStats,
        fetchTransactions,
    ]);


    /*
    ========================================
    FORMAT NUMBER
    ========================================
    */

    const formatNumber = (
        value
    ) => {

        return Number(
            value || 0
        ).toLocaleString(
            "en-US"
        );

    };


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

                        <div className="stat-card admin-stat-skeleton">

                            <div className="admin-skeleton-icon"></div>

                            <div className="stats-details">

                                <div className="admin-skeleton-title"></div>

                                <div className="admin-skeleton-value"></div>

                                <div className="admin-skeleton-trend"></div>

                            </div>

                        </div>


                        <div className="stat-card admin-stat-skeleton">

                            <div className="admin-skeleton-icon"></div>

                            <div className="stats-details">

                                <div className="admin-skeleton-title"></div>

                                <div className="admin-skeleton-value"></div>

                                <div className="admin-skeleton-trend"></div>

                            </div>

                        </div>


                        <div className="stat-card admin-stat-skeleton">

                            <div className="admin-skeleton-icon"></div>

                            <div className="stats-details">

                                <div className="admin-skeleton-title"></div>

                                <div className="admin-skeleton-value"></div>

                                <div className="admin-skeleton-trend"></div>

                            </div>

                        </div>


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

                        <StatCard
                            icon={<FaExchangeAlt />}
                            title="Total Transactions"
                            value={formatNumber(
                                stats.totalTransactions
                            )}
                            trend={
                                stats.totalTransactions > 0
                                    ? "up"
                                    : "down"
                            }
                            trendText="All transactions"
                            color="purple"
                        />


                        <StatCard
                            icon={<FaCheckCircle />}
                            title="Successful"
                            value={formatNumber(
                                stats.successfulTransactions
                            )}
                            trend={
                                stats.successfulTransactions > 0
                                    ? "up"
                                    : "down"
                            }
                            trendText={
                                `${stats.successRate || 0}% success rate`
                            }
                            color="green"
                        />


                        <StatCard
                            icon={<FaClock />}
                            title="Pending"
                            value={formatNumber(
                                stats.pendingTransactions
                            )}
                            trend={
                                stats.pendingTransactions > 0
                                    ? "up"
                                    : "down"
                            }
                            trendText={
                                `${stats.pendingRate || 0}% of transactions`
                            }
                            color="orange"
                        />


                        <StatCard
                            icon={<FaTimesCircle />}
                            title="Failed"
                            value={formatNumber(
                                stats.failedTransactions
                            )}
                            trend={
                                stats.failedTransactions > 0
                                    ? "down"
                                    : "up"
                            }
                            trendText={
                                `${stats.failedRate || 0}% of transactions`
                            }
                            color="red"
                        />

                    </>

                )}

            </div>


            {/* ========================================
                FILTERS
            ======================================== */}

            <div className="users-toolbar">

                <div className="users-search">

                    <FiSearch />

                    <input
                        type="text"
                        value={search}
                        onChange={(event) => {
                            setSearch(
                                event.target.value
                            );
                        }}
                        placeholder="Search by reference, username or email..."
                    />

                </div>


                <div className="users-filters">

                    <div className="select-wrapper">

                        <select
                            value={status}
                            onChange={(event) => {
                                setStatus(
                                    event.target.value
                                );
                            }}
                        >

                            <option value="all">
                                All Status
                            </option>

                            <option value="success">
                                Success
                            </option>

                            <option value="pending">
                                Pending
                            </option>

                            <option value="failed">
                                Failed
                            </option>

                        </select>

                    </div>


                    <div className="select-wrapper">

                        <select
                            value={type}
                            onChange={(event) => {
                                setType(
                                    event.target.value
                                );
                            }}
                        >

                            <option value="all">
                                All Types
                            </option>

                            <option value="deposit">
                                Deposit
                            </option>

                            <option value="purchase">
                                Purchase
                            </option>

                            <option value="withdrawal">
                                Withdrawal
                            </option>

                            <option value="refund">
                                Refund
                            </option>

                        </select>

                    </div>


                    <div className="select-wrapper">

                        <select
                            value={sort}
                            onChange={(event) => {
                                setSort(
                                    event.target.value
                                );
                            }}
                        >

                            <option value="newest">
                                Newest
                            </option>

                            <option value="oldest">
                                Oldest
                            </option>

                            <option value="highest">
                                Highest Amount
                            </option>

                            <option value="lowest">
                                Lowest Amount
                            </option>

                        </select>

                    </div>

                </div>

            </div>


            {/* ========================================
                ERROR
            ======================================== */}

            {error && (

                <div className="users-error">

                    {error}

                </div>

            )}


            {/* ========================================
                TRANSACTIONS TABLE
            ======================================== */}

            <TransactionsTable
                transactions={transactions}
                loading={transactionsLoading}
            />

        </div>

    );

};


export default Transactions;
