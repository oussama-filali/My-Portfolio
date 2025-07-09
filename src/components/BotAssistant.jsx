import { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaLightbulb, FaCode, FaHeart, FaUser } from 'react-icons/fa';

const BotAssistant = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Salut ! 👋 Je suis l\'assistant virtuel d\'Oussama. Comment puis-je t\'aider à découvrir son portfolio ?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickResponses = [
    { text: "Parle-moi d'Oussama", icon: FaUser, key: 'bio' },
    { text: "Ses projets", icon: FaCode, key: 'projets' },
    { text: "Ses compétences", icon: FaLightbulb, key: 'technologies' },
    { text: "Le contacter", icon: FaHeart, key: 'contact' }
  ];

  const botResponses = {
    bio: {
      keywords: ['bio', 'biographie', 'présentation', 'qui est', 'à propos', 'profil', 'oussama'],
      response: '🌟 Oussama est un développeur Full-Stack passionné ! Étudiant en Bachelor IT à La Plateforme à Marseille, il recherche une alternance. Fort d\'une expérience en vente et communication, il aspire à mener des projets humains et porteurs de valeurs pour le bien commun ! 🚀',
      action: () => onNavigate('about')
    },
    projets: {
      keywords: ['projet', 'réalisation', 'travaux', 'portfolio', 'création', 'développement'],
      response: '💻 Oussama a créé des projets géniaux ! Son favori : "Cuisine Up" (site de recettes interactif), mais aussi L\'Artisan Pizzeria, un Quiz en PHP, un Livre d\'Or digital, et bien d\'autres ! Chaque projet raconte une histoire. Veux-tu les explorer ?',
      action: () => onNavigate('projects')
    },
    experiences: {
      keywords: ['expérience', 'stage', 'formation', 'parcours', 'études', 'travail', 'alternance'],
      response: '🎯 Parcours riche ! De Auto-Entrepreneur à Agent commercial chez INTELCIA, puis Chargé d\'affaire chez PHINELEC. Maintenant étudiant développeur à La Plateforme, il cherche une alternance dans une entreprise innovante !',
      action: () => onNavigate('experience')
    },
    technologies: {
      keywords: ['technologie', 'langage', 'framework', 'compétence', 'skill', 'html', 'css', 'javascript', 'php', 'react'],
      response: '⚡ Compétences techniques : HTML/CSS (45%), JavaScript (40%), PHP (35%), React (25%). Mais ses vraies forces ? Résilience (95%), écoute active (90%), engagement (92%) ! Il a survécu aux échecs comme un champion ! 💪',
      action: () => onNavigate('about')
    },
    contact: {
      keywords: ['contact', 'joindre', 'email', 'téléphone', 'linkedin', 'appeler'],
      response: '📞 Contacte Oussama facilement ! Email : oussama.halimafilali.pro@gmail.com | Tél : +33 7 68 30 67 01. Il répond plus vite qu\'un développeur qui trouve un bug en production ! ⚡',
      action: () => onNavigate('contact')
    },
    plateforme: {
      keywords: ['plateforme', 'école', 'étudiant', 'formation', 'b1', 'marseille'],
      response: '🎓 La Plateforme ? L\'école de l\'autonomie à Marseille ! Oussama y étudie en B1 Web. Pédagogie par projets, autonomie maximale. Il a vite intégré après la prépa !'
    },
    salut: {
      keywords: ['salut', 'bonjour', 'hello', 'hey', 'coucou', 'bonsoir'],
      response: '😊 Salut toi ! Ravi de te rencontrer ! Je connais Oussama par cœur. Que veux-tu savoir ? Ses projets ? Son parcours ? Ses compétences de ouf ? Ou comment le contacter ?'
    },
    blague: {
      keywords: ['blague', 'drôle', 'humour', 'rire', 'joke'],
      response: '😂 Pourquoi les développeurs détestent la nature ? Parce qu\'elle a trop de bugs ! 🐛 (Oussama adore cette blague... on fait avec !)'
    },
    aide: {
      keywords: ['aide', 'help', 'comment', 'que faire', 'perdu'],
      response: '🆘 Je peux te parler d\'Oussama sous tous les angles ! Tape "projets" pour ses créations, "bio" pour son profil, "contact" pour le joindre, ou utilise les boutons rapides ! 💡'
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBestResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    for (const [key, responseData] of Object.entries(botResponses)) {
      if (responseData.keywords.some(keyword => input.includes(keyword))) {
        return responseData;
      }
    }
    
    return {
      response: '🤔 Hmm, je ne suis pas sûr de comprendre. Tu peux me demander des infos sur Oussama, ses projets, ses expériences, ses technologies, ou comment le contacter ! Ou tape "aide" pour plus d\'options ! 💡'
    };
  };

  const handleSendMessage = async (messageText = inputValue) => {
    if (!messageText.trim()) return;

    const userMessage = {
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const responseData = findBestResponse(messageText);
      
      const botMessage = {
        type: 'bot',
        content: responseData.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Execute action if exists
      if (responseData.action) {
        setTimeout(() => {
          responseData.action();
        }, 1000);
      }
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Bot Button */}
      <div className="fixed z-50 bottom-4 right-4 sm:bottom-6 sm:right-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
            isOpen ? 'scale-0' : 'scale-100 hover:scale-110'
          }`}
        >
          <FaRobot className="text-lg sm:text-2xl animate-bounce" />
        </button>
      </div>

      {/* Compact Chat Input - Only shows when not open */}
      {!isOpen && (
        <div className="fixed z-40 transition-opacity duration-300 opacity-0 bottom-20 right-4 hover:opacity-100 sm:bottom-24 sm:right-6">
          <div className="p-2 border rounded-lg shadow-lg w-60 sm:w-72 bg-gray-900/90 backdrop-blur-sm border-purple-500/20">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setIsOpen(true)}
                placeholder="💬 Question rapide..."
                className="flex-1 px-2 py-1 text-xs text-white placeholder-gray-400 border rounded bg-gray-800/40 border-gray-700/30 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
              />
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center px-2 py-1 text-white transition-opacity rounded bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:opacity-90"
              >
                <FaPaperPlane className="text-xs" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Chat Window */}
      <div className={`fixed bottom-4 right-4 z-50 w-80 h-96 sm:w-96 sm:h-[450px] sm:bottom-6 sm:right-6 bg-gray-900/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-500/30 transition-all duration-300 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b sm:p-4 border-gray-700/50 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-t-2xl">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-blue-600">
              <FaRobot className="text-sm text-white sm:text-lg animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white sm:text-base">Assistant Oussama</h3>
              <p className="text-xs text-purple-300">En ligne • Expert du portfolio !</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-gray-400 transition-colors rounded-lg hover:text-white sm:p-2 hover:bg-gray-800/50"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* Quick Response Buttons */}
        <div className="p-2 border-b sm:p-3 border-gray-700/50">
          <div className="grid grid-cols-2 gap-1 sm:gap-2">
            {quickResponses.map((response, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(response.text)}
                className="flex items-center p-1 space-x-1 text-xs text-gray-300 transition-all duration-300 border rounded-lg sm:space-x-2 sm:p-2 bg-gray-800/50 hover:bg-purple-600/20 border-gray-700/50 hover:border-purple-500/50 hover:text-white"
              >
                <response.icon className="text-xs text-purple-400" />
                <span className="truncate">{response.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 h-48 p-2 space-y-2 overflow-y-auto sm:p-3 sm:h-64 sm:space-y-3">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-2 sm:p-3 rounded-xl sm:rounded-2xl ${
                message.type === 'user' 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                  : 'bg-gray-800/50 text-gray-200 border border-gray-700/50'
              }`}>
                <p className="text-xs leading-relaxed sm:text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-purple-200' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="p-3 text-gray-200 border bg-gray-800/50 border-gray-700/50 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-2 border-t sm:p-3 border-gray-700/50">
          <div className="flex space-x-1 sm:space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Pose-moi une question sur Oussama..."
              className="flex-1 px-2 py-1 text-xs text-white placeholder-gray-400 border rounded-lg bg-gray-800/50 border-gray-700/50 sm:px-3 sm:py-2 sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              className="p-1 text-white transition-opacity rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 sm:p-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaPaperPlane className="text-xs sm:text-sm" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BotAssistant;
