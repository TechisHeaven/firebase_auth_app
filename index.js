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
  updateDoc,
  deleteDoc,
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

if (uid == "") {
  coldata.classList.add("d-none");
  // logincol.classList.remove("d-none");
  logincol.style.display = "flex";
  // sessionStorage.removeItem('firebase_user_id');
} else {
  coldata.classList.remove("d-none");
  // logincol.classList.add("d-none");
  logincol.style.display = "none";
}

let data = document.getElementById("data");

// get data from Firebase
async function showdata() {
  const listul = document.getElementById("MyUl");
  let sliceuid = uid.split('"').join("");
  const idcount = parseInt(Math.random() * 1000000000, 5);
  let id = counter + idcount;

  if (!listul.innerHTML == "") {
    listul.innerHTML = "";
    const docSnap = await getDocs(
      collection(firestoredb, "users", `${sliceuid}`, "messages")
    );
    docSnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      let ele = document.createElement("li");
      let el = `<p class="dataId"> Id :${doc.data().Id}&nbsp</p>
      <p> Name : ${doc.data().Name}&nbsp</p>
      <p> Message : ${doc.data().Message}&nbsp</p>
      <button type="submit" onclick="{click}" class="removebtn" class="btn btn-dark" style="margin: 15px; ">
      Remove
      </button>
      `;

      ele.innerHTML = el;
      document.getElementById("MyUl").appendChild(ele);
    });
    indexget()
  } else {
    console.log("function call");
    const docSnap = await getDocs(
      collection(firestoredb, "users", `${sliceuid}`, "messages")
    );
    docSnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      let ele = document.createElement("li");
      let el = `<p class="dataId"> Id :${doc.data().Id}&nbsp</p>
        <p> Name : ${doc.data().Name}&nbsp</p>
        <p> Message : ${doc.data().Message}&nbsp</p>
        <button type="submit" onclick={removeData} class="removebtn" class="btn btn-dark" style="margin-left: 15px; ">
        Remove
        </button>
        `;
      ele.innerHTML = el;
      document.getElementById("MyUl").appendChild(ele);
    });
  }
}


const submitbtn = document.getElementById("registerBtn");
let date = new Date();
let time = date.getTime();
let counter = time;
function getCurrentURL() {
  return window.location.href;
}
console.log(getCurrentURL());

if (getCurrentURL() == "http://127.0.0.1:5500/register.html") {
  submitbtn.addEventListener("click", submitForm);
}

// put or create data from Firebase
function submitForm(e) {
  e.preventDefault();
  if (name.value.length > 0 && message.value.length > 0) {
    const sliceuid = uid.split('"').join("");
    let idcount = parseInt(Math.random() * 1000000000, 10);
    let date = new Date();
    let time = date.getTime();

    if (!idcount == NaN) {
      idcount = (Math.random() * 1000000000, 5);
    }
    const id = time + idcount;

    setDoc(doc(firestoredb, "users", `${sliceuid}`, "messages", `${id}`), {
      Id: id,
      Name: name.value,
      Message: message.value,
      info: "datasaved",
      last_date: date,
    })
      .then((res) => {
        alert("data stored sucessfully");
        showdata();
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
  let sliceuid = uid.split('"').join("");
  const idcount = parseInt(Math.random() * 1000000000, 5);
  let id = counter + idcount;
  let updateid = id;
  e.preventDefault();
  console.log("function call");
  let dat = new Date();
  updateDoc(
    doc(firestoredb, "users", `${sliceuid}`, "messages", `${updateid}`),
    {
      Id: id,
      Name: name.value,
      Message: message.value,
      info: "data Update",
      last_date: dat,
    }
  )
    .then(() => {
      alert("Data updated successfully");
      document.getElementById("contactForm").reset();
    })
    .catch((err) => {
      alert("unsuccessful data update" + err);
    });
}

// remove functionality from here---------------------------------------------

function indexget(){
  setTimeout(() => {
    console.log("indexget fun call")
    const listitemul = document.getElementById("MyUl");
    
    const removebtn = document.getElementsByClassName("removebtn");
    
    // console.log(matches[0]);
    // console.log(removebtn);
  // console.log(listitemul.children.length)
    // for (let ie = 0; ie < listitemul.children.length; ie++) {
    //   removebtn[ie].addEventListener('click',removeData)
    //   console.log(listitemul.children);
    // }
  
    const items = Array.from(document.getElementsByClassName("removebtn"));
  
    // add click event listener for each collection item
    items.forEach( ( button, index ) =>
    {
        button.addEventListener("click", () =>
        {
           removeData(index)
        });
    });
  
  
  }, 2000);
}







function removeData(e) {
  console.log(e);
  const dataId = document.getElementsByClassName('dataId')[e].innerHTML;
  let matches = dataId.match(/(\d+)/);
  console.log(matches[0]);
  let id = matches[0];
  let sliceuid = uid.split('"').join("");

  event.preventDefault();
  console.log("function call");
  let dat = new Date();
  deleteDoc(doc(firestoredb, "users", `${sliceuid}`, "messages", id))
    .then(() => {
      alert("Data removed successfully");
      showdata();
      document.getElementById("contactForm").reset();
    })
    .catch((err) => {
      alert("data didn't remove");
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

// for css you can be ignore this one

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

export default showdata;
