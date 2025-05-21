import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const PortalLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isDetailView, setIsDetailView] = useState(false);

  return (
    <div className={`portal-layout ${isSidebarOpen ? 'overlay-active' : ''} ${isDetailView ? 'show-detail' : ''}`}>
      {isSidebarOpen && (
        <div className="sidebar-overlay show" onClick={() => setSidebarOpen(false)}></div>
      )}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        <Header onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
        <main>
            <Outlet context={{ setIsDetailView }} />
        </main>
        <Footer />
    </div>
  );
};

export default PortalLayout;
