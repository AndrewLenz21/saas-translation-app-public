import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCBwT4aG92TcR1uEoSUxizdkBX-z08lReg',
  authDomain: 'saas-translator-app-f089b.firebaseapp.com',
  projectId: 'saas-translator-app-f089b',
  storageBucket: 'saas-translator-app-f089b.appspot.com',
  messagingSenderId: '214941443254',
  appId: '1:214941443254:web:c18d58c0c9e3255937f217',
};

// set application
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
// set authentication
const auth = getAuth(app);
// set database
const db = getFirestore(app);
// set functions
const functions = getFunctions(app);

export {db, auth, functions}