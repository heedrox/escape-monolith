import { getGameCode } from './get-game-code';
import { db } from '../config/db';

const FIREBASE_URL = `/game-states/${getGameCode()}`;

const firebaseUtil = {
  doc: (path) => db.doc(`${FIREBASE_URL}${path}`)
};

export default firebaseUtil;
