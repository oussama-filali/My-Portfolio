import { useState } from 'react';
import { FaStar, FaHeart, FaComment, FaPaperPlane, FaTimes, FaThumbsUp } from 'react-icons/fa';

const FeedbackSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: rating, 2: comment, 3: contact, 4: thanks
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [contact, setContact] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState(null);

  const resetForm = () => {
    setStep(1);
    setRating(0);
    setComment('');
    setContact('');
    setWouldRecommend(null);
  };

  const handleSubmit = () => {
    // Ici vous pourriez envoyer les données à un service
    console.log({
      rating,
      comment,
      contact,
      wouldRecommend,
      timestamp: new Date()
    });
    setStep(4);
  };

  const getRatingText = (stars) => {
    const texts = {
      1: "😞 Pas terrible...",
      2: "😐 Peut mieux faire",
      3: "😊 Pas mal !",
      4: "😄 Très bien !",
      5: "🤩 Absolument génial !"
    };
    return texts[stars] || "";
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 group hover:scale-105"
      >
        <FaHeart className="group-hover:animate-pulse" />
        <span className="font-medium">Laisse ton avis</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900/95 backdrop-blur-lg border border-gray-700/50 rounded-2xl max-w-md w-full mx-4">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-pink-600/20 to-purple-600/20">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center">
              <FaHeart className="mr-3 text-pink-400" />
              Ton Avis Compte !
            </h2>
            <button
              onClick={() => {
                setIsOpen(false);
                resetForm();
              }}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800/50 rounded-lg"
            >
              <FaTimes />
            </button>
          </div>
          <div className="mt-2 flex space-x-2">
            {[1, 2, 3, 4].map((stepNum) => (
              <div
                key={stepNum}
                className={`flex-1 h-2 rounded-full ${
                  step >= stepNum ? 'bg-pink-500' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Rating */}
        {step === 1 && (
          <div className="p-6 text-center">
            <h3 className="text-lg font-semibold text-white mb-4">
              Comment tu trouves mon portfolio ? ⭐
            </h3>
            
            <div className="flex justify-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-3xl transition-all duration-200 hover:scale-110 ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-600'
                  }`}
                >
                  <FaStar />
                </button>
              ))}
            </div>

            {rating > 0 && (
              <p className="text-lg text-pink-400 mb-6 animate-fadeIn">
                {getRatingText(rating)}
              </p>
            )}

            <button
              onClick={() => setStep(2)}
              disabled={rating === 0}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuer
            </button>
          </div>
        )}

        {/* Step 2: Comment */}
        {step === 2 && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">
              Raconte-moi ce que tu en penses ! 💭
            </h3>
            
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tes impressions, suggestions, compliments... Tout est bon à prendre ! 😊"
              className="w-full h-32 bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500/50"
            />

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-800/50 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700/50 transition-colors"
              >
                Retour
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Suivant
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Recommendation & Contact */}
        {step === 3 && (
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">
                Me recommanderais-tu ? 🤝
              </h3>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setWouldRecommend(true)}
                  className={`flex-1 p-4 rounded-lg border transition-all duration-300 ${
                    wouldRecommend === true
                      ? 'bg-green-600/20 border-green-500 text-green-400'
                      : 'bg-gray-800/30 border-gray-700/50 text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  <FaThumbsUp className="mx-auto mb-2" />
                  <div className="text-sm">Bien sûr !</div>
                </button>
                <button
                  onClick={() => setWouldRecommend(false)}
                  className={`flex-1 p-4 rounded-lg border transition-all duration-300 ${
                    wouldRecommend === false
                      ? 'bg-red-600/20 border-red-500 text-red-400'
                      : 'bg-gray-800/30 border-gray-700/50 text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  <FaTimes className="mx-auto mb-2" />
                  <div className="text-sm">Pas encore</div>
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-white font-medium mb-3">
                Restons en contact ! (optionnel) ✉️
              </h4>
              <input
                type="email"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="ton.email@exemple.com"
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-800/50 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700/50 transition-colors"
              >
                Retour
              </button>
              <button
                onClick={handleSubmit}
                disabled={wouldRecommend === null}
                className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <FaPaperPlane />
                <span>Envoyer</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Thanks */}
        {step === 4 && (
          <div className="p-6 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Merci infiniment !
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Ton avis compte énormément pour moi ! 
              {rating >= 4 && " Tu es fantastique ! 🌟"}
              {wouldRecommend && " Et merci de vouloir me recommander ! 🤗"}
              {contact && " Je vais garder ton contact précieusement ! 💌"}
            </p>

            <div className="bg-gray-800/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-400">
                📧 Si tu veux discuter : oussama.halimafilali.pro@gmail.com<br />
                📞 Ou m'appeler : +33 7 68 30 67 01
              </p>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                resetForm();
              }}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackSystem;
