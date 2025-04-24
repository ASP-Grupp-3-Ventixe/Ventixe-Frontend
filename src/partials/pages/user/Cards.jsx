import React from "react";
import EventCard from "../../../components/Cards/EventCard/EventCard";
import StatCard from "../../../components/Cards/StatCard/StatCard";
import ReviewCard from "../../../components/Cards/ReviewCard/ReviewCard";
import BookingOverviewCard from "../../../components/Cards/BookingOverviewCard/BookingOverviewCard";
import BookingCategoryCard from "../../../components/Cards/BookingCategoryCard/BookingCategoryCard";

const Cards = () => {
  return (
    <div className="p-6 grid gap-6 md:grid-cols-2">
      <EventCard
        category="Music & Theater"
        title="Carola at Cirkus"
        location="Cirkus, Djurgården"
        date="Apr 22, 2025"
        time="19:00"
        ticketSold={75}
        ticketsLeft={45}
        price={30}
      />
      <StatCard
        label="Total bookings"
        value="55,000"
        icon="📊"
        percentage={12.5}
        positive={true}
      />

      <ReviewCard
        user="Oliver Bennett"
        rating={5}
        date="Apr 20, 2029"
        comment="Really great event!"
        eventTitle="Carola at Cirkus"
        category="Music"
      />
      <BookingOverviewCard />

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
  );
};

export default Cards;
