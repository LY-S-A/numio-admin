// import {
//     useCallback,
//     useEffect,
//     useState,
// } from "react";

// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// import StatCard from "../components/StatCard";
// import SendMail from "../components/SendMail";

// import {
//     FaUsers,
//     FaClipboardList,
//     FaExchangeAlt,
//     FaMoneyBillWave,
// } from "react-icons/fa";

// import "../styles/dashboard.css";


// /*
// ========================================
// API URL
// ========================================
// */

// const API_URL =
//     process.env.REACT_APP_API_URL;


// /*
// ========================================
// DASHBOARD
// ========================================
// */

// const Dashboard = () => {

//     const navigate = useNavigate();


//     /*
//     ========================================
//     STATS
//     ========================================
//     */

//     const [stats, setStats] = useState({
//         totalUsers: 0,
//         totalOrders: 0,
//         totalTransactions: 0,
//         totalRevenue: 0,

//         trends: {
//             users: 0,
//             orders: 0,
//             transactions: 0,
//             revenue: 0,
//         },
//     });


//     /*
//     ========================================
//     LOADING
//     ========================================
//     */

//     const [loading, setLoading] =
//         useState(true);


//     /*
//     ========================================
//     GET ADMIN TOKEN
//     ========================================
//     */

//     const getToken = useCallback(() => {

//         return (
//             localStorage.getItem(
//                 "adminToken"
//             ) ||
//             localStorage.getItem(
//                 "token"
//             )
//         );

//     }, []);


//     /*
//     ========================================
//     HANDLE SESSION EXPIRATION
//     ========================================
//     */

//     const handleUnauthorized =
//         useCallback(() => {

//             localStorage.removeItem(
//                 "adminToken"
//             );

//             localStorage.removeItem(
//                 "token"
//             );

//             localStorage.removeItem(
//                 "user"
//             );

//             navigate("/login", {
//                 replace: true,
//             });

//         }, [navigate]);


//     /*
//     ========================================
//     FETCH DASHBOARD STATS
//     ========================================
//     */

//     const fetchDashboardStats =
//         useCallback(
//             async () => {

//                 try {

//                     setLoading(true);


//                     /*
//                     ================================
//                     GET TOKEN
//                     ================================
//                     */

//                     const token =
//                         getToken();


//                     /*
//                     ================================
//                     NO TOKEN
//                     ================================
//                     */

//                     if (!token) {

//                         handleUnauthorized();

//                         return;
//                     }


//                     /*
//                     ================================
//                     API REQUEST
//                     ================================
//                     */

//                     const response =
//                         await axios.get(
//                             `${API_URL}/api/admin/dashboard/stats`,
//                             {
//                                 timeout: 15000,

//                                 headers: {
//                                     Authorization:
//                                         `Bearer ${token}`,
//                                 },
//                             }
//                         );


//                     /*
//                     ================================
//                     SUCCESS
//                     ================================
//                     */

//                     if (
//                         response.data.success
//                     ) {

//                         setStats(
//                             response.data.stats
//                         );

//                     }

//                 } catch (error) {

//                     console.error(
//                         "Failed to fetch dashboard stats:",
//                         error
//                     );


//                     /*
//                     ================================
//                     SESSION EXPIRED
//                     ================================
//                     */

//                     if (
//                         error.response?.status ===
//                         401
//                     ) {

//                         handleUnauthorized();

//                         return;
//                     }


//                     /*
//                     ================================
//                     TIMEOUT
//                     ================================
//                     */

//                     if (
//                         error.code ===
//                         "ECONNABORTED"
//                     ) {

//                         console.error(
//                             "Dashboard request timed out."
//                         );

//                     }

//                 } finally {

//                     /*
//                     ================================
//                     ALWAYS STOP LOADING
//                     ================================
//                     */

//                     setLoading(false);

//                 }

//             },
//             [
//                 getToken,
//                 handleUnauthorized,
//             ]
//         );


//     /*
//     ========================================
//     INITIAL LOAD
//     ========================================
//     */

//     useEffect(() => {

//         fetchDashboardStats();

//     }, [
//         fetchDashboardStats,
//     ]);


//     /*
//     ========================================
//     REFRESH WHEN TAB BECOMES VISIBLE
//     ========================================
//     */

//     useEffect(() => {

//         const handleVisibilityChange =
//             () => {

//                 if (
//                     document.visibilityState ===
//                     "visible"
//                 ) {

//                     fetchDashboardStats();

//                 }

//             };


//         document.addEventListener(
//             "visibilitychange",
//             handleVisibilityChange
//         );


//         return () => {

//             document.removeEventListener(
//                 "visibilitychange",
//                 handleVisibilityChange
//             );

//         };

