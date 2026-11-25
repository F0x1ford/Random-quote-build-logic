
const express = require("express");
const app = express();

app.use(express.json());

let quote = "Loading...";
let lastUpdate = 0;

async function updateQuote() {
  try {
    const response = await fetch(
      "https://dummyjson.com/quotes/random"
    );

    const data = await response.json();

    quote = data.quote;
    lastUpdate = Date.now();

    console.log("New quote:", quote);
  } catch (error) {
    console.log("Quote update failed");
  }
}

app.get("/Return_Quote", async (req, res) => {
  if (Date.now() - lastUpdate >= 30000) {
    await updateQuote();
  }

  res.json({
    value: quote
  });
});

app.post("/Return_Quote", async (req, res) => {
  if (Date.now() - lastUpdate >= 30000) {
    await updateQuote();
  }

  res.json({
    value: quote
  });
});

// Première citation
updateQuote();

// Actualisation toutes les 30 secondes
setInterval(updateQuote, 30000);

app.listen(process.env.PORT || 3000, "0.0.0.0");
