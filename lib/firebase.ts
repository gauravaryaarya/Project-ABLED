// lib/firebase.ts
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyAebyAytoRxdUP1bhmApcszhBMaTbUEgzQ",
  authDomain: "project-abled.firebaseapp.com",
  projectId: "project-abled",
  storageBucket: "project-abled.appspot.com",
  messagingSenderId: "631354070023",
  appId: "1:631354070023:web:ced948d422c04b6c5d86a2",
  measurementId: "G-WNBNF67SMD",
}

const firebaseApp: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp()

export { firebaseApp as app }
export default firebaseApp
