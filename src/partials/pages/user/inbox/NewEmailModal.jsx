import { useState } from "react";
import icons from "../../../../images/icons/icons.js";
import "./NewEmailModal.css";

const NewEmailModal = ({ onClose, onSend, currentUser }) => {
    const [to, setTo] = useState("");
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
        // Skicka med cc och bcc även om de är tomma för konsekvens
        onSend({ to, cc, bcc, subject, body, attachments });
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
                        <input
                            type="email" 
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            autoFocus
                        />
                        <div className="optional-fields">
                            {/* implement funktion to show/hide Cc/Bcc fields when clicked */}
                            <span className="cc-label" onClick={() => console.log('Toggle CC field')}>Cc:</span>
                            <span className="bcc-label" onClick={() => console.log('Toggle BCC field')}>Bcc:</span>
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
                        <button type="submit" className="send-button">
                            Send
                        </button>
                        <div className="toolbar">
                            <label htmlFor="file-upload-hidden" className="tool-button" title="Attach files"> {/* Använd label för filuppladdning */}
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