import React, {useEffect, useState} from "react";
import mailsMockData from "./MockData/mailsMockData"; 
import icons from '../../../../images/icons/icons';
import "./InboxList.css";
import {getEmails} from "../../../../Services/MailHandlingService.jsx";

const labels = [
    { name: 'Admin', color: 'rgb(193,226,255)' },
    { name: 'Customer', color: '#EEEFFF' },
    { name: 'Sponsor', color: '#FBD4FE' },
    { name: 'Partner', color: '#E0E0E1' },
];

const InboxList = ({ onSelectMail, selectedMailId, search = "", folder = "Inbox" }) => {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        getEmails(folder.toLowerCase(), false, search)
            .then(data => {
                console.log("Fetched emails:", data);
                setEmails(data);
            })
            .catch(err => setError("could not fetch emails"))
            .finally(() => setLoading(false));
    }, [search, folder]);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    
    return (
        <div className="inbox-list">
            {emails.map(mail => {
                // get right label for each mail
                const label = labels.find(
                    l => l.name.toLowerCase() === mail.senderType?.toLowerCase()
                );

                return (
                    <div
                        key={mail.id}
                        className={`inbox-list-item${selectedMailId === mail.id ? " active" : ""}`}
                        onClick={() => onSelectMail(mail.id)}
                    >
                        <div className="inbox-list-avatar">{mail.senderInitials}</div>
                        <div className="inbox-list-main">

                            <div className="inbox-list-header">
                                <span className="inbox-list-sender">{mail.senderName}</span>
                                <span
                                    className="inbox-list-type"
                                    style={label ? {background: label.color} : undefined}
                                >
                                        {mail.senderType}
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