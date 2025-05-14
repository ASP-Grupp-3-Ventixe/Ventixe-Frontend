import React from 'react';
import {FiBell, FiSettings, FiMenu, FiSearch} from 'react-icons/fi';
import VentixeLogo from '../../images/logos/ventixe-logo.svg';
import {routes} from "../../routing/routes.config.jsx";
import {useLocation} from "react-router-dom";

// helper function to find meta based on path
function findMeta(path, routesArr = routes) {
    for (const route of routesArr) {
        if (route.children) {
            const found = findMeta(path, route.children);
            if (found) return found;
        }
        if (route.path === path && route.meta) return route.meta;
    }
    return null;
}

const Header = ({ onToggleSidebar }) => {
    const location = useLocation();
    const meta = findMeta(location.pathname);
    
    return (
        <header className="header">
            <a href="/" className="header-logo">
                <img src={VentixeLogo} alt="Ventixe logo" />
            </a>

            {/* dynamic title and breadcrumb */}
            <div className="header-title">
                {meta?.parent && (
                    <span className="breadcrumb">
                      <span className="breadcrumb-root">{meta.parent}</span>
                      <span className="breadcrumb-sep"> / </span>
                      <span className="breadcrumb-current">{meta.title}</span>
                    </span> )}
                <h2>{meta?.title || "Dashboard"}</h2>
                {meta?.title === "Dashboard" && 
                    // dynamic welcome message based on logged-in user
                    <p>Hello Orlando, welcome back!</p>} 
            </div>

            <div className="header-actions">
                <div className="search-bar">
                    <input type="text" placeholder="Search anything..." />
                </div>
                
                <div className="header-actions-left">
                    <div className="icon-button hide">
                        <FiSearch />
                    </div>
    
                    <div className="icon-button">
                        <span className="notification-badge"></span>
                        <FiBell />
                    </div>
    
                    <div className="icon-button">
                        <FiSettings />
                    </div>
                </div>
                
                <div className="profile-section">
                    <div className="profile-pic"></div>
                    <div className="profile-info">
                        <span className="profile-name">Orlando Laurentius</span>
                        <span className="profile-role">Admin</span>
                    </div>
                </div>
            </div>
            
            <button className="hamburger" onClick={onToggleSidebar}>
                <FiMenu />
            </button>
        </header>
    );
};

export default Header;
