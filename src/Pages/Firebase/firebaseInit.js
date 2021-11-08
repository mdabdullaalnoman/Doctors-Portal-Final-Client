// Import the functions you need from the SDKs you need
import  initializeApp  from "firebase/app";
import firebaseConfig from "./firebaseConfig";

const firebaseInitialize = () => {
    initializeApp(firebaseConfig);
}

export default firebaseInitialize;
