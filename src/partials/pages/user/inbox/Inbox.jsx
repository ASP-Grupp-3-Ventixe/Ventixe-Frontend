import {useEffect, useState} from "react";
import InboxHeader from './InboxHeader';
import InboxSidebar from './InboxSidebar';
import InboxList from './InboxList';
import InboxDetail from './InboxDetail';
import './Inbox.css';
import {useOutletContext} from "react-router-dom";


const Inbox = () => {
    const [selectedMailId, setSelectedMailId] = useState(null);
    const { setIsDetailView } = useOutletContext();
    const [showSidebarModal, setShowSidebarModal] = useState(false);

    useEffect(() => {
        setIsDetailView(selectedMailId !== null);
    }, [selectedMailId, setIsDetailView]);
    
    const showDetail = selectedMailId !== null;

    const [activeFolder, setActiveFolder] = useState('Inbox');

    return (
        <div className={`inbox-layout${showDetail ? ' show-detail' : ''}`}>
            <aside className="inbox-sidebar">
                <InboxSidebar activeFolder={activeFolder} setActiveFolder={setActiveFolder} />
            </aside>
            {/* show sidebar as a modal on mobile view */}
            {showSidebarModal && (
                <div className="sidebar-modal-backdrop" onClick={() => setShowSidebarModal(false)}>
                    <div className="sidebar-modal" onClick={e => e.stopPropagation()}>
                        <InboxSidebar activeFolder={activeFolder} setActiveFolder={setActiveFolder} />
                    </div>
                </div>
            )}

            <div className="inbox-main-content">

                <div className="inbox-left">
                    {/* InboxHeader */}
                    <div className="inbox-header-container">
                        <InboxHeader onToggleSidebar={() => setShowSidebarModal(true)}/>
                    </div>
                    
                    {/* small space between InboxHeader and InboxList that dynamically shows/enhances the selected folder */}
                    {/* showing a small icon with the related folder name */}

                    {/* InboxList */}
                    <div className="inbox-list-container">
                        <InboxList onSelectMail={setSelectedMailId} selectedMailId={selectedMailId} folder={activeFolder} />
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