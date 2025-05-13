import React from 'react'
import mailsMockData from "./MockData/mailsMockData";
import "./InboxDetail.css";
import icons from "../../../../images/icons/icons.js";
import ArchiveTray from "../../../../images/icons/ArchiveTray.svg";
import ArrowsOutSimple from "../../../../images/icons/ArrowsOutSimple.svg";
import CaretLeft from "../../../../images/icons/CaretLeft.svg";
import CaretRight from "../../../../images/icons/CaretRight.svg";
import DotsThreeVertical from "../../../../images/icons/DotsThreeVertical.svg";
import Printer from "../../../../images/icons/Printer.svg";
import Star from "../../../../images/icons/Star.svg";
import Trash from "../../../../images/icons/Trash.svg";

const InboxDetail = ({ mailId, onBack }) => {
    const mail = mailsMockData.find(m => m.id === mailId);
    if (!mail) {
        return <div className="inbox-detail-empty">
            <div>
                <img src={icons.EnvelopeClosed} alt={'EnvelopeClosed'} />
            </div>
        </div>;
    }

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
                            onClick={onBack} />
                    )}
                    <img className="toolbar-icon" src={icons.ArchiveTray} alt={'ArchiveTray'} />
                    <img className="toolbar-icon" src={icons.Trash} alt={'Trash'} />
                </div>

                <div className="toolbar-icons">
                    <div className="toolbar-icon background-icon">
                        <img src={icons.CaretLeft} alt={'CaretLeft'} />
                    </div>
                    
                    {/* should display how many emails there is in each folder etc. e.g. "1 of 36" = first email in that folder */}
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
                
                    {/* Email Header */}
                    <div className="inbox-detail-top">
                        <strong>{mail.subject}</strong>
                        <div className="header-icons">
                            <img src={icons.Printer} alt={'Printer'} />
                            <img src={icons.ArrowsOutSimple} alt={'ArrowsOutSimple'} />
                        </div>
                    </div>
                    
                    {/* Email Info */}
                    <div className="inbox-detail-middle">
                        <div className="detail-avatar">{mail.senderInitials}</div>
                        <div className="detail-meta">
                            <div>
                                <div className="detail-name">{mail.senderName}</div>
                                <div className="detail-email">{mail.senderEmail};</div>
                            </div>
                            <div>
                                <div className="detail-date">{mail.date}</div>
                                <div className="detail-time">{mail.time}</div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Email Body */}
                    <div className="inbox-detail-body">
                        {mail.body}
                    </div>
            </div>

            {/* Action Buttons */}
            <div className="inbox-detail-action">
                <img src={icons.ArrowBendUpLeft} alt={'ArrowBendUpLeft'} />
                <span className="reply">Reply</span>
                <img src={icons.ArrowBendUpright} alt={'ArrowBendUpright'} />
                <span className="forward">Forward</span>
            </div>
            
        </div>
    );
};

export default InboxDetail;