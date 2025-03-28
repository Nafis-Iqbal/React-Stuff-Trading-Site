import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { queryClient } from '../Services/API/ApiInstance';

import UserInfo from '../Components/UserInfo';
import BasicTextDiv from '../Components/CustomDivElements';
import LoadingModal from '../Components/Modals/LoadingContentModal';
import NotificationPopUp from '../Components/Modals/NotificationPopUpModal';
import { TableDataBlock } from '../Components/ElementComponents/TableDataBlock';
import BasicButton from '../Components/ElementComponents/BasicButton';
import ScrollToTopButton from '../Components/StructureComponents/ScrollToTopButton';

const ProfilePage: React.FC = () => {
  return (
    <div className="bg-orange-500 min-h-screen">
      Profile Page
    </div>
  );
};

export default ProfilePage;
