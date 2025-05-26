import React from "react"; 
import icons from '../../../../images/icons/icons';
import "./InboxList.css";

const labels = [
    { name: 'Admin', color: 'rgb(193,226,255)' },
    { name: 'User', color: 'rgb(201,255,193)' },
    { name: 'Customer', color: '#EEEFFF' },
    { name: 'Sponsor', color: '#FBD4FE' },
    { name: 'Partner', color: '#E0E0E1' },
];

    const InboxList = ({ onSelectMail, selectedMailId, search = "", folder = "Inbox", emails = [], loading, error }) => {
    
    function getInitials(name) {
        if (!name) return "?";
        const parts = name.trim().split(" ");
        if (parts.length === 1) return parts[0][0].toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        if (!emails || !Array.isArray(emails)) return null;
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    
    return (
        <div className="inbox-list">
            {emails.map(mail => {

                // choose sender or recipient depending on folder
                let displayName, displayInitials, displayType;

                if (folder.toLowerCase() === "sent") {
                    displayName = mail.recipients.map(r => r.name).join(", ");
                    displayInitials = mail.recipients.map(r => getInitials(r.name)).join(", ");
                } else {
                    displayName = mail.senderName;
                    displayInitials = mail.senderInitials || getInitials(mail.senderName);
                }

                const label = labels.find(
                    l => l.name.toLowerCase() === displayType?.toLowerCase()
                );

                return (
                    <div
                        key={mail.id}
                        className={`inbox-list-item${selectedMailId === mail.id ? " active" : ""}`}
                        onClick={() => onSelectMail(mail.id)}
                    >
                        <div className="inbox-list-avatar">{displayInitials}</div>
                        <div className="inbox-list-main">

                            <div className="inbox-list-header">
                                <span className="inbox-list-sender">{displayName}</span>
                                <span
                                    className="inbox-list-type"
                                    style={label ? {background: label.color} : undefined}
                                >
                                    </span>
                                <span className="inbox-list-time">{mail.time}</span>
                            </div>

                            <div className="inbox-list-subject">{mail.subject}</div>
                            <div className="inbox-list-preview">{mail.preview}</div>

                            <div>
                                <img src={icons.Star} alt={'Starred'}/>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}


export default InboxList;