import ReactDOM from "react-dom";
import { motion } from "framer-motion";

interface ConfirmationModalProps {
    isVisible: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal = ({ isVisible, message, onConfirm, onCancel } : ConfirmationModalProps) => {

    if(!isVisible) return <></>;

    return ReactDOM.createPortal(
        <div
            className="fixed z-60 inset-0 flex items-center justify-center bg-gray-100/50 font-sans"
            onClick={onCancel} // Close modal when clicking outside
        >
            <motion.div
                className="p-5 rounded-md shadow-lg md:w-120 text-center bg-pink-300 border-pink-400 border-x-2 border-b-4"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                <p className="text-lg text-white font-semibold">{message}</p>
                <div className="mt-6 flex justify-center space-x-4">
                    <button
                        className="px-4 py-2 bg-emerald-400 hover:bg-emerald-500 text-white rounded"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                    <button
                        className="px-4 py-2 bg-red-600 hover:bg-red-500 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-sm font-medium"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </motion.div>
        </div>,
        document.body
    );
};

export default ConfirmationModal;
