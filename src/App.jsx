import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Footer from './components/Footer';
import BotAssistant from './components/BotAssistant';
import CompactFeedback from './components/CompactFeedback';
import VisitTracker from './components/VisitTracker';

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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 rounded-full border-purple-500/30 border-t-purple-500 animate-spin"></div>
          <h2 className="mb-2 text-xl font-medium text-white">Chargement de l'univers...</h2>
          <p className="text-gray-400">Préparation de l'expérience galactique</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gray-900 App">
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

      {/* Compact Feedback */}
      <CompactFeedback />

      {/* Background Effects */}
      <div className="fixed top-0 left-0 z-0 w-full h-full pointer-events-none">
        <div className="absolute rounded-full top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 blur-3xl animate-pulse"></div>
        <div className="absolute rounded-full bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 blur-3xl animate-pulse"></div>
        <div className="absolute w-64 h-64 rounded-full top-3/4 left-1/3 bg-cyan-600/10 blur-3xl animate-pulse"></div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => handleNavigate('hero')}
        className="fixed z-40 flex items-center justify-center w-12 h-12 text-white transition-all duration-300 rounded-full bottom-24 left-6 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 hover:scale-110"
        aria-label="Retour en haut"
      >
        ↑
      </button>

      {/* Tracker de visites */}
      <VisitTracker />
    </div>
  );
}

export default App;
