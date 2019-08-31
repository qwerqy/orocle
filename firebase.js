import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
};

export let anonId = null;

firebase.initializeApp(config);
firebase
  .auth()
  .signInAnonymously()
  .catch(function(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log(errorCode, errorMessage);
  });

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    const isAnonymous = user.isAnonymous;
    const uid = user.uid;

    anonId = uid;
  }
});

export default firebase;

export const database = firebase.firestore();
