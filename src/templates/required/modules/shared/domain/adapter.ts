import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export function collectionResponseAdapter<T>(
  response: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
) {
  return response.docs.map<T>((doc) => ({ ...doc.data(), id: doc.id } as T));
}
