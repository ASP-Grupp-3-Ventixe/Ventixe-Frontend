import { useState } from "react";
import icons from "../../../../images/icons/icons.js";
import "./NewEmailModal.css";

const NewEmailModal = ({ onClose, onSend, currentUser }) => {
    const [toName, setToName] = useState("");
    const [toEmail, setToEmail] = useState("");
    const [cc, setCc] = useState("");
    const [bcc, setBcc] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [attachments, setAttachments] = useState([]); 

    const handleFileChange = (e) => {
        if (e.target.files) {
            setAttachments(Array.from(e.target.files));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const recipients = [];
        if (toName && toEmail) { recipients.push({ name: toName, email: toEmail, recipientType: "To" });
        }

        if (cc) recipients.push({ name: cc, email: cc, recipientType: "Cc" });
        if (bcc) recipients.push({ name: bcc, email: bcc, recipientType: "Bcc" });
        
        onSend({
            subject,
            body,
            recipients,
            attachments
        });
        onClose();
    };


    const displayUser = currentUser || { name: "Example Name  ", email: "example@example.com" };

    return (
        <div className="email-modal-overlay" onClick={onClose}> 
            <div className="email-modal" onClick={(e) => e.stopPropagation()}> 
                <div className="email-modal-header">
                    
                    <div className="modal-icon">
                        <img src={icons.PaperPlaneRight} alt={'PaperPlaneRight'}  />
                    </div>
                    
                    <h2 className="modal-title">New Message</h2>
                    
                    <button className="modal-close" onClick={onClose}>    
                        <img src={icons.X} alt={'Close'} />
                    </button>
                    
                </div>

                <form onSubmit={handleSubmit} className="email-form">
                    <div className="email-field">
                        <label>To:</label>
                        {/* Implement a function to handle multiple recipients, in a new component maybe*/}

                        <input
                            type="text"
                            value={toName}
                            placeholder="Name" 
                            onChange={(e) => setToName(e.target.value)}
                            autoFocus
                        />
                        <input
                            type="email"
                            value={toEmail}
                            placeholder="Email"
                            onChange={(e) => setToEmail(e.target.value)}
                        />
                        
                        <div className="optional-fields">
                            {/* implement funktion to show/hide Cc/Bcc fields when clicked */}
                            <span className="cc-label" onClick={() => ('Toggle CC field')}>Cc:</span>
                            <span className="bcc-label" onClick={() => ('Toggle BCC field')}>Bcc:</span>
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div className="email-field">
                        <label>From:</label>
                        <div className="sender-info">{displayUser.name} ({displayUser.email})</div>
                    </div>

                    <div className="divider"></div>

                    <div className="email-field">
                        <label>Subject:</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>

                    <div className="divider"></div>

                    <div className="email-body">
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Say something"
                        ></textarea>
                    </div>

                    <div className="email-footer">
                        
                        <button type="submit" className="send-button">Send</button>
                        
                        <div className="toolbar">
                            <label htmlFor="file-upload-hidden" className="tool-button" title="Attach files">
                                <img src={icons.Paperclip} alt={'Paperclip'}/>
                            </label>
                            <input
                                type="file"
                                id="file-upload-hidden"
                                multiple
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                           
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewEmailModal;