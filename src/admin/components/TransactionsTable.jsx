import React, {
    useCallback,
    useEffect,
    useState,
} from "react";

import axios from "axios";

import {
    FiTrash2,
    FiCheck,
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";

const ITEMS_PER_PAGE = 10;

const API_URL =
    process.env.REACT_APP_API_URL;

const TransactionsTable = () => {
    const [transactions, setTransactions] =
        useState([]);

    const [currentPage, setCurrentPage] =
        useState(1);

    const [totalPages, setTotalPages] =
        useState(1);

    const [totalTransactions, setTotalTransactions] =
        useState(0);

    const [loading, setLoading] =
        useState(true);

    const [actionLoading, setActionLoading] =
        useState(null);

    const [error, setError] =
        useState("");


    /*
    ========================================
    GET ADMIN TOKEN
    ========================================
    */

    const getToken = () => {
        return localStorage.getItem("token");
    };


    /*
    ========================================
    FETCH TRANSACTIONS
    ========================================
    */

    const fetchTransactions =
        useCallback(async () => {

            try {

                setLoading(true);
                setError("");

                const token =
                    getToken();

                const response =
                    await axios.get(
                        `${API_URL}/api/admin/transactions`,
                        {
                            params: {
                                page: currentPage,
                                limit: ITEMS_PER_PAGE,
                            },

                            headers: {
                                Authorization:
                                    `Bearer ${token}`,
                            },
                        }
                    );


                if (
                    response.data?.success
                ) {

                    setTransactions(
                        response.data.transactions ||
                        []
                    );

                    setTotalPages(
                        response.data.pagination
                            ?.totalPages || 1
                    );

                    setTotalTransactions(
                        response.data.pagination
                            ?.totalTransactions || 0
                    );

                } else {

                    setError(
                        response.data?.message ||
                        "Failed to fetch transactions"
                    );

                }

            } catch (error) {

                console.error(
                    "Fetch transactions error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to fetch transactions"
                );

            } finally {

                setLoading(false);

            }

        }, [currentPage]);


    /*
    ========================================
    FETCH ON PAGE CHANGE
    ========================================
    */

    useEffect(() => {

        fetchTransactions();

    }, [fetchTransactions]);


    /*
    ========================================
    DELETE TRANSACTION
    ========================================
    */

    const handleDelete = async (
        transaction
    ) => {

        const confirmed =
            window.confirm(
                `Delete transaction ${transaction.reference}?`
            );

        if (!confirmed) {
            return;
        }

        try {

            setActionLoading(
                transaction.id
            );

            const token =
                getToken();

            const response =
                await axios.delete(
                    `${API_URL}/api/admin/transactions/${transaction.id}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );


            if (
                response.data?.success
            ) {

                /*
                ========================================
                IF LAST ITEM ON PAGE IS DELETED
                GO BACK ONE PAGE
                ========================================
                */

                if (
                    transactions.length === 1 &&
                    currentPage > 1
                ) {

                    setCurrentPage(
                        (prev) => prev - 1
                    );

                } else {

                    fetchTransactions();

                }

            } else {

                alert(
                    response.data?.message ||
                    "Failed to delete transaction"
                );

            }

        } catch (error) {

            console.error(
                "Delete transaction error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete transaction"
            );

        } finally {

            setActionLoading(null);

        }

    };


    /*
    ========================================
    CONFIRM TRANSACTION
    ========================================
    */

    const handleConfirm = async (
        transaction
    ) => {

        const confirmed =
            window.confirm(
                `Confirm transaction ${transaction.reference}?`
            );

        if (!confirmed) {
            return;
        }

        try {

            setActionLoading(
                transaction.id
            );

            const token =
                getToken();

            const response =
                await axios.patch(
                    `${API_URL}/api/admin/transactions/${transaction.id}/confirm`,
                    {},
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );


            if (
                response.data?.success
            ) {

                /*
                ========================================
                REFRESH TRANSACTIONS
                ========================================
                */

                await fetchTransactions();

            } else {

                alert(
                    response.data?.message ||
                    "Failed to confirm transaction"
                );

            }

        } catch (error) {

            console.error(
                "Confirm transaction error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to confirm transaction"
            );

        } finally {

            setActionLoading(null);

        }

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

        return new Intl.NumberFormat(
            "en-NG",
            {
                style: "currency",
                currency,
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            }
        ).format(
            Number(amount || 0)
        );

    };


    /*
    ========================================
    FORMAT TYPE
    ========================================
    */

    const formatType = (type) => {

        if (!type) {
            return "—";
        }

        return type
            .toLowerCase()
            .replace(/_/g, " ")
            .replace(
                /\b\w/g,
                (letter) =>
                    letter.toUpperCase()
            );

    };


    /*
    ========================================
    FORMAT PROVIDER
    ========================================
    */

    const formatProvider = (
        provider
    ) => {

        if (!provider) {
            return "—";
        }

        return provider
            .toLowerCase()
            .replace(/_/g, " ")
            .replace(
                /\b\w/g,
                (letter) =>
                    letter.toUpperCase()
            );

    };


    /*
    ========================================
    FORMAT STATUS
    ========================================
    */

    const formatStatus = (status) => {

        if (!status) {
            return "—";
        }

        return status
            .toLowerCase()
            .replace(/_/g, " ")
            .replace(
                /\b\w/g,
                (letter) =>
                    letter.toUpperCase()
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
            "en-NG",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            }
        );

    };


    /*
    ========================================
    PREVIOUS PAGE
    ========================================
    */

    const handlePreviousPage = () => {

        setCurrentPage(
            (prev) =>
                Math.max(
                    prev - 1,
                    1
                )
        );

    };


    /*
    ========================================
    NEXT PAGE
    ========================================
    */

    const handleNextPage = () => {

        setCurrentPage(
            (prev) =>
                Math.min(
                    prev + 1,
                    totalPages
                )
        );

    };


    /*
    ========================================
    LOADING
    ========================================
    */

   /*
========================================
LOADING STATE
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
                SKELETON LOADING
            ========================= */}

            {Array.from({ length: 5 }).map(
                (_, index) => (

                    <div
                        className="transactions-row transactions-skeleton"
                        key={index}
                    >

                        {/* =========================
                            REFERENCE
                        ========================= */}

                        <div className="transaction-reference">

                            <div className="transactions-skeleton-item transactions-skeleton-title" />

                            <div className="transactions-skeleton-item transactions-skeleton-text" />

                        </div>


                        {/* =========================
                            USER
                        ========================= */}

                        <div className="transaction-user">

                            <div className="transactions-skeleton-item transactions-skeleton-title" />

                            <div className="transactions-skeleton-item transactions-skeleton-text" />

                        </div>


                        {/* =========================
                            TYPE
                        ========================= */}

                        <div className="transaction-type">

                            <div className="transactions-skeleton-item transactions-skeleton-title" />

                            <div className="transactions-skeleton-item transactions-skeleton-text" />

                        </div>


                        {/* =========================
                            AMOUNT
                        ========================= */}

                        <div className="transaction-amount">

                            <div className="transactions-skeleton-item transactions-skeleton-amount" />

                        </div>


                        {/* =========================
                            STATUS
                        ========================= */}

                        <div className="transaction-status">

                            <div className="transactions-skeleton-item transactions-skeleton-status" />

                        </div>


                        {/* =========================
                            DATE
                        ========================= */}

                        <div className="transaction-date">

                            <div className="transactions-skeleton-item transactions-skeleton-date" />

                        </div>


                        {/* =========================
                            ACTIONS
                        ========================= */}

                        <div className="transaction-actions">

                            <div className="transactions-skeleton-item transactions-skeleton-action" />

                        </div>

                    </div>

                )
            )}

        </div>

    );

}

    /*
    ========================================
    ERROR
    ========================================
    */

    if (error) {

        return (
            <div className="transactions-table">

                <div className="transactions-empty">

                    <p>
                        {error}
                    </p>

                </div>

            </div>
        );

    }


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

            {transactions.length > 0 ? (

                transactions.map(
                    (transaction) => (

                        <div
                            className="transactions-row"
                            key={transaction.id}
                        >

                            {/* =========================
                                REFERENCE
                            ========================= */}

                            <div className="transaction-reference">

                                <h4>
    {transaction.reference
        ? transaction.reference.length > 17
            ? `${transaction.reference.slice(0, 17)}...`
            : transaction.reference
        : "—"}
</h4>

                                <p>
                                    {formatProvider(
                                        transaction.provider
                                    )}
                                </p>

                            </div>


                            {/* =========================
                                USER
                            ========================= */}

                            <div className="transaction-user">

                                <h4>
                                    {transaction.username ||
                                        "—"}
                                </h4>

                                <p>
                                    {transaction.email ||
                                        "—"}
                                </p>

                            </div>


                            {/* =========================
                                TYPE
                            ========================= */}

                            <div className="transaction-type">

                                <h4>
                                    {formatType(
                                        transaction.type
                                    )}
                                </h4>

                                <p>
                                    {formatProvider(
                                        transaction.provider
                                    )}
                                </p>

                            </div>


                            {/* =========================
                                AMOUNT
                            ========================= */}

                            <div className="transaction-amount">

                                {formatAmount(
                                    transaction.amount,
                                    transaction.currency ||
                                        "NGN"
                                )}

                            </div>


                            {/* =========================
                                STATUS
                            ========================= */}

                            <div className="transaction-status">

                                <span
                                    className={`tx-status ${
                                        (
                                            transaction.status ||
                                            ""
                                        )
                                            .toLowerCase()
                                            .replace(
                                                /\s+/g,
                                                "-"
                                            )
                                    }`}
                                >
                                    {formatStatus(
                                        transaction.status
                                    )}
                                </span>

                            </div>


                            {/* =========================
                                DATE
                            ========================= */}

                            <div className="transaction-date">

                                <span>
                                    {formatDate(
                                        transaction.createdAt
                                    )}
                                </span>

                            </div>


                            {/* =========================
                                ACTIONS
                            ========================= */}

                            <div className="transaction-actions">

                                {/* =========================
                                    SUCCESS → DELETE
                                ========================= */}

                                {transaction.status ===
                                    "SUCCESS" && (

                                    <button
                                        type="button"
                                        className="transaction-delete-btn"
                                        disabled={
                                            actionLoading ===
                                            transaction.id
                                        }
                                        onClick={() =>
                                            handleDelete(
                                                transaction
                                            )
                                        }
                                    >

                                        <FiTrash2 />

                                        <span>
                                            {actionLoading ===
                                            transaction.id
                                                ? "Deleting..."
                                                : "Delete"}
                                        </span>

                                    </button>

                                )}


                                {/* =========================
                                    PENDING → CONFIRM
                                ========================= */}

                                {transaction.status ===
                                    "PENDING" && (

                                    <button
                                        type="button"
                                        className="transaction-confirm-btn"
                                        disabled={
                                            actionLoading ===
                                            transaction.id
                                        }
                                        onClick={() =>
                                            handleConfirm(
                                                transaction
                                            )
                                        }
                                    >

                                        <FiCheck />

                                        <span>
                                            {actionLoading ===
                                            transaction.id
                                                ? "Confirming..."
                                                : "Confirm"}
                                        </span>

                                    </button>

                                )}

                            </div>

                        </div>

                    )

                )

            ) : (

                <div className="transactions-empty">

                    <p>
                        No transactions found.
                    </p>

                </div>

            )}


            {/* =========================
                PAGINATION
            ========================= */}

            {totalTransactions > 0 && (

                <div className="transactions-pagination">

                    <p className="pagination-text">

                        Showing{" "}

                        {(currentPage - 1) *
                            ITEMS_PER_PAGE +
                            1}

                        {" "}to{" "}

                        {Math.min(
                            currentPage *
                                ITEMS_PER_PAGE,
                            totalTransactions
                        )}

                        {" "}of{" "}

                        {totalTransactions}

                        {" "}transactions

                    </p>


                    <div className="tx-pages">

                        {/* PREVIOUS */}

                        <button
                            type="button"
                            className="prev-btn"
                            disabled={
                                currentPage === 1
                            }
                            onClick={
                                handlePreviousPage
                            }
                        >

                            <FiChevronLeft />

                        </button>


                        {/* CURRENT PAGE */}

                        <button
                            type="button"
                            className="active"
                        >
                            {currentPage}
                        </button>


                        {/* NEXT */}

                        <button
                            type="button"
                            className="next-btn"
                            disabled={
                                currentPage ===
                                totalPages
                            }
                            onClick={
                                handleNextPage
                            }
                        >

                            <FiChevronRight />

                        </button>

                    </div>

                </div>

            )}

        </div>
    );
};

export default TransactionsTable;
