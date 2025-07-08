import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: FaLinkedin, 
      href: 'https://www.linkedin.com/in/halima-filali-oussama-780a32178/', 
      label: 'LinkedIn',
      color: 'hover:text-blue-500' 
    },
    { 
      icon: FaGithub, 
      href: 'https://github.com/oussama-filali', 
      label: 'GitHub',
      color: 'hover:text-gray-400' 
    },
    { 
      icon: FaEnvelope, 
      href: 'mailto:oussama.halimafilali.pro@gmail.com', 
      label: 'Email',
      color: 'hover:text-red-500' 
    }
  ];

  const quickLinks = [
    { label: 'Accueil', href: '#hero' },
    { label: 'À propos', href: '#about' },
    { label: 'Expérience', href: '#experience' },
    { label: 'Projets', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <footer id="contact" className="bg-gradient-to-b from-gray-900 to-black text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Profile Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">O</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Oussama Halima-Filali</h3>
                <p className="text-purple-400">Développeur Full-Stack</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Passionné par la création d'expériences digitales innovantes et performantes. 
              Toujours prêt à relever de nouveaux défis technologiques.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-400">
                <FaMapMarkerAlt className="text-purple-400" />
                <span>Marseille, France</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-400">
                <FaEnvelope className="text-purple-400" />
                <span>oussama.halimafilali.pro@gmail.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-400">
                <FaPhone className="text-purple-400" />
                <span>Disponible sur demande</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-6 text-purple-400">Navigation</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-6 text-purple-400">Restons connectés</h4>
            
            {/* Social Links */}
            <div className="flex justify-center md:justify-end space-x-4 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 bg-gray-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                  aria-label={social.label}
                >
                  <social.icon className="text-xl" />
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
              <h5 className="text-sm font-medium mb-3">Suivez mes actualités</h5>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 bg-gray-700/50 text-white placeholder-gray-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-600/50"
                />
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                  S'abonner
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Technologies Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h4 className="text-center text-lg font-semibold mb-6 text-purple-400">Technologies que j'utilise</h4>
          <div className="flex flex-wrap justify-center items-center gap-6 opacity-70">
            <img src="./assets/img/html_1532556.png" alt="HTML" className="h-8 w-8 hover:scale-110 transition-transform" />
            <img src="./assets/img/css-3_5968242.png" alt="CSS" className="h-8 w-8 hover:scale-110 transition-transform" />
            <img src="./assets/img/js_5968292.png" alt="JavaScript" className="h-8 w-8 hover:scale-110 transition-transform" />
            <img src="./assets/img/react.png" alt="React" className="h-8 w-8 hover:scale-110 transition-transform" />
            <img src="./assets/img/php_5968268.png" alt="PHP" className="h-8 w-8 hover:scale-110 transition-transform" />
            <img src="./assets/img/sql-server_17525027.png" alt="SQL" className="h-8 w-8 hover:scale-110 transition-transform" />
            <img src="./assets/img/figma_5968705.png" alt="Figma" className="h-8 w-8 hover:scale-110 transition-transform" />
            <img src="./assets/img/github_3291695.png" alt="GitHub" className="h-8 w-8 hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="flex items-center space-x-1 mb-4 md:mb-0">
            <span>© {currentYear} Oussama Halima-Filali. Fait avec</span>
            <FaHeart className="text-red-500 animate-pulse" />
            <span>et React</span>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Plan du site</a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600"></div>
      </div>
    </footer>
  );
};

export default Footer;
