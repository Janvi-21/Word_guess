let level = localStorage.getItem("level");
document.getElementById("level-display").textContent = "Level: " + level.toUpperCase();

let triesContainer = document.getElementById("tries-container");
let hintElement = document.getElementById("hint");
let submitBtn = document.getElementById("submit-btn");
let popup = document.getElementById("popup");
let popupMessage = document.getElementById("popup-message");

let selectedWordData = words[level][Math.floor(Math.random() * words[level].length)];
let selectedWord = selectedWordData.word.toLowerCase();
let maxTries = 7;
let currentTry = 0;

hintElement.textContent = "Hint: " + selectedWordData.hint;

function createTryRow() {
  const row = document.createElement("div");
  row.classList.add("try-row");
  for (let i = 0; i < selectedWord.length; i++) {
    const input = document.createElement("input");
    input.maxLength = 1;
    input.classList.add("letter-box");
    row.appendChild(input);
  }
  triesContainer.appendChild(row);
  row.querySelectorAll("input")[0].focus();
}

for (let i = 0; i < maxTries; i++) {
  createTryRow();
}

submitBtn.addEventListener("click", () => {
  if (currentTry >= maxTries) return;
  const row = triesContainer.children[currentTry];
  const inputs = row.querySelectorAll("input");
  const guess = Array.from(inputs).map(input => input.value.toLowerCase()).join("");

  if (guess.length !== selectedWord.length) return;

  for (let i = 0; i < selectedWord.length; i++) {
    if (guess[i] === selectedWord[i]) {
      inputs[i].classList.add("correct");
    } else if (selectedWord.includes(guess[i])) {
      inputs[i].classList.add("present");
    } else {
      inputs[i].classList.add("absent");
    }
  }

  if (guess === selectedWord) {
    popupMessage.textContent = "🎉 You guessed it! The word was: " + selectedWord;
    popup.classList.remove("hidden");
    return;
  }

  currentTry++;
  if (currentTry >= maxTries) {
    popupMessage.textContent = "❌ Out of tries! The correct word was: " + selectedWord;
    popup.classList.remove("hidden");
  }
});

function newGame() {
  location.reload();
}