//     }, [
//         fetchDashboardStats,
//     ]);


//     /*
//     ========================================
//     REFRESH WHEN WINDOW GETS FOCUS
//     ========================================
//     */

//     useEffect(() => {

//         const handleFocus = () => {

//             fetchDashboardStats();

//         };


//         window.addEventListener(
//             "focus",
//             handleFocus
//         );


//         return () => {

//             window.removeEventListener(
//                 "focus",
//                 handleFocus
//             );

//         };

//     }, [
//         fetchDashboardStats,
//     ]);


//     /*
//     ========================================
//     FORMAT CURRENCY
//     ========================================
//     */

//     const formatCurrency = (
//         amount
//     ) => {

//         return `₦${Number(
//             amount || 0
//         ).toLocaleString(
//             "en-NG",
//             {
//                 minimumFractionDigits: 2,
//                 maximumFractionDigits: 2,
//             }
//         )}`;

//     };


//     /*
//     ========================================
//     TREND TYPE
//     ========================================
//     */

//     const getTrendType = (
//         value
//     ) => {

//         return value >= 0
//             ? "up"
//             : "down";

//     };


//     /*
//     ========================================
//     TREND TEXT
//     ========================================
//     */

//     const getTrendText = (
//         value
//     ) => {

//         const absoluteValue =
//             Math.abs(
//                 Number(value || 0)
//             );

//         return `${absoluteValue}% from last week`;

//     };


//     /*
//     ========================================
//     RENDER
//     ========================================
//     */

//     return (

//         <div className="dashboard-page">


//             {/* ========================================
//                 STATS
//             ======================================== */}

//             <div className="stats-grid">


//                 {/* ====================================
//                     USERS
//                 ==================================== */}

//                 <StatCard
//                     icon={
//                         <FaUsers />
//                     }

//                     title="Total Users"

//                     value={
//                         loading
//                             ? "..."
//                             : Number(
//                                 stats.totalUsers || 0
//                             ).toLocaleString()
//                     }

//                     color="purple"

//                     trend={
//                         getTrendType(
//                             stats.trends?.users || 0
//                         )
//                     }

//                     trendText={
//                         getTrendText(
//                             stats.trends?.users || 0
//                         )
//                     }
//                 />


//                 {/* ====================================
//                     ORDERS
//                 ==================================== */}

//                 <StatCard
//                     icon={
//                         <FaClipboardList />
//                     }

//                     title="Total Orders"

//                     value={
//                         loading
//                             ? "..."
//                             : Number(
//                                 stats.totalOrders || 0
//                             ).toLocaleString()
//                     }

//                     color="green"

//                     trend={
//                         getTrendType(
//                             stats.trends?.orders || 0
//                         )
//                     }

//                     trendText={
//                         getTrendText(
//                             stats.trends?.orders || 0
//                         )
//                     }
//                 />


//                 {/* ====================================
//                     TRANSACTIONS
//                 ==================================== */}

//                 <StatCard
//                     icon={
//                         <FaExchangeAlt />
//                     }

//                     title="Total Transactions"

//                     value={
//                         loading
//                             ? "..."
//                             : Number(
//                                 stats.totalTransactions || 0
//                             ).toLocaleString()
//                     }

//                     color="orange"

//                     trend={
//                         getTrendType(
//                             stats.trends?.transactions || 0
//                         )
//                     }

//                     trendText={
//                         getTrendText(
//                             stats.trends?.transactions || 0
//                         )
//                     }
//                 />


//                 {/* ====================================
//                     REVENUE
//                 ==================================== */}

//                 <StatCard
//                     icon={
//                         <FaMoneyBillWave />
//                     }

//                     title="Total Revenue"

//                     value={
//                         loading
//                             ? "..."
//                             : formatCurrency(
//                                 stats.totalRevenue
//                             )
//                     }

//                     color="blue"

//                     trend={
//                         getTrendType(
//                             stats.trends?.revenue || 0
//                         )
//                     }

//                     trendText={
//                         getTrendText(
//                             stats.trends?.revenue || 0
//                         )
//                     }
//                 />

//             </div>


//             {/* ========================================
//                 SEND MAIL
//             ======================================== */}

//             <SendMail />


//         </div>

//     );

// };


// export default Dashboard;

import {
    useCallback,
    useEffect,
    useState,
} from "react";

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


/*
========================================
API URL
========================================
*/

const API_URL =
    process.env.REACT_APP_API_URL;


/*
========================================
DASHBOARD
========================================
*/

