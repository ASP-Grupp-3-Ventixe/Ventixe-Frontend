import React, { useEffect, useRef, useState } from "react"
import { FiEdit, FiDelete, } from "react-icons/fi"
import { CiLocationOn } from "react-icons/ci"

const EventCard = ({ event, onEdit, onDelete, viewMode, onImageUpload }) => {
    const fileInputRef = useRef()

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            onImageUpload(event.id, file)
        }
    }
    const menuRef = useRef()
    const [showMenu, setShowMenu] = useState(false)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    /* Endast omstrukturerad av ChatGpt */
    return (
        <div className={`event-card ${viewMode}`}>
            <div className="card-menu" ref={menuRef}>
                <button onClick={() => setShowMenu(prev => !prev)}
                    className="ellipsis-btn"
                    title="Options"
                >
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </button>
                {showMenu && (
                    <div className="menu-dropdown">
                        <button onClick={onEdit}><FiEdit /></button>
                        <button onClick={onDelete}><FiDelete /></button>
                    </div>
                )}
            </div>


            {/* Image */}
            <div className="event-thumbnail-wrapper">
                <div
                    className={`event-thumbnail ${event.imageUrl ? "with-image" : ""}`}
                    style={event.imageUrl ? { backgroundImage: `url(${event.imageUrl})` } : {}}
                    onClick={() => fileInputRef.current.click()}
                >
                    {viewMode === "grid" && (
                        <div className="event-badges">
                            <span className="event-category">{event.category}</span>
                            <span className="event-status">● {event.status}</span>
                        </div>
                    )}

                    <div className="thumbnail-overlay">
                        <span className="thumbnail-icon">
                            {event.imageUrl ? <i className="fa-solid fa-camera"></i> : "+"}
                        </span>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden-file-input"
                        accept="image/*"
                    />
                </div>
            </div>

            {/* Info */}
            <div className="event-card-body">
                <p className="event-date">
                    {new Date(event.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                    })}{" "}

                    {new Date(event.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    })}
                </p>
                <h3 className="event-title">{event.title}</h3>
                <p className="event-location"><CiLocationOn /> {event.location}</p>
                {viewMode === "list" && event.description && (
                    <p className="event-description">{event.description}</p>
                )}

                <div className="event-progress-row">
                    <div className="event-progress-bar">
                        <div className="event-progress-fill" style={{ width: `${event.progress}%` }}></div>
                    </div>
                    <span className="event-progress-percent">{event.progress}%</span>
                    <span className="event-price">${event.price}</span>
                </div>
            </div>
        </div>
    )
}

export default EventCard
