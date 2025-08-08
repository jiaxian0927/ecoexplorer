import { ActivityFormData } from "./ActivityForm";
import { formatTime } from "../../utility/utility";
import { useState } from "react";

const CancelParticipationModal = ({
  activity,
  onConfirm,
  onClose,
}: {
  activity: ActivityFormData;
  onConfirm: () => void;
  onClose: () => void;
}) => {
  const [canceling, setCanceling] = useState(false);

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setCanceling(true);
    try {
      await onConfirm();
    } catch (error) {
      alert("Failed to join activity:" + error);
    } finally {
      onClose();
      setCanceling(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 px-4">
      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 p-2 rounded-full">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Leave Activity?
            </h3>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-gray-600">
            You're about to leave{" "}
            <span className="font-medium text-gray-800">
              "{activity.title}"
            </span>{" "}
            scheduled for {activity.date} at {formatTime(activity.time)}.
          </p>

          {/* Activity Preview */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {activity.location}
                </p>
                <p className="text-xs text-gray-500">
                  {activity.joinedUsers?.length || 0} participants
                </p>
              </div>
            </div>
          </div>

          {/* Reassurance */}
          <div className="flex items-start bg-blue-50 rounded-lg p-3">
            <svg
              className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-blue-700">
              Don't worry! You can rejoin this activity anytime before it starts
              on {activity.date}.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 pt-2 pb-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Stay Joined
          </button>
          <button
            onClick={handleConfirm}
            className="px-5 py-2 bg-red-500 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center"
          >
            {canceling ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Canceling...
              </>
            ) : (
              "Leave Activity"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelParticipationModal;
