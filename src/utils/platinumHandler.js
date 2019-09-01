import Firebase from '../../firebase';

let anonId = null;
let database = null;

if (typeof window !== 'undefined') {
  Firebase.auth.signInAnonymously().catch(function(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log(errorCode, errorMessage);
  });

  Firebase.auth.onAuthStateChanged(function(user) {
    if (user) {
      const uid = user.uid;

      anonId = uid;
    }
  });

  database = Firebase.firestore;
}

export const getPlatAmount = async bid => {
  if (database) {
    const amount = await database.collection(bid).get();
    return amount.size;
  }

  return 0;
};

export const addPlat = bid => {
  if (anonId) {
    database
      .collection(bid)
      .doc(anonId)
      .set({});
  }
};
