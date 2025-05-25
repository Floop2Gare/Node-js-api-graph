require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fetch = require('node-fetch'); // Si tu es sur Node < 18

const app = express();
const PORT = process.env.PORT || 4000;

// --- Variables d'environnement
const PAGE_ID = process.env.PAGE_ID;
const PAGE_TOKEN = process.env.PAGE_TOKEN;
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw3s5CrabYcZuLzb-WuFpc_zXKd2xdZc2eZRIe8OeNLSFipgUzSb_X69CpyGqlsmzh6/exec";

if (!PAGE_ID || !PAGE_TOKEN) {
  console.error("❌ Les variables PAGE_ID ou PAGE_TOKEN sont manquantes dans le fichier .env");
  process.exit(1);
}

// --- Middlewares
app.use(cors());
app.use(express.json());

// --- ✅ Route Facebook : récupérer les publications
app.get('/api/facebook/posts', async (req, res) => {
  try {
    const response = await axios.get(`https://graph.facebook.com/v19.0/${PAGE_ID}/posts`, {
      params: {
        fields: 'message,full_picture,created_time,permalink_url',
        access_token: PAGE_TOKEN,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("❌ Erreur API Facebook :", error.response?.data || error.message);
    res.status(500).json({ error: "Erreur lors de la récupération des posts" });
  }
});

// --- ✅ Route Google Sheets : envoyer les données du formulaire
app.post('/api/sendToSheets', async (req, res) => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const result = await response.json();
    res.json(result);
  } catch (error) {
    console.error("❌ Erreur d'envoi vers Google Sheets :", error);
    res.status(500).json({ error: "Erreur lors de l'envoi des données." });
  }
});

// --- Route 404 pour tout le reste
app.use((req, res) => {
  res.status(404).send("🔍 Route introuvable");
});

// --- Lancer le serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const googleRoutes = require("./routes/google");
app.use("/api", googleRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Serveur backend lancé sur http://localhost:${PORT}`));
