const verseChoose = document.querySelector("select");
const poemDisplay = document.querySelector("pre");

verseChoose.addEventListener("change", () => {
  const verse = verseChoose.value;
  updateDisplay(verse);
});

function updateDisplay(verse) {
  verse = verse.replace(" ", "").toLowerCase();
  const url = `${verse}.txt`;

  // call `fetch()`, passing in the URL.
  fetch(url)
    // fetch() returns a promise. When we have received a response from the server,
    // the promise's `then()` handler is called with the response
    .then((response) => {
      // Our handler throws an error if the request did not succeed.
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      // Otherwise (if the response succeeded), our handler fetches the response
      // as text by calling response.text(), and immediately returnes the promise
      // returned by `response.text()`.
      return response.text();
    })
    // When response.text() has succeeded, the `then()` handler is called with 
    // the text (because response.text() is also async and returns a Promise), 
    // and we copy it into the `poemDisplay` box (function runs when response text is ready).
    .then((text) => {
      poemDisplay.textContent = text;
    })
    // Catch any errors that might happen, and display a message
    // in the `poemDisplay` box.
    .catch((error) => {
      poemDisplay.textContent = `Could not fetch verse: ${error}`;
    });
}

updateDisplay("Verse 1");
verseChoose.value = "Verse 1";

