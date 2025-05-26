import React, {useEffect, useRef, useState} from 'react';
import {FiBell, FiSettings, FiMenu, FiSearch} from 'react-icons/fi';
import VentixeLogo from '../../images/logos/ventixe-logo.svg';
import {routes} from "../../routing/routes.config.jsx";
import {useLocation} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import {useModal} from "../../Hooks/useModal.js";
import {ProfileDropdown} from "../dropdown/ProfileDropdown.jsx";
import {ProfileAvatar} from "../profileAvatar/ProfileAvatar.jsx";

// helper function to find meta based on path
function findMeta(path, routesArr = routes) {
  for (const route of routesArr) {
    if (route.children) {
      const found = findMeta(path, route.children);
      if (found) return found;
    }

    if (!route.path || !route.meta) continue;

    const routeSegments = route.path.split("/");
    const pathSegments = path.split("/");

    if (routeSegments.length !== pathSegments.length) continue;

    const match = routeSegments.every((seg, i) =>
      seg.startsWith(":") || seg === pathSegments[i]
    );

    if (match) return route.meta;
  }

  return null;
}


const Header = ({ onToggleSidebar }) => {
    const location = useLocation();
    const meta = findMeta(location.pathname);
    const { user } = useAuth();
    const { open, handleOpen, handleClose } = useModal(false);
    const dropdownRef = useRef(null);


    // close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                handleClose();
            }
        }
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [open, handleClose]);


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
                {meta?.title === "Dashboard" && user && (
                    <p>Hello {user.email?.split('@')[0] || 'User'}, welcome back!</p>
                )}
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

                <div
                    className="profile-section"
                    ref={dropdownRef}
                    onClick={open ? handleClose : handleOpen}
                    style={{ cursor: "pointer", position: "relative" }}
                >
                    <ProfileAvatar avatarUrl={user?.avatar} nameOrEmail={user?.name || user?.email} />
                    <div className="profile-info">
                        <span className="profile-name">{user?.email?.split('@')[0] || 'User'}</span>
                        <span className="profile-role">{user?.role || 'User'}</span>
                    </div>
                    {/* dropdown content */}
                    {open && (
                        <ProfileDropdown user={user}  />
                    )}
                </div>
            </div>
            
            <button className="hamburger" onClick={onToggleSidebar}>
                <FiMenu />
            </button>
        </header>
    );
};

export default Header;
