// import React, {
//     useCallback,
//     useEffect,
//     useState,
// } from "react";

// import axios from "axios";
// import { useNavigate } from "react-router-dom";

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


// /*
// ========================================
// API URL
// ========================================
// */

// const API_URL =
//     process.env.REACT_APP_API_URL;


// /*
// ========================================
// ORDERS
// ========================================
// */

// const Orders = () => {

//     const navigate = useNavigate();


//     /*
//     ========================================
//     ORDER STATS
//     ========================================
//     */

//     const [stats, setStats] = useState({

//         totalOrders: 0,

//         completedOrders: 0,

//         activeOrders: 0,

//         cancelledOrders: 0,

//         completionRate: 0,

//         activeRate: 0,

//         cancelledRate: 0,

//     });


//     /*
//     ========================================
//     STATS LOADING
//     ========================================
//     */

//     const [statsLoading, setStatsLoading] =
//         useState(true);


//     /*
//     ========================================
//     SEARCH
//     ========================================
//     */

//     const [search, setSearch] =
//         useState("");


//     /*
//     ========================================
//     STATUS
//     ========================================
//     */

//     const [status, setStatus] =
//         useState("all");


//     /*
//     ========================================
//     SERVICE
//     ========================================
//     */

//     const [service, setService] =
//         useState("all");


//     /*
//     ========================================
//     SORT
//     ========================================
//     */

//     const [sort, setSort] =
//         useState("newest");


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
//     HANDLE UNAUTHORIZED
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
//     FETCH ORDER STATS
//     ========================================
//     */

//     const fetchOrderStats =
//         useCallback(
//             async () => {

//                 try {

//                     setStatsLoading(true);


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
//                             `${API_URL}/api/admin/orders/stats`,
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
//                         "Failed to fetch order stats:",
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
//                             "Order stats request timed out."
//                         );

//                     }

//                 } finally {

//                     setStatsLoading(false);

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

//         document.title =
//             "Orders - Numio";

//         fetchOrderStats();

//     }, [
//         fetchOrderStats,
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

//                     fetchOrderStats();

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
//         fetchOrderStats,
//     ]);


//     /*
//     ========================================
//     REFRESH WHEN WINDOW GETS FOCUS
//     ========================================
//     */

//     useEffect(() => {

//         const handleFocus = () => {

//             fetchOrderStats();

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
//         fetchOrderStats,
//     ]);


//     /*
//     ========================================
//     FORMAT NUMBER
//     ========================================
//     */

//     const formatNumber = (
//         value
//     ) => {

//         return Number(
//             value || 0
//         ).toLocaleString(
//             "en-US"
//         );

//     };


//     /*
//     ========================================
//     RENDER
//     ========================================
//     */

//     return (

//         <div className="users-page">


//             {/* ========================================
//                 STATS
//             ======================================== */}

//             <div className="stats-grid">


//                 {statsLoading ? (

//                     <>

//                         {/* ====================================
//                             TOTAL ORDERS SKELETON
//                         ==================================== */}

//                         <div className="stat-card admin-stat-skeleton">

//                             <div className="admin-skeleton-icon"></div>

//                             <div className="stats-details">

//                                 <div className="admin-skeleton-title"></div>

//                                 <div className="admin-skeleton-value"></div>

//                                 <div className="admin-skeleton-trend"></div>

//                             </div>

//                         </div>


//                         {/* ====================================
//                             COMPLETED ORDERS SKELETON
//                         ==================================== */}

//                         <div className="stat-card admin-stat-skeleton">

//                             <div className="admin-skeleton-icon"></div>

//                             <div className="stats-details">

//                                 <div className="admin-skeleton-title"></div>

//                                 <div className="admin-skeleton-value"></div>

//                                 <div className="admin-skeleton-trend"></div>

//                             </div>

//                         </div>


//                         {/* ====================================
//                             ACTIVE ORDERS SKELETON
//                         ==================================== */}

//                         <div className="stat-card admin-stat-skeleton">

//                             <div className="admin-skeleton-icon"></div>

//                             <div className="stats-details">

//                                 <div className="admin-skeleton-title"></div>

//                                 <div className="admin-skeleton-value"></div>

//                                 <div className="admin-skeleton-trend"></div>

