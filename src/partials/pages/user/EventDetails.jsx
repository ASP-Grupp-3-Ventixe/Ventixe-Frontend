import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import config from "../../../config"
import { FiArrowLeft } from 'react-icons/fi'
const BASE_URL = config.apiBaseUrl

const EventDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedPackage, setSelectedPackage] = useState("")
    const [ticketCount, setTicketCount] = useState(1)
    const [customerName, setCustomerName] = useState("")
    const [bookingMessage, setBookingMessage] = useState("")

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/events/${id}`)
                if (!res.ok) throw new Error("Event not found")
                const data = await res.json()
                setEvent(data)
            } catch (err) {
                console.error("Error:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchEvent()
    }, [id])


    const handleBooking = async () => {
        if (!selectedPackage) {
            setBookingMessage("Choose a package first.");
            return;
        }

        if ((event.ticketsSold ?? 0) + ticketCount > event.maxTickets) {
            setBookingMessage("Not enough tickets left.");
            return;
        }

        try {
            const res = await fetch("https://ventixe-bookingprovider-hgadhcexa5fpfday.swedencentral-01.azurewebsites.net/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    eventId: event.eventId,
                    ticketsQuantity: ticketCount,
                    customerName
                })
            });

            if (!res.ok) throw new Error("Booking failed");

            await fetch(`${BASE_URL}/api/events/increase-tickets?eventId=${event.eventId}&quantity=${ticketCount}`, {
                method: "POST"
            });

            setBookingMessage("Booking successful!");
            setEvent(prev => ({
                ...prev,
                ticketsSold: (prev.ticketsSold ?? 0) + ticketCount
            }));
        } catch {
            setBookingMessage("Booking failed. Try again.");
        }

    };

    const imageUrl = event.imageUrl?.trim() ? event.imageUrl : "/default-event.jpg";





    if (loading) return <p>Loading...</p>
    if (!event) return <p>Event not found</p>

    return (
        <main className="event-details">
            <div className="details-grid">

                {/* === VÄNSTER === */}
                <div className="left">

                    <div className="event-image" style={{ backgroundImage: `url(${imageUrl})` }} />

                    <div className="event-info-card">
                        <h1 className="event-details-title">{event.title}</h1>

                        <div className="event-meta">
                            <div className="event-left-meta">
                                <span>{new Date(event.date).toLocaleDateString()} – {new Date(event.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                                <span>{event.location} <button className="map-btn">Show Map</button></span>
                            </div>

                            <div className="right-metrics">
                                <div className="metric-block">
                                    <p className="metric-label">Tickets Sold</p>
                                    <p className="metric-value">{event.ticketsSold ?? 0} / {event.maxTickets?.toLocaleString() ?? "?"}</p>
                                    <p >{event.maxTickets - event.ticketsSold} tickets remaining</p>
                                </div>
                                <div className="metric-block">
                                    <p className="metric-label">Starts from</p>
                                    <p className="metric-price">${event.priceFrom}</p>
                                </div>
                            </div>
                        </div>

                        <hr className="section-divider" />

                        <div className="event-about-section">
                            <h4>About Event</h4>
                            <p>{event.description}</p>
                        </div>
                    </div>

                    <div className="status-badge">Status: {event.status}</div>
                    <div className="event-progress-bar">
                        <div className="fill" style={{ width: `${event.progress ?? 0}%` }} />
                    </div>
                    <div className="event-progress-percent">{event.progress ?? 0}%</div>

                    <div className="event-terms-card">
                        <h3>Terms & Conditions</h3>
                        <ol className="terms-list">
                            <li>
                                <strong>Ticket Purchase and Entry</strong>
                                <ul>
                                    <li>All attendees must possess a valid ticket for entry.</li>
                                    <li>Tickets are non-refundable and non-transferable unless specified by the event organizer.</li>
                                    <li>Attendees must present a valid government-issued ID along with their ticket at the gate.</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Security and Safety</strong>
                                <ul>
                                    <li>Attendees may be subject to security checks, including bag inspections, upon entry.</li>
                                    <li>Prohibited items include weapons, drugs, alcohol, fireworks, and other hazardous materials.</li>
                                    <li>The event organizer reserves the right to deny entry to individuals deemed a security risk.</li>
                                </ul>
                            </li>
                        </ol>
                    </div>

                </div>

                {/* === HÖGER === */}
                <div className="event-details-right">

                    {event.packages.map((pkg) => (
                        <div key={pkg.name} className="package-card">
                            <h4>{pkg.name}</h4>
                            <p>Exclusive benefits apply</p>
                            <p>${pkg.price.toFixed(2)}</p>
                        </div>
                    ))}

                    <form className="booking-form" onSubmit={(e) => {
                        e.preventDefault();
                        handleBooking();
                    }}>
                        <h3>Book your ticket</h3>

                        {event.packages.map((pkg, index) => (
                            <label key={index}>
                                <input
                                    type='radio'
                                    name='package'
                                    value={pkg.name}
                                    checked={selectedPackage === pkg.name}
                                    onChange={() => setSelectedPackage(pkg.name)}
                                />
                                {pkg.name} - ${pkg.price.toFixed(2)}
                            </label>
                        ))}

                        <label htmlFor='ticketCount'>Tickets:</label>
                        <input
                            type='number'
                            id='ticketCount'
                            min={1}
                            max={event.maxTickets - (event.ticketsSold ?? 0)}
                            value={ticketCount}
                            onChange={(e) => setTicketCount(Number(e.target.value))}
                        />

                        <label htmlFor='customerName'>Full Name:</label>
                        <input
                            type='text'
                            id='customerName'
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />

                        <button type='submit' className='booking-button'>
                            Book Now
                        </button>
                        <p className='booking-message'>{bookingMessage}</p>

                        {selectedPackage && (
                            <p className='total-cost'>
                                Total: <span className='price-highlight'>${ticketCount * (event.packages.find
                                    (p => p.name === selectedPackage)?.price ?? 0)}</span>
                            </p>
                        )}
                    </form>

                </div>
            </div>
        </main>
    )


}

export default EventDetails
