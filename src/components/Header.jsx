import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaHome, FaUser, FaBriefcase, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';

const Header = ({ activeSection, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuItems = [
    { id: 'hero', label: 'Accueil', icon: FaHome },
    { id: 'about', label: 'À propos', icon: FaUser },
    { id: 'experience', label: 'Expérience', icon: FaBriefcase },
    { id: 'projects', label: 'Projets', icon: FaProjectDiagram },
    { id: 'contact', label: 'Contact', icon: FaEnvelope }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    onNavigate(sectionId);
    setIsOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-gray-900/95 backdrop-blur-lg border-b border-gray-800/50' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">O</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-lg">Oussama</h1>
              <p className="text-gray-400 text-xs">Developer</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <item.icon className="text-sm" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 bg-gray-800/50 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-gray-700/50 transition-colors"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <item.icon />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
          style={{ 
            width: `${Math.min(100, (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100)}%` 
          }}
        ></div>
      </div>
    </header>
  );
};

export default Header;
