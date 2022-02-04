import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

import FIREBASE_CONFIG_INFO from "./firebaseEnv";

const firebaseConfig = {
  apiKey: FIREBASE_CONFIG_INFO.apiKey,
  authDomain: FIREBASE_CONFIG_INFO.authDomain,
  projectId: FIREBASE_CONFIG_INFO.projectId,
  storageBucket: FIREBASE_CONFIG_INFO.storageBucket,
  messagingSenderId: FIREBASE_CONFIG_INFO.messagingSenderId,
  appId: FIREBASE_CONFIG_INFO.appId,
  measurementId: FIREBASE_CONFIG_INFO.measurementId,
};

const app = initializeApp(firebaseConfig);

export const authenication = getAuth(app);
