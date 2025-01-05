import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA7Pk7lmNDa1SBsWL0vWfntMhDAXP3fGVA",
  authDomain: "chat-group-9d2bc.firebaseapp.com",
  projectId: "chat-group-9d2bc",
  storageBucket: "chat-group-9d2bc.firebasestorage.app",
  messagingSenderId: "473109718021",
  appId: "1:473109718021:web:b9e1520a3c870696ac286c"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
