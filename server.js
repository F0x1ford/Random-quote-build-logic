
const express = require("express");
const app = express();

app.use(express.json());

const alphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .";

let quote = "HELLO WORLD";
let position = 0;

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

    position = 0;
    console.log("New quote:", quote);
  } catch (error) {
    console.log("Quote update failed");
  }
}

function toBinary(letter) {
  let index = alphabet.indexOf(letter);

  if (index < 0) index = 63;

  return index.toString(2).padStart(6, "0");
}

app.get("/Return_Quote", (req, res) => {
  res.json({
    value: quote
  });
});


app.post("/Return_Quote", (req, res) => {
  if (req.body.value === undefined) {
    return res.status(400).json({
      error: "Missing value"
    });
  }

  if (position >= quote.length) {
    position = 0;
  }

  const letter = quote[position].toUpperCase();
  const index = alphabet.indexOf(letter);

  const binary = (index >= 0 ? index : 63)
    .toString(2)
    .padStart(6, "0");

  position++;

  console.log("Letter:", letter, "Binary:", binary);

  res.json({
    value: binary
  });
});


updateQuote();
setInterval(updateQuote, 30000);

app.listen(process.env.PORT || 3000, "0.0.0.0");
