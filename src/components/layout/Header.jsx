import React from 'react';
import {FiBell, FiSettings, FiMenu, FiSearch} from 'react-icons/fi';
import VentixeLogo from '../../images/logos/ventixe-logo.svg';

const Header = ({ onToggleSidebar }) => {
    return (
        <header className="header">
            <a href="/" className="header-logo">
                <img src={VentixeLogo} alt="Ventixe logo" />
            </a>

            {/* skötas dynamiskt */}
            <div className="header-title">
                <h2>Dashboard</h2>
                <p>Hello Orlando, welcome back!</p>
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
