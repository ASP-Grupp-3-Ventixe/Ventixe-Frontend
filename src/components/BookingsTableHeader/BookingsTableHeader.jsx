import React from "react";
import "./BookingsTableHeader.css";

const STATUSES = ["All", "Confirmed", "Pending", "Cancelled"];
const CATEGORIES = [
  "All Categories",
  "Music & Theater",
  "Sport",
  "Fashion",
  "Art & Design",
];
const DATE_RANGES = ["This Month", "This Week", "Last 30 Days"];

export default function BookingsTableHeader({
  activeStatus,
  onStatusChange,
  searchValue,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  activeDateRange,
  onDateRangeChange,
}) {
  return (
    <div className="bth-toolbar">
      <ul className="bth-status-tabs">
        {STATUSES.map((st) => (
          <li
            key={st}
            className={st === activeStatus ? "active" : ""}
            onClick={() => onStatusChange(st)}
          >
            {st}
          </li>
        ))}
      </ul>

      <div className="bth-controls">
        <div className="bth-search">
          <span className="bth-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search name, event, etc"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <select
          className="bth-select"
          value={activeCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className="bth-select"
          value={activeDateRange}
          onChange={(e) => onDateRangeChange(e.target.value)}
        >
          {DATE_RANGES.map((dr) => (
            <option key={dr} value={dr}>
              {dr}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
