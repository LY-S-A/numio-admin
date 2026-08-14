// import React, { useState } from "react";
// import {
//     FiEdit2,
//     FiTrash2,
//     FiUserX,
//     FiUserCheck,
//     FiChevronLeft,
//     FiChevronRight,
// } from "react-icons/fi";

// const ITEMS_PER_PAGE = 4;

// const users = [
//     {
//         id: 1,
//         username: "johndoe",
//         email: "john@example.com",
//         balance: "₦12,450",
//         totalDeposit: "₦85,000",
//         status: "Active",
//         joined: "2 Aug 2026",
//     },
//     {
//         id: 2,
//         username: "janesmith",
//         email: "jane@example.com",
//         balance: "₦850",
//         totalDeposit: "₦25,000",
//         status: "Active",
//         joined: "31 Jul 2026",
//     },
//     {
//         id: 3,
//         username: "michael",
//         email: "michael@example.com",
//         balance: "₦0",
//         totalDeposit: "₦10,000",
//         status: "Inactive",
//         joined: "28 Jul 2026",
//     },
//     {
//         id: 4,
//         username: "sarah",
//         email: "sarah@example.com",
//         balance: "₦4,250",
//         totalDeposit: "₦42,500",
//         status: "Banned",
//         joined: "25 Jul 2026",
//     },
//     {
//         id: 5,
//         username: "david",
//         email: "david@example.com",
//         balance: "₦18,900",
//         totalDeposit: "₦120,000",
//         status: "Active",
//         joined: "20 Jul 2026",
//     },
// ];

// const UsersTable = () => {
//     const [currentPage, setCurrentPage] = useState(1);

//     const [userList, setUserList] = useState(users);

//     const totalPages = Math.ceil(
//         userList.length / ITEMS_PER_PAGE
//     );

//     const paginatedUsers = userList.slice(
//         (currentPage - 1) * ITEMS_PER_PAGE,
//         currentPage * ITEMS_PER_PAGE
//     );


//     /* =========================
//        EDIT USER
//     ========================= */

//     const handleEdit = (user) => {
//         console.log("Edit user:", user.id);

//         // Add edit logic / modal here
//     };


//     /* =========================
//        BAN / UNBAN USER
//     ========================= */

//     const handleToggleBan = (user) => {

//         setUserList((prevUsers) =>
//             prevUsers.map((item) => {

//                 if (item.id !== user.id) {
//                     return item;
//                 }

//                 return {
//                     ...item,
//                     status:
//                         item.status === "Banned"
//                             ? "Active"
//                             : "Banned",
//                 };
//             })
//         );

//     };


//     /* =========================
//        DELETE USER
//     ========================= */

//     const handleDelete = (user) => {

//         const confirmed = window.confirm(
//             `Are you sure you want to delete ${user.username}?`
//         );

//         if (!confirmed) {
//             return;
//         }

//         setUserList((prevUsers) =>
//             prevUsers.filter(
//                 (item) => item.id !== user.id
//             )
//         );

//     };


//     return (
//         <div className="tx-table">

//             {/* =========================
//                 TABLE HEADER
//             ========================= */}

//             <div className="tx-table-head users-head">

//                 <span>User</span>

//                 <span>Balance</span>

//                 <span>Total Deposit</span>

//                 <span>Status</span>

//                 <span>Joined</span>

//                 <span>Actions</span>

//             </div>


//             {/* =========================
//                 USERS
//             ========================= */}

//             {paginatedUsers.map((user) => (

//                 <div
//                     className="tx-row users-row"
//                     key={user.id}
//                 >

//                     {/* USER */}

//                     <div className="tx-info">

//                         <div className="user-details">

//                             <h4>
//                                 {user.username}
//                             </h4>

//                             <p className="user-email">
//                                 {user.email}
//                             </p>

//                         </div>

//                     </div>


//                     {/* BALANCE */}

//                     <div className="user-balance">
//                         {user.balance}
//                     </div>


//                     {/* TOTAL DEPOSIT */}

//                     <div className="user-deposit">
//                         {user.totalDeposit}
//                     </div>


//                     {/* STATUS */}

//                     <div className="tx-status-wrapper">

//                         <span
//                             className={`tx-status ${user.status
//                                 .toLowerCase()
//                                 .replace(/\s+/g, "-")}`}
//                         >
//                             {user.status}
//                         </span>

//                     </div>


//                     {/* JOINED */}

//                     <div className="tx-date">

//                         <span>
//                             {user.joined}
//                         </span>

//                     </div>


//                     {/* ACTIONS */}

//                     <div className="user-actions">

//                         {/* EDIT */}

