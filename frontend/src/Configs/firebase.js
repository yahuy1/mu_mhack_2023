import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7imd9vq9hB_rPZ1ThNo0EX_DO05Xy4kg",
  authDomain: "mhack-f7759.firebaseapp.com",
  projectId: "mhack-f7759",
  storageBucket: "mhack-f7759.appspot.com",
  messagingSenderId: "518480411625",
  appId: "1:518480411625:web:283e382677cad678a7a978"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);