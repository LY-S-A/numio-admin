// import React, { useState } from "react";
// import {
//     FiEye,
//     FiEdit2,
//     FiMoreVertical,
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
//         status: "Active",
//         joined: "2 Aug 2026",
//     },
//     {
//         id: 2,
//         username: "janesmith",
//         email: "jane@example.com",
//         balance: "₦850",
//         status: "Active",
//         joined: "31 Jul 2026",
//     },
//     {
//         id: 3,
//         username: "michael",
//         email: "michael@example.com",
//         balance: "₦0",
//         status: "Inactive",
//         joined: "28 Jul 2026",
//     },
//     {
//         id: 4,
//         username: "sarah",
//         email: "sarah@example.com",
//         balance: "₦4,250",
//         status: "Banned",
//         joined: "25 Jul 2026",
//     },
//     {
//         id: 5,
//         username: "david",
//         email: "david@example.com",
//         balance: "₦18,900",
//         status: "Active",
//         joined: "20 Jul 2026",
//     },
// ];

// const UsersTable = () => {
//     const [currentPage, setCurrentPage] = useState(1);

//     const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

//     const paginatedUsers = users.slice(
//         (currentPage - 1) * ITEMS_PER_PAGE,
//         currentPage * ITEMS_PER_PAGE
//     );

//     return (
//         <div className="tx-table">

//             <div className="tx-table-head users-head">
//                 <span>User</span>
//                 <span>Balance</span>
//                 <span>Status</span>
//                 <span>Joined</span>
//                 <span>Actions</span>
//             </div>

//             {paginatedUsers.map((user) => (
//                 <div className="tx-row users-row" key={user.id}>

//                     <div className="tx-info">

//                         <div className="user-details">
//                             <h4>{user.username}</h4>
//                             <p className="user-email">
//                                 {user.email}
//                             </p>
//                         </div>

//                     </div>

//                     <div className="user-balance">
//                         {user.balance}
//                     </div>

//                     <div className="tx-status-wrapper">
//                         <span
//                             className={`tx-status ${user.status.toLowerCase()}`}
//                         >
//                             {user.status}
//                         </span>
//                     </div>

//                     <div className="tx-date">
//                         <span>{user.joined}</span>
//                     </div>

//                     <div className="user-actions">

//                         <button>
//                             <FiEye />
//                         </button>

//                         <button>
//                             <FiEdit2 />
//                         </button>

//                         <button>
//                             <FiMoreVertical />
//                         </button>

//                     </div>

//                 </div>
//             ))}


//             {/* Pagination */}

// <div className="users-pagination">

//     <p className="pagination-text">
//         Showing{" "}
//         {(currentPage - 1) * ITEMS_PER_PAGE + 1}{" "}
//         to{" "}
//         {Math.min(
//             currentPage * ITEMS_PER_PAGE,
//             users.length
//         )}{" "}
//         of {users.length} users
//     </p>

//     <div className="tx-pages">

//         <button
//             className="prev-btn"
//             disabled={currentPage === 1}
//             onClick={() =>
//                 setCurrentPage((prev) => prev - 1)
//             }
//         >
//             <FiChevronLeft />
//         </button>

//         <button className="active">
//             {currentPage}
//         </button>

//         <button
//             className="next-btn"
//             disabled={currentPage === totalPages}
//             onClick={() =>
//                 setCurrentPage((prev) => prev + 1)
//             }
//         >
//             <FiChevronRight />
//         </button>

//     </div>

// </div>
//         </div>
//     );
// };

// export default UsersTable;

