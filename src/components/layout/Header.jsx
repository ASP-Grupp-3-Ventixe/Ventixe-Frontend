import React from 'react';
import {FiBell, FiSettings, FiMenu, FiSearch} from 'react-icons/fi';
import VentixeLogo from '../../images/logos/ventixe-logo.svg';
import {routes} from "../../routing/routes.config.jsx";
import {useLocation} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";

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

                <div className="profile-section">
                    <div className="profile-pic"></div>
                    <div className="profile-info">
                        <span className="profile-name">{user?.email?.split('@')[0] || 'User'}</span>
                        <span className="profile-role">{user?.role || 'User'}</span>
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