//                             </div>

//                         </div>


//                         {/* ====================================
//                             CANCELLED ORDERS SKELETON
//                         ==================================== */}

//                         <div className="stat-card admin-stat-skeleton">

//                             <div className="admin-skeleton-icon"></div>

//                             <div className="stats-details">

//                                 <div className="admin-skeleton-title"></div>

//                                 <div className="admin-skeleton-value"></div>

//                                 <div className="admin-skeleton-trend"></div>

//                             </div>

//                         </div>

//                     </>

//                 ) : (

//                     <>


//                         {/* ====================================
//                             TOTAL ORDERS
//                         ==================================== */}

//                         <StatCard

//                             icon={
//                                 <FaClipboardList />
//                             }

//                             title="Total Orders"

//                             value={
//                                 formatNumber(
//                                     stats.totalOrders
//                                 )
//                             }

//                             trend={
//                                 stats.totalOrders > 0
//                                     ? "up"
//                                     : "down"
//                             }

//                             trendText="All orders"

//                             color="purple"

//                         />


//                         {/* ====================================
//                             COMPLETED ORDERS
//                         ==================================== */}

//                         <StatCard

//                             icon={
//                                 <FaCheckCircle />
//                             }

//                             title="Completed Orders"

//                             value={
//                                 formatNumber(
//                                     stats.completedOrders
//                                 )
//                             }

//                             trend={
//                                 stats.completedOrders > 0
//                                     ? "up"
//                                     : "down"
//                             }

//                             trendText={
//                                 `${stats.completionRate || 0}% completion rate`
//                             }

//                             color="green"

//                         />


//                         {/* ====================================
//                             ACTIVE ORDERS
//                         ==================================== */}

//                         <StatCard

//                             icon={
//                                 <FaClock />
//                             }

//                             title="Active Orders"

//                             value={
//                                 formatNumber(
//                                     stats.activeOrders
//                                 )
//                             }

//                             trend={
//                                 stats.activeOrders > 0
//                                     ? "up"
//                                     : "down"
//                             }

//                             trendText={
//                                 `${stats.activeRate || 0}% of total orders`
//                             }

//                             color="orange"

//                         />


//                         {/* ====================================
//                             CANCELLED ORDERS
//                         ==================================== */}

//                         <StatCard

//                             icon={
//                                 <FaTimesCircle />
//                             }

//                             title="Cancelled Orders"

//                             value={
//                                 formatNumber(
//                                     stats.cancelledOrders
//                                 )
//                             }

//                             trend={
//                                 stats.cancelledOrders > 0
//                                     ? "down"
//                                     : "up"
//                             }

//                             trendText={
//                                 `${stats.cancelledRate || 0}% of total orders`
//                             }

//                             color="red"

//                         />

//                     </>

//                 )}

//             </div>


//             {/* ========================================
//                 FILTERS
//             ======================================== */}

//             <div className="users-toolbar">


//                 {/* ====================================
//                     SEARCH
//                 ==================================== */}

//                 <div className="users-search">

//                     <FiSearch />

//                     <input

//                         type="text"

//                         value={
//                             search
//                         }

//                         onChange={(event) =>
//                             setSearch(
//                                 event.target.value
//                             )
//                         }

//                         placeholder="Search by order ID, phone or service..."

//                     />

//                 </div>


//                 {/* ====================================
//                     FILTERS
//                 ==================================== */}

//                 <div className="users-filters">


//                     {/* ==================================
//                         STATUS
//                     ================================== */}

//                     <div className="select-wrapper">

//                         <select

//                             value={
//                                 status
//                             }

//                             onChange={(event) =>
//                                 setStatus(
//                                     event.target.value
//                                 )
//                             }

//                         >

//                             <option value="all">
//                                 All Status
//                             </option>

//                             <option value="active">
//                                 Active
//                             </option>

//                             <option value="finished">
//                                 Finished
//                             </option>

//                             <option value="expired">
//                                 Expired
//                             </option>

//                             <option value="cancelled">
//                                 Cancelled
//                             </option>

//                         </select>

//                     </div>


//                     {/* ==================================
//                         SERVICE
//                     ================================== */}

//                     <div className="select-wrapper">

//                         <select

