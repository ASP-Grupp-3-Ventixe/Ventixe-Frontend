import React, { useState, useEffect } from "react";
import BookingsTableHeader from "../../../components/BookingsTableHeader/BookingsTableHeader";
import StatCard from "../../../components/Cards/StatCard/StatCard";
import BookingOverviewCard from "../../../components/Cards/BookingOverviewCard/BookingOverviewCard";
import BookingCategoryCard from "../../../components/Cards/BookingCategoryCard/BookingCategoryCard";
import TotalTicketsSoldCard from "../../../components/Cards/TotalTicketsSoldCard/TotalTicketsSoldCard";
import Pagination from "../../../components/Pagination/Pagination";
import "../../../App.css";

export default function Bookings() {
  // Mock-data; byt ut mot fetch!
  const MOCK_DATA = [
    {
      bookingId: "BKG10011",
      date: "2029/02/15 10:30 AM",
      name: "Jackson Moore",
      event: "Symphony Under the Stars",
      price: "$50",
      qty: 2,
      amount: "$100",
    },
    {
      bookingId: "BKG10012",
      date: "2029/02/16 03:45 PM",
      name: "Alicia Smithson",
      event: "Runway Revolution 2024",
      price: "$120",
      qty: 1,
      amount: "$120",
    },
  ];

  const [data] = useState(MOCK_DATA);
  const [filtered, setFiltered] = useState(MOCK_DATA);

  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All Categories");
  const [dateRange, setDateRange] = useState("This Month");
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.ceil(filtered.length / pageSize);

  useEffect(() => {
    let temp = [...data];

    if (status !== "All") {
      temp = temp.filter((r) => r.status === status);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      temp = temp.filter(
        (r) =>
          r.name.toLowerCase().includes(q) || r.event.toLowerCase().includes(q)
      );
    }

    setFiltered(temp);
    setCurrentPage(1);
  }, [status, search, data]);

  const paged = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bookings-page">
      <div className="cards-container">
        <div className="card-item">
          <StatCard
            label="Total bookings"
            value="55,000"
            percentage={12.5}
            positive={true}
          />
        </div>
        <div className="card-item">
          <TotalTicketsSoldCard label="Total Sold Tickets" value="25,000" />
        </div>

        <div className="card-item">
          <BookingOverviewCard />
        </div>
        <div className="card-item">
          <BookingCategoryCard
            totalBookings={44115}
            categories={[
              {
                name: "Music & Theater",
                percent: 43,
                count: 19022,
                color: "#ff5cf0",
              },
              {
                name: "Sport",
                percent: 28,
                count: 12476,
                color: "#2d2f94",
              },
              {
                name: "Fashion",
                percent: 29,
                count: 12617,
                color: "#dcdcf7",
              },
            ]}
          />
        </div>
      </div>

      <BookingsTableHeader
        activeStatus={status}
        onStatusChange={setStatus}
        searchValue={search}
        onSearchChange={setSearch}
        activeCategory={category}
        onCategoryChange={setCategory}
        activeDateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      <div className="bookings-table-container">
        <table className="bookings-table bookings-table--bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Event</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((r) => (
              <tr key={r.bookingId}>
                <td>{r.date}</td>
                <td>{r.name}</td>
                <td>{r.event}</td>
                <td>{r.price}</td>
                <td>{r.qty}</td>
                <td>{r.amount}</td>
              </tr>
            ))}
            {paged.length === 0 && (
              <tr>
                <td colSpan="7" className="no-data">
                  Inga bokningar hittades.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(p) => {
          if (p < 1 || p > totalPages) return;
          setCurrentPage(p);
        }}
      />
    </div>
  );
}
