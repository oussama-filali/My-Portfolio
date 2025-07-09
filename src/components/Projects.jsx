import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaExternalLinkAlt, FaPlay, FaCode, FaEye } from 'react-icons/fa';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState(new Set());
  const [projectClicks, setProjectClicks] = useState({});
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
      title: 'Projet Cuisine Up',
      description: 'Projet réalisé avec HTML, CSS et JavaScript pour la création d\'une page de recette de cuisine avec une interface utilisateur interactive (toujours en cours).',
      image: './img/cuisineup.gif',
      category: 'web',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/oussama-filali/cuisine-up',
      demo: 'https://oussama-filali.github.io/cuisine-up/',
      featured: true
    },
    {
      id: 2,
      title: 'Premier Portfolio',
      description: 'Premier projet en HTML, CSS et JS pour la création d\'un Portfolio (première expérience en programmation).',
      image: './img/porfolio1.gif',
      category: 'web',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/oussama-filali/my-portofolio',
      demo: 'https://oussama-filali.github.io/my-portofolio/'
    },
    {
      id: 3,
      title: 'Site Web de Quiz',
      description: 'Site Web de Quiz créé avec PHP et MySQL pour créer des questions et réponses interactives selon des thèmes spécifiques.',
      image: './img/quiz.gif',
      category: 'fullstack',
      technologies: ['PHP', 'MySQL', 'JavaScript', 'CSS'],
      github: '#',
      demo: '#'
    },
    {
      id: 4,
      title: 'Livre d\'Or Digital',
      description: 'Imaginez un site Web de Livre d\'Or où les utilisateurs peuvent ajouter leurs avis ou commentaires sur votre livre d\'or personnalisé avec des images et des vidéos de l\'événement et vous êtes l\'administrateur du site.',
      image: './img/livreor.gif',
      category: 'fullstack',
      technologies: ['PHP', 'MySQL', 'JavaScript', 'CSS'],
      github: '#',
      demo: '#'
    },
    {
      id: 5,
      title: 'Gestionnaire de Menu',
      description: 'Petit projet sympathique en PHP et MySQL de gestion menu pour restaurateurs.',
      image: './img/gestionmenu.gif',
      category: 'fullstack',
      technologies: ['PHP', 'MySQL', 'JavaScript', 'CSS'],
      github: '#',
      demo: '#'
    },
    {
      id: 6,
      title: 'L\'Artisan Pizzeria',
      description: 'Projet personnel de création d\'un site vitrine pour une pizzeria située à Marseille, avec une interface utilisateur améliorée grâce au framework Bootstrap jQuery.',
      image: './img/artisanpizza.gif',
      category: 'web',
      technologies: ['HTML', 'CSS', 'Bootstrap', 'jQuery'],
      github: 'https://github.com/oussama-filali/L-Artisan-Pizzeria',
      demo: 'https://oussama-filali.github.io/L-Artisan-Pizzeria/'
    },
    {
      id: 7,
      title: 'Site La Plateforme',
      description: 'Site web pour l\'école La Plateforme qui propose 3 jours portes ouvertes, avec gestion d\'inscription des élèves avec gestion des dates de présence et administrer avec accord et refus des inscrits selon le nombre de places restant.',
      image: './img/laplateforme.gif',
      category: 'fullstack',
      technologies: ['HTML', 'CSS', 'PHP', 'MySQL'],
      github: 'https://github.com/oussama-filali/site-la-plateforme',
      demo: 'https://github.com/oussama-filali/site-la-plateforme'
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // Fonction pour gérer les clics sur les projets
  const handleProjectClick = (projectId, type) => {
    setProjectClicks(prev => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        [type]: (prev[projectId]?.[type] || 0) + 1,
        total: (prev[projectId]?.total || 0) + 1
      }
    }));
  };

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
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 px-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
              }`}
            >
              <span>{category.icon}</span>
              <span className="hidden sm:inline">{category.name}</span>
              <span className="sm:hidden">{category.name.substring(0, 4)}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              data-project-id={project.id}
              className={`project-card group relative bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 mx-2 sm:mx-0 ${
                visibleProjects.has(project.id)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              } ${project.featured ? 'sm:col-span-2 lg:col-span-2' : ''}`}
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
                {/* Title & Real Stats */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  {projectClicks[project.id]?.total > 0 && (
                    <div className="text-xs text-purple-400 bg-purple-900/30 px-2 py-1 rounded">
                      {projectClicks[project.id].total} clics
                    </div>
                  )}
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
                    onClick={() => handleProjectClick(project.id, 'github')}
                    className="flex-1 bg-gray-700/50 hover:bg-gray-600/50 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <FaGithub />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleProjectClick(project.id, 'demo')}
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
