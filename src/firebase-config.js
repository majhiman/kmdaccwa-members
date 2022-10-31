import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDwmMlfgLEHPAgGNbzFgV0ZU9E_VhiyvaY",
    authDomain: "kmdaccwa-10652.firebaseapp.com",
    databaseURL: "https://kmdaccwa-10652-default-rtdb.firebaseio.com",
    projectId: "kmdaccwa-10652",
    storageBucket: "kmdaccwa-10652.appspot.com",
    messagingSenderId: "406107197633",
    appId: "1:406107197633:web:098c0f32fc08fee50f0440",
    measurementId: "G-XR8L57KKNC"
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);
  export const storage = getStorage(app);