import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
};
class Firebase {
  constructor() {
    if (typeof window !== 'undefined') {
      firebase.initializeApp(config);
      this.auth = firebase.auth();
      this.firestore = firebase.firestore();
    }
  }
}

export default new Firebase();
