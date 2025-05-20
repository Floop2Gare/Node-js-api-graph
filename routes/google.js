const express = require("express");
const router = express.Router();
const fetch = require("node-fetch"); // Si Node < 18. Sinon, en natif

router.post("/sendToSheets", async (req, res) => {
  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbw3s5CrabYcZuLzb-WuFpc_zXKd2xdZc2eZRIe8OeNLSFipgUzSb_X69CpyGqlsmzh6/exec", {
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
