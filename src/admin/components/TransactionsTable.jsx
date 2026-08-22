// import React, { useState } from "react";
// import {
//     FiTrash2,
//     FiCheck,
//     FiChevronLeft,
//     FiChevronRight,
// } from "react-icons/fi";

// const ITEMS_PER_PAGE = 4;

// const transactions = [
//     {
//         id: "TXN-1001",
//         username: "johndoe",
//         email: "john@example.com",
//         type: "Deposit",
//         provider: "Paystack",
//         amount: "₦50,000",
//         status: "Success",
//         date: "2 Aug 2026",
//     },
//     {
//         id: "TXN-1002",
//         username: "janesmith",
//         email: "jane@example.com",
//         type: "Purchase",
//         provider: "System",
//         amount: "₦2,450",
//         status: "Success",
//         date: "31 Jul 2026",
//     },
//     {
//         id: "TXN-1003",
//         username: "michael",
//         email: "michael@example.com",
//         type: "Deposit",
//         provider: "Flutterwave",
//         amount: "₦20,000",
//         status: "Pending",
//         date: "28 Jul 2026",
//     },
//     {
//         id: "TXN-1004",
//         username: "sarah",
//         email: "sarah@example.com",
//         type: "Refund",
//         provider: "System",
//         amount: "₦1,950",
//         status: "Failed",
//         date: "25 Jul 2026",
//     },
//     {
//         id: "TXN-1005",
//         username: "david",
//         email: "david@example.com",
//         type: "Deposit",
//         provider: "Paystack",
//         amount: "₦75,000",
//         status: "Success",
//         date: "20 Jul 2026",
//     },
// ];

// const TransactionsTable = () => {
//     const [currentPage, setCurrentPage] = useState(1);

//     const totalPages = Math.ceil(
//         transactions.length / ITEMS_PER_PAGE
//     );

//     const paginatedTransactions = transactions.slice(
//         (currentPage - 1) * ITEMS_PER_PAGE,
//         currentPage * ITEMS_PER_PAGE
//     );

//     const handleDelete = (transaction) => {
//         console.log("Delete transaction:", transaction.id);

//         // Add delete API call here
//     };

//     const handleConfirm = (transaction) => {
//         console.log("Confirm transaction:", transaction.id);

//         // Add confirm API call here
//     };

//     return (
//         <div className="transactions-table">

//             {/* =========================
//                 DESKTOP TABLE HEADER
//             ========================= */}

//             <div className="transactions-table-head">

//                 <span>Reference</span>
//                 <span>User</span>
//                 <span>Type</span>
//                 <span>Amount</span>
//                 <span>Status</span>
//                 <span>Date</span>
//                 <span>Actions</span>

//             </div>


//             {/* =========================
//                 TRANSACTIONS
//             ========================= */}

//             {paginatedTransactions.map((transaction) => (

//                 <div
//                     className="transactions-row"
//                     key={transaction.id}
//                 >

//                     {/* Reference */}

//                     <div className="transaction-reference">

//                         <h4>
//                             {transaction.id}
//                         </h4>

//                         <p>
//                             {transaction.provider}
//                         </p>

//                     </div>


//                     {/* User */}

//                     <div className="transaction-user">

//                         <h4>
//                             {transaction.username}
//                         </h4>

//                         <p>
//                             {transaction.email}
//                         </p>

//                     </div>


//                     {/* Type */}

//                     <div className="transaction-type">

//                         <h4>
//                             {transaction.type}
//                         </h4>

//                         <p>
//                             {transaction.provider}
//                         </p>

//                     </div>


//                     {/* Amount */}

//                     <div className="transaction-amount">
//                         {transaction.amount}
//                     </div>


//                     {/* Status */}

//                     <div className="transaction-status">

//                         <span
//                             className={`tx-status ${transaction.status
//                                 .toLowerCase()
//                                 .replace(/\s+/g, "-")}`}
//                         >
//                             {transaction.status}
//                         </span>

//                     </div>


//                     {/* Date */}

//                     <div className="transaction-date">

//                         <span>
//                             {transaction.date}
//                         </span>

//                     </div>


//                     {/* Actions */}

//                     <div className="transaction-actions">

//                         {/* SUCCESS → DELETE */}

