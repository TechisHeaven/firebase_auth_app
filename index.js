import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const uid = sessionStorage.getItem("firebase_user_id");

console.log(uid);

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
const firestoredb = getFirestore(app);

const name = document.getElementById("name");
const message = document.getElementById("email");
const show = document.getElementById("show");
const updateBtn = document.getElementById("update");

document.getElementById("contactForm").addEventListener("submit", submitForm);

show.addEventListener("click", showdata);
updateBtn.addEventListener("click", updatedata);

const coldata = document.getElementById("coldata");
const logincol = document.getElementById("logincol");

if (!uid == null) {
  coldata.classList.remove("d-none");
  logincol.classList.add("d-none");
}
if (uid == null) {
  coldata.classList.add("d-none");
  logincol.classList.remove("d-none");
}

// get data from Firebase
function showdata(e) {
  e.preventDefault();
  console.log("function call");
  const dbref = ref(db);

  // get(child(dbref, "users/" + name.value))
  get(child(dbref, "users/" + uid))
    .then((snapshot) => {
      if (name.value.length > 0 && message.value.length > 0) {
        if (snapshot.exists()) {
          console.log(snapshot.val().Name + " " + snapshot.val().Message);
          document.getElementById("contactForm").reset();
        } else {
          alert("no data exist");
        }
      } else {
        alert("Fill name or email pls");
      }
    })
    .catch((err) => {
      alert("unsuccessful data" + err);
    });
}

const submitbtn = document.getElementById("registerBtn");

let date = new Date();
let time = date.getTime();
let counter = time;

function getCurrentURL() {
  return window.location.href;
}

console.log(getCurrentURL())

if (getCurrentURL() == 'http://127.0.0.1:5500/register.html'){
  submitbtn.addEventListener("click", submitForm);
}

// put or create data from Firebase
function submitForm(e) {
  e.preventDefault();
  let dat = new Date();

  if (name.value.length > 0 && message.value.length > 0) {
    let sliceuid = uid.split('"').join("");
    const idcount = parseInt(Math.random() * 1000000000, 5);
    let id = counter + idcount;

    setDoc(doc(firestoredb, "users", `${sliceuid}`, "messages", `${id}`), {
      Id: id,
      Name: name.value,
      Message: message.value,
      info: "datasaved",
      ast_date: dat,
    })
      .then((res) => {
        alert("data stored sucessfully");
        document.getElementById("contactForm").reset();
      })
      .catch((err) => {
        alert("data not stored");
      });
  } else {
    alert("Fill name or email pls");
  }
}

function updatedata(e) {
  e.preventDefault();
  console.log("function call");
  let dat = new Date();
  update(ref(db, "users/" + uid), {
    Name: name.value,
    Message: message.value,
    info: "dataUpdated",
    last_date: dat,
  })
    .then(() => {
      alert("Data updated successfully");
      document.getElementById("contactForm").reset();
    })
    .catch((err) => {
      alert("unsuccessful data update" + err);
    });
}
const auth = getAuth(app);

logoutuser.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      alert("Logged out successfully");
      window.location.replace("login.html");
    })
    .catch((error) => {
      alert("Error : " + error);
    });
});







const contextmenu = document.getElementsByClassName("contextmenu");
const closeContextbtn1 = document.getElementById("closeContextbtn1");

function showloader() {
  loader.classList.remove("d-none");
  loader.classList.add("d-flex");
  coldata.classList.remove("d-flex");
  coldata.classList.add("d-none");

  const timeout = setTimeout(addClass, 3000);
  const timeout2 = setTimeout(addClass2, 4000);
  
  context.classList.add("active");
  function addClass() {
    context.classList.add("trans");
  }

  function addClass2() {
    context.classList.remove("active");
    context.classList.remove("trans");
  }
  closeContextbtn1.addEventListener("click", function () {
    clearTimeout(timeout, timeout2);
    context.classList.remove("active");
    context.classList.remove("trans");
  });
}

function hideloader() {
  loader.classList.remove("d-flex");
  loader.classList.add("d-none");
  coldata.classList.add("d-flex");
  coldata.classList.remove("d-none");
  

  const timeout = setTimeout(addClass, 3000);
  const timeout2 = setTimeout(addClass2, 4000);

  context.classList.add("active");
  function addClass() {
    context.classList.add("trans");
  }

  function addClass2() {
    context.classList.remove("active");
    context.classList.remove("trans");
  }
  closeContextbtn1.addEventListener("click", function () {
    clearTimeout(timeout, timeout2);
    context.classList.remove("active");
    context.classList.remove("trans");
  });
}
