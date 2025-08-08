import { useState } from "react";
import { db } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface ActivityFormModalProps {
  onClose: () => void;
  onSubmit: (data: ActivityFormData) => void;
}

export interface ActivityFormData {
  id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  joinedUsers: { uid: string; email: string; displayName: string }[];
  manualStatus: "canceled" | null | "upcoming" | "completed" | "ongoing";
  organizerId: string;
  joinedUserIds: string[];
  longitude?: number;
  latitude?: number;
  attendance: { user: string; userId: string; status: boolean }[];
}

const ActivityFormModal: React.FC<ActivityFormModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<ActivityFormData>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    joinedUsers: [],
    manualStatus: null,
    organizerId: "",
    joinedUserIds: [],
    longitude: undefined,
    latitude: undefined,
    attendance: [],
  });

  const [submitting, setSubmitting] = useState(false);
  const auth = getAuth();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "longitude" || name === "latitude") {
      const parsedValue = value === "" ? undefined : parseFloat(value);
      setFormData({ ...formData, [name]: parsedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to post an activity.");
      return;
    }

    setSubmitting(true);

    try {
      const updatedFormData: ActivityFormData = {
        ...formData,
        organizerId: user.uid,
      };
      const docRef = await addDoc(
        collection(db, "activities"),
        updatedFormData
      );
      const savedActivity: ActivityFormData = {
        id: docRef.id,
        ...updatedFormData,
      };
      onSubmit(savedActivity);
      onClose();
    } catch (error) {
      alert("Error adding activity: " + error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 px-4">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-200">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
          Post a Green Activity
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Activity Title"
            value={formData.title}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 outline-none focus:border-green-500 transition-all"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 outline-none resize-none focus:border-green-500 transition-all"
            rows={3}
            required
          />
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 outline-none focus:border-green-500 transition-alle"
              required
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 outline-none focus:border-green-500 transition-all"
              required
            />
          </div>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 outline-none focus:border-green-500 transition-all"
            required
          />
          <div className="flex gap-4">
            <input
              type="number"
              name="latitude"
              placeholder="Latitude"
              value={formData.latitude ?? ""}
              onChange={handleChange}
              className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 outline-none focus:border-green-500 transition-all"
              required
            />
            <input
              type="number"
              name="longitude"
              placeholder="Longitude"
              value={formData.longitude ?? ""}
              onChange={handleChange}
              className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 outline-none focus:border-green-500 transition-all"
              required
            />
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-md text-white ${
                submitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityFormModal;
