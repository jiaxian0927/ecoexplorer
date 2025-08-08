import "./EcoCommunity.css";
import { ScrollToTop } from "../../components/Discover/ScrollHelper";
import AddIcon from "../../assets/addIcon.tsx";
import ActivityFormModal, { ActivityFormData } from "./ActivityForm.tsx";
import { useState, useEffect, useMemo } from "react";
import { db } from "../../../firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
} from "firebase/firestore";
import ActivityConfirmationModal from "./ActivityConfirmationModal.tsx";
import { getAuth } from "firebase/auth";
import SuccessModal from "./SuccessModal.tsx";
import { formatTime, getActivityStatus } from "../../utility/utility.tsx";
import CancelParticipationModal from "./CancelParticipationModal.tsx";
import CancelTab from "./CancelTab.tsx";
import AttendanceTab from "./AttendanceTab.tsx";

interface EcoPoints {
  [uid: string]: number;
}

interface LeaderboardEntry {
  user: string;
  userId: string;
  points: number;
}

function EcoCommunity() {
  ScrollToTop();

  const [loadingActivities, setLoadingActivities] = useState(true);
  const [menu, setMenu] = useState<
    "activity" | "ecoPlans" | "eventControls" | "leaderboard"
  >("activity");

  const computeActivitiesStatus = (
    activities: ActivityFormData[]
  ): ActivityFormData[] => {
    return activities.map((activity) => ({
      ...activity,
      manualStatus: getActivityStatus(activity),
    }));
  };

  const fetchActivities = async () => {
    setLoadingActivities(true);
    try {
      const querySnapshot = await getDocs(collection(db, "activities"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ActivityFormData[];
      const updatedData = await computeActivitiesStatus(data);
      setActivities(updatedData);
    } catch (error) {
      alert("Error fetching activities: " + error);
    } finally {
      setLoadingActivities(false);
    }
  };

  const [showForm, setShowForm] = useState(false);
  const [activities, setActivities] = useState<ActivityFormData[]>([]);
  const handleSubmit = () => {
    fetchActivities();
  };

  // Get user's current location
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        alert("Unable to retrieve your location: " + err.message);
      }
    );
  }, []);

  const getDistanceFromLatLonInKm = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showFilteredResults, setShowFilteredResults] = useState(false);

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) =>
      activity.title?.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [activities, searchKeyword]);

  const [displaySort, setDisplaySort] = useState(false);
  const [sortBy, setSortBy] = useState<"default" | "nearest" | "popular">(
    "default"
  );
  const [sortJoinedActivities, setSortJoinedActivities] = useState<
    "upcoming" | "ongoing" | "canceled" | "completed"
  >("upcoming");

  const sortedActivities = useMemo(() => {
    let baseActivities: ActivityFormData[] =
      showFilteredResults && searchKeyword.trim() !== ""
        ? filteredActivities
        : activities;

    let sorted = [...baseActivities];

    if (sortBy === "nearest" && location) {
      sorted = sorted
        .filter((a) => a.latitude != null && a.longitude != null)
        .sort((a, b) => {
          const distA = getDistanceFromLatLonInKm(
            location.latitude,
            location.longitude,
            a.latitude!,
            a.longitude!
          );
          const distB = getDistanceFromLatLonInKm(
            location.latitude,
            location.longitude,
            b.latitude!,
            b.longitude!
          );
          return distA - distB;
        });
    } else if (sortBy === "popular") {
      sorted = sorted.sort((a, b) => {
        const aCount = a.joinedUsers?.length || 0;
        const bCount = b.joinedUsers?.length || 0;
        return bCount - aCount;
      });
    }

    return sorted;
  }, [activities, sortBy, location, showFilteredResults, searchKeyword]);

  const [selectedActivity, setSelectedActivity] =
    useState<ActivityFormData | null>(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleJoin = async () => {
    if (!selectedActivity || !selectedActivity.id) return;

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to join activities.");
      return;
    }

    try {
      const activityRef = doc(db, "activities", selectedActivity.id);
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      const displayName = userDocSnap.exists()
        ? userDocSnap.data().username || ""
        : "";

      await updateDoc(activityRef, {
        joinedUsers: arrayUnion({
          uid: user.uid,
          email: user.email,
          displayName: displayName ?? "",
        }),
        joinedUserIds: arrayUnion(user.uid),
        attendance: arrayUnion({
          user: displayName,
          userId: user.uid,
          status: false,
        }),
      });
      setShowSuccessModal(true);
    } catch (error) {
      alert("Error joining activity: " + error);
    }
  };

  const [joinedActivities, setJoinedActivities] = useState<ActivityFormData[]>(
    []
  );

  const getJoinedActivities = async () => {
    setLoadingActivities(true);
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to view joined activities.");
      return;
    }

    try {
      const activitiesRef = collection(db, "activities");
      const q = query(
        activitiesRef,
        where("joinedUserIds", "array-contains", user.uid)
      );
      const querySnapshot = await getDocs(q);

      const joinedActivities = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || "",
          description: data.description || "",
          date: data.date || "",
          time: data.time || "",
          location: data.location || "",
          latitude: data.latitude ?? null,
          manualStatus: data.manualStatus ?? null,
          longitude: data.longitude ?? null,
          joinedUsers: data.joinedUsers || [],
          joinedUserIds: data.joinedUserIds || [],
        } as ActivityFormData;
      });

      const updatedJoinedActivities = computeActivitiesStatus(joinedActivities);

      return setJoinedActivities(updatedJoinedActivities);
    } catch (error) {
      console.error("Error getting joined activities:", error);
    } finally {
      setLoadingActivities(false);
      return [];
    }
  };

  const sortedJoinActivities = useMemo(() => {
    if (!joinedActivities.length) return;

    return joinedActivities.filter((activity) => {
      const status = activity.manualStatus || getActivityStatus(activity);

      switch (sortJoinedActivities) {
        case "upcoming":
          return status === "upcoming";
        case "ongoing":
          return status === "ongoing";
        case "completed":
          return status === "completed";
        case "canceled":
          return status === "canceled";
        default:
          return true;
      }
    });
  }, [sortJoinedActivities, joinedActivities]);

  const [activeTab, setActiveTab] = useState<"attendance" | "cancel">(
    "attendance"
  );

  const [organizerActivities, setOrganizerActivities] = useState<
    ActivityFormData[]
  >([]);

  const getOrganizerActivities = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    setLoadingActivities(true);

    if (!user) {
      alert("No authenticated user found.");
      return;
    }

    try {
      const q = query(
        collection(db, "activities"),
        where("organizerId", "==", user.uid)
      );

      const snapshot = await getDocs(q);

      const activities: ActivityFormData[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as ActivityFormData),
      }));

      return setOrganizerActivities(activities);
    } catch (error) {
      alert("Error fetching organizer activities:" + error);
      return [];
    } finally {
      setLoadingActivities(false);
    }
  };

  const sortedOrganizerActivities = useMemo(() => {
    if (!organizerActivities.length) return [];

    return organizerActivities.filter((activity) => {
      const status = activity.manualStatus || getActivityStatus(activity);
      return status === "upcoming";
    });
  }, [organizerActivities]);

  const sortedCompletedActivities = useMemo(() => {
    if (!organizerActivities.length) return [];

    return organizerActivities.filter((activity) => {
      const status = activity.manualStatus || getActivityStatus(activity);
      return status === "completed";
    });
  }, [organizerActivities]);

  const handleCancelActivity = async (activityId: string) => {
    try {
      const activityRef = doc(db, "activities", activityId);

      await updateDoc(activityRef, {
        status: "canceled",
      });
    } catch (error) {
      alert("Failed to cancel activity:" + error);
    }
  };

  const calculateEcoPoints = async (): Promise<LeaderboardEntry[]> => {
    const ecoPoints: EcoPoints = {};

    const addPoints = (userId: string, points: number) => {
      if (!userId) return;
      ecoPoints[userId] = (ecoPoints[userId] || 0) + points;
    };

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return [];

    try {
      const querySnapshot = await getDocs(collection(db, "activities"));

      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data() as ActivityFormData;

        data.attendance?.forEach((entry) => {
          if (entry.status === true) {
            addPoints(entry.userId, 5);
          }
        });

        if (getActivityStatus(data) === "completed") {
          addPoints(data.organizerId, 20);
        }
      });

      const getUsername = async (userUid: string): Promise<string> => {
        const docSnap = await getDoc(doc(db, "users", userUid));

        let username = "";

        if (docSnap.exists()) {
          username = docSnap.data().username;
          return username;
        } else {
          console.log("No user data found");
          return username;
        }
      };

      const leaderboardArray: LeaderboardEntry[] = await Promise.all(
        Object.entries(ecoPoints).map(async ([userId, points]) => ({
          user: await getUsername(userId),
          userId,
          points,
        }))
      );

      leaderboardArray.sort((a, b) => b.points - a.points);

      return leaderboardArray;
    } catch (error) {
      console.error("Error calculating ecoPoints:", error);
      return [];
    }
  };
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const handleMenuChange = async () => {
      if (!menu) return;
      if (menu === "activity") {
        fetchActivities();
      } else if (menu === "ecoPlans") {
        await getJoinedActivities();
        sortedJoinActivities;
      } else if (menu === "eventControls") {
        await getOrganizerActivities();
        sortedOrganizerActivities;
      } else {
        setLoadingActivities(true);
        const leaderboardArray = await calculateEcoPoints();
        setLeaderboard(leaderboardArray);
        setLoadingActivities(false);
      }
    };

    handleMenuChange();
  }, [menu]);

  const [showCancelParticipationModal, setShowCancelParticipationModal] =
    useState(false);
  const [activityToCancelParticipation, setActivityToCancelParticipation] =
    useState<ActivityFormData | null>(null);

  const handleCancelParticipation = async (activityId: string) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to cancel participation");
      return;
    }

    try {
      const docSnap = await getDoc(doc(db, "users", user.uid));
      const activityRef = doc(db, "activities", activityId);

      let username = "";

      if (docSnap.exists()) {
        username = docSnap.data().username;
      } else {
        console.log("No user data found");
      }

      await updateDoc(activityRef, {
        joinedUsers: arrayRemove({
          uid: user.uid,
          email: user.email,
          displayName: username || "",
        }),
        joinedUserIds: arrayRemove(user.uid),
      });

      getJoinedActivities();

      return true;
    } catch (error) {
      alert("Error canceling participation:" + error);
    }
  };

  return (
    <>
      <section className="w-full bg-gradient-to-b from-[#edfef0] to-[#d9eddf] min-h-[calc(100vh-80px)] p-10 relative grid grid-cols-5 gap-10">
        {/*Navbar*/}
        <div className="col-span-1 rounded-xl bg-white/60 backdrop-blur-md py-10 px-6 shadow-lg border border-gray-200">
          <ul className="flex flex-col gap-2 text-lg font-medium">
            <div
              className={`flex flex-row items-center gap-2 hover:bg-gray-100 transition-all rounded-lg py-2 px-3 hover:cursor-pointer ${
                menu === "activity" ? "bg-green-100" : ""
              }`}
              onClick={() => {
                setMenu("activity");
                setShowFilteredResults(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M640-440 474-602q-31-30-52.5-66.5T400-748q0-55 38.5-93.5T532-880q32 0 60 13.5t48 36.5q20-23 48-36.5t60-13.5q55 0 93.5 38.5T880-748q0 43-21 79.5T807-602L640-440Zm0-112 109-107q19-19 35-40.5t16-48.5q0-22-15-37t-37-15q-14 0-26.5 5.5T700-778l-60 72-60-72q-9-11-21.5-16.5T532-800q-22 0-37 15t-15 37q0 27 16 48.5t35 40.5l109 107ZM280-220l278 76 238-74q-5-9-14.5-15.5T760-240H558q-27 0-43-2t-33-8l-93-31 22-78 81 27q17 5 40 8t68 4q0-11-6.5-21T578-354l-234-86h-64v220ZM40-80v-440h304q7 0 14 1.5t13 3.5l235 87q33 12 53.5 42t20.5 66h80q50 0 85 33t35 87v40L560-60l-280-78v58H40Zm80-80h80v-280h-80v280Zm520-546Z" />
              </svg>
              <li>Activity</li>
            </div>
            <div
              className={`flex flex-row items-center gap-2 hover:bg-gray-100 transition-all rounded-lg py-2 px-3 hover:cursor-pointer ${
                menu === "ecoPlans" ? "bg-green-100" : ""
              }`}
              onClick={() => setMenu("ecoPlans")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M580-240q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
              </svg>
              <li>EcoPlans</li>
            </div>
            <div
              className={`flex flex-row items-center gap-2 hover:bg-gray-100 transition-all rounded-lg py-2 px-3 hover:cursor-pointer ${
                menu === "eventControls" ? "bg-green-100" : ""
              }`}
              onClick={() => setMenu("eventControls")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M300-720q-25 0-42.5 17.5T240-660q0 25 17.5 42.5T300-600q25 0 42.5-17.5T360-660q0-25-17.5-42.5T300-720Zm0 400q-25 0-42.5 17.5T240-260q0 25 17.5 42.5T300-200q25 0 42.5-17.5T360-260q0-25-17.5-42.5T300-320ZM160-840h640q17 0 28.5 11.5T840-800v280q0 17-11.5 28.5T800-480H160q-17 0-28.5-11.5T120-520v-280q0-17 11.5-28.5T160-840Zm40 80v200h560v-200H200Zm-40 320h640q17 0 28.5 11.5T840-400v280q0 17-11.5 28.5T800-80H160q-17 0-28.5-11.5T120-120v-280q0-17 11.5-28.5T160-440Zm40 80v200h560v-200H200Zm0-400v200-200Zm0 400v200-200Z" />
              </svg>
              <li>Event Controls</li>
            </div>
            <div
              className={`flex flex-row items-center gap-2 hover:bg-gray-100 transition-all rounded-lg py-2 px-3 hover:cursor-pointer ${
                menu === "leaderboard" ? "bg-green-100" : ""
              }`}
              onClick={() => setMenu("leaderboard")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M160-200h160v-320H160v320Zm240 0h160v-560H400v560Zm240 0h160v-240H640v240ZM80-120v-480h240v-240h320v320h240v400H80Z" />
              </svg>
              <li>Leaderboard</li>
            </div>
          </ul>
        </div>
        {/*Activity*/}
        {menu === "activity" && (
          <div className="col-span-4 grid grid-rows-[auto_minmax(0,1fr)_auto] bg-white/80 rounded-xl shadow-lg border border-gray-200 relative pb-10 pr-5 h-[calc(100vh-160px)]">
            {/* Selection (search bar & sort by...) */}
            <div className="flex flex-row justify-between gap-3 mt-10 ml-10 mr-5">
              {/* Search Bar */}
              <input
                type="text"
                placeholder="🔍 Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setSearchKeyword(searchQuery);
                    setShowFilteredResults(true);
                  }
                }}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
              />
              {/* Sort By... */}
              <div className="relative inline-block text-left text-balance">
                <button
                  onClick={() => setDisplaySort(!displaySort)}
                  className="inline-flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition focus:border-none"
                >
                  Sort by:{" "}
                  {sortBy === "default"
                    ? "Default"
                    : sortBy === "nearest"
                    ? "Nearest"
                    : "Most Popular"}
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      displaySort ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {displaySort && (
                  <div className="absolute right-0 z-10 mt-2 w-44 origin-top-right bg-white divide-y divide-gray-100 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div>
                      {["default", "nearest", "popular"].map((option) => (
                        <button
                          key={option}
                          onClick={() =>
                            setSortBy(
                              option as "default" | "nearest" | "popular"
                            )
                          }
                          className={`w-full text-left px-4 py-2 text-sm ${
                            sortBy === option
                              ? "bg-gray-100 text-gray-900 font-semibold"
                              : "text-gray-700 hover:bg-gray-200"
                          } ${
                            option === "default"
                              ? "rounded-t-xl"
                              : option === "popular"
                              ? "rounded-b-xl"
                              : ""
                          }`}
                        >
                          {option === "default"
                            ? "Default"
                            : option === "nearest"
                            ? "Nearest"
                            : "Most Popular"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="overflow-y-auto pr-5 pl-10 my-8 py-2 relative">
              {/*Loading Activities*/}
              {loadingActivities ? (
                <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
                  <p className="text-gray-700 text-lg font-medium">
                    Loading activities...
                  </p>
                </div>
              ) : showFilteredResults ? (
                //Filtered Results
                <div className="space-y-4">
                  {sortedActivities.filter(
                    (activity) => activity.manualStatus === "upcoming"
                  ).length === 0 ? (
                    <p className="text-gray-500">
                      No matching activities found.
                    </p>
                  ) : (
                    sortedActivities
                      .filter(
                        (activity) => activity.manualStatus === "upcoming"
                      )
                      .map((activity) => (
                        <div
                          key={activity.id}
                          className="bg-white rounded-xl p-6 hover:shadow-md shadow-none border border-gray-300 hover:scale-[1.02] transition-all cursor-pointer"
                          onClick={() => {
                            setSelectedActivity(activity);
                          }}
                        >
                          <h3 className="text-xl font-semibold">
                            {activity.title}
                          </h3>
                          <div className="flex flex-row items-center text-sm text-gray-600 gap-1">
                            <p className="">{activity.date}</p>
                            <p>•</p>
                            <p>{formatTime(activity.time)}</p>
                            <p>•</p>
                            {activity.longitude && activity.latitude ? (
                              <a
                                href={`https://www.google.com/maps?q=${activity.latitude},${activity.longitude}`}
                                className="hover:font-medium hover:text-green-800 transition-all"
                              >
                                {activity.location}
                              </a>
                            ) : (
                              <span>{activity.location}</span>
                            )}
                            <p>•</p>
                            <p>{activity.joinedUsers.length} people joined</p>
                          </div>
                          <p className="mt-2 text-black font-light border-l-2 pl-2 border-gray-300">
                            {activity.description}
                          </p>
                        </div>
                      ))
                  )}
                </div>
              ) : //List of posted activities
              sortedActivities.filter(
                  (activity) => activity.manualStatus === "upcoming"
                ).length === 0 ? (
                <div className="">
                  <p className="text-gray-500">No activities posted yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedActivities
                    .filter((activity) => activity.manualStatus === "upcoming")
                    .map((activity) => (
                      <div
                        key={activity.id}
                        className="bg-white rounded-xl p-6 hover:shadow-md shadow-none border border-gray-300 hover:scale-[1.02] transition-all cursor-pointer"
                        onClick={() => {
                          setSelectedActivity(activity);
                        }}
                        title="Join activity"
                      >
                        <h3 className="text-xl font-semibold">
                          {activity.title}
                        </h3>
                        <div className="flex flex-row items-center text-sm text-gray-600 gap-1">
                          <p className="">{activity.date}</p>
                          <p>•</p>
                          <p>{formatTime(activity.time)}</p>
                          <p>•</p>
                          {activity.longitude && activity.latitude ? (
                            <a
                              href={`https://www.google.com/maps?q=${activity.latitude},${activity.longitude}`}
                              className="hover:font-medium hover:text-green-800 transition-all"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {activity.location}
                            </a>
                          ) : (
                            <span>{activity.location}</span>
                          )}
                          <p>•</p>
                          <p>{activity.joinedUsers.length} people joined</p>
                        </div>
                        <p className="mt-2 text-black font-light border-l-2 pl-2 border-gray-300">
                          {activity.description}
                        </p>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <div className="flex flex-row justify-end pr-5">
              <button
                className="bg-white shadow-2xl p-2 rounded-lg shadow-black hover:bg-gray-200 hover:scale-110 transition-all size-10"
                onClick={() => setShowForm(true)}
              >
                <AddIcon />
              </button>
            </div>
          </div>
        )}
        {/*EcoPlans*/}
        {menu === "ecoPlans" && (
          <div className="col-span-4 grid grid-rows-[auto_minmax(0,1fr)] bg-white/80 rounded-xl shadow-lg border border-gray-200 relative h-[calc(100vh-160px)] pb-10 pr-5">
            {loadingActivities ? (
              //Loding plans
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
                <p className="text-gray-700 text-lg font-medium">
                  Loading plans...
                </p>
              </div>
            ) : (
              //EcoPlans
              <>
                <div className="flex justify-between px-10 pt-10 items-center">
                  <div className="">
                    <h2 className="text-3xl font-bold text-gray-800">
                      My Eco Plans
                    </h2>
                    <p className="text-sm text-gray-500">
                      Track your environmental activities and commitments
                    </p>
                  </div>
                  {/* Sort By... */}
                  <div className="relative inline-block text-left text-balance">
                    <button
                      onClick={() => setDisplaySort(!displaySort)}
                      className="inline-flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition focus:border-none"
                    >
                      Sort by:{" "}
                      {sortJoinedActivities === "upcoming"
                        ? "Upcoming"
                        : sortJoinedActivities === "completed"
                        ? "Completed"
                        : sortJoinedActivities === "ongoing"
                        ? "Ongoing"
                        : "Canceled"}
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          displaySort ? "rotate-180" : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {displaySort && (
                      <div className="absolute right-0 z-10 mt-2 w-44 origin-top-right bg-white divide-y divide-gray-100 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div>
                          {["upcoming", "completed", "ongoing", "canceled"].map(
                            (option) => (
                              <button
                                key={option}
                                onClick={() =>
                                  setSortJoinedActivities(
                                    option as
                                      | "canceled"
                                      | "upcoming"
                                      | "completed"
                                      | "ongoing"
                                  )
                                }
                                className={`w-full text-left px-4 py-2 text-sm ${
                                  sortJoinedActivities === option
                                    ? "bg-gray-100 text-gray-900 font-semibold"
                                    : "text-gray-700 hover:bg-gray-200"
                                } ${
                                  option === "upcoming"
                                    ? "rounded-t-xl"
                                    : option === "canceled"
                                    ? "rounded-b-xl"
                                    : ""
                                }`}
                              >
                                {option === "upcoming"
                                  ? "Upcoming"
                                  : option === "completed"
                                  ? "Completed"
                                  : option === "ongoing"
                                  ? "Ongoing"
                                  : "Canceled"}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="overflow-y-auto pr-5 pl-10 mt-4 py-2 relative">
                  {(sortedJoinActivities ?? []).length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      {sortJoinedActivities === "upcoming" ? (
                        <>
                          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-10 w-10 text-green-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          </div>
                          <h3 className="text-lg font-medium text-gray-800 mb-2">
                            No activities yet
                          </h3>
                          <p className="text-gray-500 max-w-md mb-6">
                            You haven't joined any eco activities. Explore
                            available plans to start your green journey!
                          </p>
                          <button
                            className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium shadow-sm hover:shadow-md"
                            onClick={() => setMenu("activity")}
                          >
                            Browse Activities
                          </button>
                        </>
                      ) : (
                        <p className="text-gray-500 text-center">
                          No {sortJoinedActivities} activities found.
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {(sortedJoinActivities ?? []).map((activity) => (
                        <div
                          key={activity.id}
                          className={`bg-white rounded-xl p-6 hover:shadow-md border border-gray-200 transition-all group border-l-8 ${
                            activity.manualStatus === "upcoming"
                              ? "border-l-green-300"
                              : activity.manualStatus === "ongoing"
                              ? "border-l-yellow-300"
                              : activity.manualStatus === "completed"
                              ? "border-l-gray-300"
                              : "border-l-red-300"
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <h3
                              className={`text-xl font-semibold text-gray-800 ${
                                activity.manualStatus === "upcoming"
                                  ? "group-hover:text-green-700"
                                  : activity.manualStatus === "ongoing"
                                  ? "group-hover:text-yellow-700"
                                  : activity.manualStatus === "completed"
                                  ? "group-hover:text-gray-700"
                                  : "group-hover:text-red-700"
                              }`}
                            >
                              {activity.title}
                            </h3>
                            <button
                              className={`rounded-lg p-1 cursor-pointer hover:bg-gray-200 ${
                                activity.manualStatus === "upcoming"
                                  ? ""
                                  : "hidden"
                              }`}
                              onClick={() => {
                                setShowCancelParticipationModal(true);
                                setActivityToCancelParticipation(activity);
                              }}
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="#F05252"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>

                          <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 gap-y-2 mt-2">
                            <div className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 mr-1.5 ${
                                  activity.manualStatus === "upcoming"
                                    ? "text-green-500"
                                    : activity.manualStatus === "ongoing"
                                    ? "text-yellow-500"
                                    : activity.manualStatus === "completed"
                                    ? "text-gray-500"
                                    : "text-red-500"
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              {activity.date} at {formatTime(activity.time)}
                            </div>

                            <div className="flex items-center gap-1.5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 ${
                                  activity.manualStatus === "upcoming"
                                    ? "text-green-500"
                                    : activity.manualStatus === "ongoing"
                                    ? "text-yellow-500"
                                    : activity.manualStatus === "completed"
                                    ? "text-gray-500"
                                    : "text-red-500"
                                }`}
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
                              {activity.longitude && activity.latitude ? (
                                <a
                                  href={`https://www.google.com/maps?q=${activity.latitude},${activity.longitude}`}
                                  className={`hover:underline ${
                                    activity.manualStatus === "upcoming"
                                      ? "hover:text-green-700"
                                      : activity.manualStatus === "ongoing"
                                      ? "hover:text-yellow-700"
                                      : activity.manualStatus === "completed"
                                      ? "hover:text-gray-700"
                                      : "hover:text-red-700"
                                  }} `}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {activity.location}
                                </a>
                              ) : (
                                <span>{activity.location}</span>
                              )}
                            </div>

                            <div className="flex items-center ml-auto">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 mr-1.5 ${
                                  activity.manualStatus === "upcoming"
                                    ? "text-green-500"
                                    : activity.manualStatus === "ongoing"
                                    ? "text-yellow-500"
                                    : activity.manualStatus === "completed"
                                    ? "text-gray-500"
                                    : "text-red-500"
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                              </svg>
                              {activity.joinedUserIds?.length || 0} participants
                            </div>
                          </div>

                          <p
                            className={`mt-3 text-gray-600 pl-2 border-l-2 border-gray-300 ${
                              activity.manualStatus === "upcoming"
                                ? "group-hover:border-green-200"
                                : activity.manualStatus === "ongoing"
                                ? "group-hover:border-yellow-200"
                                : activity.manualStatus === "completed"
                                ? "group-hover:border-gray-200"
                                : "group-hover:border-red-200"
                            }`}
                          >
                            {activity.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
        {/*Event Controls*/}
        {menu === "eventControls" && (
          <div className="col-span-4 grid grid-rows-[auto_auto_minmax(0,1fr)] bg-white/80 rounded-xl shadow-lg border border-gray-200 relative pb-10 pr-5 h-[calc(100vh-160px)]">
            {loadingActivities ? (
              //Loding organized activities
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
                <p className="text-gray-700 text-lg font-medium">
                  Loding organized activities...
                </p>
              </div>
            ) : (
              //Event Controls
              <>
                <div className="px-10 pt-10">
                  <h2 className="text-3xl font-bold text-gray-800">
                    Event Controls
                  </h2>
                  <p className="text-sm text-gray-500">
                    Manage your eco-activities and participants
                  </p>
                </div>
                {/*Active Tab Selector*/}
                <div className="px-10 pt-4">
                  <nav className="flex space-x-8">
                    <button
                      onClick={() => setActiveTab("attendance")}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "attendance"
                          ? "border-green-500 text-green-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Attendance
                    </button>
                    <button
                      onClick={() => setActiveTab("cancel")}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "cancel"
                          ? "border-red-500 text-red-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Cancel Event
                    </button>
                  </nav>
                </div>
                {/* Tab Content */}
                <div className="px-10 pb-10 pt-5 overflow-y-auto">
                  {activeTab === "attendance" ? (
                    sortedCompletedActivities.length === 0 ? (
                      <div className="text-center text-gray-500 mt-10">
                        You haven't organized any activities.
                      </div>
                    ) : (
                      <AttendanceTab activities={sortedCompletedActivities} />
                    )
                  ) : sortedOrganizerActivities.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">
                      You haven't organized any upcoming activities.
                    </div>
                  ) : (
                    <CancelTab
                      activities={sortedOrganizerActivities}
                      onCancel={handleCancelActivity}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        )}
        {/*Leaderboard*/}
        {menu === "leaderboard" && (
          <div className="col-span-4 grid grid-rows-[auto_auto_minmax(0,1fr)] bg-white/80 rounded-xl shadow-lg border border-gray-200 relative p-10 h-[calc(100vh-160px)]">
            {loadingActivities ? (
              //Loading leaderboard
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
                <p className="text-gray-700 text-lg font-medium">
                  Loading leaderboard...
                </p>
              </div>
            ) : (
              <>
                {/* Title */}
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-gray-800">
                    Eco Points Leaderboard
                  </h2>
                  <p className="text-sm text-gray-500">
                    Recognizing Our Eco Champions
                  </p>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-3 font-semibold text-gray-600 border-b border-gray-300 pb-2 mb-2 px-5">
                  <span className="text-left">Rank</span>
                  <span className="text-left">User</span>
                  <span className="text-center">Points</span>
                </div>

                {/* Leaderboard List */}
                <div className="overflow-y-auto custom-scrollbar">
                  {leaderboard.length > 0 ? (
                    leaderboard.map((entry, index) => (
                      <div
                        key={entry.userId}
                        className={`grid grid-cols-3 py-2 px-4 items-center transition-all rounded-r-lg ${
                          index < 3
                            ? "bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-400"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        {/* Rank */}
                        <div className="flex items-center">
                          {index === 0 ? (
                            <span className="text-yellow-500 mr-2">🥇</span>
                          ) : index === 1 ? (
                            <span className="text-gray-500 mr-2">🥈</span>
                          ) : index === 2 ? (
                            <span className="text-orange-500 mr-2">🥉</span>
                          ) : null}
                          <span className={`font-bold text-lg text-gray-800`}>
                            {index + 1}
                          </span>
                        </div>
                        {/* Username */}
                        <span className="truncate font-bold text-md text-gray-800">
                          {entry.user || "Unknown"}
                        </span>
                        {/* Points */}
                        <span className="text-center font-bold text-md text-gray-800">
                          {entry.points}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center mt-10">
                      No leaderboard data yet
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </section>
      {/* Activity Form Modal */}
      {showForm && (
        <ActivityFormModal
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
        />
      )}
      {/* Activity Confirmation Modal */}
      {selectedActivity && (
        <ActivityConfirmationModal
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
          onJoin={handleJoin}
        />
      )}
      {/* Join Success Modal */}
      {showSuccessModal && (
        <SuccessModal
          onClose={() => {
            setShowSuccessModal(false);
            setSelectedActivity(null);
            fetchActivities();
          }}
          message="Successfully joined!"
        />
      )}
      {/* Cancel Participation Modal */}
      {showCancelParticipationModal && activityToCancelParticipation && (
        <CancelParticipationModal
          activity={activityToCancelParticipation}
          onClose={() => {
            setShowCancelParticipationModal(false);
            setActivityToCancelParticipation(null);
          }}
          onConfirm={() =>
            handleCancelParticipation(activityToCancelParticipation.id ?? "")
          }
        />
      )}
    </>
  );
}
export default EcoCommunity;
