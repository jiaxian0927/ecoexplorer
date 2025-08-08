import { ActivityFormData } from "./ActivityForm";
import { useState } from "react";
import { formatTime } from "../../utility/utility.tsx";

interface ActivityConfirmationModalProps {
  activity: ActivityFormData;
  onClose: () => void;
  onJoin: () => void;
}

const ActivityConfirmationModal: React.FC<ActivityConfirmationModalProps> = ({
  activity,
  onClose,
  onJoin,
}) => {
  const [joining, setJoining] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setJoining(true);
    try {
      await onJoin();
    } catch (error) {
      alert("Failed to join activity:" + error);
    } finally {
      onClose();
      setJoining(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-800">
          Confirm Activity Join
        </h2>
        <div className="space-y-3 my-6">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div>
              <h3 className="font-medium text-gray-900">{activity.title}</h3>
              {activity.description && (
                <p className="text-gray-600 text-sm mt-1">
                  {activity.description}
                </p>
              )}
            </div>
          </div>

          {activity.date && (
            <div className="flex items-center text-gray-700">
              <svg
                className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <span>{activity.date}</span>
            </div>
          )}

          {activity.time && (
            <div className="flex items-center text-gray-700">
              <svg
                className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{formatTime(activity.time)}</span>
            </div>
          )}

          {activity.location && (
            <div className="flex items-center text-gray-700">
              <svg
                className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              <span>{activity.location}</span>
            </div>
          )}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-blue-800 text-sm font-medium">
            By joining this activity, you agree to participate and follow any
            guidelines set by the organizer.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={onClose}
            disabled={joining}
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={joining}
            className="px-5 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center"
          >
            {joining ? (
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
                Joining...
              </>
            ) : (
              "Confirm Join"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActivityConfirmationModal;
