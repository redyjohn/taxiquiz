import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'
import WelcomePage from './components/WelcomePage'
import HomePage from './components/HomePage'
import GuidePage from './components/GuidePage'
import NoticePage from './components/NoticePage'
import ArticleContent from './components/ArticleContent'
import QuizPage from './components/QuizPage'
import PrivacyPolicy from './components/PrivacyPolicy'
import AboutPage from './components/AboutPage'
import Footer from './components/Footer'
import './App.css'

function App() {
  const navigate = useNavigate()

  return (
    <div className="App">
      <div className="app-content">
        <Routes>
          <Route path="/" element={
            <WelcomePage onNavigate={(page) => navigate(page === 'welcome' ? '/' : `/${page}`)} />
          } />
          <Route path="/practice" element={
            <HomePage
              onStartQuiz={(config) => navigate('/quiz', { state: { config } })}
              onBack={() => navigate('/')}
            />
          } />
          <Route path="/read" element={
            <GuidePage onBack={() => navigate('/')} />
          } />
          <Route path="/guide" element={<NoticePage />} />
          <Route path="/guide/:slug" element={<ArticleContent />} />
          <Route path="/notice" element={<Navigate to="/guide" replace />} />
          <Route path="/quiz" element={
            <QuizPageWrapper onBack={() => navigate('/practice')} />
          } />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

function QuizPageWrapper({ onBack }) {
  const location = useLocation()
  const quizConfig = location?.state?.config

  if (!quizConfig) {
    return <Navigate to="/" replace />
  }

  return <QuizPage quizConfig={quizConfig} onBack={onBack} />
}

export default App
