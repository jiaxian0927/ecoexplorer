import { ActivityFormData } from "../pages/Community/ActivityForm";

export function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export const formatTime = (timeStr: string) => {
  const [hour, minute] = timeStr.split(":").map(Number);
  const isPM = hour >= 12;
  const hour12 = hour % 12 || 12;
  const period = isPM ? "PM" : "AM";
  return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
};

export const getActivityStatus = (
  activity: ActivityFormData
): "canceled" | null | "upcoming" | "completed" | "ongoing" => {
  if (activity.manualStatus === "canceled") return "canceled";

  // Time-based status calculation
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const eventDate = new Date(activity.date);
  eventDate.setHours(0, 0, 0, 0);

  if (now < eventDate) return "upcoming";
  if (now.toDateString() === eventDate.toDateString()) return "ongoing";
  return "completed";
};