//                         {transaction.status === "Success" && (

//                             <button
//                                 type="button"
//                                 className="transaction-delete-btn"
//                                 onClick={() =>
//                                     handleDelete(transaction)
//                                 }
//                             >
//                                 <FiTrash2 />
//                                 <span>Delete</span>
//                             </button>

//                         )}


//                         {/* PENDING → CONFIRM */}

//                         {transaction.status === "Pending" && (

//                             <button
//                                 type="button"
//                                 className="transaction-confirm-btn"
//                                 onClick={() =>
//                                     handleConfirm(transaction)
//                                 }
//                             >
//                                 <FiCheck />
//                                 <span>Confirm</span>
//                             </button>

//                         )}

//                     </div>

//                 </div>

//             ))}


//             {/* =========================
//                 PAGINATION
//             ========================= */}

//             <div className="transactions-pagination">

//                 <p className="pagination-text">

//                     Showing{" "}
//                     {(currentPage - 1) * ITEMS_PER_PAGE + 1}
//                     {" "}to{" "}
//                     {Math.min(
//                         currentPage * ITEMS_PER_PAGE,
//                         transactions.length
//                     )}
//                     {" "}of {transactions.length} transactions

//                 </p>


//                 <div className="tx-pages">

//                     <button
//                         className="prev-btn"
//                         disabled={currentPage === 1}
//                         onClick={() =>
//                             setCurrentPage(
//                                 (prev) => prev - 1
//                             )
//                         }
//                     >
//                         <FiChevronLeft />
//                     </button>


//                     <button className="active">
//                         {currentPage}
//                     </button>


//                     <button
//                         className="next-btn"
//                         disabled={
//                             currentPage === totalPages
//                         }
//                         onClick={() =>
//                             setCurrentPage(
//                                 (prev) => prev + 1
//                             )
//                         }
//                     >
//                         <FiChevronRight />
//                     </button>

//                 </div>

//             </div>

//         </div>
//     );
// };

// export default TransactionsTable;

import React from "react";

import {
    FiTrash2,
    FiCheck,
} from "react-icons/fi";


/*
========================================
TRANSACTIONS TABLE
========================================
*/

