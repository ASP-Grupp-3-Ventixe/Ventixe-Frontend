import React, {useState} from 'react';
import icons from '../../../../images/icons/icons';
import "./InboxSidebar.css";

const folders = [
    { name: 'Inbox', icon: 'EnvelopeOpen', alt: 'Inbox', },
    { name: 'Starred', icon: 'Star', alt: 'Starred' },
    { name: 'Sent', icon: 'PaperPlaneRight', alt: 'Sent' },
    { name: 'Drafts', icon: 'FileText', alt: 'Drafts' },
    { name: 'Spam', icon: 'WarningOctagon', alt: 'Spam' },
    { name: 'Trash', icon: 'Trash', alt: 'Trash' },
];

const labels = [
    { name: 'Admin', color: 'rgb(193,226,255)' },
    { name: 'Customer', color: '#EEEFFF' },
    { name: 'Sponsor', color: '#FBD4FE' },
    { name: 'Partner', color: '#E0E0E1' },
];

const InboxSidebar = ({ activeFolder, setActiveFolder }) => {
    
    return (
        /* sidebar cards */
        <div >
            
            {/*Nav Card */}
            <div className="inbox-card">
                <nav className="inbox-folders">
                    {folders.map(folder => (
                        <div
                            key={folder.name}
                            className={`inbox-folder${activeFolder === folder.name ? ' active' : ''}`}
                            onClick={() => setActiveFolder(folder.name)}
                        >
                            <span className="inbox-folder-icon">
                                <img src={icons[folder.icon]} alt={folder.alt}/>
                            </span>
    
                            <span className="inbox-folder-name">{folder.name}</span>
                        </div>
                    ))}
                </nav>
            </div>
            
            {/* Labels Card */} 
            <div className="inbox-card labels">
                <div className="inbox-labels">
                    <div className="inbox-labels-header">
                        <span>Labels</span>
                        <button className="inbox-labels-add">+</button>
                    </div>
                    <div className="inbox-labels-list">
                        {labels.map(label => (
                            <div className="inbox-label-row" key={label.name}>
                                <span className="inbox-label-dot" style={{ background: label.color }}/>
                                <span className="inbox-label-name">{label.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InboxSidebar;