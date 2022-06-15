import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxoLZKBD3h7kxalRME6FItozfNiMHhtYM",
  authDomain: "homely-services.firebaseapp.com",
  projectId: "homely-services",
  storageBucket: "homely-services.appspot.com",
  messagingSenderId: "273823942445",
  appId: "1:273823942445:web:a5a779870bafc12e91b5a4",
  measurementId: "G-CKQYKWT30B",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//init services
const auth = firebase.auth();

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

//  export vars
export { auth, firebase };
