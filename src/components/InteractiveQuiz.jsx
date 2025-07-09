import { useState, useEffect } from 'react';
import { FaQuestion, FaCheck, FaTimes, FaTrophy, FaRedo } from 'react-icons/fa';

const InteractiveQuiz = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);

  const questions = [
    {
      question: "Quelle est la spécialité principale d'Oussama ?",
      options: [
        "Développement Front-End uniquement",
        "Développement Full-Stack avec passion pour l'humain",
        "Design graphique",
        "Marketing digital"
      ],
      correct: 1,
      explanation: "Oussama est un développeur Full-Stack passionné par les projets humains et porteurs de valeurs !"
    },
    {
      question: "Quelle est sa plus grande force interpersonnelle ?",
      options: [
        "La patience (85%)",
        "L'écoute active (90%)",
        "La résilience (95%)",
        "L'engagement (92%)"
      ],
      correct: 2,
      explanation: "La résilience à 95% ! Oussama a mené des batailles contre les échecs de la vie comme un champion."
    },
    {
      question: "Où étudie-t-il actuellement ?",
      options: [
        "Université de Marseille",
        "École 42",
        "La Plateforme à Marseille",
        "Formation en ligne"
      ],
      correct: 2,
      explanation: "Il est en première année de Bachelor IT à La Plateforme à Marseille !"
    },
    {
      question: "Que recherche-t-il actuellement ?",
      options: [
        "Un stage de 3 mois",
        "Un CDI immédiat",
        "Une alternance dans une entreprise innovante",
        "Du freelancing"
      ],
      correct: 2,
      explanation: "Il cherche une alternance pour intégrer une entreprise dynamique et innovante !"
    },
    {
      question: "Quel est son projet favori ?",
      options: [
        "Son premier portfolio",
        "Cuisine Up (site de recettes)",
        "Quiz en PHP",
        "L'Artisan Pizzeria"
      ],
      correct: 1,
      explanation: "Cuisine Up est son projet le plus abouti, avec une interface interactive en HTML, CSS et JavaScript !"
    }
  ];

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedAnswer === questions[currentQuestion].correct;
    const newUserAnswers = [...userAnswers, {
      question: currentQuestion,
      selected: selectedAnswer,
      correct: questions[currentQuestion].correct,
      isCorrect
    }];
    
    setUserAnswers(newUserAnswers);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setUserAnswers([]);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "🎉 Expert Oussama ! Tu le connais par cœur !";
    if (percentage >= 60) return "👏 Très bien ! Tu commences à bien le cerner !";
    if (percentage >= 40) return "🤔 Pas mal ! Mais tu peux mieux faire !";
    return "😅 Il faut relire son portfolio ! Allez, encore un effort !";
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 group hover:scale-105"
      >
        <FaQuestion className="group-hover:animate-bounce" />
        <span className="font-medium">Quiz Oussama</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900/95 backdrop-blur-lg border border-gray-700/50 rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        
        {!showResult ? (
          <>
            {/* Header */}
            <div className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-green-600/20 to-teal-600/20">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <FaQuestion className="mr-3 text-green-400" />
                    Quiz Oussama
                  </h2>
                  <p className="text-gray-400">Teste tes connaissances sur mon profil !</p>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold text-lg">{score}/{questions.length}</div>
                  <div className="text-gray-400 text-sm">Question {currentQuestion + 1}</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4 w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-6">
                {questions[currentQuestion].question}
              </h3>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left rounded-lg border transition-all duration-300 ${
                      selectedAnswer === index
                        ? 'bg-green-600/20 border-green-500 text-white'
                        : 'bg-gray-800/30 border-gray-700/50 text-gray-300 hover:bg-gray-700/50 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                        selectedAnswer === index ? 'border-green-500 bg-green-500' : 'border-gray-500'
                      }`}>
                        {selectedAnswer === index && <FaCheck className="text-white text-xs" />}
                      </div>
                      {option}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Fermer
                </button>
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentQuestion + 1 === questions.length ? 'Terminer' : 'Suivant'}
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Results */
          <div className="p-6 text-center">
            <div className="mb-6">
              <FaTrophy className="text-6xl text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Quiz Terminé !</h2>
              <p className="text-gray-400">{getScoreMessage()}</p>
            </div>

            <div className="bg-gray-800/30 rounded-xl p-6 mb-6">
              <div className="text-4xl font-bold text-green-400 mb-2">
                {score}/{questions.length}
              </div>
              <div className="text-gray-300">
                Score : {Math.round((score / questions.length) * 100)}%
              </div>
            </div>

            {/* Detailed Results */}
            <div className="text-left space-y-4 mb-6">
              {userAnswers.map((answer, index) => (
                <div key={index} className="bg-gray-800/30 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    {answer.isCorrect ? (
                      <FaCheck className="text-green-500 mr-2" />
                    ) : (
                      <FaTimes className="text-red-500 mr-2" />
                    )}
                    <span className="font-medium text-white">Question {index + 1}</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{questions[answer.question].question}</p>
                  {!answer.isCorrect && (
                    <p className="text-xs text-green-400">{questions[answer.question].explanation}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-gray-800/50 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700/50 transition-colors"
              >
                Fermer
              </button>
              <button
                onClick={resetQuiz}
                className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
              >
                <FaRedo />
                <span>Recommencer</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveQuiz;
