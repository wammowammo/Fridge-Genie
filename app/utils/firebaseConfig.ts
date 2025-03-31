// app/utils/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCQueJDMXx9YXxUXU5c2sxMv49JVBiyxlw',
  authDomain: 'fridge-genie.firebaseapp.com',
  projectId: 'fridge-genie',
  storageBucket: 'fridge-genie.appspot.com',
  messagingSenderId: '690903486241',
  appId: '1:690903486241:ios:0b291e843e38413666f860',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
