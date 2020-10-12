import firebase from 'firebase/app'
import 'firebase/firestore'
import dbOptions from './db-options';

// Get a Firestore instance
export const db = firebase
  .initializeApp(dbOptions)
  .firestore();

