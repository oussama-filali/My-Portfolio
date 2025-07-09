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

  const technicalSkills = [
    { name: 'HTML/CSS', level: 45, color: 'from-orange-500 to-red-500' },
    { name: 'JavaScript', level: 40, color: 'from-yellow-500 to-orange-500' },
    { name: 'PHP', level: 35, color: 'from-purple-500 to-pink-500' },
    { name: 'MySQL', level: 30, color: 'from-blue-500 to-cyan-500' },
    { name: 'React', level: 25, color: 'from-cyan-500 to-blue-500' },
    { name: 'GitHub', level: 35, color: 'from-gray-600 to-gray-400' }
  ];

  const interpersonalSkills = [
    { name: 'Écoute Active', level: 90, color: 'from-green-500 to-emerald-500' },
    { name: 'Patience', level: 85, color: 'from-blue-500 to-indigo-500' },
    { name: 'Résilience', level: 95, color: 'from-red-500 to-pink-500' },
    { name: 'Engagement', level: 92, color: 'from-purple-500 to-violet-500' },
    { name: 'Persévérance', level: 88, color: 'from-orange-500 to-amber-500' },
    { name: 'Adaptabilité', level: 85, color: 'from-teal-500 to-cyan-500' }
  ];

  const interests = [
    { icon: FaCode, title: 'Développement', desc: 'Création d\'applications web et mobile innovantes' },
    { icon: FaGraduationCap, title: 'Apprentissage', desc: 'Veille technologique et formation continue' },
    { icon: FaRocket, title: 'Innovation', desc: 'Projets concrets, humains et porteurs de valeurs' },
    { icon: FaHeart, title: 'Entraide', desc: 'Passion pour l\'accompagnement et le bien commun' }
  ];

  return (
    <section 
      ref={aboutRef}
      id="about" 
      className="min-h-screen px-4 py-20 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 container-padding"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            À propos de <span className="text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">moi</span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column - Image and Info */}
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="relative">
              {/* Decorative Background */}
              <div className="absolute inset-0 transform bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl rotate-3 blur-sm"></div>
              
              {/* Main Image Container */}
              <div className="relative p-4 border bg-gray-800/50 backdrop-blur-sm rounded-2xl sm:p-6 lg:p-8 border-purple-500/20">
                <div className="text-center">
                  <img 
                    src="./img/IMG_3173.JPG" 
                    alt="Oussama au travail" 
                    className="object-cover w-48 h-48 mx-auto mb-6 border-4 rounded-full shadow-lg sm:w-56 sm:h-56 lg:w-64 lg:h-64 border-purple-500/30"
                  />
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white sm:text-2xl">Oussama Halima-Filali</h3>
                    <p className="text-sm font-medium text-purple-400 sm:text-base">Développeur Full-Stack/ Assistant Chef de Projet</p>
                    <p className="text-sm text-gray-400 sm:text-base">Étudiant en IT • Passionné de technologie</p>
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
            <div className="p-6 border bg-gray-800/30 backdrop-blur-sm rounded-2xl border-gray-700/50">
              <h3 className="flex items-center mb-4 text-2xl font-bold text-white">
                <span className="flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                  👨‍💻
                </span>
                BIENVENUE DANS MON PETIT MONDE
              </h3>
              <p className="mb-4 leading-relaxed text-gray-300">
                <strong>Hello! 👋</strong>, je suis Oussama Halima-Filali, fort d'une expérience en vente et communication, 
                étudiant en première année Bachelor IT à l' école La Plateforme a Marseille en recherche d'Alternance pour intégrer une entreprise dynamique et innovante.
              </p>
              <p className="mb-4 leading-relaxed text-gray-300">
                Passionné par le développement web et mobile, j'aspire à devenir un expert dans ce domaine. 
                Mon objectif est de mener des projets concrets, humains et pleins de valeurs pour le bien commun.
              </p>
              <p className="leading-relaxed text-gray-300">
                Au-delà de la technologie, j'ai une passion profonde pour l'entraide et l'accompagnement. 
                Actuellement, je me concentre sur l'acquisition de nouvelles compétences techniques tout en 
                développant ma capacité à créer des solutions qui ont un impact positif sur la société.
              </p>
            </div>

            {/* Interests Grid */}
            <div className="grid grid-cols-2 gap-4">
              {interests.map((interest, index) => (
                <div 
                  key={index}
                  className="p-4 transition-all duration-300 border bg-gray-800/30 backdrop-blur-sm rounded-xl border-gray-700/50 hover:border-purple-500/30 hover:transform hover:scale-105"
                >
                  <interest.icon className="mb-2 text-2xl text-purple-400" />
                  <h4 className="mb-1 text-sm font-semibold text-white">{interest.title}</h4>
                  <p className="text-xs text-gray-400">{interest.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className={`mt-16 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          
          {/* Technical Skills */}
          <div className="mb-12">
            <h3 className="mb-8 text-3xl font-bold text-center text-white">
              Compétences <span className="text-purple-400">Techniques</span>
            </h3>
            
            <div className="grid gap-6 md:grid-cols-2">
              {technicalSkills.map((skill, index) => (
                <div key={index} className="p-6 border bg-gray-800/30 backdrop-blur-sm rounded-xl border-gray-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white">{skill.name}</span>
                    <span className="font-bold text-purple-400">{skill.level}%</span>
                  </div>
                  <div className="w-full h-3 overflow-hidden bg-gray-700 rounded-full">
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

          {/* Interpersonal Skills */}
          <div>
            <h3 className="mb-8 text-3xl font-bold text-center text-white">
              Compétences <span className="text-green-400">Interpersonnelles</span>
            </h3>
            <p className="max-w-3xl mx-auto mb-8 text-center text-gray-400">
              Développées au cours de mes expériences professionnelles et personnelles, 
              ces qualités m'ont permis de surmonter les défis et de mener des batailles contre les échecs de la vie.
            </p>
            
            <div className="grid gap-6 md:grid-cols-2">
              {interpersonalSkills.map((skill, index) => (
                <div key={index} className="p-6 border bg-gray-800/30 backdrop-blur-sm rounded-xl border-gray-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white">{skill.name}</span>
                    <span className="font-bold text-green-400">{skill.level}%</span>
                  </div>
                  <div className="w-full h-3 overflow-hidden bg-gray-700 rounded-full">
                    <div 
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full transform transition-all duration-1000 ease-out`}
                      style={{ 
                        width: isVisible ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 100 + 1400}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fun Facts */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="p-6 border bg-gray-800/30 backdrop-blur-sm rounded-xl border-gray-700/50">
              <div className="mb-2 text-3xl font-bold text-purple-400">7+</div>
              <div className="text-sm text-gray-300">Projets réalisés</div>
            </div>
            <div className="p-6 border bg-gray-800/30 backdrop-blur-sm rounded-xl border-gray-700/50">
              <div className="mb-2 text-3xl font-bold text-blue-400">1+</div>
              <div className="text-sm text-gray-300">Année à La Plateforme</div>
            </div>
            <div className="p-6 border bg-gray-800/30 backdrop-blur-sm rounded-xl border-gray-700/50">
              <div className="mb-2 text-3xl font-bold text-cyan-400">6+</div>
              <div className="text-sm text-gray-300">Technologies maîtrisées</div>
            </div>
            <div className="p-6 border bg-gray-800/30 backdrop-blur-sm rounded-xl border-gray-700/50">
              <div className="mb-2 text-3xl font-bold text-green-400">5+</div>
              <div className="text-sm text-gray-300">Années d'expérience pro</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
