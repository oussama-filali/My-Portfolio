import { useEffect, useState } from 'react';
import PortfolioAPI from '../services/api';

const VisitTracker = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Tracker la visite au chargement de la page
    const trackVisit = async () => {
      try {
        const result = await PortfolioAPI.trackVisit('home');
        if (result.success) {
          setStats(result.data);
        }
      } catch (error) {
        console.error('Erreur lors du tracking:', error);
      }
    };

    trackVisit();
  }, []);

  // Affichage discret des statistiques (optionnel)
  if (!stats) return null;

  return (
    <div className="fixed bottom-2 left-2 z-10 opacity-30 hover:opacity-100 transition-opacity">
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg px-3 py-1 text-xs text-gray-400">
        <span>👥 {stats.total_visits} visites</span>
        {stats.average_rating > 0 && (
          <span className="ml-2">⭐ {stats.average_rating}/5</span>
        )}
      </div>
    </div>
  );
};

export default VisitTracker;
