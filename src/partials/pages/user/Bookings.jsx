import React, { useState, useEffect } from "react";
import BookingsTableHeader from "../../../components/BookingsTableHeader/BookingsTableHeader";
import StatCard from "../../../components/Cards/StatCard/StatCard";
import TotalTicketsSoldCard from "../../../components/Cards/TotalTicketsSoldCard/TotalTicketsSoldCard";
import Pagination from "../../../components/Pagination/Pagination";
import "./Bookings.css";

export default function Bookings() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("All Categories");
  const [dateRange, setDateRange] = useState("This Month");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const pageSize = 8;
  const totalPages = Math.ceil(filtered.length / pageSize);
  const totalBookings = data.length;

  const totalTicketsSold = data.reduce((sum, b) => {
    return sum + (b.event.ticketsSold ?? 0);
  }, 0);

  const loadBookings = () => {
    setLoading(true);
    fetch(
      "https://ventixe-bookingprovider-hgadhcexa5fpfday.swedencentral-01.azurewebsites.net/api/bookings"
    )
      .then((res) => {
        if (!res.ok)
          throw new Error("Något gick fel vid hämtning av bokningar.");
        return res.json();
      })
      .then(setData)
      .catch((err) => console.error("Fel vid fetch:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    let temp = [...data];

    if (category !== "All Categories") {
      temp = temp.filter((r) => r.event.category === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      temp = temp.filter(
        (r) =>
          r.customerName.toLowerCase().includes(q) ||
          r.event.title.toLowerCase().includes(q)
      );
    }

    setFiltered(temp);
    setCurrentPage(1);
  }, [search, category, data]);

  const paged = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bookings-page">
      <div className="cards-container">
        <StatCard
          label="Total bookings"
          value={totalBookings.toLocaleString()}
        />
        <TotalTicketsSoldCard
          label="Sold Tickets"
          value={totalTicketsSold.toLocaleString()}
        />
      </div>
      <div className="bookings-table-container">
        <BookingsTableHeader
          searchValue={search}
          onSearchChange={setSearch}
          activeCategory={category}
          onCategoryChange={setCategory}
          activeDateRange={dateRange}
          onDateRangeChange={setDateRange}
        />

        <table className="bookings-table bookings-table--bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Event</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Amount</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((r) => (
              <tr
                key={r.bookingId}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/events/${r.event.eventId}`)}
              >
                <td>{new Date(r.bookingDate).toLocaleString()}</td>
                <td>{r.customerName}</td>
                <td>{r.event.title}</td>
                <td>{r.event.priceFrom ?? "-"}</td>
                <td>{r.ticketsQuantity ?? "-"}</td>
                <td>
                  {r.event?.priceFrom && r.ticketsQuantity
                    ? (r.event.priceFrom * r.ticketsQuantity).toLocaleString()
                    : "-"}
                </td>
                <td>{r.event.category}</td>
              </tr>
            ))}
            {loading ? (
              <tr>
                <td colSpan="7" className="no-data">
                  Bokningar laddas...
                </td>
              </tr>
            ) : paged.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  Inga bokningar hittades.
                </td>
              </tr>
            ) : null}
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
