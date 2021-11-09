//WATCH FOR THE CLICK OF THE BUTTON
document.querySelector(".bloody-click").addEventListener('click', getBlood);

// VARIABLE TO MAKE POSSIBLE NOT REPEATING THE BLOOD SPLASHES
let splashesUsed = [];

//FUNCTION TO CHOSE A RANDOM BLOOD SPLASH THAT HAVEN'T BEEN DISPLAYED BEFORE
function getBlood () {
    if (splashesUsed.length == 3) {
        splashesUsed.shift();
        splashesUsed.shift();
    }

    let randomNumber = Math.floor(Math.random() * 3);

    while (splashesUsed.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * 3);
        }

        let chosenNumber = randomNumber;

        if (chosenNumber === 0) {
            Blood1();
        } else if (chosenNumber === 1) {
            Blood2();
        } else if (chosenNumber === 2) {
            Blood3();
        }

        splashesUsed.push(chosenNumber);
        console.log(splashesUsed);
        
    }


//GETTING THE SPLASH OF BLOOD 1
function Blood1 () {
    document.querySelector(".blood-splash-1").classList.toggle("blood-splash-1-active");
    document.getElementById("blood-splash-1-path-a").classList.add("splash-1-a-dripping");
    document.getElementById("blood-splash-1-path-b").classList.add("splash-1-b-dripping");
    document.querySelector(".blood-splash-1").addEventListener('animationend', cleanBlood1);
}

//MAKING THE SPLASH OF BLOOD 1 FADEOUT
function cleanBlood1 () {
    document.querySelector(".blood-splash-1").classList.remove('blood-splash-1-active');
    document.getElementById("blood-splash-1-path-a").classList.remove('splash-1-a-dripping');
    document.getElementById("blood-splash-1-path-b").classList.remove('splash-1-b-dripping');
    
}

//GETTING THE SPLASH OF BLOOD 2
function Blood2 () {
    document.querySelector(".blood-splash-2").classList.toggle("blood-splash-2-active");
    document.getElementById("blood-splash-2-path").classList.add("splash-2-dripping");
    document.querySelector(".blood-splash-2").addEventListener('animationend', cleanBlood2);
}

//MAKING THE SPLASH OF BLOOD 2 FADEOUT
function cleanBlood2 () {
    document.querySelector(".blood-splash-2").classList.remove('blood-splash-2-active');
    document.getElementById("blood-splash-2-path").classList.remove('splash-2-dripping');
}

//GETTING THE SPLASH OF BLOOD 3
function Blood3 () {
    document.querySelector(".blood-splash-3").classList.toggle("blood-splash-3-active");
    document.getElementById("blood-splash-3-path").classList.add("splash-3-dripping");
    document.querySelector(".blood-splash-3").addEventListener('animationend', cleanBlood3);
}

//MAKING THE SPLASH OF BLOOD 3 FADEOUT
function cleanBlood3 () {
    document.querySelector(".blood-splash-3").classList.remove('blood-splash-3-active');
    document.getElementById("blood-splash-3-path").classList.remove('splash-3-dripping');
}