import React from "react";
import EventCard from "../../../components/Cards/EventCard/EventCard";
import StatCard from "../../../components/Cards/StatCard/StatCard";
import ReviewCard from "../../../components/Cards/ReviewCard/ReviewCard";

const Cards = () => {
  return (
    <div className="p-6 grid gap-6 md:grid-cols-2">
      <EventCard
        category="Musikal & Teater"
        title="Carola på Cirkus"
        location="Cirkus, Djurgården"
        date="Apr 22, 2025"
        time="19:00"
        ticketSold={75}
        ticketsLeft={45}
        price={30}
      />
      <StatCard
        label="Totala bokningar"
        value="55,000"
        icon="📊"
        percentage={12.5}
        positive={true}
      />

      <ReviewCard
        user="Oliver Bennett"
        rating={5}
        date="Apr 20, 2029"
        comment="Väldigt bra event!"
        eventTitle="Carola på Cirkus"
        category="Music"
      />
    </div>
  );
};

export default Cards;
