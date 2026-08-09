import { useEffect, useState } from "react";
import axios from "axios";
import {
    FiMail,
    FiUsers,
    FiSend,
} from "react-icons/fi";

import "../styles/send-mail.css";

const SendMail = () => {
    const [userCount, setUserCount] = useState(0);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [loadingUsers, setLoadingUsers] = useState(true);
    const [sending, setSending] = useState(false);

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoadingUsers(true);

                const token = localStorage.getItem("token");

                const response = await axios.get(
                    `${API_URL}/api/admin/users`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const users = response.data.users || [];

                setUserCount(users.length);
            } catch (error) {
                console.error(
                    "Failed to fetch users:",
                    error
                );
            } finally {
                setLoadingUsers(false);
            }
        };

        fetchUsers();
    }, [API_URL]);

    const handleSendMail = async (e) => {
        e.preventDefault();

        if (!subject.trim()) {
            alert("Please enter an email subject.");
            return;
        }

        if (!message.trim()) {
            alert("Please enter your message.");
            return;
        }

        if (userCount === 0) {
            alert("There are no users to send mail to.");
            return;
        }

        try {
            setSending(true);

            const token = localStorage.getItem("token");

            await axios.post(
                `${API_URL}/api/admin/send-mail`,
                {
                    subject,
                    message,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(
                `Email sent successfully to ${userCount} users.`
            );

            setSubject("");
            setMessage("");
        } catch (error) {
            console.error(
                "Failed to send email:",
                error
            );

            alert(
                error.response?.data?.message ||
                    "Failed to send email."
            );
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="send-mail-card">

            {/* Header */}
            <div className="send-mail-header">

                <div className="send-mail-title">

                    <div className="send-mail-icon">
                        <FiMail />
                    </div>

                    <div>
                        <h2>Send Mail</h2>

                        <p>
                            Send an email to all registered
                            users.
                        </p>
                    </div>

                </div>

                <div className="recipient-count">

                    <FiUsers />

                    <span>
                        {loadingUsers
                            ? "Loading users..."
                            : `${userCount} ${
                                  userCount === 1
                                      ? "user"
                                      : "users"
                              }`}
                    </span>

                </div>

            </div>

            {/* Form */}
            <form
                className="mail-form"
                onSubmit={handleSendMail}
            >

                {/* Recipients */}
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
                                ? "Fetching users from database..."
                                : `This email will be sent to all ${userCount} registered ${
                                      userCount === 1
                                          ? "user"
                                          : "users"
                                  }.`}
                        </span>
                    </div>

                </div>

                {/* Subject */}
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
                            setSubject(e.target.value)
                        }
                    />

                </div>

                {/* Message */}
                <div className="form-group">

                    <label htmlFor="mail-message">
                        Message
                    </label>

                    <textarea
                        id="mail-message"
                        placeholder="Write your email message..."
                        value={message}
                        onChange={(e) =>
                            setMessage(e.target.value)
                        }
                    />

                </div>

                {/* Send */}
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