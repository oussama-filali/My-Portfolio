import { useState, useEffect, useRef } from 'react';
import { FaCode, FaGraduationCap, FaRocket, FaHeart } from 'react-icons/fa';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  const skills = [
    { name: 'HTML/CSS', level: 85, color: 'from-orange-500 to-red-500' },
    { name: 'JavaScript', level: 80, color: 'from-yellow-500 to-orange-500' },
    { name: 'PHP', level: 75, color: 'from-purple-500 to-pink-500' },
    { name: 'MySQL', level: 70, color: 'from-blue-500 to-cyan-500' },
    { name: 'React', level: 65, color: 'from-cyan-500 to-blue-500' },
    { name: 'GitHub', level: 75, color: 'from-gray-600 to-gray-400' }
  ];

  const interests = [
    { icon: FaCode, title: 'Développement', desc: 'Création d\'applications web et mobile innovantes' },
    { icon: FaGraduationCap, title: 'Apprentissage', desc: 'Veille technologique et formation continue' },
    { icon: FaRocket, title: 'Innovation', desc: 'Exploration de nouvelles technologies, de nouveaux projets et solutions' },
    { icon: FaHeart, title: 'Passion', desc: 'Amour pour la création de nouveauté et les défis techniques' }
  ];

  return (
    <section 
      ref={aboutRef}
      id="about" 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-20 px-4 container-padding"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            À propos de <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">moi</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Image and Info */}
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="relative">
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl transform rotate-3 blur-sm"></div>
              
              {/* Main Image Container */}
              <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-purple-500/20">
                <div className="text-center">
                  <img 
                    src="/img/IMG_3173.JPG" 
                    alt="Oussama au travail" 
                    className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 mx-auto rounded-full object-cover mb-6 border-4 border-purple-500/30 shadow-lg"
                  />
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Oussama Halima-Filali</h3>
                    <p className="text-purple-400 font-medium text-sm sm:text-base">Développeur Full-Stack/ Assistant Chef de Projet</p>
                    <p className="text-gray-400 text-sm sm:text-base">Étudiant en IT • Passionné de technologie</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Description and Details */}
          <div className={`space-y-8 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            {/* Bio */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                  👨‍💻
                </span>
                BIENVENUE DANS MON PETIT MONDE
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                <strong>Hello! 👋</strong>, je suis Oussama Halima-Filali, fort d'une expérience en vente et communication, 
                étudiant en première année Bachelor IT à La Plateforme.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Passionné par le développement web et mobile, j'aspire à devenir un expert dans ce domaine. 
                Explorez mon portfolio pour découvrir mes projets et mes réalisations.
              </p>
            </div>

            {/* Interests Grid */}
            <div className="grid grid-cols-2 gap-4">
              {interests.map((interest, index) => (
                <div 
                  key={index}
                  className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <interest.icon className="text-2xl text-purple-400 mb-2" />
                  <h4 className="text-white font-semibold text-sm mb-1">{interest.title}</h4>
                  <p className="text-gray-400 text-xs">{interest.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className={`mt-16 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-3xl font-bold text-white text-center mb-8">
            Compétences <span className="text-purple-400">Techniques</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-purple-400 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full transform transition-all duration-1000 ease-out`}
                    style={{ 
                      width: isVisible ? `${skill.level}%` : '0%',
                      transitionDelay: `${index * 100 + 800}ms`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fun Facts */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <div className="text-3xl font-bold text-purple-400 mb-2">7+</div>
              <div className="text-gray-300 text-sm">Projets réalisés</div>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <div className="text-3xl font-bold text-blue-400 mb-2">1+</div>
              <div className="text-gray-300 text-sm">Année à La Plateforme</div>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <div className="text-3xl font-bold text-cyan-400 mb-2">6+</div>
              <div className="text-gray-300 text-sm">Technologies maîtrisées</div>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <div className="text-3xl font-bold text-green-400 mb-2">5+</div>
              <div className="text-gray-300 text-sm">Années d'expérience pro</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
