import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../../firebase.ts";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      // New user, prompt for username
      await setDoc(userRef, {
        email: user.email,
        username: user.displayName,
      });
    }
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
  }
};
