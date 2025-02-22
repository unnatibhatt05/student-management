import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDIQg69JbyzbC00mbRZZ94-ZBL-8RuHPFo",
  authDomain: "student-management-1400f.firebaseapp.com",
  projectId: "student-management-1400f",
  storageBucket: "student-management-1400f.appspot.com",
  messagingSenderId: "885229952830",
  appId: "1:885229952830:web:c8a5e037db0960fbdb166f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
