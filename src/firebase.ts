import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

// Your web app's Firebase configuration
//WARNING: USE YOUR CONFIGURATION WITHOUT THE DOTENV
const firebaseConfig = {
  apiKey: process.env.PUBLIC_NEXT_FIREBASE_API_KEY,
  authDomain: process.env.PUBLIC_NEXT_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.PUBLIC_NEXT_FIREBASE_PROJECT_ID,
  storageBucket: process.env.PUBLIC_NEXT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.PUBLIC_NEXT_FIREBASE_SENDER_ID,
  appId: process.env.PUBLIC_NEXT_FIREBASE_API_ID,
};

console.log(firebaseConfig);
// set application
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

console.log(app);
// set authentication
console.log(firebaseConfig);
const auth = getAuth(app);
// set database
const db = getFirestore(app);
// set functions
const functions = getFunctions(app);

export { db, auth, functions };
