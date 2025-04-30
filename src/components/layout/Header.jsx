import React from 'react';
import { FiBell, FiSettings, FiMenu } from 'react-icons/fi';
import { VscAccount } from 'react-icons/vsc';

const Header = ({ onToggleSidebar }) => {
    return (
        <header>
            <button className="hamburger" onClick={onToggleSidebar}>
                <FiMenu />
            </button>

            <div className="dashboard-title">
                <h2>Dashboard</h2>
                <p>Hello Orlando, welcome back!</p>
            </div>

            <div className="header-actions">
                <input type="text" placeholder="Search anything" />

                <div className="icon-button">
                    <span className="notification-badge"></span>
                    <FiBell />
                </div>

                <div className="icon-button">
                    <FiSettings />
                </div>

                <div className="profile-section">
                    <div className="profile-pic">
                        <div className="icon-button">
                            <VscAccount />
                        </div>
                    </div>
                    <div className="profile-info">
                        <span className="profile-name">Orlando Laurentius</span>
                        <span className="profile-role">Admin</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
