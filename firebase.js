import { initializeApp } from 'firebase/app';
import {getDatabase} from "firebase/database";


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBlKwYLXbUPsK4IUQZ8_mhCBZeybiGh1kg",
    authDomain: "intelligent-home-project.firebaseapp.com",
    databaseURL: "https://intelligent-home-project-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "intelligent-home-project",
    storageBucket: "intelligent-home-project.appspot.com",
    messagingSenderId: "960213949958",
    appId: "1:960213949958:web:c6ad3c207e304aa1166d87"
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase()
