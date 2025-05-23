import React, { useState, useEffect } from "react";
import BookingsTableHeader from "../../../components/BookingsTableHeader/BookingsTableHeader";
import StatCard from "../../../components/Cards/StatCard/StatCard";
import BookingOverviewCard from "../../../components/Cards/BookingOverviewCard/BookingOverviewCard";
import BookingCategoryCard from "../../../components/Cards/BookingCategoryCard/BookingCategoryCard";
import TotalTicketsSoldCard from "../../../components/Cards/TotalTicketsSoldCard/TotalTicketsSoldCard";
import Pagination from "../../../components/Pagination/Pagination";
import "./Bookings.css";

export default function Bookings() {
  // Mock-data; byt ut mot fetch!
  const MOCK_DATA = [
    {
      bookingId: "BKG20011",
      date: "2029/02/15 19:00",
      name: "Lena Larsson",
      event: "Allsång på Skansen – vinteredition",
      price: "150 kr",
      qty: 2,
      amount: "300 kr",
      category: "Music & Theater",
    },
    {
      bookingId: "BKG20012",
      date: "2029/02/16 14:30",
      name: "Kevin Karlsson",
      event: "Modekatastrofen 2029 – Sveriges värsta outfits",
      price: "299 kr",
      qty: 1,
      amount: "299 kr",
      category: "Fashion",
    },
    {
      bookingId: "BKG20013",
      date: "2029/02/17 11:00",
      name: "Sofie Sandberg",
      event: "Konst i krukväxter – Vernissage med fika",
      price: "75 kr",
      qty: 3,
      amount: "225 kr",
      category: "Art & Design",
    },
    {
      bookingId: "BKG20014",
      date: "2029/02/18 18:45",
      name: "Jonas Johansson",
      event: "Korpfinal i inomhuscurling – med efterfest",
      price: "90 kr",
      qty: 2,
      amount: "180 kr",
      category: "Sport",
    },
  ];

  const [data] = useState(MOCK_DATA);
  const [filtered, setFiltered] = useState(MOCK_DATA);

  const [category, setCategory] = useState("All Categories");
  const [dateRange, setDateRange] = useState("This Month");
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.ceil(filtered.length / pageSize);

  useEffect(() => {
    let temp = [...data];

    if (category !== "All Categories") {
      temp = temp.filter((r) => r.category === category);
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
  }, [search, category, data]);

  const paged = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bookings-page">
      <div className="cards-container">
        <div className="card-item stacked-cards">
          <StatCard
            label="Total bookings"
            value="55,000"
            percentage={12.5}
            positive={true}
          />
          <TotalTicketsSoldCard
            label="Sold Tickets"
            value="25,000"
            percentage={92.5}
            positive={true}
          />
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

              {
                name: "Art & Design",
                percent: 12,
                count: 5300,
                color: "#ff5cf0",
              },
            ]}
          />
        </div>

        <div className="card-item">
          <BookingOverviewCard />
        </div>
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
              <tr key={r.bookingId}>
                <td>{r.date}</td>
                <td>{r.name}</td>
                <td>{r.event}</td>
                <td>{r.price}</td>
                <td>{r.qty}</td>
                <td>{r.amount}</td>
                <td>{r.category}</td>
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
