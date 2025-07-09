import { useState } from 'react';
import { FaStar, FaHeart, FaPaperPlane, FaTimes } from 'react-icons/fa';

const CompactFeedback = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating > 0) {
      // Ici vous pourriez envoyer les données
      console.log({ rating, comment, email, timestamp: new Date() });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsExpanded(false);
        setIsSubmitted(false);
        setRating(0);
        setComment('');
        setEmail('');
      }, 3000);
    }
  };

  const getRatingEmoji = (stars) => {
    const emojis = ['😞', '😐', '😊', '😄', '🤩'];
    return emojis[stars - 1] || '⭐';
  };

  return (
    <div className="fixed bottom-6 left-6 z-30">
      {!isExpanded ? (
        /* Bouton compact - Sur le côté */
        <button
          onClick={() => setIsExpanded(true)}
          className="group relative px-3 py-2 bg-white/8 backdrop-blur-sm border border-white/15 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white/12 opacity-80 hover:opacity-100"
        >
          <div className="flex items-center space-x-1 text-white">
            <FaHeart className="text-pink-400 text-sm group-hover:animate-pulse" />
            <span className="font-medium text-xs">Avis</span>
            <div className="flex space-x-0.5">
              {[1, 2, 3].map((star) => (
                <FaStar key={star} className="text-xs text-yellow-400/50" />
              ))}
            </div>
          </div>
        </button>
      ) : (
        /* Modal étendue - Plus petite */
        <div className="w-64 bg-white/8 backdrop-blur-md border border-white/15 rounded-xl shadow-xl p-4 space-y-3">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium text-sm flex items-center">
                  <FaHeart className="text-pink-400 mr-1 text-sm" />
                  Ton avis ?
                </h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-white/60 hover:text-white/90 transition-colors p-1"
                >
                  <FaTimes className="text-xs" />
                </button>
              </div>

              {/* Rating */}
              <div className="text-center">
                <p className="text-white/80 text-xs mb-2">Comment tu trouves ce portfolio ?</p>
                <div className="flex justify-center space-x-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`text-lg transition-all duration-200 hover:scale-110 ${
                        star <= rating ? 'text-yellow-400' : 'text-white/30'
                      }`}
                    >
                      <FaStar />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-white/90 text-xs">
                    {getRatingEmoji(rating)} {rating === 5 ? 'Wahou !' : rating >= 4 ? 'Super !' : rating >= 3 ? 'Sympa !' : rating >= 2 ? 'Peut mieux faire' : 'Aïe...'}
                  </p>
                )}
              </div>

              {/* Comment */}
              <div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Un petit mot ? 😊"
                  className="w-full h-10 bg-white/10 border border-white/20 rounded px-2 py-1 text-white placeholder-white/50 text-xs resize-none focus:outline-none focus:ring-1 focus:ring-pink-500/50 backdrop-blur-sm"
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email (optionnel)"
                  className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-white placeholder-white/50 text-xs focus:outline-none focus:ring-1 focus:ring-pink-500/50 backdrop-blur-sm"
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={rating === 0}
                className="w-full bg-gradient-to-r from-pink-500/80 to-purple-500/80 backdrop-blur-sm text-white py-2 rounded font-medium hover:from-pink-500 hover:to-purple-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1 border border-white/20 text-xs"
              >
                <FaPaperPlane className="text-xs" />
                <span>Envoyer</span>
              </button>

              <p className="text-white/60 text-xs text-center">
                Merci ! 🙏
              </p>
            </>
          ) : (
            /* Thank you message */
            <div className="text-center py-3">
              <div className="text-2xl mb-2">🎉</div>
              <h3 className="text-white font-medium text-sm mb-1">
                Merci !
              </h3>
              <p className="text-white/80 text-xs mb-3">
                Ton retour est précieux ! 
                {rating >= 4 && " ✨"}
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded p-2 border border-white/20">
                <p className="text-white/70 text-xs">
                  💌 oussama.halimafilali.pro@gmail.com<br />
                  📞 +33 7 68 30 67 01
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompactFeedback;
