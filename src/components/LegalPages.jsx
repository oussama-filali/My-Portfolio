import { useState } from 'react';
import { FaTimes, FaGavel, FaShieldAlt, FaLaugh, FaCode, FaBug } from 'react-icons/fa';

const LegalPages = ({ page, onClose }) => {
  if (!page) return null;

  const legalContent = {
    legal: {
      title: "Mentions Légales 📜",
      icon: FaGavel,
      content: (
        <div className="space-y-6 text-gray-300">
          <div className="p-4 border rounded-lg bg-yellow-900/20 border-yellow-500/30">
            <h3 className="flex items-center mb-3 text-xl font-bold text-yellow-400">
              <FaLaugh className="mr-2" />
              Article 1 : Obligation de Collaboration 🤝
            </h3>
            <p className="leading-relaxed">
              En vertu de la loi fictive n°2025-42 sur la "Collaboration Numérique Obligatoire", 
              toute personne visitant ce portfolio s'engage moralement à :
            </p>
            <ul className="mt-3 ml-6 space-y-1 list-disc">
              <li>Me contacter pour toute opportunité de collaboration 😄</li>
              <li>Partager ce portfolio à au moins 3 personnes (c'est dans le règlement !)</li>
              <li>Laisser un commentaire positif sur mes projets</li>
              <li>M'inviter à prendre un café virtuel ☕</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg bg-purple-900/20 border-purple-500/30">
            <h3 className="mb-3 text-xl font-bold text-purple-400">
              Article 2 : Loi sur les Compétences en Développement 💻
            </h3>
            <p className="leading-relaxed">
              Conformément au décret fictif n°2025-DEV, ce site certifie que :
            </p>
            <ul className="mt-3 ml-6 space-y-1 list-disc">
              <li>Tous les bugs sont des "features" non documentées</li>
              <li>Le code fonctionne parfaitement sur ma machine 🖥️</li>
              <li>Toute ressemblance avec du code existant est purement coïncidentelle</li>
              <li>Les heures de développement incluent le temps passé à chercher des solutions sur Stack Overflow</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg bg-green-900/20 border-green-500/30">
            <h3 className="mb-3 text-xl font-bold text-green-400">
              Article 3 : Responsabilité du Visiteur 👀
            </h3>
            <p className="leading-relaxed">
              Le visiteur s'engage à :
            </p>
            <ul className="mt-3 ml-6 space-y-1 list-disc">
              <li>Être impressionné par mes créations (c'est obligatoire !)</li>
              <li>Ne pas juger mes premiers projets trop sévèrement</li>
              <li>Comprendre que "ça marche chez moi" est une excuse valide</li>
              <li>Apprécier l'humour intégré dans ce portfolio</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg bg-red-900/20 border-red-500/30">
            <h3 className="flex items-center mb-3 text-xl font-bold text-red-400">
              <FaBug className="mr-2" />
              Article 4 : Support Technique 🛠️
            </h3>
            <p className="leading-relaxed">
              En cas de problème technique, dysfonctionnement, ou si vous trouvez quelque chose d'incorrect :
            </p>
            <ul className="mt-3 ml-6 space-y-1 list-disc">
              <li>Contactez immédiatement l'équipe support (moi, tout seul dans mon salon)</li>
              <li>Décrivez le problème avec un maximum de détails et de captures d'écran</li>
              <li>Soyez patient, l'équipe support (toujours moi) fait de son mieux</li>
              <li>Un petit encouragement ne fait jamais de mal ! 😊</li>
            </ul>
            <div className="p-3 mt-3 rounded bg-gray-800/50">
              <p className="text-sm font-medium">
                📧 Support : oussama.halimafilali.pro@gmail.com<br />
                📞 Hotline : +33 7 68 30 67 01<br />
                ⏰ Disponibilité : Quand je ne dors pas (souvent la nuit en codant)
              </p>
            </div>
          </div>

          <div className="p-4 mt-8 text-center rounded-lg bg-gray-800/30">
            <p className="text-sm text-gray-400">
              Ces mentions légales ont été rédigées avec amour, humour et une bonne dose de caféine ☕<br />
              <span className="text-purple-400">Dernière mise à jour :</span> Quand j'ai eu cette idée géniale !
            </p>
          </div>
        </div>
      )
    },
    privacy: {
      title: "Politique de Confidentialité 🔒",
      icon: FaShieldAlt,
      content: (
        <div className="space-y-6 text-gray-300">
          <div className="p-4 border rounded-lg bg-blue-900/20 border-blue-500/30">
            <h3 className="flex items-center mb-3 text-xl font-bold text-blue-400">
              <FaShieldAlt className="mr-2" />
              Protection de vos Données Ultra-Secrètes 🕵️
            </h3>
            <p className="leading-relaxed">
              Conformément au RGPD (Règlement Général sur la Protection des Données) et à ma politique 
              personnelle "Je-ne-vends-pas-vos-infos-parce-que-personne-ne-les-achèterait" :
            </p>
            <ul className="mt-3 ml-6 space-y-1 list-disc">
              <li>Vos données sont gardées plus secrètement que la recette du Coca-Cola 🥤</li>
              <li>Je ne les partage qu'avec mon chat (et il a signé un accord de confidentialité)</li>
              <li>Elles sont stockées dans un coffre-fort virtuel ultra-sécurisé (mon ordinateur portable)</li>
              <li>Backup quotidien sur ma clé USB "super importante" 💾</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg bg-indigo-900/20 border-indigo-500/30">
            <h3 className="mb-3 text-xl font-bold text-indigo-400">
              Cookies et Autres Petites Bêtes 🍪
            </h3>
            <p className="leading-relaxed">
              Ce site utilise des cookies, pas ceux qu'on mange (dommage !) :
            </p>
            <ul className="mt-3 ml-6 space-y-1 list-disc">
              <li>Cookies techniques : Pour que le site fonctionne (sinon c'est le chaos)</li>
              <li>Cookies de préférence : Pour mémoriser que vous m'aimez bien</li>
              <li>Cookies analytiques : Pour savoir que vous existez (c'est rassurant)</li>
              <li>Cookies de performance : Pour mesurer à quel point je suis génial 📈</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg bg-teal-900/20 border-teal-500/30">
            <h3 className="mb-3 text-xl font-bold text-teal-400">
              Vos Droits Inaliénables 👑
            </h3>
            <p className="leading-relaxed">
              Vous avez le droit de :
            </p>
            <ul className="mt-3 ml-6 space-y-1 list-disc">
              <li>Demander une copie de vos données (je vous enverrai un selfie)</li>
              <li>Modifier vos informations (mais gardez votre nom, j'ai une bonne mémoire)</li>
              <li>Supprimer vos données (snif 😢)</li>
              <li>Partir quand vous voulez (mais pourquoi le feriez-vous ?)</li>
              <li>Me dire bonjour quand vous revenez 👋</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg bg-pink-900/20 border-pink-500/30">
            <h3 className="flex items-center mb-3 text-xl font-bold text-pink-400">
              <FaCode className="mr-2" />
              Sécurité Maximale 🛡️
            </h3>
            <p className="leading-relaxed">
              Vos informations sont protégées par :
            </p>
            <ul className="mt-3 ml-6 space-y-1 list-disc">
              <li>Un mot de passe ultra-complexe : "motdepasse123" (chut ! 🤫)</li>
              <li>Une authentification à double facteur (mon chien et mon chat)</li>
              <li>Un firewall impénétrable (j'ai débranché le WiFi des voisins)</li>
              <li>Un système de surveillance 24h/24 (moi, avec du café)</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg bg-orange-900/20 border-orange-500/30">
            <h3 className="flex items-center mb-3 text-xl font-bold text-orange-400">
              <FaBug className="mr-2" />
              Problème de Confidentialité ? 🚨
            </h3>
            <p className="leading-relaxed">
              Si vous pensez que vos données ont été compromises ou si quelque chose cloche :
            </p>
            <ul className="mt-3 ml-6 space-y-1 list-disc">
              <li>Contactez immédiatement le DPO (Data Protection Oussama) 📞</li>
              <li>Envoyez un signal de fumée (ou un email, c'est plus pratique)</li>
              <li>Je répondrai plus vite qu'un développeur qui trouve un bug en production</li>
              <li>Solution garantie ou café offert ☕</li>
            </ul>
            <div className="p-3 mt-3 rounded bg-gray-800/50">
              <p className="text-sm font-medium">
                📧 DPO Personnel : oussama.halimafilali.pro@gmail.com<br />
                📞 Ligne Rouge : +33 7 68 30 67 01<br />
                ⚡ Réponse sous 24h (sauf si je dors, mange ou code)
              </p>
            </div>
          </div>

          <div className="p-4 mt-8 text-center rounded-lg bg-gray-800/30">
            <p className="text-sm text-gray-400">
              Cette politique de confidentialité a été rédigée avec sérieux... et beaucoup d'humour ! 😄<br />
              <span className="text-blue-400">Promis :</span> Vos données sont vraiment en sécurité avec moi !<br />
              <span className="text-purple-400">Dernière mise à jour :</span> Pendant ma pause café de 15h
            </p>
          </div>
        </div>
      )
    }
  };

  const currentContent = legalContent[page];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900/95 backdrop-blur-lg border border-gray-700/50 rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto m-4 w-full">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b bg-gray-900/95 backdrop-blur-lg border-gray-700/50">
          <h2 className="flex items-center text-2xl font-bold text-white">
            <currentContent.icon className="mr-3 text-purple-400" />
            {currentContent.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 transition-colors rounded-lg hover:text-white hover:bg-gray-800/50"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentContent.content}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 p-4 text-center border-t bg-gray-900/95 backdrop-blur-lg border-gray-700/50">
          <button
            onClick={onClose}
            className="px-6 py-2 font-medium text-white transition-opacity rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90"
          >
            Fermer (et garder le sourire 😊)
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalPages;
