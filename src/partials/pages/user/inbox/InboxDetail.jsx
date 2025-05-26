import React from 'react';
import icons from "../../../../images/icons/icons.js";
import {getEmail, softDeleteEmail} from "../../../../Services/MailHandlingService.jsx";
import useResource from "./Hooks/useResource.js";
import "./InboxDetail.css";
import {useAuth} from "../../../../contexts/AuthContext.jsx";

const InboxDetail = ({ mailId, onBack, folder, onRemoveMail }) => {
    const { user: currentUser } = useAuth();
    const { data: mail, loading } = useResource(getEmail, mailId, { keepPreviousData: true });

    if (loading && !mail) {
        return <div className="inbox-detail-loading">Loading mail...</div>;
    }

    if (!mail)    return (
        <div className="inbox-detail-empty">
            <img src={icons.EnvelopeClosed} alt={'EnvelopeClosed'} />
        </div>
    );

    const handleTrash = async (id) => {
        await softDeleteEmail(id);
        if (onRemoveMail) onRemoveMail(id)
        if (onBack) onBack();
    };

    return (
        <div className="inbox-detail">
            {/* Toolbar */}
            <div className="inbox-detail-toolbar">
                <div className="toolbar-icons">
                    {onBack && (
                        <img
                            className="detail-back toolbar-icon"
                            src={icons.ArrowLeft}
                            alt="Back"
                            onClick={onBack}
                        />
                    )}
                    <img className="toolbar-icon" src={icons.ArchiveTray} alt={'ArchiveTray'} />
                    <img className="toolbar-icon" src={icons.Trash} alt={'Trash'} onClick={() => handleTrash(mail.id)} />
                </div>
                <div className="toolbar-icons">
                    <div className="toolbar-icon background-icon">
                        <img src={icons.CaretLeft} alt={'CaretLeft'} />
                    </div>
                    <span className="toolbar-middle-text">1 of 36</span>
                    <div className="toolbar-icon background-icon">
                        <img src={icons.CaretRight} alt={'CaretRight'} />
                    </div>
                </div>
                <div className="toolbar-icons">
                    <img className="toolbar-icon" src={icons.Star} alt={'Star'} />
                    <div className="toolbar-icon background-icon">
                        <img src={icons.DotsThreeVertical} alt="Dropdown" />
                    </div>
                </div>
            </div>

            {/* Mail Content */}
            <div className="inbox-detail-content">
                <div className="inbox-detail-top">
                    <strong>{mail.subject}</strong>
                    <div className="header-icons">
                        <img src={icons.Printer} alt={'Printer'} />
                        <img src={icons.ArrowsOutSimple} alt={'ArrowsOutSimple'} />
                    </div>
                </div>
                <div className="inbox-detail-middle">
                    <div className="detail-avatar">
                        {mail.senderInitials || mail.senderName?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div className="detail-meta">
                        
                        {folder?.toLowerCase() === "sent" ? (
                            <div> {/* SENT: From: current user, To: recipients */}
                                <div className="detail-name">{mail.senderName}</div>
                                <div className="detail-email">
                                    To: {mail.recipients && mail.recipients.length > 0
                                    ? mail.recipients.map((r, idx) => (
                                        <span key={r.id || idx}>
                                                        {r.name} &lt;{r.email}&gt;{idx < mail.recipients.length - 1 ? ", " : ""}
                                                    </span>
                                    ))
                                    : "Ingen mottagare"}
                                </div>
                            </div>
                        ) : (
                            <div> {/* INBOX: From: recipients, To: (current user) */}
                                <div className="detail-name">{mail.senderName}</div>
                                <div className="detail-email">
                                    To: {mail.recipients && mail.recipients.length > 0
                                    ? mail.recipients
                                        .filter(r => r.email === currentUser.email)
                                        .map((r, idx, arr) => (
                                            <span key={r.id || idx}>
                                                            {r.name} &lt;{r.email}&gt;{idx < arr.length - 1 ? ", " : ""}
                                                        </span>
                                        ))
                                    : currentUser.name + " <" + currentUser.email + ">"}
                                </div>
                            </div>
                        )}
                        
                        <div>
                            <div className="detail-date">{mail.date}</div>
                            <div className="detail-time">{mail.time}</div>
                        </div>
                        
                    </div>
                </div>
                <div className="inbox-detail-body">
                    <p>{mail.body}</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="inbox-detail-action">
                <button className="action-button">
                    <img src={icons.ArrowBendUpLeft} alt={'Reply'} />
                    <span className="reply">Reply</span>
                </button>
                <button className="action-button">
                    <img src={icons.ArrowBendUpRight} alt={'Forward'} />
                    <span className="forward">Forward</span>
                </button>
            </div>
        </div>
    );
    
};

export default InboxDetail;