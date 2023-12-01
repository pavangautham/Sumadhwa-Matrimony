import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBhb2WHbftDJ_R_wSFDR0C2QqYw8oLbmG4",
    authDomain: "sumadhwa-matrimony.firebaseapp.com",
    projectId: "sumadhwa-matrimony",
    storageBucket: "sumadhwa-matrimony.appspot.com",
    messagingSenderId: "612789316275",
    appId: "1:612789316275:web:9010ffe6e1d15dc87cdec6",
    measurementId: "G-RE5WN1GVH9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imgDB = getStorage(app)
const txtDB = getFirestore(app)

export {imgDB,txtDB};