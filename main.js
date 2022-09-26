let slide = document.querySelector(".slide");
let menu = document.querySelector(".menu");
let minutes = document.querySelector("span.minutes");
let seconds = document.querySelector("span.seconds");
let got = document.querySelector(".got");
let total = document.querySelector(".total");
let upcomingWords = document.querySelector(".upcoming-words");
let currentWord = document.querySelector(".current");
let finish = document.querySelector(".finish");
localStorage.removeItem("count");
slide.onclick = function () {
  if (menu.classList == "menu hidden") {
    menu.classList = "menu shown";
    menu.style.cssText = "left:0";
    this.innerHTML = "<";
  } else {
    menu.classList = "menu hidden";
    menu.style.cssText = "left:-204px";
    this.innerHTML = ">";
  }
};
let levels = document.querySelector("select");
let options = document.querySelectorAll("option");
window.onload = function () {
  addLevel();
  timeChecker();
  changeDescription();
};
function addLevel() {
  if (!localStorage.getItem("level")) {
    localStorage.setItem("level", levels.value);
    console.log(levels.value);
  } else {
    changeLevel();
  }
}
function changeLevel() {
  options.forEach((op) => {
    if (op.value == localStorage.getItem("level")) {
      op.setAttribute("selected", "");
      localStorage.setItem("level", levels.value);
    } else {
      op.classList = "";
      op.removeAttribute("selected");
    }
  });
}
levels.onchange = function () {
  changeLevel();
  changeDescription();
  localStorage.removeItem("count");

  location.reload();
};
let input = document.querySelector("input");
let start = document.querySelector("button");
input.onpaste = function () {
  return false;
};
let wordsArray = [
  "Facebook",
  "Programming",
  "Destructuring",
  "Algorithm",
  "Propaganda",
  "Always",
  "Each",
  "Before",
  "After",
  "Content",
  "Math",
  "Physics",
  "This",
  "That",
  "America",
  "Achieve",
  "Lebanon",
  "Lebanese",
  "American",
  "Play",
  "Hello",
  "By",
  "Coffe",
  "Tea",
  "Water",
  "Pepsi",
  "Cola",
  "7Up",
  "Mirenda",
  "Ships",
  "Potato",
  "University",
  "School",
  "Then",
  "What",
  "Laptop",
  "Finger",
  "Hand",
  "Leg",
  "Face",
  "Head",
  "Eyes",
  "Nails",
  "Hammer",
  "Car",
  "Ferrari",
  "BMW",
];
let descriptionArray = [
  "On this level,lowercase letters and uppercase letter doesn't matter,you just need to write the words correctly.\nYou have 1 minute.",
  "On this level,lowercase letters and uppercase letter does matter,\nYou have 1 minute.",
  "On this level,lowercase letters and uppercase letter does matter,\nYou have 30 seconds.",
];
function changeDescription() {
  let desc = document.querySelector(".description");
  switch (localStorage.getItem("level")) {
    case "Easy":
      desc.innerHTML = descriptionArray[0];
      break;
    case "Normal":
      desc.innerHTML = descriptionArray[1];
      break;
    case "Hard":
      desc.innerHTML = descriptionArray[2];
  }
}
function levelChecker() {
  let temp = [];
  if (localStorage.getItem("level") == "Hard") {
    for (let i = 0; i < wordsArray.length; i++)
      if (wordsArray[i].length > 5) temp.push(wordsArray[i]);
    wordsArray = temp;
  }
  console.log(temp);
}
function generateWords() {
  let word = wordsArray[Math.floor(Math.random() * wordsArray.length)];
  levelChecker();
  if (count() == 0) total.innerHTML = wordsArray.length;
  console.log(wordsArray.length);
  let index = wordsArray.indexOf(word);
  currentWord.innerHTML = word;
  upcomingWords.innerHTML = "";
  wordsArray.splice(index, 1);
  for (let i = 0; i < wordsArray.length; i++) {
    let span = document.createElement("span");
    span.innerHTML = wordsArray[i];
    upcomingWords.append(span);
  }

  console.log(wordsArray);
  startPlay();
}
function count() {
  if (!localStorage.getItem("count")) localStorage.setItem("count", 0);
  else {
    localStorage.setItem("count", 1);
  }
  return localStorage.getItem("count");
}
function timeChecker() {
  if (localStorage.getItem("level") == "Hard") {
    minutes.innerHTML = 00;
    seconds.innerHTML = 30;
  } else {
    minutes.innerHTML = 1;
    seconds.innerHTML = "00";
  }
}
function startPlay() {
  console.log(wordsArray.length);
  if (wordsArray.length == 0) {
    endGame();
  } else if (input.value.endsWith(" ")) {
    wordChecker();
    input.value = "";
    generateWords();
  }
}
function timer() {
  let interval = setInterval(() => {
    if (+minutes.innerHTML == 0 && +seconds.innerHTML == 0) {
      clearInterval(interval);
      endGame();
    } else {
      if (+seconds.innerHTML == 0) {
        minutes.innerHTML--;
        if (minutes.innerHTML.length == 1) {
          minutes.innerHTML = "0" + minutes.innerHTML;
        }
        seconds.innerHTML = 59;
      } else {
        seconds.innerHTML--;
        if (seconds.innerHTML.length == 1) {
          seconds.innerHTML = "0" + seconds.innerHTML;
        }
      }
      startPlay();
    }
  }, 1000);
}

function endGame() {
  let finish = document.querySelector(".finish");
  let finalGot = document.querySelector(".final-got");
  finalGot.innerHTML = got.innerHTML;

  let finalTotal = document.querySelector(".final-total");
  finalTotal.innerHTML = total.innerHTML;
  let startAgain = document.querySelector(".start-again");
  startAgain.onclick = function () {
    location.reload();
  };
  setTimeout(() => {
    finish.style.cssText = "top:50%;z-index:12";
    document.querySelector(".game").style.cssText = "opacity:0.4;z-index:-1";
  }, 100);
}
function addWrongWords(inf) {
  let wrong = document.querySelector(".wrong");
  let span = document.createElement("span");
  span.classList = "wrong-words";
  span.textContent = currentWord.innerHTML;
  wrong.append(span);
}
function wordChecker() {
  if (localStorage.getItem("level") == "Hard") {
    if (input.value.trim() == currentWord.innerHTML) {
      got.innerHTML++;
      return true;
    } else {
      addWrongWords(input.value.trim());
      return false;
    }
  } else {
    if (
      input.value.trim().toLowerCase() == currentWord.innerHTML.toLowerCase()
    ) {
      got.innerHTML++;
      return false;
    } else {
      addWrongWords(input.value.trim());
      return false;
    }
  }
}
start.onclick = function () {
  timer();
  generateWords();
  this.onclick = function () {
    return false;
  };
  input.focus();
};
