require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 4000;

// Récupère les variables d'environnement
const PAGE_ID = process.env.PAGE_ID;
const PAGE_TOKEN = process.env.PAGE_TOKEN;

if (!PAGE_ID || !PAGE_TOKEN) {
  console.error("❌ Les variables PAGE_ID ou PAGE_TOKEN sont manquantes dans le fichier .env");
  process.exit(1);
}

app.use(cors());
app.use(express.json());

// Route pour récupérer les publications Facebook
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

// Catch-all pour les routes inexistantes
app.use((req, res) => {
  res.status(404).send("🔍 Route introuvable");
});

app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
