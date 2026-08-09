import "../styles/components.css";

const StatCard = ({
  icon,
  title,
  value,
  color,
  trend,
  trendText,
}) => {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>
        {icon}
      </div>

      <div className="stats-details">
        <p>{title}</p>

        <h2>{value}</h2>

        {trend && (
          <span
            className={`stat-trend ${
              trend === "up" ? "up" : "down"
            }`}
          >
            {trend === "up" ? "↑" : "↓"} {trendText}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;