// first page with a button in the center and a description of the quizz
// fetch data from json file using an async/await function
// make function2 that uses the data we get from JSON;  so make a function where you can access from within this function the data we got in our previous function
//function2 should now access question and its answers of any object in our JSON array example data[0].question or data[0].answers[3]
// inside function2 we should be able to change the innerHTML of our question/answer field  with the previously accessed data
//the submit button of the form should be labled Next and trigger the next question and answers to be populated
//hardcode points to our answers example annswer1=1p;annswer2=2p;annswer3=3p; then create a variable that keeps score. how? maybe use an if clause // if answer that is checked has a class of answer1 add 1p to the score
//*create result categories and check score to see which category our score fits into
//when we finish answering our questions(get to our last question) have our form disapear and have instead a section with an input field and a show results button
//store user input and score in firebase
//when we click on show results it our previous section disapears and we now show a header paragraph and image with text and image based on the category our score is in


//on click of the button we get sent to our form
const startBtn = document.querySelector(".startBtn");
const firstPage= document.querySelector(".first-page");
const secondPage= document.querySelector(".page-two");

startBtn.addEventListener("click", ()=>{
    firstPage.classList.toggle("disabled");
    secondPage.classList.toggle("button-active");
});

// fetch data from json file
async function getQuizData() {
    try {
      let response = await fetch("./db.json");
      let quizData = await response.json();
      return quizData;
      
      
    } catch (error) {
      console.log("error :", error);
    }
}

// make function that uses data we get from JSON and adds question and its answers to the form (for)
async function assignQandA(){
    let quizData= await getQuizData();

    let index = 0;
    
    //assign first q and answers
    document.querySelector(".question").innerHTML=quizData[index].question;
    document.querySelector(".answer1").innerHTML=quizData[index].answers[0];
    document.querySelector(".answer2").innerHTML=quizData[index].answers[1];
    document.querySelector(".answer3").innerHTML=quizData[index].answers[2];
    document.querySelector(".answer4").innerHTML=quizData[index].answers[3]; // this works

    // assign next q and answers on the press of next
    nextButton(index, quizData);  

}

assignQandA();

// f that stores which answer the user selected
 function nextButton(index, quizData){
    document.querySelector("#nextBtn").addEventListener("click", (e) =>{
        e.preventDefault(); // prevents form from redfreshing (default action)
        
        if(index<10){
            index++;

            document.querySelector(".question").innerHTML= quizData[index].question;
            document.querySelector(".answer1").innerText=quizData[index].answers[0];
            document.querySelector(".answer2").innerHTML=quizData[index].answers[1];
            document.querySelector(".answer3").innerHTML=quizData[index].answers[2];
            document.querySelector(".answer4").innerHTML=quizData[index].answers[3];
           
            if(index == 9){ 
                
                checkAnswer();
                //when it gets to Q10 change btn to submit not next and add input here
                //we can press it once to check answer and record score but after that we should disable next btn, add name input field and show results btn

                document.querySelector("#nextBtn").innerHTML="Submit"; 
                document.querySelector("#nextBtn").classList.add("disabled");
                document.querySelector(".inputName").classList.remove("disabled");
                document.querySelector("#resultBtn").classList.remove("disabled");
                
            }
        
        };
        
        // if we get to Q10 change the next btn to show reuslt and add an input field for name above it
        
        checkAnswer();

        // store score and input name in firebase
    });
};

let score= 0;
function checkAnswer(){
    
        let elements = document.getElementsByName('answer'); 
        // select from our html all elements where our answer is stored in an array
        for(let i = 0; i < elements.length; i++) { // go through each answer element
            
            // check that there is a radio btn checked before, no null enters
             if(elements[i].checked){ // check if elem has its radio button checked
                if (elements[i].id== "a1"){ // if radio button with id of a1 is checked then:
                     score += 1; // add 1p to our score
                     elements[i].checked = false;
                     console.log("answer 1 selected, score= 1p");
                     console.log(score);
                }else if(elements[i].id== "a2"){
                    score += 2;
                    elements[i].checked = false;
                    console.log("answer 2 selected, score= 2p");
                    console.log(score);
                    
                }else if(elements[i].id== "a3"){
                    score += 3;
                    elements[i].checked = false;
                    console.log("answer 3 selected, score= 3p");
                    console.log(score);
                    
                }else {
                    score += 4;
                    elements[i].checked = false;
                    console.log("answer 4 selected, score= 4p"); 
                    console.log(score);
                    
                }
                
                
            }//else alert("please select a ")
             
          
                     
        }
}

