import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBf61n5nrQMtrVSjsrZ6GANT55i5KhGZuk",
    authDomain: "tutormatch-e2a6a.firebaseapp.com",
    projectId: "tutormatch-e2a6a",
    storageBucket: "tutormatch-e2a6a.appspot.com",
    messagingSenderId: "1093519747391",
    appId: "1:1093519747391:web:9545559e8d838531cccb8a",
    measurementId: "G-3GWQ8WYYL0"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }