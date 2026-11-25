
const express = require("express");
const app = express();

const alphabet = "abcdefghijklmnopqrstuvwxyz1234567890";

function convertQuote(text) {
  return text.toLowerCase().split("").map(char => {
    if (char === " ") return "000000";

    const index = alphabet.indexOf(char) + 1;

    if (index === 0) return "000000";

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
