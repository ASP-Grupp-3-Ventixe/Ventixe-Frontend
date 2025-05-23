import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import config from "../../../config"

const BASE_URL = config.apiBaseUrl

const EventDetails = () => {
    const { id } = useParams()
    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(true)

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
                <div className='event-card event-packages-card'>
                    <h3 className='packages-heading'>Packages</h3>
                    <ul className='packages-list'>
                        {event.packages.map((pkg, index) => (
                            <li key={index} className='package-item'>{pkg}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default EventDetails
