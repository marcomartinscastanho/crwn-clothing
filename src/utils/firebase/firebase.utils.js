import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCms1F2JNkUdcS9GOFdSpGSEa91Kajasks",
  authDomain: "crwn-clothing-db-782be.firebaseapp.com",
  projectId: "crwn-clothing-db-782be",
  storageBucket: "crwn-clothing-db-782be.appspot.com",
  messagingSenderId: "854012311481",
  appId: "1:854012311481:web:d88e14c7500fbec1af6868",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  // if user data does not exist
  if (!userSnapshot.exists()) {
    // create/set the document with the data from userAuth in the collection
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    setDoc(userDocRef, { displayName, email, createdAt }).catch((e) =>
      console.error("error creating the user", e)
    );
  }

  // if user data exists
  // return user data
  return userDocRef;
};
