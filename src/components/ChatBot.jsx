import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaLightbulb, FaCode, FaHeart } from 'react-icons/fa';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Salut ! 👋 Je suis l'assistant virtuel d'Oussama ! Comment puis-je t'aider aujourd'hui ?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickResponses = [
    { text: "Parle-moi de tes projets", icon: FaCode },
    { text: "Tes compétences ?", icon: FaLightbulb },
    { text: "Comment te contacter ?", icon: FaHeart },
    { text: "Recherches-tu un emploi ?", icon: FaRobot }
  ];

  const botResponses = {
    // Projets
    "projets": "🚀 Oussama a créé plusieurs projets sympas ! Son favori est 'Cuisine Up', un site de recettes interactif. Il a aussi développé un portfolio (celui-ci !), un site de quiz en PHP, et même un gestionnaire de menu pour restaurateurs. Veux-tu que je te parle d'un projet en particulier ?",
    
    // Compétences
    "compétences": "💪 Oussama maîtrise HTML/CSS (45%), JavaScript (40%), PHP (35%), et il apprend React (25%) ! Mais ses vraies forces sont ses compétences humaines : écoute active (90%), résilience (95%), et engagement (92%). Il a survécu aux échecs de la vie comme un boss ! 😎",
    
    // Contact
    "contact": "📞 Tu peux joindre Oussama par email : oussama.halimafilali.pro@gmail.com ou par téléphone : +33 7 68 30 67 01. Il répond plus vite qu'un développeur qui trouve un bug en production ! ⚡",
    
    // Emploi
    "emploi": "🎯 Oui ! Oussama recherche une alternance pour intégrer une entreprise dynamique et innovante. Il est étudiant en Bachelor IT à La Plateforme à Marseille. Son objectif ? Mener des projets concrets, humains et pleins de valeurs !",
    
    // Humour
    "blague": "😄 Pourquoi les développeurs détestent-ils la nature ? Parce qu'elle a trop de bugs ! 🐛 (Oussama a dit que c'était drôle... on fait avec !)",
    
    // Default
    "default": [
      "🤔 Hmm, je ne suis pas sûr de comprendre. Peux-tu reformuler ?",
      "💭 Intéressant ! Peux-tu être plus précis ?",
      "🎯 Je vois ! Veux-tu que je te parle des projets d'Oussama ?",
      "✨ Bonne question ! As-tu regardé ses compétences interpersonnelles ?",
      "🚀 Cool ! Veux-tu savoir comment le contacter ?"
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeMessage = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('projet') || lowerMessage.includes('réalisation') || lowerMessage.includes('création')) {
      return botResponses.projets;
    }
    if (lowerMessage.includes('compétence') || lowerMessage.includes('skill') || lowerMessage.includes('capacité')) {
      return botResponses.compétences;
    }
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('téléphone') || lowerMessage.includes('joindre')) {
      return botResponses.contact;
    }
    if (lowerMessage.includes('emploi') || lowerMessage.includes('alternance') || lowerMessage.includes('travail') || lowerMessage.includes('job')) {
      return botResponses.emploi;
    }
    if (lowerMessage.includes('blague') || lowerMessage.includes('drôle') || lowerMessage.includes('humour')) {
      return botResponses.blague;
    }
    
    return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
  };

  const sendMessage = async (messageText = inputValue) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: analyzeMessage(messageText),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <FaRobot className="text-2xl group-hover:animate-bounce" />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
          💬
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-gray-900/95 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <FaRobot className="text-white text-lg" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Assistant Oussama</h3>
                <p className="text-gray-400 text-xs">En ligne • Toujours prêt à aider !</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800/50 rounded-lg"
            >
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'bg-gray-800/50 text-gray-300 border border-gray-700/50'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-purple-200' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800/50 border border-gray-700/50 p-3 rounded-2xl">
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

          {/* Quick Responses */}
          <div className="p-3 border-t border-gray-700/50">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {quickResponses.map((response, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(response.text)}
                  className="flex items-center space-x-2 p-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-lg text-gray-300 text-xs transition-colors"
                >
                  <response.icon className="text-purple-400" />
                  <span className="truncate">{response.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700/50">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Écris ton message..."
                className="flex-1 bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
