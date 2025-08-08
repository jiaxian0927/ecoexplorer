import { useState } from "react";
import { ActivityFormData } from "./ActivityForm";

interface CancelTabProps {
  activities: ActivityFormData[];
  onCancel: (activityId: string) => void;
}

const CancelTab = ({ activities, onCancel }: CancelTabProps) => {
  const [selectedActivity, setSelectedActivity] =
    useState<ActivityFormData | null>(null);

  const handleConfirmCancel = () => {
    if (selectedActivity) {
      onCancel(selectedActivity.id!);
      setSelectedActivity(null);
    }
  };

  return (
    <div className="">
      <h3 className="text-lg font-medium mb-3">Your Hosted Activities</h3>

      <div className="flex flex-col gap-6">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="relative border border-gray-300 rounded-lg p-4 shadow hover:shadow-md bg-white"
          >
            <div className="flex justify-between">
              <h4 className="text-lg font-semibold">{activity.title}</h4>
              <button
                onClick={() => setSelectedActivity(activity)}
                className="text-red-600 hover:text-red-800 mr-2"
                title="Cancel Activity"
              >
                ✖
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
            <div className="flex flex-row gap-2 text-sm text-gray-500 mt-2">
              <p className="">📍 {activity.location}</p>
              <p>|</p>
              <p className="">📅 {activity.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
            <h3 className="text-lg font-medium mb-4">
              Cancel: {selectedActivity.title}
            </h3>

            <div className="bg-red-50 p-3 rounded-lg border border-red-200 mb-4">
              <h4 className="font-medium text-red-800">⚠️ Important</h4>
              <p className="text-sm text-red-700 mt-1">
                Canceling will notify all participants and archive this event.
                This action cannot be undone.
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedActivity(null)}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CancelTab;
