import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import { useState } from 'react';
import LegalPages from './LegalPages';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [activeLegalPage, setActiveLegalPage] = useState(null);

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
    <footer id="contact" className="py-16 text-white bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl px-4 mx-auto">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-3">
          
          {/* Profile Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center mb-4 space-x-3 md:justify-start">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
                <span className="text-xl font-bold text-white">O</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Oussama Halima-Filali</h3>
                <p className="text-purple-400">Développeur Full-Stack</p>
              </div>
            </div>
            <p className="mb-6 leading-relaxed text-gray-400">
              Passionné par la création d'expériences digitales innovantes et performantes. 
              Toujours prêt à relever de nouveaux défis technologiques.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center space-x-2 text-gray-400 md:justify-start">
                <FaMapMarkerAlt className="text-purple-400" />
                <span>Marseille, France</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-400 md:justify-start">
                <FaEnvelope className="text-purple-400" />
                <span>oussama.halimafilali.pro@gmail.com</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-400 md:justify-start">
                <FaPhone className="text-purple-400" />
                <a href="tel:+33123456789" className="transition-colors hover:text-white">
                  +33 7 68 30 67 01
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="mb-6 text-lg font-semibold text-purple-400">Navigation</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-400 transition-colors duration-300 hover:text-white hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="text-center md:text-right">
            <h4 className="mb-6 text-lg font-semibold text-purple-400">Restons connectés</h4>
            
            {/* Social Links */}
            <div className="flex justify-center mb-6 space-x-4 md:justify-end">
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
            <div className="p-4 border bg-gray-800/30 backdrop-blur-sm rounded-xl border-gray-700/50">
              <h5 className="mb-3 text-sm font-medium">Suivez mes actualités</h5>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-3 py-2 text-sm text-white placeholder-gray-400 border rounded-lg bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border-gray-600/50"
                />
                <button className="px-4 py-2 text-sm font-medium text-white transition-opacity rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90">
                  S'abonner
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Technologies Section */}
        <div className="pt-8 mb-8 border-t border-gray-800">
          <h4 className="mb-6 text-lg font-semibold text-center text-purple-400">Technologies que j'utilise</h4>
          <div className="flex flex-wrap items-center justify-center gap-6 opacity-70">
            <img src="./img/html_1532556.png" alt="HTML" className="w-8 h-8 transition-transform hover:scale-110" />
            <img src="./img/css-3_5968242.png" alt="CSS" className="w-8 h-8 transition-transform hover:scale-110" />
            <img src="./img/js_5968292.png" alt="JavaScript" className="w-8 h-8 transition-transform hover:scale-110" />
            <img src="./img/react.png" alt="React" className="w-8 h-8 transition-transform hover:scale-110" />
            <img src="./img/php_5968268.png" alt="PHP" className="w-8 h-8 transition-transform hover:scale-110" />
            <img src="./img/sql-server_17525027.png" alt="SQL" className="w-8 h-8 transition-transform hover:scale-110" />
            <img src="./img/figma_5968705.png" alt="Figma" className="w-8 h-8 transition-transform hover:scale-110" />
            <img src="./img/github_3291695.png" alt="GitHub" className="w-8 h-8 transition-transform hover:scale-110" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between pt-8 text-sm text-gray-400 border-t border-gray-800 md:flex-row">
          <div className="flex items-center mb-4 space-x-1 md:mb-0">
            <span>© {currentYear} Oussama Halima-Filali. Fait avec</span>
            <FaHeart className="text-red-500 animate-pulse" />
            <span>et React</span>
          </div>
          
          <div className="flex space-x-6">
            <button 
              onClick={() => setActiveLegalPage('privacy')}
              className="transition-colors hover:text-white cursor-pointer"
            >
              Politique de confidentialité
            </button>
            <button 
              onClick={() => setActiveLegalPage('legal')}
              className="transition-colors hover:text-white cursor-pointer"
            >
              Mentions légales
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600"></div>
      </div>

      {/* Legal Pages Modal */}
      <LegalPages 
        page={activeLegalPage} 
        onClose={() => setActiveLegalPage(null)} 
      />
    </footer>
  );
};

export default Footer;
