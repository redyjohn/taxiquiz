import { useState } from 'react'
import HomePage from './components/HomePage'
import QuizPage from './components/QuizPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [quizConfig, setQuizConfig] = useState(null)

  const handleStartQuiz = (config) => {
    setQuizConfig(config)
    setCurrentPage('quiz')
  }

  const handleBack = () => {
    setCurrentPage('home')
    setQuizConfig(null)
  }

  return (
    <div className="App">
      {currentPage === 'home' && <HomePage onStartQuiz={handleStartQuiz} />}
      {currentPage === 'quiz' && quizConfig && (
        <QuizPage quizConfig={quizConfig} onBack={handleBack} />
      )}
    </div>
  )
}

export default App
