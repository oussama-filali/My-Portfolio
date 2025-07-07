import { useState } from 'react'

function App() {
  return (
    <div className="App">
      {/* Header */}
      <header>
        <nav className="bg-gray-900 text-white p-4">
          <ul className="flex space-x-6">
            <li><a href="#accueil" className="hover:text-blue-400 transition-colors">Accueil</a></li>
            <li><a href="#a-propos" className="hover:text-blue-400 transition-colors">À propos</a></li>
            <li><a href="#projets" className="hover:text-blue-400 transition-colors">Projets</a></li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Section Accueil */}
        <section id="accueil" className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">
              Portfolio - Oussama Halima-Filali
            </h1>
            <p className="text-xl mb-8">Découvrez mes projets et mon parcours.</p>
          </div>
        </section>

        {/* Section Technologies */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center space-x-8 opacity-70">
              <img src="/img/html_1532556.png" alt="Logo HTML" className="h-12 w-12" />
              <img src="/img/css-3_5968242.png" alt="Logo CSS" className="h-12 w-12" />
              <img src="/img/js_5968292.png" alt="Logo JavaScript" className="h-12 w-12" />
              <img src="/img/react.png" alt="Logo React" className="h-12 w-12" />
              <img src="/img/figma_5968705.png" alt="Logo Figma" className="h-12 w-12" />
              <img src="/img/github_3291695.png" alt="Logo GitHub" className="h-12 w-12" />
            </div>
          </div>
        </div>

        {/* Section À propos */}
        <section id="a-propos" className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">À propos de moi</h2>
              <p className="text-lg text-gray-700 text-center">
                Étudiant en IT passionné par le développement web et mobile. 
                Je crée des solutions innovantes avec les dernières technologies.
              </p>
            </div>
          </div>
        </section>

        {/* Section Projets */}
        <section id="projets" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Mes Projets</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Exemple de carte projet */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img src="/img/porfolio1.gif" alt="Portfolio" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Portfolio</h3>
                  <p className="text-gray-600">Mon portfolio personnel créé avec React et Tailwind CSS.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
