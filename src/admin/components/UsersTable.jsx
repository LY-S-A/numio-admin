import React, {
    useCallback,
    useEffect,
    useState,
} from "react";

import axios from "axios";

import {
    FiEdit2,
    FiTrash2,
    FiUserX,
    FiUserCheck,
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";

const ITEMS_PER_PAGE = 10;

const API_URL =
    process.env.REACT_APP_API_URL;

const UsersTable = ({
    search = "",
    status = "all",
    sort = "newest",
}) => {

    /*
    ========================================
    STATE
    ========================================
    */

    const [users, setUsers] = useState([]);

    const [currentPage, setCurrentPage] =
        useState(1);

    const [totalPages, setTotalPages] =
        useState(1);

    const [totalUsers, setTotalUsers] =
        useState(0);

    const [loading, setLoading] =
        useState(true);

    const [actionLoading, setActionLoading] =
        useState(null);


    /*
    ========================================
    GET ADMIN TOKEN
    ========================================
    */

    const getToken = () => {
        return (
            localStorage.getItem(
                "adminToken"
            ) ||
            localStorage.getItem(
                "token"
            )
        );
    };


    /*
    ========================================
    FETCH USERS
    ========================================
    */

    const fetchUsers = useCallback(
        async () => {

            try {

                setLoading(true);

                const token =
                    getToken();

                const response =
                    await axios.get(
                        `${API_URL}/api/admin/users`,
                        {
                            params: {
                                search,
                                status,
                                sort,
                                page:
                                    currentPage,
                                limit:
                                    ITEMS_PER_PAGE,
                            },

                            headers: {
                                Authorization:
                                    `Bearer ${token}`,
                            },
                        }
                    );

                if (
                    response.data.success
                ) {

                    const fetchedUsers =
                        response.data.users ||
                        [];

                    const pagination =
                        response.data
                            .pagination || {};

                    setUsers(
                        fetchedUsers
                    );

                    setTotalPages(
                        pagination.totalPages ||
                        1
                    );

                    setTotalUsers(
                        pagination.totalUsers ||
                        0
                    );
                }

            } catch (error) {

                console.error(
                    "Failed to fetch users:",
                    error
                );

                setUsers([]);

                setTotalPages(1);

                setTotalUsers(0);

            } finally {

                setLoading(false);

            }

        },
        [
            search,
            status,
            sort,
            currentPage,
        ]
    );


    /*
    ========================================
    RESET PAGE WHEN FILTER CHANGES
    ========================================
    */

    useEffect(() => {

        setCurrentPage(1);

    }, [
        search,
        status,
        sort,
    ]);


    /*
    ========================================
    LOAD USERS
    ========================================
    */

    useEffect(() => {

        fetchUsers();

    }, [
        fetchUsers,
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
            "en-NG"
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
            return "-";
        }

        const parsedDate =
            new Date(date);

        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {
            return "-";
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
    BAN / UNBAN USER
    ========================================
    */

    const handleToggleBan =
        async (user) => {

            try {

                setActionLoading(
                    user.id
                );

                const token =
                    getToken();

                const response =
                    await axios.patch(
                        `${API_URL}/api/admin/users/${user.id}/toggle-ban`,
                        {},
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`,
                            },
                        }
                    );

                if (
                    response.data.success
                ) {

                    /*
                    Refresh the current
                    page after changing
                    the user's status.
                    */

                    await fetchUsers();

                }

            } catch (error) {

                console.error(
                    "Failed to update user status:",
                    error
                );

                alert(
                    error.response?.data
                        ?.message ||
                    "Failed to update user status"
                );

            } finally {

                setActionLoading(
                    null
                );

            }

        };


    /*
    ========================================
    DELETE USER
    ========================================
    */

    const handleDelete =
        async (user) => {

            const confirmed =
                window.confirm(
                    `Are you sure you want to delete ${user.username}? This action cannot be undone.`
                );

            if (!confirmed) {
                return;
            }

            try {

                setActionLoading(
                    user.id
                );

                const token =
                    getToken();

                const response =
                    await axios.delete(
                        `${API_URL}/api/admin/users/${user.id}`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`,
                            },
                        }
                    );

                if (
                    response.data.success
                ) {

                    /*
                    If this was the last
                    user on the current
                    page, move to the
                    previous page.
                    */

                    if (
                        users.length === 1 &&
                        currentPage > 1
                    ) {

                        setCurrentPage(
                            (prev) =>
                                prev - 1
                        );

                    } else {

                        await fetchUsers();

                    }

                }

            } catch (error) {

                console.error(
                    "Failed to delete user:",
                    error
                );

                alert(
                    error.response?.data
                        ?.message ||
                    "Failed to delete user"
                );

            } finally {

                setActionLoading(
                    null
                );

            }

        };


    /*
    ========================================
    EDIT USER
    ========================================
    */

    const handleEdit = (
        user
    ) => {

        console.log(
            "Edit user:",
            user
        );

        /*
        Edit functionality can
        be connected when the
        backend update-user
        endpoint is available.
        */

    };


    /*
    ========================================
    LOADING STATE
    ========================================
    */

    if (loading) {

        return (
            <div className="tx-table">

                <div className="users-loading">

                    <div className="users-spinner"></div>

                    <p>
                        Loading users...
                    </p>

                </div>

            </div>
        );

    }


    /*
    ========================================
    EMPTY STATE
    ========================================
    */

    if (!users.length) {

        return (
            <div className="tx-table">

                <div className="users-empty">

                    <p>
                        No users found.
                    </p>

                </div>


                <div className="users-pagination">

                    <p className="pagination-text">
                        Showing 0 of 0 users
                    </p>

                </div>

            </div>
        );

    }


    /*
    ========================================
    MAIN TABLE
    ========================================
    */

    return (

        <div className="tx-table">

            {/* =========================
                TABLE HEADER
            ========================= */}

            <div className="tx-table-head users-head">

                <span>
                    User
                </span>

                <span>
                    Balance
                </span>

                <span>
                    Total Deposit
                </span>

                <span>
                    Status
                </span>

                <span>
                    Joined
                </span>

                <span>
                    Actions
                </span>

            </div>


            {/* =========================
                USERS
            ========================= */}

            {users.map(
                (user) => {

                    const isBanned =
                        user.banned === true;

                    const isLoading =
                        actionLoading ===
                        user.id;

                    return (

                        <div
                            className="tx-row users-row"
                            key={user.id}
                        >

                            {/* =====================
                                USER
                            ===================== */}

                            <div className="tx-info">

                                <div className="user-details">

                                    <h4>
                                        {
                                            user.username ||
                                            "Unknown User"
                                        }
                                    </h4>

                                    <p className="user-email">
                                        {
                                            user.email ||
                                            "-"
                                        }
                                    </p>

                                </div>

                            </div>


                            {/* =====================
                                BALANCE
                            ===================== */}

                            <div className="user-balance">

                                {
                                    formatCurrency(
                                        user.balance
                                    )
                                }

                            </div>


                            {/* =====================
                                TOTAL DEPOSIT
                            ===================== */}

                            <div className="user-deposit">

                                {
                                    formatCurrency(
                                        user.totalDeposit
                                    )
                                }

                            </div>


                            {/* =====================
                                STATUS
                            ===================== */}

                            <div className="tx-status-wrapper">

                                <span
                                    className={`tx-status ${
                                        isBanned
                                            ? "banned"
                                            : "active"
                                    }`}
                                >

                                    {
                                        isBanned
                                            ? "Banned"
                                            : "Active"
                                    }

                                </span>

                            </div>


                            {/* =====================
                                JOINED
                            ===================== */}

                            <div className="tx-date">

                                <span>
                                    {
                                        formatDate(
                                            user.joined
                                        )
                                    }
                                </span>

                            </div>


                            {/* =====================
                                ACTIONS
                            ===================== */}

                            <div className="user-actions">

                                {/* EDIT */}

                                <button
                                    type="button"
                                    className="user-edit-btn"
                                    title="Edit user"
                                    disabled={
                                        isLoading
                                    }
                                    onClick={() =>
                                        handleEdit(
                                            user
                                        )
                                    }
                                >

                                    <FiEdit2 />

                                    <span>
                                        Edit
                                    </span>

                                </button>


                                {/* BAN / UNBAN */}

                                <button
                                    type="button"
                                    className={
                                        isBanned
                                            ? "user-unban-btn"
                                            : "user-ban-btn"
                                    }
                                    title={
                                        isBanned
                                            ? "Unban user"
                                            : "Ban user"
                                    }
                                    disabled={
                                        isLoading
                                    }
                                    onClick={() =>
                                        handleToggleBan(
                                            user
                                        )
                                    }
                                >

                                    {
                                        isBanned ? (
                                            <FiUserCheck />
                                        ) : (
                                            <FiUserX />
                                        )
                                    }

                                    <span>

                                        {
                                            isLoading
                                                ? "..."
                                                : isBanned
                                                ? "Unban"
                                                : "Ban"
                                        }

                                    </span>

                                </button>


                                {/* DELETE */}

                                <button
                                    type="button"
                                    className="user-delete-btn"
                                    title="Delete user"
                                    disabled={
                                        isLoading
                                    }
                                    onClick={() =>
                                        handleDelete(
                                            user
                                        )
                                    }
                                >

                                    <FiTrash2 />

                                    <span>
                                        Delete
                                    </span>

                                </button>

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

                    {
                        totalUsers === 0
                            ? 0
                            : (
                                (
                                    currentPage -
                                    1
                                ) *
                                ITEMS_PER_PAGE
                            ) + 1
                    }

                    {" "}to{" "}

                    {
                        Math.min(
                            currentPage *
                                ITEMS_PER_PAGE,
                            totalUsers
                        )
                    }

                    {" "}of{" "}

                    {totalUsers}

                    {" "}users

                </p>


                <div className="tx-pages">

                    {/* PREVIOUS */}

                    <button
                        type="button"
                        className="prev-btn"
                        disabled={
                            currentPage <=
                            1
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
                        {currentPage}
                    </button>


                    {/* NEXT */}

                    <button
                        type="button"
                        className="next-btn"
                        disabled={
                            currentPage >=
                            totalPages
                        }
                        onClick={() =>
                            setCurrentPage(
                                (prev) =>
                                    Math.min(
                                        prev + 1,
                                        totalPages
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

export default UsersTable;
