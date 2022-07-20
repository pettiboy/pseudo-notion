import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.js";

export const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firebaseAuth = firebase.auth();
