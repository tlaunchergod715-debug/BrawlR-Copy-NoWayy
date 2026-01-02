const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let players = {}; // datos temporales

app.post("/update", (req, res) => {
  const { userId, game, action, key } = req.body;

  if (key !== process.env.API_KEY)
    return res.status(403).json({ error: "Invalid key" });

  players[userId] = {
    game,
    action,
    time: Date.now()
  };

  res.json({ success: true });
});

app.get("/status/:userId", (req, res) => {
  res.json(players[req.params.userId] || null);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("API running"));