//                             value={
//                                 service
//                             }

//                             onChange={(event) =>
//                                 setService(
//                                     event.target.value
//                                 )
//                             }

//                         >

//                             <option value="all">
//                                 All Services
//                             </option>

//                             <option value="whatsapp">
//                                 WhatsApp
//                             </option>

//                             <option value="telegram">
//                                 Telegram
//                             </option>

//                             <option value="instagram">
//                                 Instagram
//                             </option>

//                             <option value="facebook">
//                                 Facebook
//                             </option>

//                             <option value="tiktok">
//                                 TikTok
//                             </option>

//                         </select>

//                     </div>


//                     {/* ==================================
//                         SORT
//                     ================================== */}

//                     <div className="select-wrapper">

//                         <select

//                             value={
//                                 sort
//                             }

//                             onChange={(event) =>
//                                 setSort(
//                                     event.target.value
//                                 )
//                             }

//                         >

//                             <option value="newest">
//                                 Newest
//                             </option>

//                             <option value="oldest">
//                                 Oldest
//                             </option>

//                             <option value="highest">
//                                 Highest Price
//                             </option>

//                             <option value="lowest">
//                                 Lowest Price
//                             </option>

//                         </select>

//                     </div>

//                 </div>

//             </div>


//             {/* ========================================
//                 ORDERS TABLE
//             ======================================== */}

//             <OrdersTable

//                 search={
//                     search
//                 }

//                 status={
//                     status
//                 }

//                 service={
//                     service
//                 }

//                 sort={
//                     sort
//                 }

//             />

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

import {
    FiChevronLeft,
    FiChevronRight,
    FiCopy,
    FiEye,
} from "react-icons/fi";

import "../styles/orders-table.css";


/*
========================================
API URL
========================================
*/

const API_URL =
    process.env.REACT_APP_API_URL;


/*
========================================
ORDERS TABLE
========================================
*/

