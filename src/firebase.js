import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXy1JZ1n82QMWF92Wk2eADYjEzCHjIx_c",
  authDomain: "vocalink-177e2.firebaseapp.com",
  projectId: "vocalink-177e2",
  storageBucket: "vocalink-177e2.firebasestorage.app",
  messagingSenderId: "838666683497",
  appId: "1:838666683497:web:3afbedfafde952b5da4ef8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);