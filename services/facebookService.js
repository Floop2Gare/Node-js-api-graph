const axios = require('axios');

/**
 * Récupère les 3 derniers posts d'une page Facebook
 * @param {string} pageId - L'ID de la page Facebook
 * @param {string} accessToken - Le token d'accès généré pour cette page
 * @returns {Promise<Array>} - Les posts Facebook (message, image, lien, etc.)
 */
const fetchFacebookPosts = async (pageId, accessToken) => {
  try {
    const url = `https://graph.facebook.com/v19.0/${pageId}/posts?fields=message,full_picture,created_time,permalink_url&access_token=${accessToken}`;
    
    console.log("📡 Appel API Facebook →", url);

    const response = await axios.get(url);
    
    console.log("✅ Réponse Facebook :", response.data);

    return response.data.data.slice(0, 3); // Retourne les 3 derniers posts
  } catch (error) {
    // Affiche l'erreur complète pour déboguer
    if (error.response) {
      console.error("❌ Erreur API Facebook :", error.response.data);
    } else {
      console.error("❌ Erreur de requête :", error.message);
    }
    throw new Error("Erreur lors de la récupération des posts");
  }
};

module.exports = { fetchFacebookPosts };
