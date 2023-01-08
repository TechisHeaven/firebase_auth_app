import {
  getDatabase,
  ref,
  set,
  get,
  child,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

import showdata from "./index.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRf3sxviP4ToOVHI09JJ92S2KqeXR22zw",
  authDomain: "js-test-app-efb02.firebaseapp.com",
  databaseURL: "https://js-test-app-efb02-default-rtdb.firebaseio.com",
  projectId: "js-test-app-efb02",
  storageBucket: "js-test-app-efb02.appspot.com",
  messagingSenderId: "977248300793",
  appId: "1:977248300793:web:0deb7d3299be4da9493c28",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase();
console.log(db);

let createUserbtn = document.getElementById("registerBtn");

let loginbutton = document.getElementById("loginbtn");
// let logoutbtn = document.getElementById("logoutbtn");

const auth = getAuth();

// loginbutton = addEventListener("submit", loginuser);
// logoutbtn = addEventListener("submit", Logoutuser);

if (loginbutton) {
  loginbutton.addEventListener("click", loginuser);
}

const user = auth.currentUser;

function getCurrentURL() {
  return window.location.href;
}
onAuthStateChanged(auth, (user) => {
  console.log(user);
  if (user) {
    showdata();

    const dbRef = ref(getDatabase());
    get(child(dbRef, `loginuser/${user.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          username.innerHTML = snapshot.val().UserName;
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    let uidexpo = JSON.stringify(uid);

    sessionStorage.setItem("firebase_user_id", uidexpo);

    console.log("user logged in ");
    if (!getCurrentURL() == "http://127.0.0.1:5500/index.html") {
      window.location.href = "index.html";
    }
    // no need because of by default firebase rule
    if (getCurrentURL() == "http://127.0.0.1:5500/login.html") {
      window.location.href = "index.html";
    }
    if (getCurrentURL() == "http://127.0.0.1:5500/register.html") {
      // window.location.href = "index.html";
      window.location.href = "index.html";
    }
    // ...
  } else {
    sessionStorage.removeItem("firebase_user_id");
    console.log(getCurrentURL());
    // User is signed out
    if (!getCurrentURL() == "http://127.0.0.1:5500/login.html") {
      window.location.replace("login.html");
    }
    // ...
  }
});

const regfullname = document.getElementById("regfullname");
const email = document.getElementById("regemail");
const password = document.getElementById("regpassword");

if (getCurrentURL() == "http://127.0.0.1:5500/register.html") {
  createUserbtn = addEventListener("submit", createUser);

  function createUser(e) {
    e.preventDefault();
    console.log("create user");
    console.log("clicked");

    // Create new user ---------------------------------
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;

        await set(ref(db, "loginuser/" + user.uid), {
          UserName: regfullname.value,
          UserEmail: email.value,
        });

        document.getElementById("contactForm").reset();
        alert("User created successfully");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  }
}

// login & sign in user ---------------------------------
async function loginuser(e) {
  const email = document.getElementById("logemail").value;
  const password = document.getElementById("logpassword").value;
  // console.log(email, password);

  e.preventDefault();
  console.log("clicked login btn");

  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const dt = new Date();
      console.log(dt);
      update(ref(db, "loginuser/" + user.uid), {
        last_login: dt,
      });
      alert("User Logged in successfully");
      window.location.href = "index.html";
      console.log("User Logged in successfully");
      document.getElementById("contactForm").reset();
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == "auth/wrong-password") {
        alert("Invalid password");
      }
      if (errorCode == "auth/user-not-found") {
        alert("User not found");
      }
      if (condition) {
      }
      alert(errorCode);

      // alert(errorMessage);
      // ..
    });
}
