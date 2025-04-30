import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    FiLogOut,
    FiHome,
    FiCalendar,
    FiDollarSign,
    FiMessageSquare,
    FiUsers,
    FiImage,
    FiInbox,
    FiFileText,
    FiBook
} from 'react-icons/fi';
import Logo from '../../images/Logo.svg';

const Sidebar = ({ isOpen }) => {
    const navItems = [
        { to: "/dashboard", label: "Dashboard", icon: <FiHome /> },
        { to: "/bookings", label: "Bookings", icon: <FiBook /> },
        { to: "/invoices", label: "Invoices", icon: <FiFileText /> },
        { to: "/inbox", label: "Inbox", icon: <FiInbox /> },
        { to: "/calendar", label: "Calendar", icon: <FiCalendar /> },
        { to: "/events", label: "Events", icon: <FiUsers /> },
        { to: "/financial", label: "Financial", icon: <FiDollarSign /> },
        { to: "/gallery", label: "Gallery", icon: <FiImage /> },
        { to: "/feedback", label: "Feedback", icon: <FiMessageSquare /> },
    ];

    return (
        <aside className={`sidebar ${isOpen ? 'show-sidebar' : ''}`}>
            <div className="logo">
                <img src={Logo} alt="Ventixe logo" className="logo-icon" />
            </div>

            <nav className="nav-links">
                {navItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.to}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="signout-button">
                    <span className="icon"><FiLogOut /></span>
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
