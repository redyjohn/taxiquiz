import AdBanner from './AdBanner'
import './QuizResult.css'

function QuizResult({ questions, answers, quizConfig, onBack, onRetry, onRetryWrongQuestions }) {
  const correctCount = questions.filter(
    (q) => answers[q.id] === q.correctAnswer
  ).length
  const totalCount = questions.length
  const score = Math.round((correctCount / totalCount) * 100)
  const isPassing = score >= 60

  // 篩選出錯誤的題目
  const wrongQuestions = questions.filter(
    (q) => answers[q.id] !== q.correctAnswer
  )

  const getScoreColor = () => {
    if (score >= 80) return '#FFB800'
    if (score >= 60) return '#00D4FF'
    return '#f44336'
  }

  const getScoreMessage = () => {
    if (score >= 90) return '優秀！'
    if (score >= 80) return '良好！'
    if (score >= 60) return '及格'
    return '需要再加強'
  }

  return (
    <div className="result-page">
      <AdBanner position="horizontal" className="ad-header" />
      
      <div className="result-container">
        <header className="result-header">
          <h1>測驗結果</h1>
          <p>
            {quizConfig.category} - {quizConfig.type}
            {quizConfig.region && ` - ${quizConfig.region}`}
          </p>
        </header>

        <div className="score-section">
          <div className="score-circle" style={{ borderColor: getScoreColor() }}>
            <div className="score-number" style={{ color: getScoreColor() }}>
              {score}
            </div>
            <div className="score-label">分</div>
          </div>
          <h2 className="score-message" style={{ color: getScoreColor() }}>
            {getScoreMessage()}
          </h2>
          <p className="score-detail">
            答對 {correctCount} 題 / 共 {totalCount} 題
          </p>
        </div>

        {wrongQuestions.length > 0 ? (
          <div className="answer-review">
            <h3>錯誤題目詳情（共 {wrongQuestions.length} 題）</h3>
            <div className="questions-list">
              {wrongQuestions.map((question, index) => {
                const userAnswer = answers[question.id]
                const userAnswerText =
                  userAnswer !== undefined
                    ? question.options[userAnswer]
                    : '未作答'
                const correctAnswerText =
                  question.options[question.correctAnswer]

                return (
                  <div
                    key={question.id}
                    className="question-review-item incorrect"
                  >
                    <div className="review-question-header">
                      <span className="review-question-number">
                        第 {questions.findIndex(q => q.id === question.id) + 1} 題 (題號: {question.id})
                      </span>
                      <span className="review-status status-incorrect">
                        ✗ 錯誤
                      </span>
                    </div>
                    <p className="review-question-text">{question.question}</p>
                    <div className="review-answers">
                      <div className="review-answer wrong-answer">
                        <strong>您的答案：</strong>
                        {userAnswer !== undefined
                          ? `${String.fromCharCode(65 + userAnswer)}. ${userAnswerText}`
                          : '未作答'}
                      </div>
                      <div className="review-answer correct-answer">
                        <strong>正確答案：</strong>
                        {String.fromCharCode(65 + question.correctAnswer)}.{' '}
                        {correctAnswerText}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="answer-review">
            <div className="perfect-score">
              <h3>🎉 恭喜！全部答對！</h3>
              <p>您完美地完成了這次測驗！</p>
            </div>
          </div>
        )}

        <div className="result-actions">
          {wrongQuestions.length > 0 && (
            <button 
              className="action-button retry-wrong" 
              onClick={onRetryWrongQuestions}
            >
              錯題再回答
            </button>
          )}
          <button className="action-button secondary" onClick={onRetry}>
            重新測驗
          </button>
          <button className="action-button primary" onClick={onBack}>
            返回首頁
          </button>
        </div>
      </div>

      <AdBanner position="horizontal" className="ad-footer" />
    </div>
  )
}

export default QuizResult



