import React, { useState } from "react";
import {
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";

const ITEMS_PER_PAGE = 4;

const orders = [
    {
        id: "ORD-1001",
        username: "johndoe",
        email: "john@example.com",
        service: "WhatsApp",
        country: "Nigeria",
        number: "+234 801 234 5678",
        price: "₦1,850",
        otp: "482931",
        status: "Finished",
        date: "2 Aug 2026",
    },
    {
        id: "ORD-1002",
        username: "janesmith",
        email: "jane@example.com",
        service: "Telegram",
        country: "United States",
        number: "+1 202 555 0184",
        price: "₦2,450",
        otp: "—",
        status: "Cancelled",
        date: "31 Jul 2026",
    },
    {
        id: "ORD-1003",
        username: "michael",
        email: "michael@example.com",
        service: "Instagram",
        country: "United Kingdom",
        number: "+44 7400 123456",
        price: "₦2,100",
        otp: "735214",
        status: "Expired",
        date: "28 Jul 2026",
    },
    {
        id: "ORD-1004",
        username: "sarah",
        email: "sarah@example.com",
        service: "Facebook",
        country: "Canada",
        number: "+1 416 555 0192",
        price: "₦1,950",
        otp: "—",
        status: "Cancelled",
        date: "25 Jul 2026",
    },
    {
        id: "ORD-1005",
        username: "david",
        email: "david@example.com",
        service: "TikTok",
        country: "Germany",
        number: "+49 151 23456789",
        price: "₦2,750",
        otp: "918463",
        status: "Finished",
        date: "20 Jul 2026",
    },
];

const OrdersTable = () => {

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(
        orders.length / ITEMS_PER_PAGE
    );

    const paginatedOrders = orders.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="tx-table">

            {/* =========================
                TABLE HEADER
            ========================= */}

            <div className="tx-table-head orders-head">

                <span>Order</span>

                <span>User</span>

                <span>Service</span>

                <span>Price</span>

                <span>OTP</span>

                <span>Status</span>

                <span>Date</span>

            </div>


            {/* =========================
                ORDERS
            ========================= */}

            {paginatedOrders.map((order) => (

                <div
                    className="tx-row orders-row"
                    key={order.id}
                >

                    {/* Order */}

                    <div className="order-info">

                        <h4>
                            {order.id}
                        </h4>

                        <p>
                            {order.number}
                        </p>

                    </div>


                    {/* User */}

                    <div className="tx-info">

                        <div className="user-details">

                            <h4>
                                {order.username}
                            </h4>

                            <p className="user-email">
                                {order.email}
                            </p>

                        </div>

                    </div>


                    {/* Service */}

                    <div className="order-service">

                        <h4>
                            {order.service}
                        </h4>

                        <p>
                            {order.country}
                        </p>

                    </div>


                    {/* Price */}

                    <div className="user-balance">

                        {order.price}

                    </div>


                    {/* OTP */}

                    <div className="order-otp">

                        {order.otp && order.otp !== "—"
                            ? order.otp
                            : "—"}

                    </div>


                    {/* Status */}

                    <div className="tx-status-wrapper">

                        <span
                            className={`tx-status ${order.status
                                .toLowerCase()
                                .replace(" ", "-")}`}
                        >
                            {order.status}
                        </span>

                    </div>


                    {/* Date */}

                    <div className="tx-date">

                        <span>
                            {order.date}
                        </span>

                    </div>

                </div>

            ))}


            {/* Pagination */}
            <div className="users-pagination">
                <p className="pagination-text">
                    Showing{" "}
                    {(currentPage - 1) * ITEMS_PER_PAGE + 1}{" "}
                    to{" "}
                    {Math.min(
                        currentPage * ITEMS_PER_PAGE,
                        orders.length
                    )}{" "}
                    of {orders.length} orders
                </p>

                <div className="tx-pages">

                    <button
                        className="prev-btn"
                        disabled={currentPage === 1}
                        onClick={() =>
                            setCurrentPage((prev) => prev - 1)
                        }
                    >
                        <FiChevronLeft />
                    </button>

                    <button className="active">
                        {currentPage}
                    </button>

                    <button
                        className="next-btn"
                        disabled={currentPage === totalPages}
                        onClick={() =>
                            setCurrentPage((prev) => prev + 1)
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