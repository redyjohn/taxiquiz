import { useState, useEffect } from 'react'
import { loadQuestionBank, filterQuestionsByRange, shuffleQuestions } from '../utils/questionLoader'
import { getQuestionBankPath } from '../data/questionStructure'
import QuizResult from './QuizResult'
import './QuizPage.css'

function QuizPage({ quizConfig, onBack }) {
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)

  useEffect(() => {
    loadQuestions()
  }, [])

  const loadQuestions = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const path = getQuestionBankPath(
        quizConfig.category,
        quizConfig.type,
        quizConfig.region
      )
      
      const questionBank = await loadQuestionBank(path)
      const filtered = filterQuestionsByRange(
        questionBank.questions,
        quizConfig.range.start,
        quizConfig.range.end
      )
      
      // 可選：打亂題目順序
      // const shuffled = shuffleQuestions(filtered)
      
      setQuestions(filtered)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleAnswerSelect = (questionId, answerIndex) => {
    if (isAnswered) return
    
    setAnswers({
      ...answers,
      [questionId]: answerIndex
    })
    setIsAnswered(true)
    
    // 自動跳轉到下一題
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        const nextIndex = currentIndex + 1
        setCurrentIndex(nextIndex)
        // 檢查下一題是否已回答
        const nextQuestionId = questions[nextIndex].id
        setIsAnswered(answers[nextQuestionId] !== undefined)
      } else {
        // 最後一題，自動提交
        setShowResult(true)
      }
    }, 100) // 100ms 短延遲，確保狀態更新完成
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      // 檢查下一題是否已回答
      const nextQuestionId = questions[nextIndex].id
      setIsAnswered(answers[nextQuestionId] !== undefined)
    } else {
      // 完成所有題目，顯示結果
      setShowResult(true)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1
      setCurrentIndex(prevIndex)
      // 檢查上一題是否已回答
      const prevQuestionId = questions[prevIndex].id
      setIsAnswered(answers[prevQuestionId] !== undefined)
    }
  }

  const handleSubmit = () => {
    setShowResult(true)
  }

  if (loading) {
    return (
      <div className="quiz-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>載入題目中...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="quiz-page">
        <div className="error-container">
          <h2>載入錯誤</h2>
          <p>{error}</p>
          <p className="hint">請確認題庫 JSON 檔案是否存在於正確的路徑</p>
          <button className="back-button" onClick={onBack}>
            返回首頁
          </button>
        </div>
      </div>
    )
  }

  if (showResult) {
    return (
      <QuizResult
        questions={questions}
        answers={answers}
        quizConfig={quizConfig}
        onBack={onBack}
        onRetry={() => {
          setCurrentIndex(0)
          setAnswers({})
          setShowResult(false)
          setIsAnswered(false)
        }}
        onRetryWrongQuestions={() => {
          // 篩選出錯誤的題目
          const wrongQuestions = questions.filter(
            (q) => answers[q.id] !== q.correctAnswer
          )
          // 重置為錯題模式
          setQuestions(wrongQuestions)
          setCurrentIndex(0)
          setAnswers({})
          setShowResult(false)
          setIsAnswered(false)
        }}
      />
    )
  }

  if (questions.length === 0) {
    return (
      <div className="quiz-page">
        <div className="error-container">
          <h2>沒有題目</h2>
          <p>此範圍內沒有找到題目</p>
          <button className="back-button" onClick={onBack}>
            返回首頁
          </button>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]
  const selectedAnswer = answers[currentQuestion.id]
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer

  return (
    <div className="quiz-page">
      <header className="quiz-header">
        <button className="back-button" onClick={onBack}>
          ← 返回
        </button>
        <div className="quiz-info">
          <h2>
            {quizConfig.category} - {quizConfig.type}
            {quizConfig.region && ` - ${quizConfig.region}`}
          </h2>
          <p className="progress">
            第 {currentIndex + 1} 題 / 共 {questions.length} 題
          </p>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </header>

      <div className="quiz-content">
        <div className="question-card">
          <div className="question-number">題目 {currentQuestion.id}</div>
          <h3 className="question-text">{currentQuestion.question}</h3>

          <div className="options-container">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index

              return (
                <button
                  key={index}
                  className={`option-button ${
                    isSelected ? 'selected' : ''
                  }`}
                  onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                  disabled={isAnswered}
                >
                  <span className="option-label">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className="option-text">{option}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="quiz-controls">
          <button
            className="nav-button"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            上一題
          </button>

          {currentIndex === questions.length - 1 ? (
            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={!isAnswered}
            >
              完成測驗
            </button>
          ) : (
            <button
              className="nav-button primary"
              onClick={handleNext}
              disabled={!isAnswered}
            >
              下一題
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuizPage

