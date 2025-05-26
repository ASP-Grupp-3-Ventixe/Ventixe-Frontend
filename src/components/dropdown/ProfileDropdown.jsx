import React, {useState} from 'react'
import { ProfileAvatar } from '../profileAvatar/ProfileAvatar.jsx'
import {useAuth} from "../../contexts/AuthContext.jsx";
import './ProfileDropdown.css';

export const ProfileDropdown = ({ user })  => {
    const [darkMode, setDarkMode] = useState(false);
    const handleThemeToggle = () => setDarkMode(v => !v);
    const { signOut } = useAuth();
    
    return (
        <div className="profile-dropdown">
            <div className="profile-dropdown-header">
                <ProfileAvatar avatarUrl={user?.avatar} nameOrEmail={user?.name || user?.email} />
                <div>
                    <div className="profile-dropdown-name">{user?.name || user?.email?.split('@')[0]}</div>
                    <div className="profile-dropdown-email">{user?.email}</div>
                </div>
            </div>

            {/* Profile settings */}
            <div
                className="profile-dropdown-item profile-settings"
                onClick={() => window.location.href='/account/profile'}
            >
                <span className="profile-settings-left">
                    <i className="fa-duotone fa-solid fa-user"></i>
                    <span>Profile</span>
                </span><i className="fa-duotone fa-solid fa-gear settings-icon"></i>
            </div>

            {/* Theme toggle */}
            <div className="profile-dropdown-item">
                <div className="theme-menu-item">
                    
                    <div className="theme-menu-left">
                        <span className="theme-icon">
                            {darkMode ? (
                                <i className="fa-duotone fa-solid fa-sun light-icon"></i>
                            ) : (
                                <i className="fa-duotone fa-solid fa-moon dark-icon"></i>
                            )}
                        </span>
                        <span className="theme-text">
                            {darkMode ? "Light Mode" : "Dark Mode"}
                        </span>
                    </div>
                    
                    <label
                        className="switch"
                        htmlFor="darkModeToggle"
                        onClick={e => e.stopPropagation()}
                    >
                        <input
                            type="checkbox"
                            id="darkModeToggle"
                            checked={darkMode}
                            onChange={handleThemeToggle}
                            onClick={e => e.stopPropagation()}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
            </div>

            <div className="profile-dropdown-footer">
                <button
                    className="profile-dropdown-item logout"
                    onClick={signOut}
                >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );
};