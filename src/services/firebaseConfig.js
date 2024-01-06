// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYCem9eSQGVn8bB_BGQzeUOkRwxoxAyOg",
  authDomain: "malyfinder.firebaseapp.com",
  projectId: "malyfinder",
  storageBucket: "malyfinder.appspot.com",
  messagingSenderId: "82734607591",
  appId: "1:82734607591:web:5096490c4d0b69051a0642",
  measurementId: "G-NCXFD7GDHT"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

export {firebase}