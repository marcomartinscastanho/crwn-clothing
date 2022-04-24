import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  getFirestore,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  writeBatch,
} from "firebase/firestore";

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

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

// onAuthStateChanged defines callback as an Observer
// it is constantly listening to changes to auth, and when auth changes it calls the callback
// it returns a function to unsubscribe, i.e. to stop listening
// it's important to do that to avoid memory leaks
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((objectToAdd) => {
    const docRef = doc(collectionRef, objectToAdd.title.toLowerCase());
    batch.set(docRef, objectToAdd);
  });

  await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      // callback
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      // error callback
      reject
    );
  });
};
