import { useState, useEffect } from 'react'
import { loadQuestionBank, filterQuestionsByRange, shuffleQuestions } from '../utils/questionLoader'
import { getQuestionBankPath } from '../data/questionStructure'
import QuizResult from './QuizResult'
import AdBanner from './AdBanner'
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

  const buildSimulatedRegulationsQuestions = async () => {
    const mcPath = getQuestionBankPath('法規', '選擇題', '')
    const tfPath = getQuestionBankPath('法規', '是非題', '')
    const [mcBank, tfBank] = await Promise.all([
      loadQuestionBank(mcPath),
      loadQuestionBank(tfPath)
    ])

    const mcCount = 25
    const tfCount = 25

    // 需求：1-25 題固定為選擇題、26-50 題固定為是非題（各自隨機抽題/打亂）
    const sampledMc = shuffleQuestions(mcBank.questions)
      .slice(0, Math.min(mcCount, mcBank.questions.length))
      .map((q) => ({ ...q, _source: '選擇題' }))
    const sampledTf = shuffleQuestions(tfBank.questions)
      .slice(0, Math.min(tfCount, tfBank.questions.length))
      .map((q) => ({ ...q, _source: '是非題' }))

    const merged = [...sampledMc, ...sampledTf]

    // 重新編號，避免不同題庫 id 衝突（答案紀錄用 id 當 key）
    return merged.map((q, idx) => ({
      ...q,
      id: idx + 1
    }))
  }

  const buildSimulatedGeographyQuestions = async () => {
    // 載入三個地區的選擇題和是非題
    const mcPaths = [
      getQuestionBankPath('地理', '選擇題', '彰化'),
      getQuestionBankPath('地理', '選擇題', '南投'),
      getQuestionBankPath('地理', '選擇題', '台中')
    ]
    const tfPaths = [
      getQuestionBankPath('地理', '是非題', '彰化'),
      getQuestionBankPath('地理', '是非題', '南投'),
      getQuestionBankPath('地理', '是非題', '台中')
    ]

    const [mcBanks, tfBanks] = await Promise.all([
      Promise.all(mcPaths.map(path => loadQuestionBank(path))),
      Promise.all(tfPaths.map(path => loadQuestionBank(path)))
    ])

    // 合併所有選擇題和是非題
    const allMcQuestions = mcBanks.flatMap(bank => bank.questions)
    const allTfQuestions = tfBanks.flatMap(bank => bank.questions)

    const mcCount = 25
    const tfCount = 25

    // 需求：1-25 題固定為選擇題、26-50 題固定為是非題（各自隨機抽題/打亂）
    const sampledMc = shuffleQuestions(allMcQuestions)
      .slice(0, Math.min(mcCount, allMcQuestions.length))
      .map((q) => ({ ...q, _source: '選擇題' }))
    const sampledTf = shuffleQuestions(allTfQuestions)
      .slice(0, Math.min(tfCount, allTfQuestions.length))
      .map((q) => ({ ...q, _source: '是非題' }))

    const merged = [...sampledMc, ...sampledTf]

    // 重新編號，避免不同題庫 id 衝突（答案紀錄用 id 當 key）
    return merged.map((q, idx) => ({
      ...q,
      id: idx + 1
    }))
  }

  const loadQuestions = async () => {
    try {
      setLoading(true)
      setError(null)

      // 法規 -> 模擬測驗：隨機抽 25 選擇 + 25 是非（共 50 題）
      if (quizConfig.category === '法規' && quizConfig.type === '模擬測驗') {
        const simulated = await buildSimulatedRegulationsQuestions()
        setQuestions(simulated)
        setLoading(false)
        return
      }

      // 地理 -> 模擬測驗：從三個地區隨機抽 25 選擇 + 25 是非（共 50 題）
      if (quizConfig.category === '地理' && quizConfig.type === '模擬測驗') {
        const simulated = await buildSimulatedGeographyQuestions()
        setQuestions(simulated)
        setLoading(false)
        return
      }

      const path = getQuestionBankPath(quizConfig.category, quizConfig.type, quizConfig.region)

      const questionBank = await loadQuestionBank(path)
      const filtered = filterQuestionsByRange(questionBank.questions, quizConfig.range.start, quizConfig.range.end)

      setQuestions(filtered)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleAnswerSelect = (questionId, answerIndex) => {
    // 允許用戶隨時更換答案
    const nextAnswers = {
      ...answers,
      [questionId]: answerIndex
    }
    setAnswers(nextAnswers)
    
    // 更新當前題目的已回答狀態（用於判斷是否可以進入下一題）
    const currentQuestionId = questions[currentIndex].id
    if (questionId === currentQuestionId) {
      setIsAnswered(true)
      
      // 保存當前索引和題目長度，避免閉包問題
      const currentIdx = currentIndex
      const totalQuestions = questions.length
      
      // 自動跳轉到下一題
      setTimeout(() => {
        if (currentIdx < totalQuestions - 1) {
          const nextIndex = currentIdx + 1
          setCurrentIndex(nextIndex)
          // 檢查下一題是否已回答
          const nextQuestionId = questions[nextIndex].id
          setIsAnswered(nextAnswers[nextQuestionId] !== undefined)
        } else {
          // 最後一題，自動提交
          setShowResult(true)
        }
      }, 300) // 300ms 延遲，讓用戶看到選擇效果後再跳轉
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      // 檢查下一題是否已回答（用於判斷是否可以進入下一題）
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
      // 檢查上一題是否已回答（用於判斷是否可以進入下一題）
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

  return (
    <div className="quiz-page">
      <header className="quiz-header">
        <div className="quiz-header-content">
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
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </header>

      <div className="quiz-content">
        {/* 答題頁最上方低調橫幅廣告 */}
        <div className="quiz-top-ad">
          <AdBanner 
            position="horizontal" 
            adSlot="你的970x90廣告ID" 
            className="quiz-ad-banner"
          />
        </div>
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
              disabled={selectedAnswer === undefined}
            >
              完成測驗
            </button>
          ) : (
            <button
              className="nav-button primary"
              onClick={handleNext}
              disabled={selectedAnswer === undefined}
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

