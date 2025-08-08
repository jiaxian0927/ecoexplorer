import { useState, useEffect } from "react";
import "./index.css";
import Header from "./components/Header.tsx";
import HeroSection from "./pages/Home/HeroSection.tsx";
import FactsSection from "./pages/Home/FactsSection.tsx";
import FeaturesSection from "./pages/Home/FeaturesSection.tsx";
import QuizSection from "./pages/Home/QuizSection.tsx";
import CtaSection from "./pages/Home/CtaSection.tsx";
import Discover from "./pages/Discover/Discover.tsx";
import ClimateChange from "./pages/Discover/ClimateChange.tsx";
import Deforestation from "./pages/Discover/Deforestation.tsx";
import OceanPollution from "./pages/Discover/OceanPollution.tsx";
import AirPollution from "./pages/Discover/AirPollution.tsx";
import Quiz from "./pages/Quiz/Quiz.tsx";
import Features from "./pages/Features/Features.tsx";
import EcoCommunity from "./pages/Community/EcoCommunity.tsx";
import { Route, Routes } from "react-router-dom";
import ChangeUsernameModal from "./pages/ChangeUsernameModal.tsx";
import { auth, db } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";

function App() {
  const [changeUsername, setChangeUsername] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const data = userSnap.data();
            setUsername(data.username || null);
          } else {
            setUsername(currentUser.displayName || null); // fallback
          }
        } catch (error) {
          console.error("Failed to fetch username:", error);
          setUsername(currentUser.displayName || null);
        }
      } else {
        setUsername(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleUsernameChange = async (newUsername: string) => {
    if (!user) return;

    const trimmed = newUsername.trim();
    const normalizedUsername = trimmed.toLowerCase();

    const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
    if (!usernameRegex.test(trimmed)) {
      alert(
        "Username must be 3–15 characters and contain only letters, numbers, or underscores."
      );
      return;
    }

    try {
      // 🔍 Check if username already exists
      const usernameRef = doc(db, "usernames", normalizedUsername);
      const usernameSnap = await getDoc(usernameRef);

      if (usernameSnap.exists()) {
        alert("This username is already taken. Please choose another one.");
        return;
      }

      // 🗑️ Delete the old username if it exists
      if (username) {
        const oldUsernameRef = doc(db, "usernames", username.toLowerCase());
        await deleteDoc(oldUsernameRef);
      }

      // ✅ Save username to user's profile
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { username: newUsername }, { merge: true });

      // ✅ Create username reservation entry
      await setDoc(usernameRef, { uid: user.uid });

      setUsername(newUsername);
      setChangeUsername(false);
    } catch (err) {
      console.error("Failed to update username in Firestore:", err);
    }
  };

  return (
    <>
      <Header username={username} setChangeUsername={setChangeUsername} />
      {changeUsername && (
        <ChangeUsernameModal
          onClose={() => setChangeUsername(false)}
          onSubmit={handleUsernameChange}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <FactsSection />
              <QuizSection />
              <FeaturesSection />
              <CtaSection />
            </>
          }
        />
        <Route path="/discover" element={<Discover />} />
        <Route path="/climate-change" element={<ClimateChange />} />
        <Route path="/deforestation" element={<Deforestation />} />
        <Route path="/ocean-pollution" element={<OceanPollution />} />
        <Route path="/air-pollution" element={<AirPollution />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/features" element={<Features />} />
        <Route path="/community" element={<EcoCommunity />} />
      </Routes>
    </>
  );
}

export default App;
