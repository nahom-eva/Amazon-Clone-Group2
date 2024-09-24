import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDcDLdI72w3cbrL8JTtweII-zbpWj6QQmc",
  authDomain: "clone-group2.firebaseapp.com",
  projectId: "clone-group2",
  storageBucket: "clone-group2.appspot.com",
  messagingSenderId: "538653840391",
  appId: "1:538653840391:web:fb31b7eedcc0defe47c6a2"
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth= getAuth(app)
export const db = app.firestore()

