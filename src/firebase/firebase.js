import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const prodConfig = {
  apiKey: "AIzaSyDzbaaEmU06wuSZS6-11XDyrCsoLrwweeA",
  authDomain: "fir-playground-e3a92.firebaseapp.com",
  databaseURL: "https://fir-playground-e3a92.firebaseio.com",
  projectId: "fir-playground-e3a92",
  storageBucket: "",
  messagingSenderId: "261070931238"
};

const devConfig = {
  apiKey: "AIzaSyDzbaaEmU06wuSZS6-11XDyrCsoLrwweeA",
  authDomain: "fir-playground-e3a92.firebaseapp.com",
  databaseURL: "https://fir-playground-e3a92.firebaseio.com",
  projectId: "fir-playground-e3a92",
  storageBucket: "",
  messagingSenderId: "261070931238"
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();


export {
  db,
  auth,
  
};
