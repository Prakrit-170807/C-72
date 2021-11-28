import * as firebase from "firebase";
require("@firebase/firestore")

const firebaseConfig = {
    apiKey: "AIzaSyB7uDsdifEIU50eFsK-3PseH78PwGjBE04",
    authDomain: "c-71-b7897.firebaseapp.com",
    projectId: "c-71-b7897",
    storageBucket: "c-71-b7897.appspot.com",
    messagingSenderId: "185978946607",
    appId: "1:185978946607:web:1f740244c1783b3c66f2da"
}

firebase.initializeApp(firebaseConfig)
export default firebase.firestore()