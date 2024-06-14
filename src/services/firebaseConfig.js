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
  apiKey: "AIzaSyCmhp87JmCGb6Ti9mlJboCr9RvRde45TFM",
  authDomain: "paginas-africanas.firebaseapp.com",
  projectId: "paginas-africanas",
  storageBucket: "paginas-africanas.appspot.com",
  messagingSenderId: "1052536161394",
  appId: "1:1052536161394:web:280af7b89b2dc40e71eeeb",
  measurementId: "G-GX6TDRR19W"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

export {firebase}