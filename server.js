
const express = require("express");

const app = express();
app.use(express.json());

app.get("/Return_Quote", async (req, res) => {
  try {
    const response = await fetch(
      "https://dummyjson.com/quotes/random"
    );

    const data = await response.json();

    res.json({
  "value": data.quote
});
  } catch (error) {
    res.status(500).send("Erreur API");
  }
});

app.post("/Return_Quote", async (req, res) => {
  try {
    const response = await fetch(
      "https://dummyjson.com/quotes/random"
    );

    const data = await response.json();

    res.json({
  "value": data.quote
});
  } catch (error) {
    res.status(500).send("Erreur API");
  }
});

app.listen(process.env.PORT || 3000, "0.0.0.0");
