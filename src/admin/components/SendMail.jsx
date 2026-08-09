import { useState } from "react";

import {
    FiMail,
    FiUsers,
    FiSend,
} from "react-icons/fi";

import "../styles/send-mail.css";

const SendMail = () => {
    // ==========================
    // FRONTEND SAMPLE DATA
    // ==========================

    const [userCount] = useState(12);

    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [sending, setSending] = useState(false);

    // ==========================
    // SEND MAIL
    // ==========================

    const handleSendMail = (e) => {
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

        setSending(true);

        // Frontend-only simulation
        setTimeout(() => {
            alert(
                `Email sent successfully to ${userCount} users.`
            );

            setSubject("");
            setMessage("");
            setSending(false);
        }, 1000);
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
                        {userCount}{" "}
                        {userCount === 1
                            ? "user"
                            : "users"}
                    </span>

                </div>

            </div>

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
                            This email will be sent to all{" "}
                            {userCount} registered{" "}
                            {userCount === 1
                                ? "user"
                                : "users"}.
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
