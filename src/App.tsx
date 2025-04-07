import './index.css';

import React, { Suspense, useState } from 'react';
import { useRoutes} from 'react-router-dom';

import appRoutes from './Routes/AppRoutes';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from './Services/API/ApiInstance';

import Navbar from './Components/StructureComponents/Navbar';
import Footer from './Components/StructureComponents/FooterSection';
import LandingPageBar from './Components/StructureComponents/LandingPageBar';
import LoadingModal from './Components/Modals/LoadingContentModal';
import NotificationPopUp from './Components/Modals/NotificationPopUpModal';
import SidebarMenu from './Components/StructureComponents/SIdebarMenu';
import OpenSidebarButton from './Components/StructureComponents/OpenSidebarButton';
import ListingDetailModal from './Components/Modals/ListingDetailModal';

function App() {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true'; // Ensure it returns a boolean
  const [isSidebarMenuOpen, setIsSidebarMenuOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>
        {isAuthenticated ? <Navbar/> : <LandingPageBar/>}
        <div className="relative flex flex-1 bg-pink-100 min-h-screen">
          <div className="flex flex-col flex-1 md:flex-row">
            {isAuthenticated && (
              <>
                <OpenSidebarButton customStyle="absolute top-1 left-2 md:hidden p-3 z-40" onClick={() => setIsSidebarMenuOpen(true)}/>

                <LoadingModal/>
                <NotificationPopUp/>
                <ListingDetailModal/>

                {isSidebarMenuOpen && (
                    <div className="fixed inset-0 bg-black opacity-50 z-40 backdrop-blur-sm pointer-events-auto" onClick={() => setIsSidebarMenuOpen(false)}></div>
                )}
                {isSidebarMenuOpen && (
                    <SidebarMenu isPopOutSidebar={true} onClose={() => setIsSidebarMenuOpen(false)}/>
                )}
                
                <SidebarMenu isPopOutSidebar={false} onClose={() => {}}/>
              </>
            )}
            {useRoutes(appRoutes)}
          </div>
        </div>
        {<Footer/>}
      </Suspense>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;