const TransactionsTable = ({
    transactions = [],
    loading = false,
}) => {


    /*
    ========================================
    DELETE TRANSACTION
    ========================================
    */

    const handleDelete = (
        transaction
    ) => {

        console.log(
            "Delete transaction:",
            transaction.reference
        );

        /*
        ========================================
        DELETE API CAN BE ADDED HERE
        ========================================

        Example:

        await axios.delete(
            `${API_URL}/api/admin/transactions/${transaction.id}`
        );

        ========================================
        */

    };


    /*
    ========================================
    CONFIRM TRANSACTION
    ========================================
    */

    const handleConfirm = (
        transaction
    ) => {

        console.log(
            "Confirm transaction:",
            transaction.reference
        );

        /*
        ========================================
        CONFIRM API CAN BE ADDED HERE
        ========================================

        Example:

        await axios.patch(
            `${API_URL}/api/admin/transactions/${transaction.id}/confirm`
        );

        ========================================
        */

    };


    /*
    ========================================
    FORMAT AMOUNT
    ========================================
    */

    const formatAmount = (
        amount,
        currency = "NGN"
    ) => {

        const formatted =
            Number(
                amount || 0
            ).toLocaleString(
                "en-NG"
            );

        if (
            currency === "NGN"
        ) {
            return `₦${formatted}`;
        }

        return `${currency} ${formatted}`;

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
    STATUS CLASS
    ========================================
    */

    const getStatusClass = (
        status
    ) => {

        return String(
            status || ""
        )
            .toLowerCase()
            .replace(
                /\s+/g,
                "-"
            );

    };


    /*
    ========================================
    LOADING
    ========================================
    */

    if (loading) {

        return (

            <div className="transactions-table">

                {/* =========================
                    TABLE HEADER
                ========================= */}

                <div className="transactions-table-head">

                    <span>
                        Reference
                    </span>

                    <span>
                        User
                    </span>

                    <span>
                        Type
                    </span>

                    <span>
                        Amount
                    </span>

                    <span>
                        Status
                    </span>

                    <span>
                        Date
                    </span>

                    <span>
                        Actions
                    </span>

                </div>


                {/* =========================
                    LOADING
                ========================= */}

                <div className="transactions-table-loading">

                    Loading transactions...

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
        !transactions.length
    ) {

        return (

            <div className="transactions-table">

                {/* =========================
                    TABLE HEADER
                ========================= */}

                <div className="transactions-table-head">

                    <span>
                        Reference
                    </span>

                    <span>
                        User
                    </span>

                    <span>
                        Type
                    </span>

                    <span>
                        Amount
                    </span>

                    <span>
                        Status
                    </span>

                    <span>
                        Date
                    </span>

                    <span>
                        Actions
                    </span>

                </div>


                {/* =========================
                    EMPTY STATE
                ========================= */}

                <div className="transactions-table-empty">

                    No transactions found.

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

        <div className="transactions-table">


            {/* =========================
                DESKTOP TABLE HEADER
            ========================= */}

            <div className="transactions-table-head">

                <span>
                    Reference
                </span>

                <span>
                    User
                </span>

                <span>
                    Type
                </span>

                <span>
                    Amount
                </span>

                <span>
                    Status
                </span>

                <span>
                    Date
                </span>

                <span>
                    Actions
                </span>

            </div>


            {/* =========================
                TRANSACTIONS
            ========================= */}

            {transactions.map(
                (transaction) => (

                    <div
                        className="transactions-row"
                        key={
                            transaction.id
                        }
                    >


                        {/* =====================
                            REFERENCE
                        ===================== */}

                        <div className="transaction-reference">

                            <h4>
                                {
                                    transaction.reference ||
                                    "—"
                                }
                            </h4>

                            <p>
                                {
                                    transaction.provider ||
                                    "—"
                                }
                            </p>

                        </div>


                        {/* =====================
                            USER
                        ===================== */}

                        <div className="transaction-user">

                            <h4>
                                {
                                    transaction.username ||
                                    "—"
                                }
                            </h4>

                            <p>
                                {
                                    transaction.email ||
                                    "—"
                                }
                            </p>

                        </div>


                        {/* =====================
                            TYPE
                        ===================== */}

                        <div className="transaction-type">

                            <h4>
                                {
                                    transaction.type ||
                                    "—"
                                }
                            </h4>

                            <p>
                                {
                                    transaction.paymentMethod ||
                                    transaction.provider ||
                                    "—"
                                }
                            </p>

                        </div>


                        {/* =====================
                            AMOUNT
                        ===================== */}

                        <div className="transaction-amount">

                            {
                                formatAmount(
                                    transaction.amount,
                                    transaction.currency
                                )
                            }

                        </div>


                        {/* =====================
                            STATUS
                        ===================== */}

                        <div className="transaction-status">

                            <span
                                className={`tx-status ${getStatusClass(
                                    transaction.status
                                )}`}
                            >

                                {
                                    transaction.status ||
                                    "Unknown"
                                }

                            </span>

                        </div>


                        {/* =====================
                            DATE
                        ===================== */}

                        <div className="transaction-date">

                            <span>

                                {
                                    formatDate(
                                        transaction.createdAt
                                    )
                                }

                            </span>

                        </div>


                        {/* =====================
                            ACTIONS
                        ===================== */}

                        <div className="transaction-actions">


                            {/* =================
                                SUCCESS
                            ================= */}

                            {transaction.status ===
                                "SUCCESS" && (

                                <button
                                    type="button"
                                    className="transaction-delete-btn"
                                    onClick={() =>
                                        handleDelete(
                                            transaction
                                        )
                                    }
                                >

                                    <FiTrash2 />

                                    <span>
                                        Delete
                                    </span>

                                </button>

                            )}


                            {/* =================
                                PENDING
                            ================= */}

                            {transaction.status ===
                                "PENDING" && (

                                <button
                                    type="button"
                                    className="transaction-confirm-btn"
                                    onClick={() =>
                                        handleConfirm(
                                            transaction
                                        )
                                    }
                                >

                                    <FiCheck />

                                    <span>
                                        Confirm
                                    </span>

                                </button>

                            )}

                        </div>

                    </div>

                )
            )}

        </div>

    );

};


export default TransactionsTable;
