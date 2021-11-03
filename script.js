var quizCheck = 0

var quizPage = `
<div class="wrapper">
        <div class="quizContainer">
            <div class="question">
                <strong>Q. Someone accidentally bumps into you on the street, what would be your reaction?</strong>
            </div>
            <div class="quiz" id="options">
                <label class="options">Yell out"What's your problem!?"
                    <input type="radio" name="radio">
                    <span class="checkmark"></span>
                </label>
                <label class="options">Roll your eyes at them
                    <input type="radio" name="radio">
                    <span class="checkmark"></span>
                </label>
                <label class="options">Shove them back
                    <input type="radio" name="radio">
                    <span class="checkmark"></span>
                </label>
                <label class="options">Do nothing
                    <input type="radio" name="radio">
                    <span class="checkmark"></span>
                </label>
            </div>
        </div>
        <div class="btn3">
            <div id="prev">
                <button class="btn btn-primary">Previous</button>
            </div>
            <div class="success">
                <button class="btn btn-success">Next</button>
            </div>
        </div>
    </div>`

function displayModal() {
    document.getElementById("container").innerHTML = quizPage
    if (quizCheck == 1) {
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", "./quiz.css");
       document.getElementsByTagName("head")[0].appendChild(fileref);
       quizCheck = 0;
  }
}