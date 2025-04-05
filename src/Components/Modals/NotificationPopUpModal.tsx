import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { motion } from "framer-motion";
import { setNotification } from "../../GlobalStateContext/CommonPopUpSlice";

const NotificationPopUp: React.FC = () => {
  const dispatch = useDispatch();
  const notificationState: {isVisible: boolean, message: string, type: string} = useSelector((state: any) => state.popUps.notification);

  const onClose = () => {
    dispatch(setNotification({
      isVisible: false,
      message: '',
      type: 'info'
    }));
  }

  if (!notificationState.isVisible) return null;

  return (
    <div
      className="fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // Close modal when clicking outside
    >
      {/* Modal Animation */}
      <motion.div
        className="bg-white p-5 rounded-lg shadow-lg w-80 text-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <p className="text-lg font-semibold">{notificationState.message}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default NotificationPopUp;
