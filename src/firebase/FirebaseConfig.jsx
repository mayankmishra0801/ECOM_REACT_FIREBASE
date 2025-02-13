// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
// Your web app's Firebase configuration
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID
//   };
  


const firebaseConfig = {
  apiKey: "AIzaSyBP6v4qqzwqy0vjGXPTOsPyLgzfLlCC57E",
  authDomain: "flex-store-55ec2.firebaseapp.com",
  projectId: "flex-store-55ec2",
  storageBucket: "flex-store-55ec2.firebasestorage.app",
  messagingSenderId: "777541971439",
  appId: "1:777541971439:web:5eaf71de725fcc97cb5a1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };