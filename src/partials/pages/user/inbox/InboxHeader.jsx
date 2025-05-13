import React from "react";
import icons from "../../../../images/icons/icons.js";
import "./InboxHeader.css";



const InboxHeader = ({ search, onSearch, onToggleSidebar }) => (
    <div className="inbox-header">
        
        {/* only on mobile view */}
        <button className="inbox-hamburger" onClick={onToggleSidebar}>
            <img src={icons.List} alt="Open menu" />
        </button>
        
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search in inbox..."
                value={search}
                onChange={e => onSearch(e.target.value)}
            />
            <img src={icons.MagnifyingGlass} alt={'MagnifyingGlass'} />
        </div>
        
        <button className="inbox-header-btn inbox-header-btn--filter" title="Filter">
                <img src={icons.FadersHorizontal} alt={'FadersHorizontal'} />
        </button>
        
        <button className="inbox-header-btn" title="Add">
                <img src={icons.Plus} alt={'Plus'} />
        </button>
    </div>
);

export default InboxHeader;