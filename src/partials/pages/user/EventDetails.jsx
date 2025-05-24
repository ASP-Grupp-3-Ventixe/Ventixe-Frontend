import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import config from "../../../config"

const BASE_URL = config.apiBaseUrl

const EventDetails = () => {
    const { id } = useParams()
    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedPackage, setSelectedPackage] = useState("")
    const [bookingMessage, setBookingMessage] = useState("")
    const [ticketCount, setTicketCount] = useState(1)
    const [customerName, setCustomerName] = useState("")

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/events/${id}`, { method: "GET", mode: "cors" })
                if (!res.ok) throw new Error("Event not found")
                const data = await res.json()
                setEvent(data)
            } catch (error) {
                console.error("Error fetching event:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchEvent()
    }, [id])

    const handleBooking = async () => {
        if (!selectedPackage) {
            setBookingMessage("Choose a package first.")
            return
        }

        try {
            const res = await fetch("https://ventixe-bookingprovider-hgadhcexa5fpfday.swedencentral-01.azurewebsites.net/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    eventId: event.eventId,
                    packageName: selectedPackage,
                    amount: ticketCount,
                    customerName: customerName
                })
            })

            if (!res.ok) throw new Error("Booking failed")
                setBookingMessage("Booking successful!")           
        } catch (error) {
            console.error("Booking error:", error)
            setBookingMessage("Booking failure. Try again or contact support.")
        }
    }

    const navigate = useNavigate

    if (loading) return <p>Loading...</p>
    if (!event) return <p>Event not found</p>

    return (

        <div className='event-details-wrapper-grid'>
            <button onClick={() => navigate("/events")} className='back-button'>
                Back to Events
            </button>
            <div className='event-card event-details-card'>
                <h1 className='event-details-title'>{event.title}</h1>
                <p className='event-meta'>
                    {new Date(event.date).toLocaleDateString()} - {event.location}
                </p>
                <p className='event-status'>Status: {event.status}</p>
                <p className='event-description'>Status: {event.description}</p>
                <div className='event-stats'>
                    <p>Tickets Sold: {event.ticketsSold} / {event.maxTickets}</p>
                    <p>From: <span className='event-price'>{event.priceFrom} $</span></p>
                </div>
            </div>

            {event.packages?.length > 0 && (
                <>
                    <div className='event-card event-packages-card'>
                        <h3 className='packages-heading'>Packages</h3>
                        <ul className='packages-list'>
                            {event.packages.map((pkg, index) => (
                                <li key={index} className='package-item'>{pkg}</li>
                            ))}
                        </ul>
                    </div>

                    <form className='booking-form' onSubmit={(e) => {
                        e.preventDefault()
                        handleBooking()
                    }}>


                        <h3 className='booking-heading'>Book your ticket</h3>

                        <div className='booking-packages'>
                            {event.packages.map((pkg, index) => (
                                <label key={index} className='booking-package-option'>
                                    <input
                                        type='radio'
                                        name='package'
                                        value={pkg}
                                        checked={selectedPackage === pkg}
                                        onChange={() => setSelectedPackage(pkg)}
                                    />
                                    {pkg}
                                </label>
                            ))}
                        </div>

                        <div className='booking-ticket-count'>
                            <label htmlFor='ticketCount'>Tickets:</label>
                            <input
                                type='number'
                                id='ticketCount'
                                min={1}
                                value={ticketCount}
                                onChange={(e) => setTicketCount(Number(e.target.value))}
                            />
                        </div>

                        <div className='booking-customer-name'>
                            <label htmlFor='customerName'>Full Name:</label>
                            <input
                                type='text'
                                id='customerName'
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                            />
                        </div>

                        <button type='submit' className='booking-button'>Book Now</button>
                        <p className='booking-message'>{bookingMessage}</p>
                    </form>
                </>
            )}
        </div>
    )
}

export default EventDetails
