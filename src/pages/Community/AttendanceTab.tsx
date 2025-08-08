import { useState } from "react";
import { ActivityFormData } from "./ActivityForm";
import { db } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import SuccessModal from "./SuccessModal";

interface AttendanceTabProps {
  activities: ActivityFormData[];
}

const AttendanceTab = ({ activities }: AttendanceTabProps) => {
  const [selectedActivity, setSelectedActivity] =
    useState<ActivityFormData | null>(null);
  const [participants, setParticipants] = useState<
    { user: string; userId: string; status: boolean }[]
  >([]);

  const [isLoadingParticipants, setIsLoadingParticipants] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const getUsersAttendanceStatus = async (
    activityId: string
  ): Promise<{ user: string; status: boolean; userId: string }[]> => {
    try {
      const activityRef = doc(db, "activities", activityId);
      const activitySnap = await getDoc(activityRef);

      if (activitySnap.exists()) {
        const data = activitySnap.data() as ActivityFormData;
        return data.attendance || [];
      } else {
        alert("Activity not found.");
        return [];
      }
    } catch (error) {
      alert("Error fetching attendance status: " + error);
      return [];
    }
  };

  const toggleCheck = (userId: string) => {
    setParticipants((prev) =>
      prev.map((u) => (u.userId === userId ? { ...u, status: !u.status } : u))
    );
  };

  const handleConfirmAttendance = async () => {
    if (!selectedActivity?.id) return;

    setIsSubmitting(true);

    try {
      const activityRef = doc(db, "activities", selectedActivity.id);
      await updateDoc(activityRef, {
        attendance: participants,
      });

      // Reset state and show success modal
      setSelectedActivity(null);
      setParticipants([]);
      setShowSuccessModal(true);
    } catch (error) {
      alert("Error updating attendance: " + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">
        Mark Attendance for Activities
      </h3>

      <div className="flex flex-col gap-6">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="relative border border-gray-300 rounded-lg p-4 shadow hover:shadow-md bg-white"
          >
            <div className="flex justify-between">
              <h4 className="text-lg font-semibold">{activity.title}</h4>
              <button
                onClick={async () => {
                  setIsLoadingParticipants(true);
                  setSelectedActivity(activity);
                  const users = await getUsersAttendanceStatus(
                    activity.id ?? ""
                  );
                  setParticipants(users);
                  setIsLoadingParticipants(false);
                }}
                className="hover:bg-gray-200 text-md px-2 py-1 rounded-lg"
                title="Mark attendance"
              >
                📋
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
            <div className="flex flex-row gap-2 text-sm text-gray-500 mt-2">
              <p>📍 {activity.location}</p>
              <p>|</p>
              <p>📅 {activity.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Attendance Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-4 text-balance">
              Attendance: {selectedActivity.title}
            </h3>

            <div className="max-h-96 overflow-y-auto mb-6 shadow-lg rounded-lg">
              {isLoadingParticipants ? (
                <div className="flex justify-center items-center p-8">
                  <div className="w-12 h-12 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
                </div>
              ) : participants.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Participant
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {participants.map((user) => (
                      <tr key={user.userId}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-medium text-sm">
                                {user.user.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="ml-3">
                              <div className="font-medium text-gray-900">
                                {user.user}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-sm ${
                              user.status
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {user.status ? "Present" : "Absent"}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-left text-sm font-medium">
                          <button
                            onClick={() => toggleCheck(user.userId)}
                            className="mr-2 text-gray-600 hover:text-gray-900"
                          >
                            {user.status ? "Mark Absent" : "Mark Present"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <h4 className="mt-2 text-gray-500 font-medium">
                    No participants
                  </h4>
                  <p className="text-sm text-gray-400 mt-1">
                    There are no participants to display for this activity
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setSelectedActivity(null);
                  setParticipants([]);
                }}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAttendance}
                disabled={isSubmitting}
                className={`px-4 py-2 text-white rounded-md ${
                  isSubmitting
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Confirm Attendance"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal
          message="Attendance Successfully Updated!"
          onClose={() => {
            setShowSuccessModal(false);
          }}
        />
      )}
    </div>
  );
};

export default AttendanceTab;
