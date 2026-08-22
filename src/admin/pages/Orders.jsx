// import React from "react"; 
// import { FiSearch } from "react-icons/fi";

// import StatCard from "../components/StatCard";
// import OrdersTable from "../components/OrdersTable";

// import {
//     FaClipboardList,
//     FaCheckCircle,
//     FaClock,
//     FaTimesCircle,
// } from "react-icons/fa";

// import "../styles/users.css";

// const Orders = () => {
//     return (
//         <div className="users-page">

//             {/* =========================
//                 STATS
//             ========================= */}

//             <div className="stats-grid">

//                 <StatCard
//                     icon={<FaClipboardList />}
//                     title="Total Orders"
//                     value="3,842"
//                     trend="up"
//                     trendText="14.8% from last month"
//                     color="purple"
//                 />

//                 <StatCard
//                     icon={<FaCheckCircle />}
//                     title="Completed Orders"
//                     value="3,214"
//                     trend="up"
//                     trendText="83.7% completion rate"
//                     color="green"
//                 />

//                 <StatCard
//                     icon={<FaClock />}
//                     title="Active Orders"
//                     value="186"
//                     trend="up"
//                     trendText="4.8% of total orders"
//                     color="orange"
//                 />

//                 <StatCard
//                     icon={<FaTimesCircle />}
//                     title="Cancelled Orders"
//                     value="442"
//                     trend="down"
//                     trendText="11.5% of total orders"
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
//                         placeholder="Search by order ID, username or email..."
//                     />

//                 </div>


//                 {/* Filters */}

//                 <div className="users-filters">

//                     <div className="select-wrapper">

//                         <select>
//                             <option>All Status</option>
//                             <option>Finished</option>
//                             <option>Expired</option>
//                             <option>Cancelled</option>
//                         </select>

//                     </div>


//                     <div className="select-wrapper">

//                         <select>
//                             <option>All Services</option>
//                             <option>WhatsApp</option>
//                             <option>Telegram</option>
//                             <option>Instagram</option>
//                             <option>Facebook</option>
//                             <option>TikTok</option>
//                         </select>

//                     </div>


//                     <div className="select-wrapper">

//                         <select>
//                             <option>Sort By</option>
//                             <option>Newest</option>
//                             <option>Oldest</option>
//                             <option>Highest Price</option>
//                             <option>Lowest Price</option>
//                         </select>

//                     </div>

//                 </div>

//             </div>


//             {/* =========================
//                 ORDERS TABLE
//             ========================= */}

//             <OrdersTable />

//         </div>
//     );
// };

// export default Orders;

import React, {
    useCallback,
    useEffect,
    useState,
} from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

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


/*
========================================
API URL
========================================
*/

const API_URL =
    process.env.REACT_APP_API_URL;


/*
========================================
ORDERS
========================================
*/

const Orders = () => {

    const navigate = useNavigate();


    /*
    ========================================
    ORDER STATS
    ========================================
    */

    const [stats, setStats] = useState({

        totalOrders: 0,

        completedOrders: 0,

        activeOrders: 0,

        cancelledOrders: 0,

        completionRate: 0,

        activeRate: 0,

        cancelledRate: 0,

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
    SERVICE
    ========================================
    */

    const [service, setService] =
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
    FETCH ORDER STATS
    ========================================
    */

    const fetchOrderStats =
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
                            `${API_URL}/api/admin/orders/stats`,
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
                        "Failed to fetch order stats:",
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
                    TIMEOUT
                    ================================
                    */

                    if (
                        error.code ===
                        "ECONNABORTED"
                    ) {

                        console.error(
                            "Order stats request timed out."
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
    INITIAL LOAD
    ========================================
    */

    useEffect(() => {

        document.title =
            "Orders - Numio";

        fetchOrderStats();

    }, [
        fetchOrderStats,
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

                    fetchOrderStats();

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
        fetchOrderStats,
    ]);


    /*
    ========================================
    REFRESH WHEN WINDOW GETS FOCUS
    ========================================
    */

    useEffect(() => {

        const handleFocus = () => {

            fetchOrderStats();

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
        fetchOrderStats,
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

                        {/* ====================================
                            TOTAL ORDERS SKELETON
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
                            COMPLETED ORDERS SKELETON
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
                            ACTIVE ORDERS SKELETON
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
                            CANCELLED ORDERS SKELETON
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
                            TOTAL ORDERS
                        ==================================== */}

                        <StatCard

                            icon={
                                <FaClipboardList />
                            }

                            title="Total Orders"

                            value={
                                formatNumber(
                                    stats.totalOrders
                                )
                            }

                            trend={
                                stats.totalOrders > 0
                                    ? "up"
                                    : "down"
                            }

                            trendText="All orders"

                            color="purple"

                        />


                        {/* ====================================
                            COMPLETED ORDERS
                        ==================================== */}

                        <StatCard

                            icon={
                                <FaCheckCircle />
                            }

                            title="Completed Orders"

                            value={
                                formatNumber(
                                    stats.completedOrders
                                )
                            }

                            trend={
                                stats.completedOrders > 0
                                    ? "up"
                                    : "down"
                            }

                            trendText={
                                `${stats.completionRate || 0}% completion rate`
                            }

                            color="green"

                        />


                        {/* ====================================
                            ACTIVE ORDERS
                        ==================================== */}

                        <StatCard

                            icon={
                                <FaClock />
                            }

                            title="Active Orders"

                            value={
                                formatNumber(
                                    stats.activeOrders
                                )
                            }

                            trend={
                                stats.activeOrders > 0
                                    ? "up"
                                    : "down"
                            }

                            trendText={
                                `${stats.activeRate || 0}% of total orders`
                            }

                            color="orange"

                        />


                        {/* ====================================
                            CANCELLED ORDERS
                        ==================================== */}

                        <StatCard

                            icon={
                                <FaTimesCircle />
                            }

                            title="Cancelled Orders"

                            value={
                                formatNumber(
                                    stats.cancelledOrders
                                )
                            }

                            trend={
                                stats.cancelledOrders > 0
                                    ? "down"
                                    : "up"
                            }

                            trendText={
                                `${stats.cancelledRate || 0}% of total orders`
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

                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }

                        placeholder="Search by order ID, phone or service..."

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

                            onChange={(event) =>
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

                            <option value="finished">
                                Finished
                            </option>

                            <option value="expired">
                                Expired
                            </option>

                            <option value="cancelled">
                                Cancelled
                            </option>

                        </select>

                    </div>


                    {/* ==================================
                        SERVICE
                    ================================== */}

                    <div className="select-wrapper">

                        <select

                            value={
                                service
                            }

                            onChange={(event) =>
                                setService(
                                    event.target.value
                                )
                            }

                        >

                            <option value="all">
                                All Services
                            </option>

                            <option value="whatsapp">
                                WhatsApp
                            </option>

                            <option value="telegram">
                                Telegram
                            </option>

                            <option value="instagram">
                                Instagram
                            </option>

                            <option value="facebook">
                                Facebook
                            </option>

                            <option value="tiktok">
                                TikTok
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

                            onChange={(event) =>
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
                                Highest Price
                            </option>

                            <option value="lowest">
                                Lowest Price
                            </option>

                        </select>

                    </div>

                </div>

            </div>


            {/* ========================================
                ORDERS TABLE
            ======================================== */}

            <OrdersTable

                search={
                    search
                }

                status={
                    status
                }

                service={
                    service
                }

                sort={
                    sort
                }

            />

        </div>

    );

};


export default Orders;
