import { useEffect, useState } from "react";
import axios from "axios";

import {
    FiMail,
    FiUsers,
    FiSend,
    FiAlertCircle,
    FiCheckCircle,
} from "react-icons/fi";

import "../styles/send-mail.css";

const API_URL = process.env.REACT_APP_API_URL;

const SendMail = () => {
    const [userCount, setUserCount] = useState(0);

    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [loadingUsers, setLoadingUsers] = useState(true);
    const [sending, setSending] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    /*
    ========================================
    GET USER COUNT
    ========================================
    */

    useEffect(() => {
        const fetchUserCount = async () => {
            try {
                setLoadingUsers(true);
                setError("");

                const token =
                    localStorage.getItem("token");

                if (!token) {
                    setError(
                        "Authentication required. Please login again."
                    );
                    return;
                }
                
                const response = await axios.get(
    `${API_URL}/api/admin/users/count`,
    {
        headers: {
            Authorization:
                `Bearer ${token}`,
        },
    }
);

if (response.data.success) {
    setUserCount(
        response.data.count
    );
} else {
    setError(
        response.data.message ||
        "Failed to fetch user count."
    );
}

            } catch (err) {
                console.error(
                    "Failed to fetch user count:",
                    err
                );

                setError(
                    err.response?.data?.message ||
                    "Failed to fetch user count."
                );

            } finally {
                setLoadingUsers(false);
            }
        };

        fetchUserCount();
    }, []);

    /*
    ========================================
    SEND MAIL
    ========================================
    */

    const handleSendMail = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        /*
        ================================
        VALIDATION
        ================================
        */

        if (!subject.trim()) {
            setError(
                "Please enter an email subject."
            );
            return;
        }

        if (!message.trim()) {
            setError(
                "Please enter your message."
            );
            return;
        }

        if (userCount === 0) {
            setError(
                "There are no registered users to send mail to."
            );
            return;
        }

        /*
        ================================
        AUTH TOKEN
        ================================
        */

        const token =
            localStorage.getItem("token");

        if (!token) {
            setError(
                "Authentication required. Please login again."
            );
            return;
        }

        try {
            setSending(true);

            const response = await axios.post(
                `${API_URL}/api/admin/users/send-mail`,
                {
                    subject: subject.trim(),
                    message: message.trim(),
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,

                        "Content-Type":
                            "application/json",
                    },
                }
            );

            const data = response.data;

            if (!data.success) {
                throw new Error(
                    data.message ||
                    "Failed to send email."
                );
            }

            /*
            ================================
            SUCCESS
            ================================
            */

            if (data.failed > 0) {
                setSuccess(
                    `Email sent to ${data.sent} ${
                        data.sent === 1
                            ? "user"
                            : "users"
                    }. ${data.failed} failed.`
                );
            } else {
                setSuccess(
                    `Email sent successfully to ${data.sent} ${
                        data.sent === 1
                            ? "user"
                            : "users"
                    }.`
                );
            }

            /*
            ================================
            CLEAR FORM
            ================================
            */

            setSubject("");
            setMessage("");

        } catch (err) {
            console.error(
                "Send mail error:",
                err
            );

            /*
            ================================
            TOKEN EXPIRED
            ================================
            */

            if (
                err.response?.status === 401
            ) {
                localStorage.removeItem(
                    "token"
                );

                localStorage.removeItem(
                    "user"
                );

                setError(
                    "Your session has expired. Please login again."
                );

                return;
            }

            /*
            ================================
            ADMIN ACCESS DENIED
            ================================
            */

            if (
                err.response?.status === 403
            ) {
                setError(
                    "You do not have permission to send emails."
                );

                return;
            }

            setError(
                err.response?.data?.message ||
                err.message ||
                "Failed to send email."
            );

        } finally {
            setSending(false);
        }
    };

    return (
        <div className="send-mail-card">

            {/* =========================
                HEADER
            ========================= */}

            <div className="send-mail-header">

                <div className="send-mail-title">

                    <div className="send-mail-icon">
                        <FiMail />
                    </div>

                    <div>
                        <h2>
                            Send Mail
                        </h2>

                        <p>
                            Send an email to all
                            registered users.
                        </p>
                    </div>

                </div>

                <div className="recipient-count">

                    <FiUsers />

                    <span>
                        {loadingUsers
                            ? "Loading..."
                            : `${userCount} ${
                                userCount === 1
                                    ? "user"
                                    : "users"
                            }`}
                    </span>

                </div>

            </div>


            {/* =========================
                ERROR MESSAGE
            ========================= */}

            {error && (
                <div className="mail-alert mail-alert-error">

                    <FiAlertCircle />

                    <span>
                        {error}
                    </span>

                </div>
            )}


            {/* =========================
                SUCCESS MESSAGE
            ========================= */}

            {success && (
                <div className="mail-alert mail-alert-success">

                    <FiCheckCircle />

                    <span>
                        {success}
                    </span>

                </div>
            )}


            {/* =========================
                FORM
            ========================= */}

            <form
                className="mail-form"
                onSubmit={handleSendMail}
            >

                {/* =========================
                    RECIPIENTS
                ========================= */}

                <div className="mail-recipient-box">

                    <div className="mail-recipient-icon">
                        <FiUsers />
                    </div>

                    <div>

                        <strong>
                            All Users
                        </strong>

                        <span>
                            {loadingUsers
                                ? "Loading registered users..."
                                : `This email will be sent to all ${userCount} registered ${
                                    userCount === 1
                                        ? "user"
                                        : "users"
                                }.`}
                        </span>

                    </div>

                </div>


                {/* =========================
                    SUBJECT
                ========================= */}

                <div className="form-group">

                    <label htmlFor="mail-subject">
                        Subject
                    </label>

                    <input
                        id="mail-subject"
                        type="text"
                        placeholder="Enter email subject"
                        value={subject}
                        onChange={(e) =>
                            setSubject(
                                e.target.value
                            )
                        }
                        disabled={sending}
                        maxLength={150}
                    />

                </div>


                {/* =========================
                    MESSAGE
                ========================= */}

                <div className="form-group">

                    <label htmlFor="mail-message">
                        Message
                    </label>

                    <textarea
                        id="mail-message"
                        placeholder="Write your email message..."
                        value={message}
                        onChange={(e) =>
                            setMessage(
                                e.target.value
                            )
                        }
                        disabled={sending}
                        rows={8}
                    />

                </div>


                {/* =========================
                    SEND BUTTON
                ========================= */}

                <button
                    type="submit"
                    className="send-mail-btn"
                    disabled={
                        sending ||
                        loadingUsers ||
                        userCount === 0
                    }
                >

                    {sending ? (
                        <>
                            <span className="mail-spinner" />
                            Sending...
                        </>
                    ) : (
                        <>
                            <FiSend />
                            Send to All Users
                        </>
                    )}

                </button>

            </form>

        </div>
    );
};

export default SendMail;
