require("dotenv").config();
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.post("/sendToSheets", async (req, res) => {
  try {
    const response = await fetch(process.env.GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const result = await response.json();
    res.json(result);
  } catch (error) {
    console.error("Erreur d'envoi vers Google Sheets :", error);
    res.status(500).json({ error: "Erreur lors de l'envoi des données." });
  }
});

module.exports = router;