import {useState} from "react";
import InboxHeader from './InboxHeader';
import InboxSidebar from './InboxSidebar';
import InboxList from './InboxList';
import InboxDetail from './InboxDetail';
import NewEmailModal from './NewEmailModal';
import {createEmail} from "../../../../Services/MailHandlingService.jsx";
import {useAuth} from "../../../../contexts/AuthContext.jsx";
import {useEmails} from "./Hooks/useEmails.js";
import {useModal} from "../../../../Hooks/useModal.js";
import './Inbox.css';

const Inbox = () => {
    const { user } = useAuth();
    const [selectedMailId, setSelectedMailId] = useState(null);
    const showDetail = selectedMailId !== null;
    const [activeFolder, setActiveFolder] = useState('Inbox');

    const { emails, loading, error, removeMail } = useEmails(activeFolder);

    const newEmailModal = useModal(false);
    const sidebarModal = useModal(false);

    function getSenderFromUser(user) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            initials: user.initials,
            avatarUrl: user.avatarUrl,
            senderType: user.senderType
        };
    }

    const handleSendEmail = async (emailData) => {
        const dataWithSender = {
            ...emailData,
            sender: getSenderFromUser(user)
        };
        const result = await createEmail(dataWithSender);
        if (result) newEmailModal.handleClose();
        return result;
    };

    const handleSetActiveFolder = (folder) => {
        setActiveFolder(folder);
        setSelectedMailId(null);
    };

    return (
        <div className={`inbox-layout${showDetail ? ' show-detail' : ''}`}>
            <aside className="inbox-sidebar">
                <InboxSidebar 
                    activeFolder={activeFolder}
                    setActiveFolder={handleSetActiveFolder}
                    onCloseSidebar={sidebarModal.handleClose}
                />
            </aside>
            
            {/* show sidebar as a modal on mobile view */}
            {sidebarModal.open && (
                <div className="sidebar-modal-backdrop" onClick={sidebarModal.handleClose}>
                    <div className="sidebar-modal" onClick={e => e.stopPropagation()}>
                        <InboxSidebar 
                            activeFolder={activeFolder}
                            setActiveFolder={handleSetActiveFolder}
                            onCloseSidebar={sidebarModal.handleClose}
                        />
                    </div>
                </div>
            )}

            <div className="inbox-main-content">

                <div className="inbox-left">
                    {/* InboxHeader */}
                    <div className="inbox-header-container">
                        <InboxHeader
                            onToggleSidebar={sidebarModal.handleOpen}
                            onAddMail={newEmailModal.handleOpen} 
                        />
                    </div>
                    
                    {/* small space between InboxHeader and InboxList that dynamically shows/enhances the selected folder */}
                    {/* showing a small icon with the related folder name */}


                    {newEmailModal.open && (
                        <NewEmailModal
                            onClose={newEmailModal.handleClose}
                            onSend={handleSendEmail}
                            currentUser={user}
                        />
                    )}

                    {/* InboxList */}
                    <div className="inbox-list-container">
                        <InboxList 
                            onSelectMail={setSelectedMailId} 
                            selectedMailId={selectedMailId} 
                            folder={activeFolder}
                            emails={emails}
                            loading={loading}
                            error={error}
                        />
                        
                    </div>
                </div>

                <div className="inbox-right">
                    {/* InboxDetail */}
                    <aside className="inbox-detail-container">
                        <InboxDetail
                            mailId={selectedMailId}
                            onBack={() => setSelectedMailId(null)}
                            folder={activeFolder}
                            onRemoveMail={removeMail}
                        />
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Inbox;