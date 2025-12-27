import { useState } from 'react'
import WelcomePage from './components/WelcomePage'
import HomePage from './components/HomePage'
import GuidePage from './components/GuidePage'
import NoticePage from './components/NoticePage'
import QuizPage from './components/QuizPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('welcome')
  const [quizConfig, setQuizConfig] = useState(null)

  const handleNavigate = (page) => {
    setCurrentPage(page)
  }

  const handleStartQuiz = (config) => {
    setQuizConfig(config)
    setCurrentPage('quiz')
  }

  const handleBack = () => {
    setCurrentPage('practice')
    setQuizConfig(null)
  }

  const handleBackToWelcome = () => {
    setCurrentPage('welcome')
    setQuizConfig(null)
  }

  return (
    <div className="App">
      {currentPage === 'welcome' && <WelcomePage onNavigate={handleNavigate} />}
      {currentPage === 'practice' && <HomePage onStartQuiz={handleStartQuiz} onBack={handleBackToWelcome} />}
      {currentPage === 'guide' && <GuidePage onBack={handleBackToWelcome} />}
      {currentPage === 'notice' && <NoticePage onBack={handleBackToWelcome} />}
      {currentPage === 'quiz' && quizConfig && (
        <QuizPage quizConfig={quizConfig} onBack={handleBack} />
      )}
    </div>
  )
}

export default App
