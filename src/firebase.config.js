
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB_B3DxTWcjI4bUQ3WDLm9dcwAA-n9krqU",
  authDomain: "shopkaro-2d3d8.firebaseapp.com",
  projectId: "shopkaro-2d3d8",
  storageBucket: "shopkaro-2d3d8.appspot.com",
  messagingSenderId: "763549529578",
  appId: "1:763549529578:web:2c62b2448de6dc5c8fae93",
  measurementId: "G-96G3C01R2T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth =  getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;