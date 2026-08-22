// import React from "react";
// import { FiSearch } from "react-icons/fi";

// import StatCard from "../components/StatCard";
// import TransactionsTable from "../components/TransactionsTable";

// import {
//     FaExchangeAlt,
//     FaCheckCircle,
//     FaClock,
//     FaTimesCircle,
// } from "react-icons/fa";

// import "../styles/users.css";

// const Transactions = () => {
//     return (
//         <div className="users-page">

//             {/* =========================
//                 STATS
//             ========================= */}

//             <div className="stats-grid">

//                 <StatCard
//                     icon={<FaExchangeAlt />}
//                     title="Total Transactions"
//                     value="8,426"
//                     trend="up"
//                     trendText="16.4% from last month"
//                     color="purple"
//                 />

//                 <StatCard
//                     icon={<FaCheckCircle />}
//                     title="Successful"
//                     value="7,684"
//                     trend="up"
//                     trendText="91.2% success rate"
//                     color="green"
//                 />

//                 <StatCard
//                     icon={<FaClock />}
//                     title="Pending"
//                     value="184"
//                     trend="up"
//                     trendText="2.2% of transactions"
//                     color="orange"
//                 />

//                 <StatCard
//                     icon={<FaTimesCircle />}
//                     title="Failed"
//                     value="558"
//                     trend="down"
//                     trendText="6.6% of transactions"
//                     color="red"
//                 />

//             </div>


//             {/* =========================
//                 FILTERS
//             ========================= */}

//             <div className="users-toolbar">

//                 {/* Search */}

//                 <div className="users-search">

//                     <FiSearch />

//                     <input
//                         type="text"
//                         placeholder="Search by reference, username or email..."
//                     />

//                 </div>


//                 {/* Filters */}

//                 <div className="users-filters">

//                     {/* Status */}

//                     <div className="select-wrapper">

//                         <select>
//                             <option>All Status</option>
//                             <option>Success</option>
//                             <option>Pending</option>
//                             <option>Failed</option>
//                         </select>

//                     </div>


//                     {/* Type */}

//                     <div className="select-wrapper">

//                         <select>
//                             <option>All Types</option>
//                             <option>Deposit</option>
//                             <option>Purchase</option>
//                             <option>Refund</option>
//                         </select>

//                     </div>


//                     {/* Sort */}

//                     <div className="select-wrapper">

//                         <select>
//                             <option>Sort By</option>
//                             <option>Newest</option>
//                             <option>Oldest</option>
//                             <option>Highest Amount</option>
//                             <option>Lowest Amount</option>
//                         </select>

//                     </div>

//                 </div>

//             </div>


//             {/* =========================
//                 TRANSACTIONS TABLE
//             ========================= */}

//             <TransactionsTable />

//         </div>
//     );
// };

// export default Transactions;

import React, {
    useCallback,
    useEffect,
    useState,
} from "react";

import axios from "axios";

import {
    FiSearch,
} from "react-icons/fi";

import {
    FaExchangeAlt,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
} from "react-icons/fa";

import StatCard from "../components/StatCard";
import TransactionsTable from "../components/TransactionsTable";

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
TRANSACTIONS PER PAGE
========================================
*/

const TRANSACTIONS_PER_PAGE = 10;


/*
========================================
TRANSACTIONS PAGE
========================================
*/

