// Service pour l'API du backend
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost/My-Portfolio/backend/api'
  : '/backend/api';  // Pour la production sur IONOS

class PortfolioAPI {
  
  // Tracker une visite
  static async trackVisit(page = 'home') {
    try {
      const response = await fetch(`${API_BASE_URL}/visits.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `page=${encodeURIComponent(page)}`
      });
      
      if (!response.ok) {
        throw new Error('Erreur réseau');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur lors du tracking:', error);
      return { error: error.message };
    }
  }
  
  // Récupérer les statistiques de visite
  static async getVisitStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/visits.php`);
      
      if (!response.ok) {
        throw new Error('Erreur réseau');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des stats:', error);
      return { error: error.message };
    }
  }
  
  // Soumettre un avis
  static async submitFeedback(rating, comment = '', email = '') {
    try {
      const endpoint = USE_SIMPLE_API ? 'feedback-simple.php' : 'feedback.php';
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating, comment, email })
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'avis:', error);
      return { error: error.message };
    }
  }
  
  // Récupérer les avis
  static async getFeedback(limit = 10) {
    try {
      const endpoint = USE_SIMPLE_API ? 'feedback-simple.php' : 'feedback.php';
      const response = await fetch(`${API_BASE_URL}/${endpoint}?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des avis:', error);
      return { error: error.message };
    }
  }
}

export default PortfolioAPI;
