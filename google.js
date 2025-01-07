import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCVFgYXkzM9YUm26dLnuBksP-cACvY5J2U",
  authDomain: "perilix-30fb3.firebaseapp.com",
  projectId: "perilix-30fb3",
  storageBucket: "perilix-30fb3",
  messagingSenderId: "216457747088",
  appId: "1:216457747088:web:bed196325b4ccb8f2b1615",
  measurementId: "G-C2NNTCRBL7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-login-btn");
googleLogin.addEventListener("click", () => {
  signInWithPopup(auth, provider)
  .then((result) => {

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    localStorage.getItem("user", user);
    console.log(user);
    window.location.href = "index.html"


  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

})
