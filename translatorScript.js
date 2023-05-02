("use strict");

const source = document.getElementById("source");
const target = document.getElementById("target");

const translate = document.getElementById("translate");
const result = document.getElementById("result");

const url = "https://text-translator2.p.rapidapi.com/getLanguages";
const options = {
  method: "GET",
  headers: {
    "content-type": "application/octet-stream",
    "X-RapidAPI-Key": "dc515a8281mshcb23328fd1795e4p126564jsnf3303b9d168c",
    "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((res) => {
    let _data = res.data.languages;
    for (let x of _data) {
      let option = document.createElement("option");
      option.value = x.code;
      option.textContent = `${x.name}`;
      source.appendChild(option);
    }
    for (let x of _data) {
      let option = document.createElement("option");
      option.value = x.code;
      option.textContent = `${x.name}`;
      target.appendChild(option);
    }
  })
  .catch((err) => console.log(err));

translate.addEventListener("click", () => {
  let text = document.getElementById("text").value;
  let fromValue = source.options[source.selectedIndex].value;
  let toValue = target.options[target.selectedIndex].value;

  const url = "https://text-translator2.p.rapidapi.com/translate";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "dc515a8281mshcb23328fd1795e4p126564jsnf3303b9d168c",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    body: new URLSearchParams({
      source_language: `${fromValue}`,
      target_language: `${toValue}`,
      text: `${text}`,
    }),
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((res) => {
      result.innerHTML = `
      <div class="output">
        <h3>Translation:</h3>
        <div>${res.data.translatedText}</div>
      </div>
      `;
    })
    .catch((err) => console.log(err));
});
