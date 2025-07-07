import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Footer from './components/Footer';
import BotAssistant from './components/BotAssistant';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Navigation smooth scroll
  const handleNavigate = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading effect
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-white text-xl font-medium mb-2">Chargement de l'univers...</h2>
          <p className="text-gray-400">Préparation de l'expérience galactique</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App relative min-h-screen bg-gray-900 overflow-x-hidden">
      {/* Header Navigation */}
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Experience Section */}
        <Experience />

        {/* Projects Section */}
        <Projects />

        {/* Footer/Contact Section */}
        <Footer />
      </main>

      {/* Bot Assistant */}
      <BotAssistant onNavigate={handleNavigate} />

      {/* Background Effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => handleNavigate('hero')}
        className="fixed bottom-24 left-6 w-12 h-12 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gray-700/50 transition-all duration-300 hover:scale-110 z-40"
        aria-label="Retour en haut"
      >
        ↑
      </button>
    </div>
  );
}

export default App;