const Transactions = () => {

    /*
    ========================================
    STATS
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
    TRANSACTIONS
    ========================================
    */

    const [transactions, setTransactions] =
        useState([]);


    /*
    ========================================
    FILTERS
    ========================================
    */

    const [searchTerm, setSearchTerm] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("all");

    const [typeFilter, setTypeFilter] =
        useState("all");

    const [sortFilter, setSortFilter] =
        useState("newest");


    /*
    ========================================
    PAGINATION
    ========================================
    */

    const [currentPage, setCurrentPage] =
        useState(1);

    const [pagination, setPagination] =
        useState({
            currentPage: 1,
            totalPages: 1,
            totalTransactions: 0,
            limit: TRANSACTIONS_PER_PAGE,
        });


    /*
    ========================================
    LOADING
    ========================================
    */

    const [loadingStats, setLoadingStats] =
        useState(true);

    const [loadingTransactions, setLoadingTransactions] =
        useState(true);


    /*
    ========================================
    ERROR
    ========================================
    */

    const [error, setError] =
        useState("");


    /*
    ========================================
    GET AUTH HEADERS
    ========================================
    */

    const getHeaders = () => {

        const token =
            localStorage.getItem("adminToken") ||
            localStorage.getItem("token");

        return {
            headers: {
                Authorization:
                    `Bearer ${token}`,
            },
        };
    };


    /*
    ========================================
    FETCH TRANSACTION STATS
    ========================================
    */

    const fetchStats =
        useCallback(async () => {

            try {

                setLoadingStats(true);

                const response =
                    await axios.get(
                        `${API_URL}/api/admin/transactions/stats`,
                        getHeaders()
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

            } finally {

                setLoadingStats(false);

            }

        }, []);


    /*
    ========================================
    FETCH TRANSACTIONS
    ========================================
    */

    const fetchTransactions =
        useCallback(async () => {

            try {

                setLoadingTransactions(true);

                setError("");

                const response =
                    await axios.get(
                        `${API_URL}/api/admin/transactions`,
                        {
                            ...getHeaders(),

                            params: {
                                search:
                                    searchTerm,

                                status:
                                    statusFilter,

                                type:
                                    typeFilter,

                                sort:
                                    sortFilter,

                                page:
                                    currentPage,

                                limit:
                                    TRANSACTIONS_PER_PAGE,
                            },
                        }
                    );


                if (
                    response.data.success
                ) {

                    setTransactions(
                        response.data.transactions || []
                    );

                    setPagination(
                        response.data.pagination || {
                            currentPage: 1,
                            totalPages: 1,
                            totalTransactions: 0,
                            limit:
                                TRANSACTIONS_PER_PAGE,
                        }
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

                setError(
                    error.response?.data?.message ||
                    "Failed to fetch transactions"
                );

            } finally {

                setLoadingTransactions(false);

            }

        }, [
            searchTerm,
            statusFilter,
            typeFilter,
            sortFilter,
            currentPage,
        ]);


    /*
    ========================================
    INITIAL STATS LOAD
    ========================================
    */

    useEffect(() => {

        fetchStats();

    }, [fetchStats]);


    /*
    ========================================
    TRANSACTIONS LOAD
    ========================================
    */

    useEffect(() => {

        fetchTransactions();

    }, [fetchTransactions]);


    /*
    ========================================
    RESET PAGE WHEN FILTER CHANGES
    ========================================
    */

    useEffect(() => {

        setCurrentPage(1);

    }, [
        statusFilter,
        typeFilter,
        sortFilter,
    ]);


    /*
    ========================================
    SEARCH
    ========================================
    */

    const handleSearchChange = (event) => {

        setSearchTerm(
            event.target.value
        );

        setCurrentPage(1);

    };


    /*
    ========================================
    STATUS FILTER
    ========================================
    */

    const handleStatusChange = (event) => {

        setStatusFilter(
            event.target.value
        );

        setCurrentPage(1);

    };


    /*
    ========================================
    TYPE FILTER
    ========================================
    */

    const handleTypeChange = (event) => {

        setTypeFilter(
            event.target.value
        );

        setCurrentPage(1);

    };


    /*
    ========================================
    SORT
    ========================================
    */

    const handleSortChange = (event) => {

        setSortFilter(
            event.target.value
        );

        setCurrentPage(1);

    };


    /*
    ========================================
    PAGE CHANGE
    ========================================
    */

    const handlePageChange = (page) => {

        if (
            page < 1 ||
            page > pagination.totalPages
        ) {
            return;
        }

        setCurrentPage(page);

    };


    /*
    ========================================
    DOCUMENT TITLE
    ========================================
    */

    useEffect(() => {

        document.title =
            "Transactions - RealSMS";

    }, []);


    return (
        <div className="users-page">

            {/* =========================
                STATS
            ========================= */}

            <div className="stats-grid">

                <StatCard
                    icon={<FaExchangeAlt />}
                    title="Total Transactions"
                    value={
                        loadingStats
                            ? "..."
                            : stats.totalTransactions
                    }
                    trend="up"
                    trendText="All transactions"
                    color="purple"
                />


                <StatCard
                    icon={<FaCheckCircle />}
                    title="Successful"
                    value={
                        loadingStats
                            ? "..."
                            : stats.successfulTransactions
                    }
                    trend="up"
                    trendText={
                        `${stats.successRate}% success rate`
                    }
                    color="green"
                />


                <StatCard
                    icon={<FaClock />}
                    title="Pending"
                    value={
                        loadingStats
                            ? "..."
                            : stats.pendingTransactions
                    }
                    trend="up"
                    trendText={
                        `${stats.pendingRate}% of transactions`
                    }
                    color="orange"
                />


                <StatCard
                    icon={<FaTimesCircle />}
                    title="Failed"
                    value={
                        loadingStats
                            ? "..."
                            : stats.failedTransactions
                    }
                    trend="down"
                    trendText={
                        `${stats.failedRate}% of transactions`
                    }
                    color="red"
                />

            </div>


            {/* =========================
                FILTERS
            ========================= */}

            <div className="users-toolbar">

                {/* =====================
                    SEARCH
                ===================== */}

                <div className="users-search">

                    <FiSearch />

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={
                            handleSearchChange
                        }
                        placeholder="Search by reference, username or email..."
                    />

                </div>


                {/* =====================
                    FILTERS
                ===================== */}

                <div className="users-filters">

                    {/* STATUS */}

                    <div className="select-wrapper">

                        <select
                            value={statusFilter}
                            onChange={
                                handleStatusChange
                            }
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


                    {/* TYPE */}

                    <div className="select-wrapper">

                        <select
                            value={typeFilter}
                            onChange={
                                handleTypeChange
                            }
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


                    {/* SORT */}

                    <div className="select-wrapper">

                        <select
                            value={sortFilter}
                            onChange={
                                handleSortChange
                            }
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


            {/* =========================
                ERROR
            ========================= */}

            {error && (
                <div className="users-error">
                    {error}
                </div>
            )}


            {/* =========================
                TRANSACTIONS TABLE
            ========================= */}

            <TransactionsTable
                transactions={
                    transactions
                }
                loading={
                    loadingTransactions
                }
            />


            {/* =========================
                PAGINATION
            ========================= */}

            {!loadingTransactions &&
                pagination.totalPages > 1 && (

                <div className="users-pagination">

                    <button
                        type="button"
                        disabled={
                            currentPage === 1
                        }
                        onClick={() =>
                            handlePageChange(
                                currentPage - 1
                            )
                        }
                    >
                        Previous
                    </button>


                    <span>
                        Page{" "}
                        {pagination.currentPage}
                        {" "}
                        of{" "}
                        {pagination.totalPages}
                    </span>


                    <button
                        type="button"
                        disabled={
                            currentPage ===
                            pagination.totalPages
                        }
                        onClick={() =>
                            handlePageChange(
                                currentPage + 1
                            )
                        }
                    >
                        Next
                    </button>

                </div>
            )}

        </div>
    );
};

export default Transactions;
