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
                SUCCESS
                ========================================
                */

                if (
                    response.data?.success
                ) {

                    const fetchedOrders =
                        response.data.orders || [];

                    const fetchedPagination =
                        response.data.pagination || {
                            currentPage: page,
                            totalPages: 1,
                            totalOrders:
                                fetchedOrders.length,
                            limit:
                                ITEMS_PER_PAGE,
                        };


                    setOrders(
                        fetchedOrders
                    );

                    setPagination(
                        fetchedPagination
                    );

                } else {

                    setOrders([]);

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

                setOrders([]);

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
    FETCH WHEN PAGE CHANGES
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

    const formatPrice = (
        price
    ) => {

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

    const getOTP = (
        order
    ) => {

        if (
            !Array.isArray(
                order?.sms
            ) ||
            order.sms.length === 0
        ) {

            return "—";

        }


        /*
        ========================================
        CHECK SMS FROM NEWEST TO OLDEST
        ========================================
        */

        const smsList =
            [...order.sms].reverse();


        for (
            const sms
            of smsList
        ) {

            /*
            ========================================
            DIRECT CODE
            ========================================
            */

            if (
                sms?.code
            ) {

                return String(
                    sms.code
                );

            }


            /*
            ========================================
            DIRECT OTP
            ========================================
            */

            if (
                sms?.otp
            ) {

                return String(
                    sms.otp
                );

            }


            /*
            ========================================
            SMS TEXT
            ========================================
            */

            const text =
                sms?.text ||
                sms?.message ||
                sms?.body ||
                "";


            if (
                text
            ) {

                const match =
                    String(text).match(
                        /\b\d{4,8}\b/
                    );

                if (match) {

                    return match[0];

                }

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

        return String(status)
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


               {/* =========================
    SKELETON LOADING
========================= */}

{Array.from({ length: 5 }).map((_, index) => (
    <div
        className="tx-row orders-row orders-skeleton"
        key={index}
    >

        {/* ORDER */}

        <div className="order-info">

            <div className="orders-skeleton-item orders-skeleton-title" />

            <div className="orders-skeleton-item orders-skeleton-text" />

        </div>


        {/* USER */}

        <div className="tx-info">

            <div className="user-details">

                <div className="orders-skeleton-item orders-skeleton-title" />

                <div className="orders-skeleton-item orders-skeleton-text" />

            </div>

        </div>


        {/* SERVICE */}

        <div className="order-service">

            <div className="orders-skeleton-item orders-skeleton-title" />

            <div className="orders-skeleton-item orders-skeleton-text" />

        </div>


        {/* PRICE */}

        <div className="user-balance">

            <div className="orders-skeleton-item orders-skeleton-price" />

        </div>


        {/* OTP */}

        <div className="order-otp">

            <div className="orders-skeleton-item orders-skeleton-otp" />

        </div>


        {/* STATUS */}

        <div className="tx-status-wrapper">

            <div className="orders-skeleton-item orders-skeleton-status" />

        </div>


        {/* DATE */}

        <div className="tx-date">

            <div className="orders-skeleton-item orders-skeleton-date" />

        </div>

    </div>
))}

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
        orders.length === 0
    ) {

        return (

            <div className="tx-table">

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
                        getOTP(
                            order
                        );


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

                    {pagination.totalOrders > 0
                        ? (
                            (
                                pagination.currentPage -
                                1
                            ) *
                            pagination.limit
                        ) + 1
                        : 0
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
                        type="button"
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

                    <button
                        type="button"
                        className="active"
                    >

                        {pagination.currentPage}

                    </button>


                    {/* NEXT */}

                    <button
                        type="button"
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
                            )
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