//                         <button
//                             className="user-edit-btn"
//                             title="Edit user"
//                             onClick={() =>
//                                 handleEdit(user)
//                             }
//                         >
//                             <FiEdit2 />

//                             <span>
//                                 Edit
//                             </span>
//                         </button>


//                         {/* BAN / UNBAN */}

//                         <button
//                             className={
//                                 user.status === "Banned"
//                                     ? "user-unban-btn"
//                                     : "user-ban-btn"
//                             }
//                             title={
//                                 user.status === "Banned"
//                                     ? "Unban user"
//                                     : "Ban user"
//                             }
//                             onClick={() =>
//                                 handleToggleBan(user)
//                             }
//                         >

//                             {user.status === "Banned" ? (
//                                 <FiUserCheck />
//                             ) : (
//                                 <FiUserX />
//                             )}

//                             <span>
//                                 {user.status === "Banned"
//                                     ? "Unban"
//                                     : "Ban"}
//                             </span>

//                         </button>


//                         {/* DELETE */}

//                         <button
//                             className="user-delete-btn"
//                             title="Delete user"
//                             onClick={() =>
//                                 handleDelete(user)
//                             }
//                         >
//                             <FiTrash2 />

//                             <span>
//                                 Delete
//                             </span>
//                         </button>

//                     </div>

//                 </div>

//             ))}


//             {/* =========================
//                 PAGINATION
//             ========================= */}
//             <div className="users-pagination">
//                 <p className="pagination-text">

//                     Showing{" "}
//                     {userList.length === 0
//                         ? 0
//                         : (currentPage - 1) *
//                         ITEMS_PER_PAGE +
//                         1}
//                     {" "}to{" "}
//                     {Math.min(
//                         currentPage * ITEMS_PER_PAGE,
//                         userList.length
//                     )}
//                     {" "}of {userList.length} users

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
//                             currentPage === totalPages ||
//                             totalPages === 0
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

// export default UsersTable;

import React, { useEffect, useState } from "react";
import axios from "axios";

