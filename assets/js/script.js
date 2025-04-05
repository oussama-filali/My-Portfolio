// Animation du titre avec effet Pixar
const texte = "Bienvenue sur mon Portfolio";
const titreElement = document.getElementById("title");

function animerTexte() {
    const lettres = texte.split("");
    lettres.forEach((lettre, index) => {
        const span = document.createElement("span");
        span.textContent = lettre;
        span.style.animationDelay = `${index * 0.1}s`;
        if (lettre === " ") {
            span.style.width = "0.5em";
        }
        titreElement.appendChild(span);
    });
}

// Initialisation au chargement
window.onload = function() {
    animerTexte();
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#ffffff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": false },
            "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "repulse" } }
        }
    });
};

// GSAP et ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animation du header
gsap.from("header", { y: -100, opacity: 0, duration: 1.5, ease: "power4.out" });

// Animation du titre et texte d'accueil
gsap.from(".stars-container h1, .stars-container p", { duration: 1.5, y: 100, opacity: 0, stagger: 0.3, ease: "power4.out" });

// Animation du carrousel
gsap.from(".carousel-container", { scrollTrigger: { trigger: ".carousel-container", start: "top center" }, opacity: 0, y: 100, duration: 1 });

// Animation À propos
gsap.from(".a-propos-text", { scrollTrigger: { trigger: "#a-propos", start: "top center" }, duration: 1.5, x: -100, opacity: 0 });
gsap.from(".a-propos-image img", {
    scrollTrigger: { trigger: ".a-propos-image", start: "top 80%", toggleActions: "play none none reverse" },
    duration: 1.5,
    opacity: 1,
    scale: 1,
    ease: "elastic.out(1, 0.5)",
    stagger: 0.2
});

// Animation des projets
gsap.from(".project-card", { scrollTrigger: { trigger: "#projets", start: "top center" }, duration: 1, y: 100, opacity: 0, stagger: 0.2, ease: "back.out(1.7)" });

// Animation du footer
gsap.from(".footer-basic", { scrollTrigger: { trigger: "footer", start: "top bottom" }, duration: 1, y: 50, opacity: 0 });

// Bouton Retour en haut
const boutonRetour = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    boutonRetour.style.display = window.scrollY > 300 ? "block" : "none";
});

boutonRetour.addEventListener("click", () => {
    gsap.to(window, { duration: 1, scrollTo: 0, ease: "power2.inOut" });
});

// Défilement automatique des images
const carouselImages = document.querySelectorAll(".image-container img");
let indexActuel = 0;

function afficherImageSuivante() {
    carouselImages[indexActuel].classList.remove("active");
    indexActuel = (indexActuel + 1) % carouselImages.length;
    carouselImages[indexActuel].classList.add("active");
}

setInterval(afficherImageSuivante, 3000);

// Effet header scrolled
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var images = document.querySelectorAll('.a-propos-image');
    images.forEach(function(image, index) {
        setTimeout(function() {
            image.classList.add('visible');
            setTimeout(function() {
                image.classList.remove('visible');
                image.classList.add('hidden');
            }, 5000); // Les images disparaissent après 5 secondes
        }, index * 500); // Délai de 500ms entre chaque image
    });
});

// Ajout de la classe active pour la navigation
document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 50) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
});

// Détection de Firefox
const isFirefox = typeof InstallTrigger !== 'undefined';

if (!isFirefox) {
    // Appliquer les animations uniquement si ce n'est pas Firefox
    gsap.fromTo(".timeline .experience-card", 
        { opacity: 0, y: 50 },
        {
            scrollTrigger: {
                trigger: ".timeline .experience-card",
                start: "top 80%",
                scrub: true,
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4.out"
        }
    );
}

// Animation des cartes de la timeline
gsap.utils.toArray(".timeline .experience-card").forEach((card, i) => {
    console.log(`Animation déclenchée pour la carte ${i + 1}`); // Debug
    gsap.fromTo(
        card,
        { opacity: 0, y: 50 }, // Valeurs initiales
        {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.2,
            ease: "power4.out",
            onComplete: () => {
                console.log(`Animation terminée pour la carte ${i + 1}`);
            }
        }
    );
});
