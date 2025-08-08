import React from "react";
import "./SuccessModal.css";

interface SuccessModalProps {
  onClose: () => void;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose, message }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xs p-6 text-center border border-gray-200">
        {/* Animated check mark */}
        <div className="flex flex-row justify-center mb-4">
          <svg
            className="animate-checkmark h-16 w-16 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="animate-checkmark-circle stroke-green-500"
              cx="26"
              cy="26"
              r="25"
              fill="none"
              strokeWidth="2"
            />
            <path
              className="animate-checkmark-check stroke-green-500"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Message */}
        {message && <p className="text-gray-600 mb-4">{message}</p>}

        {/* Single action button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
