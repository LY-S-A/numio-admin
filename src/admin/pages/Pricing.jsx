import { useState } from "react";

import {
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiRefreshCw,
    FiSave,
    FiX,
} from "react-icons/fi";

import { FaExchangeAlt, FaPercentage } from "react-icons/fa";

import "../styles/pricing.css";

const PricingRules = () => {
    // ==========================
    // SAMPLE FRONTEND DATA
    // ==========================

    const [rules, setRules] = useState([
        {
            _id: "1",
            type: "DEFAULT",
            strategy: "PERCENTAGE",
            value: 20,
            priority: 1,
            enabled: true,
        },
        {
            _id: "2",
            type: "SERVICE",
            strategy: "FIXED",
            value: 100,
            priority: 2,
            enabled: true,
        },
        {
            _id: "3",
            type: "COUNTRY",
            strategy: "PERCENTAGE",
            value: 10,
            priority: 3,
            enabled: false,
        },
    ]);

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [editingRule, setEditingRule] = useState(null);

    const [rate, setRate] = useState("1500");

    const [formData, setFormData] = useState({
        type: "DEFAULT",
        strategy: "PERCENTAGE",
        value: "",
        priority: 1,
        enabled: true,
    });

    // ==========================
    // REFRESH
    // ==========================

    const fetchData = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 600);
    };

    // ==========================
    // FORM
    // ==========================

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    };

    // ==========================
    // CREATE MODAL
    // ==========================

    const openCreateModal = () => {
        setEditingRule(null);

        setFormData({
            type: "DEFAULT",
            strategy: "PERCENTAGE",
            value: "",
            priority: 1,
            enabled: true,
        });

        setShowModal(true);
    };

    // ==========================
    // EDIT MODAL
    // ==========================

    const openEditModal = (rule) => {
        setEditingRule(rule);

        setFormData({
            type: rule.type || "DEFAULT",
            strategy:
                rule.strategy || "PERCENTAGE",
            value: rule.value ?? "",
            priority: rule.priority ?? 1,
            enabled: rule.enabled ?? true,
        });

        setShowModal(true);
    };

    // ==========================
    // CLOSE MODAL
    // ==========================

    const closeModal = () => {
        if (saving) return;

        setShowModal(false);
        setEditingRule(null);
    };

    // ==========================
    // CREATE / UPDATE
    // ==========================

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            formData.value === "" ||
            Number(formData.value) < 0
        ) {
            return;
        }

        setSaving(true);

        setTimeout(() => {
            const updatedRule = {
                _id:
                    editingRule?._id ||
                    Date.now().toString(),

                type: formData.type,

                strategy: formData.strategy,

                value: Number(formData.value),

                priority: Number(
                    formData.priority
                ),

                enabled: formData.enabled,
            };

            if (editingRule) {
                setRules((prev) =>
                    prev.map((rule) =>
                        rule._id ===
                        editingRule._id
                            ? updatedRule
                            : rule
                    )
                );
            } else {
                setRules((prev) => [
                    ...prev,
                    updatedRule,
                ]);
            }

            setSaving(false);
            setShowModal(false);
            setEditingRule(null);
        }, 500);
    };

    // ==========================
    // DELETE
    // ==========================

    const deleteRule = (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this pricing rule?"
        );

        if (!confirmed) return;

        setRules((prev) =>
            prev.filter(
                (rule) => rule._id !== id
            )
        );
    };

    // ==========================
    // EXCHANGE RATE
    // ==========================

    const updateRate = (e) => {
        e.preventDefault();

        if (!rate || Number(rate) <= 0) {
            return;
        }

        setSaving(true);

        setTimeout(() => {
            setRate(String(Number(rate)));
            setSaving(false);
        }, 500);
    };

    // ==========================
    // HELPERS
    // ==========================

    const formatText = (value) => {
        if (!value) return "-";

        return value
            .replace(/_/g, " ")
            .replace(/\b\w/g, (char) =>
                char.toUpperCase()
            );
    };

    const formatValue = (rule) => {
        if (rule.strategy === "PERCENTAGE") {
            return `${rule.value}%`;
        }

        return `₦${Number(
            rule.value
        ).toLocaleString()}`;
    };

    return (
        <div className="pricing-page">

            {/* =========================
                HEADER
            ========================= */}

            <div className="pricing-header">

                <div>
                    <h1>Pricing & Rates</h1>

                    <p>
                        Manage your pricing rules and
                        exchange rate.
                    </p>
                </div>

                <button
                    className="pricing-refresh-btn"
                    onClick={fetchData}
                    disabled={loading}
                >
                    <FiRefreshCw
                        className={
                            loading
                                ? "pricing-spin"
                                : ""
                        }
                    />

                    Refresh
                </button>

            </div>

            {/* =========================
                EXCHANGE RATE
            ========================= */}

            <div className="exchange-rate-card">

                <div className="exchange-rate-info">

                    <div className="exchange-rate-icon">
                        <FaExchangeAlt />
                    </div>

                    <div>
                        <h2>Exchange Rate</h2>

                        <p>
                            USD to Nigerian Naira
                        </p>
                    </div>

                </div>

                <form
                    className="exchange-rate-form"
                    onSubmit={updateRate}
                >

                    <div className="rate-input">

                        <span>$1</span>

                        <span className="equals">
                            =
                        </span>

                        <input
                            type="number"
                            min="1"
                            value={rate}
                            onChange={(e) =>
                                setRate(
                                    e.target.value
                                )
                            }
                            placeholder="1500"
                        />

                        <span>
                            NGN
                        </span>

                    </div>

                    <button
                        type="submit"
                        className="save-rate-btn"
                        disabled={saving}
                    >
                        <FiSave />

                        {saving
                            ? "Saving..."
                            : "Update Rate"}
                    </button>

                </form>

            </div>

            {/* =========================
                RULE HEADER
            ========================= */}

            <div className="rules-header">

                <div>
                    <h2>Pricing Rules</h2>

                    <p>
                        Control how prices are
                        calculated.
                    </p>
                </div>

                <button
                    className="add-rule-btn"
                    onClick={openCreateModal}
                >
                    <FiPlus />
                    Add Rule
                </button>

            </div>

            {/* =========================
                RULES
            ========================= */}

            <div className="pricing-rules-card">

                {loading ? (

                    <div className="pricing-loading">
                        <FiRefreshCw className="pricing-spin" />
                        Loading pricing rules...
                    </div>

                ) : rules.length === 0 ? (

                    <div className="pricing-empty">

                        <FaPercentage />

                        <h3>
                            No pricing rules
                        </h3>

                        <p>
                            Add a pricing rule to get
                            started.
                        </p>

                        <button
                            className="add-rule-btn"
                            onClick={
                                openCreateModal
                            }
                        >
                            <FiPlus />
                            Add Rule
                        </button>

                    </div>

                ) : (

                    <div className="pricing-table-wrapper">

                        <table className="pricing-table">

                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Strategy</th>
                                    <th>Value</th>
                                    <th>Priority</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {rules.map((rule) => (

                                    <tr
                                        key={rule._id}
                                    >

                                        <td>
                                            <strong>
                                                {formatText(
                                                    rule.type
                                                )}
                                            </strong>
                                        </td>

                                        <td>
                                            <span className="strategy-badge">
                                                {formatText(
                                                    rule.strategy
                                                )}
                                            </span>
                                        </td>

                                        <td>
                                            <strong>
                                                {formatValue(
                                                    rule
                                                )}
                                            </strong>
                                        </td>

                                        <td>
                                            <span className="priority-badge">
                                                {
                                                    rule.priority
                                                }
                                            </span>
                                        </td>

                                        <td>
                                            <span
                                                className={`rule-status ${
                                                    rule.enabled
                                                        ? "active"
                                                        : "disabled"
                                                }`}
                                            >
                                                <span />

                                                {rule.enabled
                                                    ? "Active"
                                                    : "Disabled"}
                                            </span>
                                        </td>

                                        <td>

                                            <div className="rule-actions">

                                                <button
                                                    className="edit-rule-btn"
                                                    onClick={() =>
                                                        openEditModal(
                                                            rule
                                                        )
                                                    }
                                                >
                                                    <FiEdit2 />
                                                </button>

                                                <button
                                                    className="delete-rule-btn"
                                                    onClick={() =>
                                                        deleteRule(
                                                            rule._id
                                                        )
                                                    }
                                                >
                                                    <FiTrash2 />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

            {/* =========================
                MOBILE CARDS
            ========================= */}

            <div className="pricing-mobile-list">

                {rules.map((rule) => (

                    <div
                        className="pricing-mobile-card"
                        key={rule._id}
                    >

                        <div className="mobile-rule-header">

                            <div>

                                <span>
                                    Type
                                </span>

                                <strong>
                                    {formatText(
                                        rule.type
                                    )}
                                </strong>

                            </div>

                            <span
                                className={`rule-status ${
                                    rule.enabled
                                        ? "active"
                                        : "disabled"
                                }`}
                            >
                                <span />

                                {rule.enabled
                                    ? "Active"
                                    : "Disabled"}
                            </span>

                        </div>

                        <div className="mobile-rule-grid">

                            <div>
                                <span>
                                    Strategy
                                </span>

                                <strong>
                                    {formatText(
                                        rule.strategy
                                    )}
                                </strong>
                            </div>

                            <div>
                                <span>
                                    Value
                                </span>

                                <strong>
                                    {formatValue(
                                        rule
                                    )}
                                </strong>
                            </div>

                            <div>
                                <span>
                                    Priority
                                </span>

                                <strong>
                                    {rule.priority}
                                </strong>
                            </div>

                        </div>

                        <div className="mobile-rule-actions">

                            <button
                                className="edit-rule-btn"
                                onClick={() =>
                                    openEditModal(
                                        rule
                                    )
                                }
                            >
                                <FiEdit2 />
                                Edit
                            </button>

                            <button
                                className="delete-rule-btn"
                                onClick={() =>
                                    deleteRule(
                                        rule._id
                                    )
                                }
                            >
                                <FiTrash2 />
                                Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

            {/* =========================
                CREATE / EDIT MODAL
            ========================= */}

            {showModal && (

                <div
                    className="pricing-modal-overlay"
                    onClick={closeModal}
                >

                    <div
                        className="pricing-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <div className="pricing-modal-header">

                            <div>

                                <h2>
                                    {editingRule
                                        ? "Edit Pricing Rule"
                                        : "Add Pricing Rule"}
                                </h2>

                                <p>
                                    Configure this pricing
                                    rule.
                                </p>

                            </div>

                            <button
                                className="pricing-modal-close"
                                onClick={closeModal}
                            >
                                <FiX />
                            </button>

                        </div>

                        <form
                            className="pricing-form"
                            onSubmit={handleSubmit}
                        >

                            <div className="pricing-form-group">

                                <label>
                                    Rule Type
                                </label>

                                <select
                                    name="type"
                                    value={
                                        formData.type
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                >
                                    <option value="DEFAULT">
                                        Default
                                    </option>

                                    <option value="SERVICE">
                                        Service
                                    </option>

                                    <option value="SERVICE_FIXED_PROFIT">
                                        Service Fixed Profit
                                    </option>

                                    <option value="COUNTRY">
                                        Country
                                    </option>

                                    <option value="OPERATOR">
                                        Operator
                                    </option>
                                </select>

                            </div>

                            <div className="pricing-form-group">

                                <label>
                                    Strategy
                                </label>

                                <select
                                    name="strategy"
                                    value={
                                        formData.strategy
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                >
                                    <option value="PERCENTAGE">
                                        Percentage
                                    </option>

                                    <option value="FIXED">
                                        Fixed Amount
                                    </option>
                                </select>

                            </div>

                            <div className="pricing-form-row">

                                <div className="pricing-form-group">

                                    <label>
                                        Value
                                    </label>

                                    <div className="pricing-value-input">

                                        <span>
                                            {formData.strategy ===
                                            "PERCENTAGE"
                                                ? "%"
                                                : "₦"}
                                        </span>

                                        <input
                                            type="number"
                                            name="value"
                                            value={
                                                formData.value
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            min="0"
                                            step="0.01"
                                            placeholder={
                                                formData.strategy ===
                                                "PERCENTAGE"
                                                    ? "20"
                                                    : "500"
                                            }
                                            required
                                        />

                                    </div>

                                </div>

                                <div className="pricing-form-group">

                                    <label>
                                        Priority
                                    </label>

                                    <input
                                        type="number"
                                        name="priority"
                                        value={
                                            formData.priority
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        min="1"
                                        required
                                    />

                                </div>

                            </div>

                            <label className="pricing-toggle">

                                <div>
                                    <strong>
                                        Enable Rule
                                    </strong>

                                    <span>
                                        Apply this rule to
                                        pricing
                                    </span>
                                </div>

                                <input
                                    type="checkbox"
                                    name="enabled"
                                    checked={
                                        formData.enabled
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                                <span className="pricing-toggle-slider" />

                            </label>

                            <div className="pricing-modal-actions">

                                <button
                                    type="button"
                                    className="pricing-cancel-btn"
                                    onClick={
                                        closeModal
                                    }
                                    disabled={saving}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="pricing-save-btn"
                                    disabled={saving}
                                >
                                    <FiSave />

                                    {saving
                                        ? "Saving..."
                                        : editingRule
                                        ? "Update Rule"
                                        : "Create Rule"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
};

export default PricingRules;