//firebase config stuff

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
  query, 
  orderBy, 
  limit
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

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

// end firebase config stuff

async function storeInDb(name, score){
    if ( !userInput.value && !score) return null;
      try {
        const docRef = await addDoc(collection(db, "scores"), {   
            name: name,
            score: score
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
};


let userInput = document.querySelector("#name");

// on click of show results the user name input and the score  will be stored in firebase and then our form is disabled and our result box is enabled where based on the score we get 1 of 4 results
async function showResults(){
    
    document.querySelector("#resultBtn").addEventListener("click", (e)=>{
        e.preventDefault();      
        storeInDb(userInput.value, score);
        document.querySelector(".quizzForm").classList.add("disabled");
        document.querySelector(".resultContainer").classList.remove("disabled");
        // here show answer box based on score no
        showResultCategory(score);
        // here we can have our btn for our lederboard
        // getScores();
    });
}
showResults();

let resultCategories =[
    {
        img: "./img/1.gif", 
        title: "Norman Bates",
        description: "You're kind and thoughtfull , but everyone has it's limits. you're always one bad day away from stabbing your mom and wearing her clothes around the house. Advice? try meditation."
    },
    {
        img: "./img/2.gif", 
        title: "Jeffrey Dahmer",
        description: "You are a natural introvert and enjoy many hobbies but go through a bad breakup or get drunkenly rejected and you too can start your very own collection of pickled people."
    },
    {
        img: "./img/3.gif", 
        title: "Charles Manson",
        description: "You are the life of the party, charming and with a great sense of humour, but if your ego goes unchecked you're one friend away from starting your own death cult."
    },
    {
        img: "./img/4.gif", 
        title: "Patrick Bateman",
        description: "You are ambitous, charming and take great pride in your apearance but if you don't learn to take yourself less seriously you're one poorly chosen font style away from giving your work mate an axe haircut."
    }
];

// grab all the fields of the result box we show at the end

const resultImg= document.querySelector(".img");
const resultHeader= document.querySelector(".resultHeader");
const resultParagraph= document.querySelector(".resultParagraph");


// this function checks our score and places our result in one of 4 categories, then lists a custom response box in the browser

function showResultCategory(score) {
    if( score > 0 && score <= 10){
        resultImg.innerHTML=`<img src="./img/1.gif" alt="">`;
        resultHeader.innerHTML = resultCategories[0].title;
        resultParagraph.innerHTML = resultCategories[0].description;
        
    }else if( score > 10 && score <= 20){
        resultImg.innerHTML=`<img src="./img/2.gif" alt="">`;
        resultHeader.innerHTML = resultCategories[1].title;
        resultParagraph.innerHTML = resultCategories[1].description;
        
    }else if( score > 20 && score <= 30){
        resultImg.innerHTML=`<img src="./img/3.gif" alt="">`;
        resultHeader.innerHTML = resultCategories[2].title;
        resultParagraph.innerHTML = resultCategories[2].description;
        
    }else if( score > 10 && score <= 40){
        resultImg.innerHTML=`<img src="./img/4.gif" alt="">`;
        resultHeader.innerHTML = resultCategories[3].title;
        resultParagraph.innerHTML = resultCategories[3].description;
        };
}

//Get all score/usernames from firebase then populate leaderboard field
let leaderboardList = document.querySelector(".leaderboard-list");

// const q = query(scores, orderBy("score"), limit(3));

async function getScores() {
    const querySnapshot = await getDocs(collection(db, "scores"));
     querySnapshot.forEach((doc) => {
     leaderboardList.innerHTML += `<li class="leaderboard-list-item"> ${doc.data().name} &nbsp &nbsp ${doc.data().score}</li>`
     console.log(doc.id, " => ", doc.data());
     });
};

getScores();


// grab the leaderboard button and on click display scores from previous users taken from firebase

var modal = document.querySelector("#leaderboardModal");
let leaderboardBtn = document.querySelector(".leaderboardBtn");
var span = document.getElementsByClassName("close")[0];


leaderboardBtn.addEventListener("click", () =>{
    modal.style.display = "block";
    
});


span.onclick = function() {
    modal.style.display = "none";
  }


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}