const Dashboard = () => {

    const navigate = useNavigate();


    /*
    ========================================
    STATS
    ========================================
    */

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


    /*
    ========================================
    LOADING
    ========================================
    */

    const [loading, setLoading] =
        useState(true);


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
    HANDLE SESSION EXPIRATION
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
    FETCH DASHBOARD STATS
    ========================================
    */

    const fetchDashboardStats =
        useCallback(
            async () => {

                try {

                    setLoading(true);


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
                            `${API_URL}/api/admin/dashboard/stats`,
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
                        "Failed to fetch dashboard stats:",
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
                            "Dashboard request timed out."
                        );

                    }

                } finally {

                    /*
                    ================================
                    ALWAYS STOP LOADING
                    ================================
                    */

                    setLoading(false);

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

        fetchDashboardStats();

    }, [
        fetchDashboardStats,
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

                    fetchDashboardStats();

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
        fetchDashboardStats,
    ]);


    /*
    ========================================
    REFRESH WHEN WINDOW GETS FOCUS
    ========================================
    */

    useEffect(() => {

        const handleFocus = () => {

            fetchDashboardStats();

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
        fetchDashboardStats,
    ]);


    /*
    ========================================
    FORMAT CURRENCY
    ========================================
    */

    const formatCurrency = (
        amount
    ) => {

        return `₦${Number(
            amount || 0
        ).toLocaleString(
            "en-NG",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }
        )}`;

    };


    /*
    ========================================
    TREND TYPE
    ========================================
    */

    const getTrendType = (
        value
    ) => {

        return value >= 0
            ? "up"
            : "down";

    };


    /*
    ========================================
    TREND TEXT
    ========================================
    */

    const getTrendText = (
        value
    ) => {

        const absoluteValue =
            Math.abs(
                Number(value || 0)
            );

        return `${absoluteValue}% from last week`;

    };


    /*
    ========================================
    SKELETON CARD
    ========================================
    */

    const SkeletonCard = () => {

        return (

            <div className="stat-card stat-card-skeleton">

                <div className="stat-card-top">

                    <div className="skeleton skeleton-icon"></div>

                </div>


                <div className="skeleton skeleton-title"></div>


                <div className="skeleton skeleton-value"></div>


                <div className="skeleton skeleton-trend"></div>

            </div>

        );

    };


    /*
    ========================================
    RENDER
    ========================================
    */

    return (

        <div className="dashboard-page">


            {/* ========================================
                STATS
            ======================================== */}

            <div className="stats-grid">

                {loading ? (

                    <>
                        <SkeletonCard />

                        <SkeletonCard />

                        <SkeletonCard />

                        <SkeletonCard />
                    </>

                ) : (

                    <>


                        {/* ====================================
                            USERS
                        ==================================== */}

                        <StatCard
                            icon={
                                <FaUsers />
                            }

                            title="Total Users"

                            value={
                                Number(
                                    stats.totalUsers || 0
                                ).toLocaleString()
                            }

                            color="purple"

                            trend={
                                getTrendType(
                                    stats.trends?.users || 0
                                )
                            }

                            trendText={
                                getTrendText(
                                    stats.trends?.users || 0
                                )
                            }
                        />


                        {/* ====================================
                            ORDERS
                        ==================================== */}

                        <StatCard
                            icon={
                                <FaClipboardList />
                            }

                            title="Total Orders"

                            value={
                                Number(
                                    stats.totalOrders || 0
                                ).toLocaleString()
                            }

                            color="green"

                            trend={
                                getTrendType(
                                    stats.trends?.orders || 0
                                )
                            }

                            trendText={
                                getTrendText(
                                    stats.trends?.orders || 0
                                )
                            }
                        />


                        {/* ====================================
                            TRANSACTIONS
                        ==================================== */}

                        <StatCard
                            icon={
                                <FaExchangeAlt />
                            }

                            title="Total Transactions"

                            value={
                                Number(
                                    stats.totalTransactions || 0
                                ).toLocaleString()
                            }

                            color="orange"

                            trend={
                                getTrendType(
                                    stats.trends?.transactions || 0
                                )
                            }

                            trendText={
                                getTrendText(
                                    stats.trends?.transactions || 0
                                )
                            }
                        />


                        {/* ====================================
                            REVENUE
                        ==================================== */}

                        <StatCard
                            icon={
                                <FaMoneyBillWave />
                            }

                            title="Total Revenue"

                            value={
                                formatCurrency(
                                    stats.totalRevenue
                                )
                            }

                            color="blue"

                            trend={
                                getTrendType(
                                    stats.trends?.revenue || 0
                                )
                            }

                            trendText={
                                getTrendText(
                                    stats.trends?.revenue || 0
                                )
                            }
                        />

                    </>

                )}

            </div>


            {/* ========================================
                SEND MAIL
            ======================================== */}

            <SendMail />


        </div>

    );

};


export default Dashboard;
