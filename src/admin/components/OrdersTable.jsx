// import React, { useState } from "react";
// import {
//     FiChevronLeft,
//     FiChevronRight,
// } from "react-icons/fi";

// const ITEMS_PER_PAGE = 4;

// const orders = [
//     {
//         id: "ORD-1001",
//         username: "johndoe",
//         email: "john@example.com",
//         service: "WhatsApp",
//         country: "Nigeria",
//         number: "+234 801 234 5678",
//         price: "₦1,850",
//         otp: "482931",
//         status: "Finished",
//         date: "2 Aug 2026",
//     },
//     {
//         id: "ORD-1002",
//         username: "janesmith",
//         email: "jane@example.com",
//         service: "Telegram",
//         country: "United States",
//         number: "+1 202 555 0184",
//         price: "₦2,450",
//         otp: "—",
//         status: "Cancelled",
//         date: "31 Jul 2026",
//     },
//     {
//         id: "ORD-1003",
//         username: "michael",
//         email: "michael@example.com",
//         service: "Instagram",
//         country: "United Kingdom",
//         number: "+44 7400 123456",
//         price: "₦2,100",
//         otp: "735214",
//         status: "Expired",
//         date: "28 Jul 2026",
//     },
//     {
//         id: "ORD-1004",
//         username: "sarah",
//         email: "sarah@example.com",
//         service: "Facebook",
//         country: "Canada",
//         number: "+1 416 555 0192",
//         price: "₦1,950",
//         otp: "—",
//         status: "Cancelled",
//         date: "25 Jul 2026",
//     },
//     {
//         id: "ORD-1005",
//         username: "david",
//         email: "david@example.com",
//         service: "TikTok",
//         country: "Germany",
//         number: "+49 151 23456789",
//         price: "₦2,750",
//         otp: "918463",
//         status: "Finished",
//         date: "20 Jul 2026",
//     },
// ];

// const OrdersTable = () => {

//     const [currentPage, setCurrentPage] = useState(1);

//     const totalPages = Math.ceil(
//         orders.length / ITEMS_PER_PAGE
//     );

//     const paginatedOrders = orders.slice(
//         (currentPage - 1) * ITEMS_PER_PAGE,
//         currentPage * ITEMS_PER_PAGE
//     );

//     return (
//         <div className="tx-table">

//             {/* =========================
//                 TABLE HEADER
//             ========================= */}

//             <div className="tx-table-head orders-head">

//                 <span>Order</span>

//                 <span>User</span>

//                 <span>Service</span>

//                 <span>Price</span>

//                 <span>OTP</span>

//                 <span>Status</span>

//                 <span>Date</span>

//             </div>


//             {/* =========================
//                 ORDERS
//             ========================= */}

//             {paginatedOrders.map((order) => (

//                 <div
//                     className="tx-row orders-row"
//                     key={order.id}
//                 >

//                     {/* Order */}

//                     <div className="order-info">

//                         <h4>
//                             {order.id}
//                         </h4>

//                         <p>
//                             {order.number}
//                         </p>

//                     </div>


//                     {/* User */}

//                     <div className="tx-info">

//                         <div className="user-details">

//                             <h4>
//                                 {order.username}
//                             </h4>

//                             <p className="user-email">
//                                 {order.email}
//                             </p>

//                         </div>

//                     </div>


//                     {/* Service */}

//                     <div className="order-service">

//                         <h4>
//                             {order.service}
//                         </h4>

//                         <p>
//                             {order.country}
//                         </p>

//                     </div>


//                     {/* Price */}

//                     <div className="user-balance">

//                         {order.price}

//                     </div>


//                     {/* OTP */}

//                     <div className="order-otp">

//                         {order.otp && order.otp !== "—"
//                             ? order.otp
//                             : "—"}

//                     </div>


//                     {/* Status */}

//                     <div className="tx-status-wrapper">

//                         <span
//                             className={`tx-status ${order.status
//                                 .toLowerCase()
//                                 .replace(" ", "-")}`}
//                         >
//                             {order.status}
//                         </span>

//                     </div>


//                     {/* Date */}

//                     <div className="tx-date">

//                         <span>
//                             {order.date}
//                         </span>

