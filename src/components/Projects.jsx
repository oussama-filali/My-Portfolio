import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaExternalLinkAlt, FaPlay, FaCode, FaEye } from 'react-icons/fa';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState(new Set());
  const projectsRef = useRef(null);

  const categories = [
    { id: 'all', name: 'Tous', icon: '🚀' },
    { id: 'web', name: 'Web', icon: '🌐' },
    { id: 'mobile', name: 'Mobile', icon: '📱' },
    { id: 'fullstack', name: 'Full-Stack', icon: '⚡' },
    { id: 'other', name: 'Autres', icon: '🎯' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Portfolio Interactif',
      description: 'Portfolio moderne avec bot IA intégré, animations avancées et design galactique responsive.',
      image: '/assets/img/porfolio1.gif',
      category: 'web',
      technologies: ['React', 'Tailwind CSS', 'Vite', 'IA'],
      github: 'https://github.com/oussama-filali/portfolio',
      demo: 'https://oussama-filali.github.io/My-Portfolio/',
      featured: true,
      stats: { views: '2.5k', stars: 45 }
    },
    {
      id: 2,
      title: 'Système de Gestion Menu',
      description: 'Application de gestion de menus pour restaurants avec interface admin complète.',
      image: '/assets/img/gestionmenu.gif',
      category: 'fullstack',
      technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
      github: 'https://github.com/oussama-filali/menu-management',
      demo: '#',
      stats: { views: '1.8k', stars: 32 }
    },
    {
      id: 3,
      title: 'CuisineUp Platform',
      description: 'Plateforme de partage de recettes avec système de notation et communauté active.',
      image: '/assets/img/cuisineup.gif',
      category: 'web',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      github: 'https://github.com/oussama-filali/cuisineup',
      demo: '#',
      stats: { views: '3.2k', stars: 67 }
    },
    {
      id: 4,
      title: 'Artisan Pizza',
      description: 'Site e-commerce pour pizzeria avec commande en ligne et paiement intégré.',
      image: '/assets/img/artisanpizza.gif',
      category: 'fullstack',
      technologies: ['PHP', 'MySQL', 'PayPal API', 'jQuery'],
      github: 'https://github.com/oussama-filali/artisan-pizza',
      demo: '#',
      stats: { views: '2.1k', stars: 28 }
    },
    {
      id: 5,
      title: 'Quiz Interactif',
      description: 'Application de quiz en temps réel avec système de scoring et classements.',
      image: '/assets/img/quiz.gif',
      category: 'web',
      technologies: ['JavaScript', 'WebSocket', 'CSS3', 'HTML5'],
      github: 'https://github.com/oussama-filali/interactive-quiz',
      demo: '#',
      stats: { views: '1.5k', stars: 23 }
    },
    {
      id: 6,
      title: 'Livre d\'Or Digital',
      description: 'Livre d\'or numérique avec modération automatique et export PDF.',
      image: '/assets/img/livreor.gif',
      category: 'web',
      technologies: ['React', 'Firebase', 'PDF.js', 'Material-UI'],
      github: 'https://github.com/oussama-filali/digital-guestbook',
      demo: '#',
      stats: { views: '1.2k', stars: 19 }
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = parseInt(entry.target.dataset.projectId);
            setVisibleProjects(prev => new Set([...prev, projectId]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => observer.observe(card));

    return () => {
      projectCards.forEach((card) => observer.unobserve(card));
    };
  }, [filteredProjects]);

  return (
    <section 
      ref={projectsRef}
      id="projects" 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mes <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Projets</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Découvrez mes créations digitales, de l'idée à la réalisation
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              data-project-id={project.id}
              className={`project-card group relative bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 ${
                visibleProjects.has(project.id)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              } ${project.featured ? 'lg:col-span-2' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ⭐ FEATURED
                  </span>
                </div>
              )}

              {/* Image Container */}
              <div className="relative overflow-hidden h-48 lg:h-56">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex space-x-2">
                      <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors">
                        <FaPlay className="text-sm" />
                      </button>
                      <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors">
                        <FaCode className="text-sm" />
                      </button>
                      <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors">
                        <FaEye className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title & Stats */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span className="flex items-center">
                      <FaEye className="mr-1" />
                      {project.stats.views}
                    </span>
                    <span className="flex items-center">
                      ⭐ {project.stats.stars}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs border border-gray-600/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-700/50 hover:bg-gray-600/50 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <FaGithub />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center space-x-2"
                  >
                    <FaExternalLinkAlt />
                    <span>Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Prêt à collaborer ? 🚀
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              J'ai d'autres projets passionnants en cours de développement. 
              Contactez-moi pour discuter de vos idées !
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
              Voir plus de projets
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
