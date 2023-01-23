let clearBtn = document.getElementById("clear"); // clear score button

function displayScores() {
  let savedHighscores = JSON.parse(
    window.localStorage.getItem("savedHighscores")
  ); // get array or create empty array
  savedHighscores.sort(function (a, b) {
    // sort scores from high to low
    return b.score - a.score;
  });

  savedHighscores.forEach(function (score) {
    let scoreLi = document.createElement("li");
    // create a new list item for each object in the array
    scoreLi.textContent = score.initials + " - " + score.score;
    // apply text to the new list items

    let scoreOl = document.getElementById("highscores");
    // creat variable for the ordered list in html
    scoreOl.appendChild(scoreLi);
    // add list items to ordered list
  });
}

// clear list on click
function clearScores() {
  window.localStorage.removeItem("savedHighscores");
  // removed saved scores in local storage
  window.location.reload();
  // reload the highscores page
}

// clear scores from local storage with button
clearBtn.addEventListener("click", clearScores);

displayScores();
// run function when page loads
