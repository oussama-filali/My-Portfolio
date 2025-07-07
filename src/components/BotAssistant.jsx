import { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

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

  const botResponses = {
    bio: {
      keywords: ['bio', 'biographie', 'présentation', 'qui est', 'à propos', 'profil'],
      response: 'Oussama est un étudiant en première année Bachelor IT à La Plateforme, fort d\'une expérience en vente et communication. Passionné par le développement web et mobile ! 🚀',
      action: () => onNavigate('about')
    },
    projets: {
      keywords: ['projet', 'réalisation', 'travaux', 'portfolio', 'création'],
      response: 'Oussama a réalisé 7+ projets : Cuisine Up, L\'Artisan Pizzeria, site La Plateforme, Quiz interactif et bien d\'autres ! Veux-tu les découvrir ? 💻',
      action: () => onNavigate('projects')
    },
    experiences: {
      keywords: ['expérience', 'stage', 'formation', 'parcours', 'études', 'travail'],
      response: 'Découvre son parcours : de Auto-Entrepreneur à Agent commercial chez INTELCIA, puis Chargé d\'affaire chez PHINELEC, et maintenant étudiant développeur ! 🎓',
      action: () => onNavigate('experience')
    },
    technologies: {
      keywords: ['technologie', 'langage', 'framework', 'compétence', 'skill'],
      response: 'Oussama maîtrise HTML/CSS, JavaScript, PHP, MySQL, React, GitHub et bien d\'autres ! Il apprend en continu à La Plateforme ! ⚡',
      action: () => onNavigate('about')
    },
    contact: {
      keywords: ['contact', 'joindre', 'email', 'téléphone', 'linkedin'],
      response: 'Tu veux contacter Oussama ? LinkedIn, GitHub ou email : oussama.halimafilali.pro@gmail.com ! 📧',
      action: () => onNavigate('contact')
    },
    plateforme: {
      keywords: ['plateforme', 'école', 'étudiant', 'formation', 'b1'],
      response: 'Oussama étudie à La Plateforme en B1 Web ! Une école où l\'autonomie est primordiale. Il a vite intégré après la prépa ! 🎯'
    },
    salut: {
      keywords: ['salut', 'bonjour', 'hello', 'hey', 'coucou'],
      response: 'Salut ! 😊 Ravi de te rencontrer ! Que veux-tu savoir sur Oussama et son parcours de développeur ?'
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
      response: 'Hmm, je ne suis pas sûr de comprendre. Tu peux me demander des infos sur la bio d\'Oussama, ses projets, ses expériences, ou ses technologies ! 🤔'
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const responseData = findBestResponse(inputValue);
      
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
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
            isOpen ? 'scale-0' : 'scale-100 hover:scale-110'
          }`}
        >
          <FaRobot className="text-2xl animate-bounce" />
        </button>
      </div>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 z-50 w-80 h-96 bg-gray-900/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-500/30 transition-all duration-300 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
              <FaRobot className="text-white text-sm" />
            </div>
            <div>
              <h3 className="text-white font-medium">Assistant IA</h3>
              <p className="text-xs text-gray-400">En ligne</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 h-64 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs p-3 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-200'
              }`}>
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-800 text-gray-200 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-700/50">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Demande-moi quelque chose..."
              className="flex-1 bg-gray-800 text-white placeholder-gray-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
            <button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-lg hover:opacity-80 transition-opacity"
            >
              <FaPaperPlane className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BotAssistant;
