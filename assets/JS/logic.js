let timeEl = document.getElementById("time"); // Timer display
let start = document.getElementById("start"); // Start button
let startScreen = document.getElementById("start-screen"); // Quiz title screen
let questionEl = document.getElementById("questions"); // Question screen
let questionTitle = document.getElementById("question-title"); // Question title
let answersEl = document.getElementById("choices"); // Coices display
let endScreen = document.getElementById("end-screen"); // End screen display
let feedbackEl = document.getElementById("feedback"); // section for question feedback
let finalScoreEl = document.getElementById("final-score"); // Displays final score
let initialsEl = document.getElementById("initials"); // Form where user enters initials for their score
let submitBtn = document.getElementById("submit"); // Button to save score after initials are entered
let score = 0; // Score recorder
let finalScore; // result of the current game
let userScore; // the object containing the score and the initials for the user

let secondsLeft = questions.length * 10; // Total time at start of quiz
timeEl.textContent = secondsLeft; // Display the timer
let timerInterval;

// function for running the game
function startGame() {
  startTimer();
  startQuestions();
  displayQuestions();
}

// function for timer
function startTimer() {
  timerInterval = setInterval(function () {
    secondsLeft--;
    // minus 1 from the displayed time every second
    timeEl.textContent = secondsLeft;
    // display the amount of time left

    if (secondsLeft === 0) {
      endGame();
      // trigger end game function when timer reaches 0
    }
  }, 1000);
}

// Hide starting title screen / Show question div
function startQuestions() {
  startScreen.classList.add("hide");
  // hide title screen
  questionEl.classList.remove("hide");
  // show question screen
}

let currentQuestionIndex = 0;

// Display question and answers
function displayQuestions() {
  let currentQuestion = questions[currentQuestionIndex];
  questionTitle.textContent = currentQuestion.question;
  // get question title from object in array and display it

  answersEl.innerHTML = "";
  // clear answers from previous question

  currentQuestion.choices.forEach(function (choice, i) {
    let choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("value", choice);
    choiceBtn.textContent = i + 1 + ". " + choice;
    choiceBtn.onclick = checkAnswer;
    answersEl.appendChild(choiceBtn);
  });
}

// Check answer and start next question
function checkAnswer() {
  if (this.value === questions[currentQuestionIndex].answer) {
    secondsLeft += 5;
    score += +5;
    timeEl.textContent = secondsLeft;
    // if answer is correct apply the above rewards to time and score
  } else {
    secondsLeft -= 5;
    score -= 5;
    timeEl.textContent = secondsLeft;
    // if answer is wrong apply the above punishments to time and score
  }

  if (secondsLeft < 0) {
    secondsLeft = 0;
    // If time goes below 0 force end of game
  }
  currentQuestionIndex++;
  // add 1 to question index to bring next question
  if (currentQuestionIndex === questions.length) {
    // check if there are any question left in the array
    endGame();
    // if no questions remain end the quiz
  } else {
    displayQuestions();
    // if there are question remaining, display next question
  }
}

function endGame() {
  clearInterval(timerInterval); // clear timer
  questionEl.classList.add("hide"); // hide the question screen
  endScreen.classList.remove("hide"); // show the end screen
  finalScore = score + secondsLeft; // calculate final score
  finalScoreEl.textContent = finalScore; // add final score to display on screen
}

function saveScore() {
  let initials = initialsEl.value;
  // save users initials as a variable

  if (!initials) {
    alert("Please enter your initials");
    // If no initials are entered alert user to enter them
    return;
  } else {
    let savedHighscores =
      JSON.parse(window.localStorage.getItem("savedHighscores")) || [];
    // If initials are entered get/create array for user scores

    userScore = {
      // create new object with initals and score
      initials: initials,
      score: finalScore,
    };

    savedHighscores.push(userScore);
    // add the new score to the array of objects
    window.localStorage.setItem(
      "savedHighscores",
      JSON.stringify(savedHighscores)
      // turn the array into a string for local storage
    );

    window.location.href = "highscores.html";
    // auto navigate to the highscore list
  }
}

// start game
start.addEventListener("click", startGame);

// trigger save with submit button
submitBtn.addEventListener("click", saveScore);