import React, { useState } from "react";
import {
    FiEdit2,
    FiTrash2,
    FiUserX,
    FiUserCheck,
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";

const ITEMS_PER_PAGE = 4;

const users = [
    {
        id: 1,
        username: "johndoe",
        email: "john@example.com",
        balance: "₦12,450",
        totalDeposit: "₦85,000",
        status: "Active",
        joined: "2 Aug 2026",
    },
    {
        id: 2,
        username: "janesmith",
        email: "jane@example.com",
        balance: "₦850",
        totalDeposit: "₦25,000",
        status: "Active",
        joined: "31 Jul 2026",
    },
    {
        id: 3,
        username: "michael",
        email: "michael@example.com",
        balance: "₦0",
        totalDeposit: "₦10,000",
        status: "Inactive",
        joined: "28 Jul 2026",
    },
    {
        id: 4,
        username: "sarah",
        email: "sarah@example.com",
        balance: "₦4,250",
        totalDeposit: "₦42,500",
        status: "Banned",
        joined: "25 Jul 2026",
    },
    {
        id: 5,
        username: "david",
        email: "david@example.com",
        balance: "₦18,900",
        totalDeposit: "₦120,000",
        status: "Active",
        joined: "20 Jul 2026",
    },
];

const UsersTable = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const [userList, setUserList] = useState(users);

    const totalPages = Math.ceil(
        userList.length / ITEMS_PER_PAGE
    );

    const paginatedUsers = userList.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );


    /* =========================
       EDIT USER
    ========================= */

    const handleEdit = (user) => {
        console.log("Edit user:", user.id);

        // Add edit logic / modal here
    };


    /* =========================
       BAN / UNBAN USER
    ========================= */

    const handleToggleBan = (user) => {

        setUserList((prevUsers) =>
            prevUsers.map((item) => {

                if (item.id !== user.id) {
                    return item;
                }

                return {
                    ...item,
                    status:
                        item.status === "Banned"
                            ? "Active"
                            : "Banned",
                };
            })
        );

    };


    /* =========================
       DELETE USER
    ========================= */

    const handleDelete = (user) => {

        const confirmed = window.confirm(
            `Are you sure you want to delete ${user.username}?`
        );

        if (!confirmed) {
            return;
        }

        setUserList((prevUsers) =>
            prevUsers.filter(
                (item) => item.id !== user.id
            )
        );

    };


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

            {paginatedUsers.map((user) => (

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
                        {user.balance}
                    </div>


                    {/* TOTAL DEPOSIT */}

                    <div className="user-deposit">
                        {user.totalDeposit}
                    </div>


                    {/* STATUS */}

                    <div className="tx-status-wrapper">

                        <span
                            className={`tx-status ${user.status
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                        >
                            {user.status}
                        </span>

                    </div>


                    {/* JOINED */}

                    <div className="tx-date">

                        <span>
                            {user.joined}
                        </span>

                    </div>


                    {/* ACTIONS */}

                    <div className="user-actions">

                        {/* EDIT */}

                        <button
                            className="user-edit-btn"
                            title="Edit user"
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
                                user.status === "Banned"
                                    ? "user-unban-btn"
                                    : "user-ban-btn"
                            }
                            title={
                                user.status === "Banned"
                                    ? "Unban user"
                                    : "Ban user"
                            }
                            onClick={() =>
                                handleToggleBan(user)
                            }
                        >

                            {user.status === "Banned" ? (
                                <FiUserCheck />
                            ) : (
                                <FiUserX />
                            )}

                            <span>
                                {user.status === "Banned"
                                    ? "Unban"
                                    : "Ban"}
                            </span>

                        </button>


                        {/* DELETE */}

                        <button
                            className="user-delete-btn"
                            title="Delete user"
                            onClick={() =>
                                handleDelete(user)
                            }
                        >
                            <FiTrash2 />

                            <span>
                                Delete
                            </span>
                        </button>

                    </div>

                </div>

            ))}


            {/* =========================
                PAGINATION
            ========================= */}
            <div className="users-pagination">
                <p className="pagination-text">

                    Showing{" "}
                    {userList.length === 0
                        ? 0
                        : (currentPage - 1) *
                        ITEMS_PER_PAGE +
                        1}
                    {" "}to{" "}
                    {Math.min(
                        currentPage * ITEMS_PER_PAGE,
                        userList.length
                    )}
                    {" "}of {userList.length} users

                </p>


                <div className="tx-pages">

                    <button
                        className="prev-btn"
                        disabled={currentPage === 1}
                        onClick={() =>
                            setCurrentPage(
                                (prev) => prev - 1
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
                            currentPage === totalPages ||
                            totalPages === 0
                        }
                        onClick={() =>
                            setCurrentPage(
                                (prev) => prev + 1
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
