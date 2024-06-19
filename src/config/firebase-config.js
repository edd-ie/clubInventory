// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCIJdmY19x8MzNohgAPuDvtCtBZvvQo2G4",
    authDomain: "clubinventory-ce26d.firebaseapp.com",
    projectId: "clubinventory-ce26d",
    storageBucket: "clubinventory-ce26d.appspot.com",
    messagingSenderId: "482662084678",
    appId: "1:482662084678:web:aed5ffb76adf76ff645a47",
    measurementId: "G-95C6YPEJ2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
export const database = getFirestore(app);
export const storage = getStorage(app);