import { useState, useEffect, useRef } from 'react';
import { FaGraduationCap, FaBriefcase, FaTrophy, FaCertificate } from 'react-icons/fa';

const Experience = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const experienceRef = useRef(null);

  const experiences = [
    {
      type: 'education',
      icon: FaGraduationCap,
      title: 'Développeur Web - Reconversion',
      organization: 'École La Plateforme',
      period: '2024',
      description: 'Une école où l\'autonomie est primordiale grâce à une période de prépa j\'ai très vite intégré la section B1 web, où j\'ai rencontré bug, frustration, joie et du learning à gogo.',
      skills: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'React', 'GitHub'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      type: 'project',
      icon: FaBriefcase,
      title: 'Chargé d\'affaire',
      organization: 'PHINELEC',
      period: '2023 - 2024',
      description: 'Gestion des relations clients, suivi des interventions techniques, mise en place de stratégies de fidélisation.',
      skills: ['Relation client', 'Suivi technique', 'Fidélisation'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      type: 'achievement',
      icon: FaBriefcase,
      title: 'Agent commercial',
      organization: 'INTELCIA',
      period: '2020 - 2023',
      description: 'Conseil personnalisé et accueil du client. Gestion des réclamations et des litiges. Analyse des besoins et des attentes des clients. Utilisation des outils CRM, Microsoft Teams et Outlook.',
      skills: ['Conseil client', 'CRM', 'Microsoft Teams', 'Vente'],
      color: 'from-green-500 to-teal-500'
    },
    {
      type: 'certification',
      icon: FaBriefcase,
      title: 'Aide cuisinier',
      organization: 'Hotel Mercure',
      period: '2019',
      description: 'Présentation et show-cooking. Préparation des plats et assiettes. Service des tables et nettoyage des espaces communs. Travail en équipe avec le personnel de cuisine et de salle.',
      skills: ['Cuisine', 'Service', 'Travail d\'équipe', 'Communication'],
      color: 'from-orange-500 to-red-500'
    },
    {
      type: 'project',
      icon: FaBriefcase,
      title: 'Auto-Entrepreneur',
      organization: 'OSP SERVICES',
      period: '2018',
      description: 'Nettoyage et intervention à domicile. Gestion des relations clients et suivi des interventions. Connaissance et étude de marché. Création de devis et factures.',
      skills: ['Entrepreneuriat', 'Gestion client', 'Facturation', 'Étude de marché'],
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleItems(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item) => observer.observe(item));

    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, []);

  const getTypeColor = (type) => {
    switch (type) {
      case 'education': return 'bg-blue-500';
      case 'project': return 'bg-purple-500';
      case 'achievement': return 'bg-green-500';
      case 'certification': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section 
      ref={experienceRef}
      id="experience" 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mon <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Parcours</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Découvrez mon évolution professionnelle et académique à travers mes expériences et réalisations
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 rounded-full hidden md:block"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                data-index={index}
                className={`timeline-item relative transition-all duration-1000 ${
                  visibleItems.has(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}>
                  
                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? 'md:text-right' : ''
                  }`}>
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10">
                      
                      {/* Header */}
                      <div className={`flex items-start ${
                        index % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''
                      } mb-4`}>
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${exp.color} mr-4 ${
                          index % 2 === 0 ? 'md:mr-0 md:ml-4' : ''
                        }`}>
                          <exp.icon className="text-white text-xl" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                          <p className="text-purple-400 font-medium">{exp.organization}</p>
                          <p className="text-gray-400 text-sm">{exp.period}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Skills */}
                      <div className={`flex flex-wrap gap-2 ${
                        index % 2 === 0 ? 'md:justify-end' : ''
                      }`}>
                        {exp.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm border border-gray-600/50 hover:border-purple-500/50 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden md:flex w-2/12 justify-center">
                    <div className={`w-6 h-6 rounded-full ${getTypeColor(exp.type)} relative z-10 border-4 border-gray-900 shadow-lg`}>
                      <div className="absolute inset-0 rounded-full bg-current animate-ping opacity-20"></div>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 text-center hover:border-blue-500/30 transition-all duration-300">
            <div className="text-4xl font-bold text-blue-400 mb-2">1+</div>
            <div className="text-gray-300">Année à La Plateforme</div>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 text-center hover:border-purple-500/30 transition-all duration-300">
            <div className="text-4xl font-bold text-purple-400 mb-2">7+</div>
            <div className="text-gray-300">Projets réalisés</div>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 text-center hover:border-green-500/30 transition-all duration-300">
            <div className="text-4xl font-bold text-green-400 mb-2">5+</div>
            <div className="text-gray-300">Années d'expérience pro</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
