import React from "react";
import "./BookingsTableHeader.css";

const CATEGORIES = [
  "All Categories",
  "Music & Theater",
  "Sport",
  "Fashion",
  "Art & Design",
];
const DATE_RANGES = ["This Month", "This Week", "Last 30 Days"];

export default function BookingsTableHeader({
  searchValue,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  activeDateRange,
  onDateRangeChange,
}) {
  return (
    <div className="bth-toolbar">
      <div className="bth-controls">
        <div className="bth-search">
          <input
            type="text"
            placeholder="Search name, event, etc"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <select
          className="btn-select"
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
          className="btn-select"
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