//                     </div>

//                 </div>

//             ))}


//             {/* Pagination */}
//             <div className="users-pagination">
//                 <p className="pagination-text">
//                     Showing{" "}
//                     {(currentPage - 1) * ITEMS_PER_PAGE + 1}{" "}
//                     to{" "}
//                     {Math.min(
//                         currentPage * ITEMS_PER_PAGE,
//                         orders.length
//                     )}{" "}
//                     of {orders.length} orders
//                 </p>

//                 <div className="tx-pages">

//                     <button
//                         className="prev-btn"
//                         disabled={currentPage === 1}
//                         onClick={() =>
//                             setCurrentPage((prev) => prev - 1)
//                         }
//                     >
//                         <FiChevronLeft />
//                     </button>

//                     <button className="active">
//                         {currentPage}
//                     </button>

//                     <button
//                         className="next-btn"
//                         disabled={currentPage === totalPages}
//                         onClick={() =>
//                             setCurrentPage((prev) => prev + 1)
//                         }
//                     >
//                         <FiChevronRight />
//                     </button>

//                 </div>
//             </div>

//         </div>
//     );
// };

// export default OrdersTable;

import React, {
    useCallback,
    useEffect,
    useState,
} from "react";

import axios from "axios";

import {
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";


/*
========================================
API URL
========================================
*/

const API_URL =
    process.env.REACT_APP_API_URL;


/*
========================================
ITEMS PER PAGE
========================================
*/

const ITEMS_PER_PAGE = 10;


/*
========================================
ORDERS TABLE
========================================
*/

const OrdersTable = () => {

    /*
    ========================================
    STATE
    ========================================
    */

    const [orders, setOrders] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [currentPage, setCurrentPage] =
        useState(1);

    const [pagination, setPagination] =
        useState({
            currentPage: 1,
            totalPages: 1,
            totalOrders: 0,
            limit: ITEMS_PER_PAGE,
        });


    /*
    ========================================
    FETCH ORDERS
    ========================================
    */

    const fetchOrders = useCallback(
        async (page) => {

            try {

                setLoading(true);
                setError("");

                const token =
                    localStorage.getItem(
                        "token"
                    );


                /*
                ========================================
                API REQUEST
                ========================================
                */

                const response =
                    await axios.get(
                        `${API_URL}/api/admin/orders`,
                        {
                            params: {
                                page,
                                limit: ITEMS_PER_PAGE,
                            },

                            headers: {
                                Authorization:
                                    `Bearer ${token}`,
                            },
                        }
                    );


                /*
                ========================================
                SUCCESS RESPONSE
                ========================================
                */

                if (
                    response.data?.success
                ) {

                    setOrders(
                        response.data.orders || []
                    );

                    setPagination(
                        response.data.pagination || {
                            currentPage: page,
                            totalPages: 1,
                            totalOrders: 0,
                            limit: ITEMS_PER_PAGE,
                        }
                    );

                } else {

                    setError(
                        response.data?.message ||
                        "Failed to fetch orders"
                    );

                }

            } catch (error) {

                console.error(
                    "Fetch admin orders error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to fetch orders"
                );

            } finally {

                setLoading(false);

            }

        },
        []
    );


    /*
    ========================================
    FETCH ON PAGE CHANGE
    ========================================
    */

    useEffect(() => {

        fetchOrders(
            currentPage
        );

    }, [
        currentPage,
        fetchOrders,
    ]);


    /*
    ========================================
    FORMAT PRICE
    ========================================
    */

    const formatPrice = (price) => {

        return new Intl.NumberFormat(
            "en-NG",
            {
                style: "currency",
                currency: "NGN",
                maximumFractionDigits: 0,
            }
        ).format(
            Number(price || 0)
        );

    };


    /*
    ========================================
    FORMAT DATE
    ========================================
    */

    const formatDate = (date) => {

        if (!date) {
            return "—";
        }

        return new Date(
            date
        ).toLocaleDateString(
            "en-GB",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            }
        );

    };


    /*
    ========================================
    GET OTP
    ========================================
    */

    const getOTP = (order) => {

        if (
            !order.sms ||
            !Array.isArray(order.sms) ||
            order.sms.length === 0
        ) {

            return "—";

        }


        /*
        ========================================
        GET LATEST SMS
        ========================================
        */

        const latestSMS =
            order.sms[
                order.sms.length - 1
            ];


        /*
        ========================================
        DIRECT CODE
        ========================================
        */

        if (
            latestSMS?.code
        ) {

            return latestSMS.code;

        }


        /*
        ========================================
        DIRECT OTP
        ========================================
        */

        if (
            latestSMS?.otp
        ) {

            return latestSMS.otp;

        }


        /*
        ========================================
        EXTRACT FROM TEXT
        ========================================
        */

        if (
            latestSMS?.text
        ) {

            const match =
                latestSMS.text.match(
                    /\b\d{4,8}\b/
                );

            if (match) {

                return match[0];

            }

        }


        /*
        ========================================
        EXTRACT FROM MESSAGE
        ========================================
        */

        if (
            latestSMS?.message
        ) {

            const match =
                latestSMS.message.match(
                    /\b\d{4,8}\b/
                );

            if (match) {

                return match[0];

            }

        }


        return "—";

    };


    /*
    ========================================
    STATUS CLASS
    ========================================
    */

    const getStatusClass = (
        status
    ) => {

        if (!status) {

            return "";

        }

        return status
            .toLowerCase()
            .replace(/\s+/g, "-");

    };


    /*
    ========================================
    LOADING STATE
    ========================================
    */

    if (loading) {

        return (

            <div className="tx-table">

                {/* TABLE HEADER */}

                <div className="tx-table-head orders-head">

                    <span>
                        Order
                    </span>

                    <span>
                        User
                    </span>

                    <span>
                        Service
                    </span>

                    <span>
                        Price
                    </span>

                    <span>
                        OTP
                    </span>

                    <span>
                        Status
                    </span>

                    <span>
                        Date
                    </span>

                </div>


                {/* SKELETON ROWS */}

                {Array.from(
                    { length: 5 }
                ).map(
                    (_, index) => (

                        <div
                            className="tx-row orders-row"
                            key={index}
                        >

                            {/* Order */}

                            <div className="order-info">

                                <div className="skeleton skeleton-title" />

                                <div className="skeleton skeleton-text" />

                            </div>


                            {/* User */}

                            <div className="tx-info">

                                <div className="skeleton skeleton-title" />

                                <div className="skeleton skeleton-text" />

                            </div>


                            {/* Service */}

                            <div className="order-service">

                                <div className="skeleton skeleton-title" />

                                <div className="skeleton skeleton-text" />

                            </div>


                            {/* Price */}

                            <div className="user-balance">

                                <div className="skeleton skeleton-price" />

                            </div>


                            {/* OTP */}

                            <div className="order-otp">

                                <div className="skeleton skeleton-otp" />

                            </div>


                            {/* Status */}

                            <div className="tx-status-wrapper">

                                <div className="skeleton skeleton-status" />

                            </div>


                            {/* Date */}

                            <div className="tx-date">

                                <div className="skeleton skeleton-date" />

                            </div>

                        </div>

                    )
                )}

            </div>

        );

    }


    /*
    ========================================
    ERROR STATE
    ========================================
    */

    if (error) {

        return (

            <div className="tx-table">

                <div className="orders-empty">

                    <p>
                        {error}
                    </p>


                    <button
                        type="button"
                        onClick={() =>
                            fetchOrders(
                                currentPage
                            )
                        }
                    >
                        Try Again
                    </button>

                </div>

            </div>

        );

    }


    /*
    ========================================
    EMPTY STATE
    ========================================
    */

    if (
        !orders.length
    ) {

        return (

            <div className="tx-table">

                {/* TABLE HEADER */}

                <div className="tx-table-head orders-head">

                    <span>
                        Order
                    </span>

                    <span>
                        User
                    </span>

                    <span>
                        Service
                    </span>

                    <span>
                        Price
                    </span>

                    <span>
                        OTP
                    </span>

                    <span>
                        Status
                    </span>

                    <span>
                        Date
                    </span>

                </div>


                {/* EMPTY */}

                <div className="orders-empty">

                    <p>
                        No orders found.
                    </p>

                </div>

            </div>

        );

    }


    /*
    ========================================
    RENDER
    ========================================
    */

    return (

        <div className="tx-table">

            {/* =========================
                TABLE HEADER
            ========================= */}

            <div className="tx-table-head orders-head">

                <span>
                    Order
                </span>

                <span>
                    User
                </span>

                <span>
                    Service
                </span>

                <span>
                    Price
                </span>

                <span>
                    OTP
                </span>

                <span>
                    Status
                </span>

                <span>
                    Date
                </span>

            </div>


            {/* =========================
                ORDERS
            ========================= */}

            {orders.map(
                (order) => {

                    const otp =
                        getOTP(order);


                    return (

                        <div
                            className="tx-row orders-row"
                            key={
                                order.id ||
                                order.orderId
                            }
                        >

                            {/* =========================
                                ORDER
                            ========================= */}

                            <div className="order-info">

                                <h4>
                                    {order.orderId
                                        ? `ORD-${order.orderId}`
                                        : "—"}
                                </h4>

                                <p>
                                    {order.phone ||
                                        "—"}
                                </p>

                            </div>


                            {/* =========================
                                USER
                            ========================= */}

                            <div className="tx-info">

                                <div className="user-details">

                                    <h4>
                                        {order.username ||
                                            "User"}
                                    </h4>

                                    <p className="user-email">

                                        {order.email ||
                                            "—"}

                                    </p>

                                </div>

                            </div>


                            {/* =========================
                                SERVICE
                            ========================= */}

                            <div className="order-service">

                                <h4>
                                    {order.service ||
                                        "—"}
                                </h4>

                                <p>
                                    {order.country ||
                                        "—"}
                                </p>

                            </div>


                            {/* =========================
                                PRICE
                            ========================= */}

                            <div className="user-balance">

                                {formatPrice(
                                    order.price
                                )}

                            </div>


                            {/* =========================
                                OTP
                            ========================= */}

                            <div className="order-otp">

                                {otp}

                            </div>


                            {/* =========================
                                STATUS
                            ========================= */}

                            <div className="tx-status-wrapper">

                                <span
                                    className={
                                        `tx-status ${getStatusClass(
                                            order.status
                                        )}`
                                    }
                                >
                                    {order.status ||
                                        "Unknown"}
                                </span>

                            </div>


                            {/* =========================
                                DATE
                            ========================= */}

                            <div className="tx-date">

                                <span>
                                    {formatDate(
                                        order.createdAt
                                    )}
                                </span>

                            </div>

                        </div>

                    );

                }
            )}


            {/* =========================
                PAGINATION
            ========================= */}

            <div className="users-pagination">

                <p className="pagination-text">

                    Showing{" "}

                    {pagination.totalOrders === 0
                        ? 0
                        : (
                            (
                                pagination.currentPage -
                                1
                            ) *
                            pagination.limit
                        ) + 1
                    }

                    {" "}to{" "}

                    {Math.min(
                        pagination.currentPage *
                            pagination.limit,
                        pagination.totalOrders
                    )}

                    {" "}of{" "}

                    {pagination.totalOrders}

                    {" "}orders

                </p>


                <div className="tx-pages">

                    {/* PREVIOUS */}

                    <button
                        className="prev-btn"
                        disabled={
                            pagination.currentPage <= 1
                        }
                        onClick={() =>
                            setCurrentPage(
                                (prev) =>
                                    Math.max(
                                        prev - 1,
                                        1
                                    )
                            )
                        }
                    >

                        <FiChevronLeft />

                    </button>


                    {/* CURRENT PAGE */}

                    <button className="active">

                        {pagination.currentPage}

                    </button>


                    {/* NEXT */}

                    <button
                        className="next-btn"
                        disabled={
                            pagination.currentPage >=
                            pagination.totalPages
                        }
                        onClick={() =>
                            setCurrentPage(
                                (prev) =>
                                    Math.min(
                                        prev + 1,
                                        pagination.totalPages
                                    )
                            }
                        }
                    >

                        <FiChevronRight />

                    </button>

                </div>

            </div>

        </div>

    );

};


export default OrdersTable;
