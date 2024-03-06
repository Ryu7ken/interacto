import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyBVxn2EF6a2BnaqZedkZHaFZ_MqBMxudSs",
    authDomain: "interacto-app.firebaseapp.com",
    projectId: "interacto-app",
    storageBucket: "interacto-app.appspot.com",
    messagingSenderId: "407136795331",
    appId: "1:407136795331:web:0a08c2e824e26234638076"
  }).auth();