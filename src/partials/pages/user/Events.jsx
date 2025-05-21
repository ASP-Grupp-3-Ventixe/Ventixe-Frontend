import React, { useEffect, useRef, useState } from "react"
import EventCard from "../../../components/EventCard"
import EventForm from "../../../components/EventForm"
import DeleteConfirmModal from "../../../components/DeleteConfirmModal"
import { AiFillFilter } from "react-icons/ai"
import config from "../../../config"; // justera vägen om filstrukturen skiljer sig
const BASE_URL = config.apiBase_


const Events = () => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [eventsPerPage, setEventsPerPage] = useState(8)
    const [statusFilter, setStatusFilter] = useState("Active")
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [showCategories, setShowCategories] = useState(false)
    const [onlyThisMonth, setOnlyThisMonth] = useState(false)
    const [viewMode, setViewMode] = useState("grid")
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editEvent, setEditEvent] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [eventToDelete, setEventToDelete] = useState(null)

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/events`);
                const data = await res.json()
                setEvents(data);
            } catch (error) {
                console.error("Failed to fetch events", error)
            } finally {
                setLoading(false)
            }
        }

        fetchEvents()
    }, [])

    const handleFormSubmit = async (formData) => {

        if (formData.id && formData.id !== 0) {
            await fetch(`${BASE_URL}/api/events`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            const updated = await (await fetch(`${BASE_URL}/api/events`)).json()
            setEvents(updated)
        } else {
            await fetch(`${BASE_URL}/api/events`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            const all = await (await fetch(`${BASE_URL}/api/events`)).json()
            setEvents(all)
        }
        setIsFormOpen(false)
        setEditEvent(null)
    }

    const handleEdit = (event) => {
        setEditEvent(event)
        setIsFormOpen(true)
    }

    const confirmDelete = async (eventId) => {
        setEventToDelete(eventId)
        setShowDeleteModal(true)
    }

    const handleConfirmDelete = async () => {
        await fetch(`${BASE_URL}/api/events/${eventToDelete}`,
            { method: "DELETE" })
        setShowDeleteModal(false)
        setEventToDelete(null)

    }

    const categories = ["All", ...new Set(events.map(e => e.category))]

    const filteredEvents = events.filter((event) => {
        const eventDate = new Date(event.date)
        const now = new Date()

        const isSameMonth = eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear()

        return (
            event.status === statusFilter &&
            (selectedCategory === "All" || event.category === selectedCategory) &&
            (
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.location.toLowerCase().includes(searchTerm.toLowerCase())
            ) &&
            (!onlyThisMonth || isSameMonth)

        )

    }
    )

    const paginatedEvents = filteredEvents.slice(
        (page - 1) * eventsPerPage,
        page * eventsPerPage
    )

    const totalPages = Math.ceil(events.length / eventsPerPage)

    const dropdownRef = useRef(null)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowCategories(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleImageUpload = async (eventId, file) => {
        const formData = new FormData()
        formData.append("file", file)

        try {
            for (let [key, value] of formData.entries()) {
                console.log(key, value)
            }
            const res = await fetch(`${BASE_URL}/api/events/upload-image/${eventId}`, {
                method: "POST",
                body: formData,
            })

            if (res.ok) {
                const { fileName, imageUrl } = await res.json()

                const updatedEvents = events.map(e =>
                    e.id === eventId ? { ...e, imageFileName: fileName, imageUrl } : e
                )
                setEvents(updatedEvents)
            }
            else {
                alert("Misslyckades med att ladda upp bilden.")
            }
        } catch (error) {
            console.error("Error uploading image:", error)
        }
    }

    if (loading) return <p className="spinner">Loading events...</p>

    return (
        <div className="main-wrapper">
            <div className="events-page">
                <div className="events-header">
                    <button className="add-button"
                        onClick={() => { setEditEvent(null); setIsFormOpen(true); }}
                    >
                        + New Event
                    </button>
                    <div className="status-filters">
                        {["Active", "Draft", "Past"].map((status) => (
                            <button
                                key={status}
                                className={`status-button ${statusFilter === status ? "status-button--active" : ""}`}
                                onClick={() => {
                                    setStatusFilter(status)
                                    setPage(1)
                                }}
                            >
                                {status}{" "}
                                <span>({events.filter(e => e.status === status).length})</span>
                            </button>

                        ))}
                    </div>

                    <div className="right-section">
                        <div className="search-group">
                            <input type="text" className="search-input" placeholder="Search event, location, etc"
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                            />
                        </div>

                        {/*<button className="filter-icon-btn"><img src="/src/images/icons/Button More.svg" alt="Events filter" /></button>*/}

                        <div className="custom-dropdown" ref={dropdownRef}>
                            <button className="dropdown-button"
                                value={selectedCategory}
                                onClick={() => setShowCategories(prev => !prev)}
                            >
                                {selectedCategory} <img src="/src/images/icons/CaretDown.svg" alt="caret" />
                            </button>

                            {showCategories && (
                                <ul className="dropdown-menu">
                                    {categories.map(cat => {
                                        const count = cat === "All"
                                            ? events.length
                                            : events.filter(e => e.category === cat).length;

                                        return (

                                            <li key={cat}
                                                className={`dropdown-item ${selectedCategory === cat ? 'active' : ''}`}
                                                onClick={() => {
                                                    setSelectedCategory(cat)
                                                    setPage(1)
                                                    setShowCategories(false)
                                                }}
                                            >
                                                <span className="dropdown-item-left">
                                                    <span className="dropdown-item-dot"></span>
                                                    {cat}
                                                </span>
                                                <span className="dropdown-count">({count})</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            )}
                        </div>

                        {/*Omstrukturerad av ChatGpt */}
                        <button
                            className={`dropdown-button ${onlyThisMonth ? 'status-button--active' : ''}`}
                            onClick={() => setOnlyThisMonth(prev => !prev)}
                        >
                            {onlyThisMonth ? "This Month" : "All Time"}
                        </button>

                        <div className="layout-btn-group">
                            <button className={`grid-btn ${viewMode === "grid" ? "active" : ""}`}
                                onClick={() => setViewMode("grid")}

                            >
                                <img src="/src/images/icons/Button Picker.svg" alt="Grid View" />
                            </button>
                            <button className={`list-btn ${viewMode === "list" ? "active" : ""}`}
                                onClick={() => setViewMode("list")}

                            ><img src="/src/images/icons/Button Picker (1).svg" alt="List View" />
                            </button>
                        </div>
                    </div>


                </div>

                {isFormOpen && (
                    <EventForm
                        initialData={editEvent}
                        onSubmit={handleFormSubmit}
                        onClose={() => setIsFormOpen(false)}
                    />
                )}

                <div className={viewMode === "grid" ? "event-grid" : "event-list"}>
                    {paginatedEvents.map((event) => (
                        <EventCard key={event.id}
                            event={event}
                            viewMode={viewMode}
                            onDelete={() => confirmDelete(event.id)}
                            onEdit={() => handleEdit(event)}
                            onImageUpload={handleImageUpload}
                        />
                    ))}
                </div>

                {showDeleteModal && (
                    <DeleteConfirmModal
                        onConfirm={handleConfirmDelete}
                        onCancel={() => {
                            setShowDeleteModal(false)
                            setEventToDelete(null)
                        }} />
                )}

                <div className="pagination">
                    <span>
                        Showing
                        <select
                            value={eventsPerPage}
                            onChange={(e) => {
                                setEventsPerPage(Number(e.target.value))
                                setPage(1)
                            }}
                        >
                            {[4, 8, 12, 16].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                        out of {events.length}
                    </span>
                    <div className="pagination-buttons">
                        <button className="prev" disabled={page === 1} onClick={() => setPage(page - 1)}>
                            <img src="/src/images/icons/Pagination Left.svg" alt="Previous Page" />
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button key={i} className={page === i + 1 ? "active" : ""}
                                onClick={() => setPage(i + 1)}>
                                {i + 1}
                            </button>
                        ))}
                        <button className="next" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                            <img src="/src/images/icons/Pagination Right.svg" alt="Next Page" />
                        </button>

                    </div>
                </div>

            </div>
        </div>

    )
}



export default Events;