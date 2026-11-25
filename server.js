
const express = require("express");
const app = express();

const alphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .";

let quote = "";
let binaryLetters = [];
let position = 0;

function convertQuote(text) {
  return text.split("").map(char => {
    let index = alphabet.indexOf(char);
    if (index < 0) index = 63;

    return index.toString(2).padStart(6, "0");
  });
}

async function updateQuote() {
  try {
    const response = await fetch(
      "https://dummyjson.com/quotes/random"
    );

    const data = await response.json();

    quote = data.quote
      .replace(/[^A-Za-z0-9 .]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    binaryLetters = convertQuote(quote);
    position = 0;

    console.log("New quote:", quote);

  } catch (error) {
    console.log("Quote update failed:", error.message);
  }
}

// GET : prochaine lettre en binaire

app.get("/Return_Quote", (req, res) => {
  if (binaryLetters.length === 0) {
    return res.json({ value: "finish" });
  }

  if (position >= binaryLetters.length) {
    return res.json({ value: "finish" });
  }

  const result = binaryLetters[position];

  position++;

  res.json({ value: result });
});

// Première citation
updateQuote();

// Changement toutes les 30 secondes
setInterval(updateQuote, 30000);

app.listen(process.env.PORT || 3000, "0.0.0.0");
