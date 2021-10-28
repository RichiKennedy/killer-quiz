import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

//Add your own config content
const firebaseConfig = {
    apiKey: "AIzaSyAmIkqG14gdj6X5G7lqGnRhexqH9bQoE78",
    authDomain: "quizz-b6106.firebaseapp.com",
    projectId: "quizz-b6106",
    storageBucket: "quizz-b6106.appspot.com",
    messagingSenderId: "320183610957",
    appId: "1:320183610957:web:84331f0dc3cdfe3d227604"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.querySelector("#submitBtn").addEventListener("click", function (e) {
    e.preventDefault();
    var el = document.getElementsByName('answer');
    for(let i = 0; i < el.length; i++) {
        if(el[i].checked){
            console.log(el[i].value);
        }
             
    }
})

//Add to firebase
// async function addName(){
//     var fname = readInput("fname");
//     var lname = readInput("lname");
//     if (!fname && !lname) return null;
//       try {
//         const docRef = await addDoc(collection(db, "names"), {
//           fname: fname,
//           lname: lname
//         });
//         clearInput("fname");
//         clearInput("lname");
//         displayNamesInList("listOfNames");
//       } catch (e) {
//         console.error("Error adding document: ", e);
//       }
//   }