import {
    FiEdit2,
    FiTrash2,
    FiUserX,
    FiUserCheck,
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";

const ITEMS_PER_PAGE = 4;

const API_URL = process.env.REACT_APP_API_URL;

const UsersTable = ({
    search = "",
    status = "all",
    sort = "newest",
    onTotalChange,
}) => {
    const [users, setUsers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);

    const [loading, setLoading] = useState(true);

    const [actionLoading, setActionLoading] = useState(null);

    /*
    ========================================
    GET TOKEN
    ========================================
    */

    const getToken = () => {
        return localStorage.getItem("adminToken") ||
            localStorage.getItem("token");
    };

    /*
    ========================================
    FETCH USERS
    ========================================
    */

    const fetchUsers = async () => {
        try {
            setLoading(true);

            const token = getToken();

            const response = await axios.get(
                `${API_URL}/api/admin/users`,
                {
                    params: {
                        search,
                        status,
                        sort,
                        page: currentPage,
                        limit: ITEMS_PER_PAGE,
                    },

                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                setUsers(response.data.users || []);

                setTotalPages(
                    response.data.pagination?.totalPages || 1
                );

                setTotalUsers(
                    response.data.pagination?.totalUsers || 0
                );

                if (onTotalChange) {
                    onTotalChange(
                        response.data.pagination?.totalUsers || 0
                    );
                }
            }

        } catch (error) {
            console.error(
                "Failed to fetch users:",
                error
            );

            setUsers([]);

        } finally {
            setLoading(false);
        }
    };

    /*
    ========================================
    RESET PAGE WHEN FILTERS CHANGE
    ========================================
    */

    useEffect(() => {
        setCurrentPage(1);
    }, [search, status, sort]);

    /*
    ========================================
    LOAD USERS
    ========================================
    */

    useEffect(() => {
        fetchUsers();
    }, [
        currentPage,
        search,
        status,
        sort,
    ]);

    /*
    ========================================
    FORMAT CURRENCY
    ========================================
    */

    const formatCurrency = (amount) => {
        return `₦${Number(amount || 0).toLocaleString(
            "en-NG"
        )}`;
    };

    /*
    ========================================
    FORMAT DATE
    ========================================
    */

    const formatDate = (date) => {
        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleDateString(
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
    BAN / UNBAN
    ========================================
    */

    const handleToggleBan = async (user) => {
        try {
            setActionLoading(user.id);

            const token = getToken();

            const response = await axios.patch(
                `${API_URL}/api/admin/users/${user.id}/toggle-ban`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                await fetchUsers();
            }

        } catch (error) {
            console.error(
                "Failed to update user status:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to update user status"
            );

        } finally {
            setActionLoading(null);
        }
    };

    /*
    ========================================
    DELETE USER
    ========================================
    */

    const handleDelete = async (user) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${user.username}? This action cannot be undone.`
        );

        if (!confirmed) {
            return;
        }

        try {
            setActionLoading(user.id);

            const token = getToken();

            const response = await axios.delete(
                `${API_URL}/api/admin/users/${user.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {

                /*
                If deleting the final user
                on the current page, move back
                one page.
                */

                if (
                    users.length === 1 &&
                    currentPage > 1
                ) {
                    setCurrentPage(
                        (prev) => prev - 1
                    );
                } else {
                    await fetchUsers();
                }

                if (onTotalChange) {
                    onTotalChange(
                        Math.max(totalUsers - 1, 0)
                    );
                }
            }

        } catch (error) {
            console.error(
                "Failed to delete user:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete user"
            );

        } finally {
            setActionLoading(null);
        }
    };

    /*
    ========================================
    EDIT USER
    ========================================
    */

    const handleEdit = (user) => {
        console.log(
            "Edit user:",
            user
        );

        /*
        Add edit modal here when
        update-user backend endpoint
        is available.
        */
    };

    /*
    ========================================
    LOADING
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
    EMPTY
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

    return (
        <div className="tx-table">

            {/* =========================
                TABLE HEADER
            ========================= */}

            <div className="tx-table-head users-head">

                <span>User</span>

                <span>Balance</span>

                <span>Total Deposit</span>

                <span>Status</span>

                <span>Joined</span>

                <span>Actions</span>

            </div>


            {/* =========================
                USERS
            ========================= */}

            {users.map((user) => {

                const isBanned =
                    user.banned === true;

                const isLoading =
                    actionLoading === user.id;

                return (
                    <div
                        className="tx-row users-row"
                        key={user.id}
                    >

                        {/* USER */}

                        <div className="tx-info">

                            <div className="user-details">

                                <h4>
                                    {user.username}
                                </h4>

                                <p className="user-email">
                                    {user.email}
                                </p>

                            </div>

                        </div>


                        {/* BALANCE */}

                        <div className="user-balance">
                            {formatCurrency(
                                user.balance
                            )}
                        </div>


                        {/* TOTAL DEPOSIT */}

                        <div className="user-deposit">
                            {formatCurrency(
                                user.totalDeposit
                            )}
                        </div>


                        {/* STATUS */}

                        <div className="tx-status-wrapper">

                            <span
                                className={`tx-status ${
                                    isBanned
                                        ? "banned"
                                        : "active"
                                }`}
                            >
                                {isBanned
                                    ? "Banned"
                                    : "Active"}
                            </span>

                        </div>


                        {/* JOINED */}

                        <div className="tx-date">

                            <span>
                                {formatDate(
                                    user.joined
                                )}
                            </span>

                        </div>


                        {/* ACTIONS */}

                        <div className="user-actions">

                            {/* EDIT */}

                            <button
                                className="user-edit-btn"
                                title="Edit user"
                                disabled={isLoading}
                                onClick={() =>
                                    handleEdit(user)
                                }
                            >
                                <FiEdit2 />

                                <span>
                                    Edit
                                </span>
                            </button>


                            {/* BAN / UNBAN */}

                            <button
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
                                disabled={isLoading}
                                onClick={() =>
                                    handleToggleBan(
                                        user
                                    )
                                }
                            >

                                {isBanned ? (
                                    <FiUserCheck />
                                ) : (
                                    <FiUserX />
                                )}

                                <span>
                                    {isLoading
                                        ? "..."
                                        : isBanned
                                        ? "Unban"
                                        : "Ban"}
                                </span>

                            </button>


                            {/* DELETE */}

                            <button
                                className="user-delete-btn"
                                title="Delete user"
                                disabled={isLoading}
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
            })}


            {/* =========================
                PAGINATION
            ========================= */}

            <div className="users-pagination">

                <p className="pagination-text">

                    Showing{" "}
                    {(currentPage - 1) *
                        ITEMS_PER_PAGE +
                        1}
                    {" "}to{" "}
                    {Math.min(
                        currentPage *
                            ITEMS_PER_PAGE,
                        totalUsers
                    )}
                    {" "}of {totalUsers} users

                </p>


                <div className="tx-pages">

                    <button
                        className="prev-btn"
                        disabled={
                            currentPage === 1
                        }
                        onClick={() =>
                            setCurrentPage(
                                (prev) =>
                                    prev - 1
                            )
                        }
                    >
                        <FiChevronLeft />
                    </button>


                    <button className="active">
                        {currentPage}
                    </button>


                    <button
                        className="next-btn"
                        disabled={
                            currentPage >=
                            totalPages
                        }
                        onClick={() =>
                            setCurrentPage(
                                (prev) =>
                                    prev + 1
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
