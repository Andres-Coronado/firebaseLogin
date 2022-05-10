import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyDp7xJwXwoK7oCr4bRybR0Sk4lmh9AQyXA",
    databaseURL: "https://PROJECT_ID.firebaseio.com",
    projectId: "coffeenlingzhi",
    storageBucket: "coffeenlingzhi.appspot.com",
    messagingSenderId: "367476349205",
    appId: "1:367476349205:web:7ce17da4db473f4b92b11c"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth()
const firebaseDb = firebaseApp.firestore()
const firebaseEmail = firebase.auth().currentUser

export  { firebaseAuth, firebaseDb, firebaseEmail }
