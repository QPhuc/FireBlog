import firebase from 'firebase/compat/app';
import "firebase/compat/auth"
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBCOAPGbUUvadUgO_BaNQj2gGi09AUkIiY",
    authDomain: "fireblog-9b51e.firebaseapp.com",
    projectId: "fireblog-9b51e",
    storageBucket: "fireblog-9b51e.appspot.com",
    messagingSenderId: "952381108211",
    appId: "1:952381108211:web:e02b57f8203a7fd11cac86",
    measurementId: "G-NZJ7F5QE9H"
};

firebase.initializeApp(firebaseConfig);

const firebaseAuth = firebase.auth();
const firebaseStorage = firebase.storage();
const firebaseFirestore = firebase.firestore();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { firebaseAuth, firebaseStorage, firebaseFirestore, timestamp };