const OrdersTable = ({
    search = "",
    status = "all",
    service = "all",
    sort = "newest",
}) => {

    const navigate = useNavigate();


    /*
    ========================================
    ORDERS
    ========================================
    */

    const [orders, setOrders] =
        useState([]);


    /*
    ========================================
    LOADING
    ========================================
    */

    const [loading, setLoading] =
        useState(true);


    /*
    ========================================
    PAGINATION
    ========================================
    */

    const [currentPage, setCurrentPage] =
        useState(1);

    const [totalPages, setTotalPages] =
        useState(1);

    const [totalOrders, setTotalOrders] =
        useState(0);


    /*
    ========================================
    COPIED ORDER
    ========================================
    */

    const [copiedOrder, setCopiedOrder] =
        useState(null);


    /*
    ========================================
    GET TOKEN
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
    FETCH ORDERS
    ========================================
    */

    const fetchOrders =
        useCallback(
            async () => {

                try {

                    setLoading(true);


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
                            `${API_URL}/api/admin/orders`,
                            {
                                timeout: 15000,

                                headers: {

                                    Authorization:
                                        `Bearer ${token}`,

                                },

                                params: {

                                    search:
                                        search.trim(),

                                    status,

                                    service,

                                    sort,

                                    page:
                                        currentPage,

                                    limit: 10,

                                },

                            }
                        );


                    /*
                    ================================
                    SUCCESS
                    ================================
                    */

                    if (
                        response.data?.success
                    ) {

                        setOrders(
                            response.data.orders || []
                        );


                        setTotalPages(
                            response.data.pagination
                                ?.totalPages || 1
                        );


                        setTotalOrders(
                            response.data.pagination
                                ?.totalOrders || 0
                        );

                    } else {

                        setOrders([]);

                    }

                } catch (error) {

                    console.error(
                        "Failed to fetch orders:",
                        error
                    );


                    /*
                    ================================
                    UNAUTHORIZED
                    ================================
                    */

                    if (
                        error.response?.status ===
                        401
                    ) {

                        handleUnauthorized();

                        return;

                    }


                    setOrders([]);

                } finally {

                    setLoading(false);

                }

            },
            [
                API_URL,
                currentPage,
                getToken,
                handleUnauthorized,
                search,
                service,
                sort,
                status,
            ]
        );


    /*
    ========================================
    RESET PAGE WHEN FILTERS CHANGE
    ========================================
    */

    useEffect(() => {

        setCurrentPage(1);

    }, [
        search,
        status,
        service,
        sort,
    ]);


    /*
    ========================================
    FETCH ORDERS
    ========================================
    */

    useEffect(() => {

        fetchOrders();

    }, [
        fetchOrders,
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

                    fetchOrders();

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
        fetchOrders,
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
    FORMAT PRICE
    ========================================
    */

    const formatPrice = (
        value
    ) => {

        return `₦${Number(
            value || 0
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
    FORMAT DATE
    ========================================
    */

    const formatDate = (
        date
    ) => {

        if (!date) {
            return "—";
        }

        const parsedDate =
            new Date(date);

        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {

            return "—";

        }

        return parsedDate.toLocaleDateString(
            "en-US",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );

    };


    /*
    ========================================
    FORMAT TIME
    ========================================
    */

    const formatTime = (
        date
    ) => {

        if (!date) {
            return "";
        }

        const parsedDate =
            new Date(date);

        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {

            return "";

        }

        return parsedDate.toLocaleTimeString(
            "en-US",
            {
                hour: "2-digit",
                minute: "2-digit",
            }
        );

    };


    /*
    ========================================
    STATUS LABEL
    ========================================
    */

    const getStatusLabel = (
        orderStatus
    ) => {

        switch (
            String(
                orderStatus || ""
            ).toUpperCase()
        ) {

            case "PENDING":
                return "Active";

            case "RECEIVED":
                return "Active";

            case "FINISHED":
                return "Finished";

            case "EXPIRED":
                return "Expired";

            case "CANCELLED":
                return "Cancelled";

            default:
                return orderStatus || "Unknown";

        }

    };


    /*
    ========================================
    STATUS CLASS
    ========================================
    */

    const getStatusClass = (
        orderStatus
    ) => {

        switch (
            String(
                orderStatus || ""
            ).toUpperCase()
        ) {

            case "PENDING":
            case "RECEIVED":
                return "active";

            case "FINISHED":
                return "finished";

            case "EXPIRED":
                return "expired";

            case "CANCELLED":
                return "cancelled";

            default:
                return "default";

        }

    };


    /*
    ========================================
    COPY ORDER ID
    ========================================
    */

    const copyOrderId = async (
        orderId
    ) => {

        try {

            await navigator.clipboard.writeText(
                String(orderId)
            );

            setCopiedOrder(orderId);

            setTimeout(() => {

                setCopiedOrder(null);

            }, 1500);

        } catch (error) {

            console.error(
                "Failed to copy order ID:",
                error
            );

        }

    };


    /*
    ========================================
    VIEW ORDER
    ========================================
    */

    const viewOrder = (
        order
    ) => {

        /*
         * Change this route if your
         * admin order details route
         * uses a different path.
         */

        navigate(
            `/orders/${order.orderId}`,
            {
                state: {
                    order,
                },
            }
        );

    };


    /*
    ========================================
    PAGINATION
    ========================================
    */

    const goToPreviousPage = () => {

        if (
            currentPage <= 1
        ) {
            return;
        }

        setCurrentPage(
            (page) => page - 1
        );

    };


    const goToNextPage = () => {

        if (
            currentPage >= totalPages
        ) {
            return;
        }

        setCurrentPage(
            (page) => page + 1
        );

    };


    /*
    ========================================
    TABLE SKELETON
    ========================================
    */

    const renderSkeleton = () => {

        return (

            <>

                {Array.from(
                    { length: 6 }
                ).map(
                    (_, index) => (

                        <div
                            className="orders-table-row orders-skeleton-row"
                            key={index}
                        >

                            <div>
                                <div className="orders-skeleton skeleton-order-id"></div>
                            </div>

                            <div>
                                <div className="orders-skeleton skeleton-phone"></div>
                            </div>

                            <div>
                                <div className="orders-skeleton skeleton-service"></div>
                            </div>

                            <div>
                                <div className="orders-skeleton skeleton-country"></div>
                            </div>

                            <div>
                                <div className="orders-skeleton skeleton-price"></div>
                            </div>

                            <div>
                                <div className="orders-skeleton skeleton-status"></div>
                            </div>

                            <div>
                                <div className="orders-skeleton skeleton-date"></div>
                            </div>

                            <div>
                                <div className="orders-skeleton skeleton-action"></div>
                            </div>

                        </div>

                    )
                )}

            </>

        );

    };


    /*
    ========================================
    EMPTY STATE
    ========================================
    */

    const renderEmptyState = () => {

        return (

            <div className="orders-empty">

                <div className="orders-empty-icon">

                    <FiEye />

                </div>

                <h3>
                    No orders found
                </h3>

                <p>
                    Try changing your search
                    or filter options.
                </p>

            </div>

        );

    };


    /*
    ========================================
    RENDER
    ========================================
    */

    return (

        <div className="orders-table-card">


            {/* ========================================
                TABLE HEADER
            ======================================== */}

            <div className="orders-table-header">

                <div>

                    <h3>
                        All Orders
                    </h3>

                    {!loading && (
                        <span>
                            {formatNumber(
                                totalOrders
                            )} orders
                        </span>
                    )}

                </div>

            </div>


            {/* ========================================
                DESKTOP TABLE
            ======================================== */}

            <div className="orders-table-wrapper">

                <div className="orders-table">


                    {/* ==================================
                        TABLE COLUMNS
                    ================================== */}

                    <div className="orders-table-head">

                        <div>
                            Order ID
                        </div>

                        <div>
                            Phone
                        </div>

                        <div>
                            Service
                        </div>

                        <div>
                            Country
                        </div>

                        <div>
                            Price
                        </div>

                        <div>
                            Status
                        </div>

                        <div>
                            Date
                        </div>

                        <div>
                            Action
                        </div>

                    </div>


                    {/* ==================================
                        LOADING
                    ================================== */}

                    {loading && (
                        renderSkeleton()
                    )}


                    {/* ==================================
                        EMPTY
                    ================================== */}

                    {!loading &&
                        orders.length === 0 &&
                        renderEmptyState()
                    }


                    {/* ==================================
                        ORDERS
                    ================================== */}

                    {!loading &&
                        orders.length > 0 &&
                        orders.map(
                            (order) => (

                                <div
                                    className="orders-table-row"
                                    key={
                                        order.id ||
                                        order.orderId
                                    }
                                >


                                    {/* ================================
                                        ORDER ID
                                    ================================ */}

                                    <div className="order-id-cell">

                                        <span>
                                            #{order.orderId}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                copyOrderId(
                                                    order.orderId
                                                )
                                            }
                                            title="Copy order ID"
                                        >

                                            <FiCopy />

                                        </button>

                                        {copiedOrder ===
                                            order.orderId && (
                                            <small>
                                                Copied
                                            </small>
                                        )}

                                    </div>


                                    {/* ================================
                                        PHONE
                                    ================================ */}

                                    <div className="order-phone-cell">

                                        {order.phone || "—"}

                                    </div>


                                    {/* ================================
                                        SERVICE
                                    ================================ */}

                                    <div className="order-service-cell">

                                        <span className="service-name">

                                            {order.service
                                                ? String(
                                                    order.service
                                                )
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                  String(
                                                    order.service
                                                  ).slice(1)
                                                : "—"}

                                        </span>

                                    </div>


                                    {/* ================================
                                        COUNTRY
                                    ================================ */}

                                    <div className="order-country-cell">

                                        {order.country || "—"}

                                    </div>


                                    {/* ================================
                                        PRICE
                                    ================================ */}

                                    <div className="order-price-cell">

                                        {formatPrice(
                                            order.price
                                        )}

                                    </div>


                                    {/* ================================
                                        STATUS
                                    ================================ */}

                                    <div>

                                        <span
                                            className={
                                                `order-status ${getStatusClass(
                                                    order.status
                                                )}`
                                            }
                                        >

                                            {getStatusLabel(
                                                order.status
                                            )}

                                        </span>

                                    </div>


                                    {/* ================================
                                        DATE
                                    ================================ */}

                                    <div className="order-date-cell">

                                        <span>
                                            {formatDate(
                                                order.createdAt
                                            )}
                                        </span>

                                        <small>
                                            {formatTime(
                                                order.createdAt
                                            )}
                                        </small>

                                    </div>


                                    {/* ================================
                                        ACTION
                                    ================================ */}

                                    <div className="order-action-cell">

                                        <button
                                            type="button"
                                            className="order-view-button"
                                            onClick={() =>
                                                viewOrder(
                                                    order
                                                )
                                            }
                                            title="View order"
                                        >

                                            <FiEye />

                                        </button>

                                    </div>

                                </div>

                            )
                        )}

                </div>

            </div>


            {/* ========================================
                MOBILE ORDERS
            ======================================== */}

            {!loading &&
                orders.length > 0 && (

                <div className="orders-mobile-list">

                    {orders.map(
                        (order) => (

                            <div
                                className="order-mobile-card"
                                key={
                                    `mobile-${order.id ||
                                    order.orderId}`
                                }
                            >

                                <div className="order-mobile-top">

                                    <div>

                                        <span className="order-mobile-label">
                                            Order
                                        </span>

                                        <strong>
                                            #{order.orderId}
                                        </strong>

                                    </div>

                                    <span
                                        className={
                                            `order-status ${getStatusClass(
                                                order.status
                                            )}`
                                        }
                                    >
                                        {getStatusLabel(
                                            order.status
                                        )}
                                    </span>

                                </div>


                                <div className="order-mobile-details">

                                    <div>

                                        <span>
                                            Phone
                                        </span>

                                        <strong>
                                            {order.phone || "—"}
                                        </strong>

                                    </div>

                                    <div>

                                        <span>
                                            Service
                                        </span>

                                        <strong>
                                            {order.service || "—"}
                                        </strong>

                                    </div>

                                    <div>

                                        <span>
                                            Country
                                        </span>

                                        <strong>
                                            {order.country || "—"}
                                        </strong>

                                    </div>

                                    <div>

                                        <span>
                                            Price
                                        </span>

                                        <strong>
                                            {formatPrice(
                                                order.price
                                            )}
                                        </strong>

                                    </div>

                                </div>


                                <div className="order-mobile-bottom">

                                    <div>

                                        <span>
                                            {formatDate(
                                                order.createdAt
                                            )}
                                        </span>

                                        <small>
                                            {formatTime(
                                                order.createdAt
                                            )}
                                        </small>

                                    </div>


                                    <div className="order-mobile-actions">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                copyOrderId(
                                                    order.orderId
                                                )
                                            }
                                        >

                                            <FiCopy />

                                            {copiedOrder ===
                                                order.orderId
                                                ? "Copied"
                                                : "Copy"}

                                        </button>


                                        <button
                                            type="button"
                                            onClick={() =>
                                                viewOrder(
                                                    order
                                                )
                                            }
                                        >

                                            <FiEye />

                                            View

                                        </button>

                                    </div>

                                </div>

                            </div>

                        )
                    )}

                </div>

            )}


            {/* ========================================
                PAGINATION
            ======================================== */}

            {!loading &&
                totalOrders > 0 && (

                <div className="orders-pagination">


                    <div className="orders-pagination-info">

                        Showing{" "}

                        <strong>
                            {(
                                (currentPage - 1) *
                                10
                            ) + 1}
                        </strong>

                        {" "}to{" "}

                        <strong>
                            {Math.min(
                                currentPage * 10,
                                totalOrders
                            )}
                        </strong>

                        {" "}of{" "}

                        <strong>
                            {formatNumber(
                                totalOrders
                            )}
                        </strong>

                    </div>


                    <div className="orders-pagination-controls">

                        <button
                            type="button"
                            onClick={
                                goToPreviousPage
                            }
                            disabled={
                                currentPage <= 1
                            }
                            title="Previous page"
                        >

                            <FiChevronLeft />

                        </button>


                        <span>

                            Page{" "}

                            <strong>
                                {currentPage}
                            </strong>

                            {" "}of{" "}

                            <strong>
                                {totalPages}
                            </strong>

                        </span>


                        <button
                            type="button"
                            onClick={
                                goToNextPage
                            }
                            disabled={
                                currentPage >=
                                totalPages
                            }
                            title="Next page"
                        >

                            <FiChevronRight />

                        </button>

                    </div>

                </div>

            )}

        </div>

    );

};


export default OrdersTable;
