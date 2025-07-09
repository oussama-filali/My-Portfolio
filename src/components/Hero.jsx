import { useEffect, useRef } from 'react';
import { FaDownload, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Hero = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Stars particles
    const stars = [];
    const numStars = 150;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.8 + 0.2
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0f0f23');
      gradient.addColorStop(0.5, '#1a1a2e');
      gradient.addColorStop(1, '#16213e');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and animate stars
      stars.forEach(star => {
        ctx.save();
        ctx.globalAlpha = star.opacity;
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#ffffff';
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Move stars
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Twinkle effect
        star.opacity += Math.sin(Date.now() * 0.001 + star.x * 0.01) * 0.01;
        star.opacity = Math.max(0.2, Math.min(1, star.opacity));
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleDownloadCV = () => {
    // Télécharger le vrai CV depuis public/img
    const link = document.createElement('a');
    link.href = './img/cv-oussama-halima-filali.pdf';
    link.download = 'CV_Oussama_Halima_Filali.pdf';
    link.click();
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/50 -z-5"></div>

      {/* Main Content */}
      <div className="profile-container relative z-10 text-center text-white px-4 max-w-4xl mx-auto container-padding">
        {/* Profile Image */}
        <div className="mb-8 relative">
          <div className="profile-image w-40 h-40 mx-auto mb-6 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 animate-spin-slow"></div>
            <div className="absolute inset-2 rounded-full bg-gray-900 flex items-center justify-center">
              <img 
                src="./img/IMG_0159.JPG" 
                alt="Oussama Halima-Filali" 
                className="w-32 h-32 rounded-full object-cover border-2 border-white/20"
              />
            </div>
          </div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Typing Animation */}
        <div className="mb-8">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            Oussama Halima-Filali
          </h1>
          <div className="hero-subtitle text-xl md:text-2xl text-gray-300 mb-2">
            <span className="typing-animation">Développeur Full-Stack passionné</span>
          </div>
          <div className="text-lg text-gray-400">
            Étudiant en IT | Créateur d'expériences digitales
          </div>
        </div>

        {/* Description */}
        <p className="hero-description text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Passionné par l'innovation technologique, je transforme les idées en solutions digitales 
          élégantes et performantes. Découvrez mon univers créatif ! 🚀
        </p>

        {/* Action Buttons */}
        <div className="hero-buttons flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={handleDownloadCV}
            className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
          >
            <FaDownload className="group-hover:animate-bounce" />
            <span>Télécharger CV</span>
          </button>
          
          <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-medium border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            Voir mes projets
          </button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6">
          <a href="https://www.linkedin.com/in/halima-filali-oussama-780a32178/" target="_blank" rel="noopener noreferrer" 
             className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300 hover:scale-110">
            <FaLinkedin className="text-xl" />
          </a>
          <a href="https://github.com/oussama-filali" target="_blank" rel="noopener noreferrer"
             className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-all duration-300 hover:scale-110">
            <FaGithub className="text-xl" />
          </a>
          <a href="mailto:oussama.halimafilali.pro@gmail.com"
             className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all duration-300 hover:scale-110">
            <FaEnvelope className="text-xl" />
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-600/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-blue-600/20 rounded-full blur-xl animate-float-delayed"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-cyan-600/20 rounded-full blur-xl animate-float"></div>
    </section>
  );
};

export default Hero;
