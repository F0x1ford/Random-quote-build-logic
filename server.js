
const express = require("express");
const app = express();


const codes = {
  " ": "000000",
  a: "000001", b: "000010", c: "000011",
  d: "000100", e: "000101", f: "000110",
  g: "000111", h: "001000", i: "001001",
  j: "001010", k: "001011", l: "001100",
  m: "001101", n: "001110", o: "001111",
  p: "010000", q: "010001", r: "010010",
  s: "010011", t: "010100", u: "010101",
  v: "010110", w: "010111", x: "011000",
  y: "011001", z: "011010",
  "1": "011011", "2": "011100",
  "3": "011101", "4": "011110",
  "5": "011111", "6": "100000",
  "7": "100001", "8": "100010",
  "9": "100011", "0": "100100"
};

function convertQuote(text) {
  return text.toLowerCase().split("").map(char => {
    return codes[char] || "000000";
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
