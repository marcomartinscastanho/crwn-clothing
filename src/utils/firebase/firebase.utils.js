import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCms1F2JNkUdcS9GOFdSpGSEa91Kajasks",
  authDomain: "crwn-clothing-db-782be.firebaseapp.com",
  projectId: "crwn-clothing-db-782be",
  storageBucket: "crwn-clothing-db-782be.appspot.com",
  messagingSenderId: "854012311481",
  appId: "1:854012311481:web:d88e14c7500fbec1af6868",
};

initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    setDoc(userDocRef, { displayName, email, createdAt, ...additionalInfo }).catch((e) =>
      console.error("error creating the user", e)
    );
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
