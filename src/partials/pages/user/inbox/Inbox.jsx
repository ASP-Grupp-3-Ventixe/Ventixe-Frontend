import {useEffect, useState} from "react";
import InboxHeader from './InboxHeader';
import InboxSidebar from './InboxSidebar';
import InboxList from './InboxList';
import InboxDetail from './InboxDetail';
import NewEmailModal from './NewEmailModal';
import {useOutletContext} from "react-router-dom";
import './Inbox.css';
import {createEmail} from "../../../../Services/MailHandlingService.jsx";


const Inbox = () => {
    const [selectedMailId, setSelectedMailId] = useState(null);
    const [showSidebarModal, setShowSidebarModal] = useState(false);
    const [showNewEmailModal, setShowNewEmailModal] = useState(false);
    
    const showDetail = selectedMailId !== null;

    const [activeFolder, setActiveFolder] = useState('Inbox');

    const handleOpenNewEmailModal = () => setShowNewEmailModal(true);
    const handleCloseNewEmailModal = () => setShowNewEmailModal(false);

    const handleSendEmail = async (emailData) => {
        // Ensure sender is always set to currentUser
        const dataWithSender = {
            ...emailData,
            sender: {
                name: currentUser.name,
                email: currentUser.email,
            }
        };
        const result = await createEmail(dataWithSender);
        if (result) {
            handleCloseNewEmailModal();
        }
        return result;
    };
    
    // currentUser should come from auth context or claims
    const currentUser = { name: "Orlando Laurentius", email: "orlandolaurentius@example.com" };

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
                    onCloseSidebar={() => {}}
                />
            </aside>
            
            {/* show sidebar as a modal on mobile view */}
            {showSidebarModal && (
                <div className="sidebar-modal-backdrop" onClick={() => setShowSidebarModal(false)}>
                    <div className="sidebar-modal" onClick={e => e.stopPropagation()}>
                        <InboxSidebar 
                            activeFolder={activeFolder}
                            setActiveFolder={handleSetActiveFolder}
                            onCloseSidebar={() => setShowSidebarModal(false)}
                        />
                    </div>
                </div>
            )}

            <div className="inbox-main-content">

                <div className="inbox-left">
                    {/* InboxHeader */}
                    <div className="inbox-header-container">
                        <InboxHeader 
                            onToggleSidebar={() => setShowSidebarModal(true)}
                            onAddMail={handleOpenNewEmailModal} 
                        />
                    </div>
                    
                    {/* small space between InboxHeader and InboxList that dynamically shows/enhances the selected folder */}
                    {/* showing a small icon with the related folder name */}


                    {showNewEmailModal && (
                        <NewEmailModal
                            onClose={handleCloseNewEmailModal}
                            onSend={handleSendEmail}
                            currentUser={currentUser}
                        />
                    )}

                    {/* InboxList */}
                    <div className="inbox-list-container">
                        <InboxList 
                            onSelectMail={setSelectedMailId} 
                            selectedMailId={selectedMailId} 
                            folder={activeFolder} />
                    </div>
                </div>

                <div className="inbox-right">
                    {/* InboxDetail */}
                    <aside className="inbox-detail-container">
                        <InboxDetail
                            mailId={selectedMailId}
                            onBack={() => setSelectedMailId(null)}
                        />
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Inbox;