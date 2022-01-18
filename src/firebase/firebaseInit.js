import firebase from 'firebase/app';
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBCOAPGbUUvadUgO_BaNQj2gGi09AUkIiY",
    authDomain: "fireblog-9b51e.firebaseapp.com",
    projectId: "fireblog-9b51e",
    storageBucket: "fireblog-9b51e.appspot.com",
    messagingSenderId: "952381108211",
    appId: "1:952381108211:web:e02b57f8203a7fd11cac86",
    measurementId: "G-NZJ7F5QE9H"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();