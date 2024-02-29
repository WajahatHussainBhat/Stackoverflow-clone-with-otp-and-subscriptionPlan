import firebase from 'firebase/app'
import 'firebase/auth'
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyD7fYijf62Huw85JtcwYowqKH6Vd5aZBS8",
  authDomain: "stackoverflow-clone-otpverify.firebaseapp.com",
  projectId: "stackoverflow-clone-otpverify",
  storageBucket: "stackoverflow-clone-otpverify.appspot.com",
  messagingSenderId: "73142112511",
  appId: "1:73142112511:web:99296ed7d8bffb82537cca"
};


const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;