// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"
import {getFirestore, setDoc, doc} from"https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"
const firebaseConfig = {
  apiKey: "AIzaSyCVFgYXkzM9YUm26dLnuBksP-cACvY5J2U",
  authDomain: "perilix-30fb3.firebaseapp.com",
  projectId: "perilix-30fb3",
  storageBucket: "perilix-30fb3.appspot.com",
  messagingSenderId: "216457747088",
  appId: "1:216457747088:web:bed196325b4ccb8f2b1615",
  measurementId: "G-C2NNTCRBL7"
};

  // Initialize Firebase
// Initialize Firebase
// const app = initializeApp(firebaseConfig);

const loginForm = document.querySelector(".login-form");
    const close = document.querySelector(".close");

const appbt = document.querySelector(".app")
const loginHolder = document.querySelector(".login-holder")


function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
}

const signUp=document.getElementById('submitSignUp');
signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    const userName=document.getElementById('uName').value;
    localStorage.setItem('username', userName);

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
      }


    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)

    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email: email,
            userName: userName
        };
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=> {
            // Store the username in local storage

            localStorage.setItem('username', userName);
            loginForm.classList.remove("move");
            close.style.display = "flex"        })
        .catch((error)=> {
            console.error("error writing document", error);
        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already Exists !!!', 'signUpMessage');
        }
        else{
            showMessage('Unable to create User', 'signUpMessage');
            if (!validateEmail(email)) {
                showMessage("Please enter a valid email address.", 'signUpMessage');
            } 
            if (password.length < 8) {
                showMessage("Password must be at least 8 characters long.", 'signUpMessage');
            }
        }
    });
});

const signIn=document.getElementById('submitSignIn');
signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        showMessage('Login is successful', 'signInMessage');
        const user=userCredential.user;
        const username2 = localStorage.getItem("username"); // Replace this with the actual username retrieval logic
        localStorage.setItem('username', username2);
        localStorage.setItem('loggedInUserId', user.uid);
        appbt.classList.add("show")
        loginHolder.style.transform = "scale(0)"

    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password', 'signInMessage');
        }
        else{
            showMessage('Account does not Exist', 'signInMessage');
        }
    });
});