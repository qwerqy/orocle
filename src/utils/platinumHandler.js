import { database, anonId } from '../../firebase';

export const getPlatAmount = async bid => {
  const amount = await database.collection(bid).get();

  return amount.size;
};

export const addPlat = bid => {
  database
    .collection(bid)
    .doc(anonId)
    .set({});
};
