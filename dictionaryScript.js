"use strict";

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

let volume;

btn.addEventListener("click", () => {
  let inpWord = document.getElementById("inp-word").value;
  fetch(`${url}${inpWord}`)
    .then((response) => response.json())
    .then((data) => {
      volume = data[0].phonetics[0].audio;
      result.innerHTML = `
            <div class="word">
                <h3>${inpWord}</h3>
                <button id="soundBtn" onclick="playSound()">
                      <i class="fas fa-volume-up"></i>
                </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                </div>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
      sound.setAttribute("src", data[0].phonetics[0].audio);
      if (!volume) {
        document.getElementById("soundBtn").innerHTML = "";
      }
    })
    .catch(() => {
      result.innerHTML = `<h3 class="error">Sorry, not found!</h3>`;
    });
});
function playSound() {
  sound.play();
}
