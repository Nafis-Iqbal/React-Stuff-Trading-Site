import './App.css';

import { Suspense } from 'react';
import { useRoutes} from 'react-router-dom';

import appRoutes from './Routes/AppRoutes';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from './Services/API/ApiInstance';
import { ErrorBoundary } from 'react-error-boundary';

import Navbar from './Components/StructureComponents/Navbar';
import Footer from './Components/StructureComponents/FooterSection';
import LandingPageBar from './Components/StructureComponents/LandingPageBar';
import LoadingModal from './Components/Modals/LoadingContentModal';
import NotificationPopUp from './Components/Modals/NotificationPopUpModal';
import ListingDetailModal from './Components/Modals/ListingDetailModal';
import UploadPhotoModal from './Components/Modals/UploadPhotoModal';

import { UIErrorFallback } from './Components/Modals/UIErrorFallback';
import SidebarMenu from './Components/StructureComponents/SIdebarMenu';

function App() {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true'; // Ensure it returns a boolean

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>
        {isAuthenticated ? (
          <>
            <ListingDetailModal/>
            <Navbar/>
          </>
        ) : (
          <LandingPageBar/>
        )}
        <div className={`relative flex flex-1 bg-pink-100 min-h-screen ${isAuthenticated ? 'pt-20' : ''}`}>
          <div className="flex flex-col flex-1 md:flex-row">
            {isAuthenticated && (
              <>
                <SidebarMenu />
                <UploadPhotoModal/>
                <NotificationPopUp/>
                <LoadingModal/>
              </>
            )}
            
            <ErrorBoundary FallbackComponent={UIErrorFallback}>
              {useRoutes(appRoutes)}
            </ErrorBoundary>
          </div>
        </div>

        {<Footer/>}
      </Suspense>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;