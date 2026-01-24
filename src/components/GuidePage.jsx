import { useState, useEffect } from 'react'
import { loadQuestionBank } from '../utils/questionLoader'
import { getQuestionBankPath } from '../data/questionStructure'
import './GuidePage.css'

function GuidePage({ onBack }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedType, setSelectedType] = useState(null)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const categories = ['法規', '臺北市', '台中', '彰化', '南投']

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setSelectedType(null)
    setQuestions([])
    setError(null)
  }

  const handleTypeSelect = async (type) => {
    setSelectedType(type)
    setLoading(true)
    setError(null)
    setQuestions([])

    try {
      let category = '地理'
      let region = ''
      
      // 確定類別和地區
      if (selectedCategory === '法規') {
        category = '法規'
        region = ''
      } else {
        category = '地理'
        region = selectedCategory // 台中、彰化、南投
      }

      const path = getQuestionBankPath(category, type, region)
      const questionBank = await loadQuestionBank(path)
      setQuestions(questionBank.questions || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleBackToCategories = () => {
    setSelectedCategory(null)
    setSelectedType(null)
    setQuestions([])
    setError(null)
  }

  const handleBackToTypes = () => {
    setSelectedType(null)
    setQuestions([])
    setError(null)
  }

  // 渲染題目表格
  const renderQuestionsTable = () => {
    if (questions.length === 0) return null

    return (
      <div className="questions-table-container">
        <h3>
          {selectedCategory} - {selectedType}
          <span className="question-count">（共 {questions.length} 題）</span>
        </h3>
        <div className="table-wrapper">
          <table className="questions-table">
            <thead>
              <tr>
                <th className="col-id">題號</th>
                <th className="col-question">題目</th>
                <th className="col-options">選項</th>
                <th className="col-answer">正確答案</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question) => (
                <tr key={question.id}>
                  <td className="col-id">{question.id}</td>
                  <td className="col-question">{question.question}</td>
                  <td className="col-options">
                    {question.options && question.options.map((option, index) => (
                      <div key={index} className="option-item">
                        {String.fromCharCode(65 + index)}. {option}
                      </div>
                    ))}
                  </td>
                  <td className="col-answer">
                    {question.correctAnswer !== undefined && question.options && (
                      <span className="correct-answer-badge">
                        {String.fromCharCode(65 + question.correctAnswer)}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className="guide-page">
      <header className="guide-header">
        <button className="back-button" onClick={onBack}>
          ← 返回首頁
        </button>
        <h1>題庫導讀</h1>
      </header>

      <div className="guide-content">
        {!selectedCategory ? (
          <div className="category-selection">
            <h2>選擇類別</h2>
            <div className="button-group">
              {categories.map(category => (
                <button
                  key={category}
                  className="category-button"
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        ) : !selectedType ? (
          <div className="type-selection">
            <button className="back-link-button" onClick={handleBackToCategories}>
              ← 返回選擇類別
            </button>
            <h2>{selectedCategory} - 選擇題型</h2>
            <div className="button-group">
              <button
                className="type-button"
                onClick={() => handleTypeSelect('選擇題')}
              >
                選擇題
              </button>
              <button
                className="type-button"
                onClick={() => handleTypeSelect('是非題')}
              >
                是非題
              </button>
            </div>
          </div>
        ) : (
          <div className="questions-view">
            <button className="back-link-button" onClick={handleBackToTypes}>
              ← 返回選擇題型
            </button>
            {loading && (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>載入題目中...</p>
              </div>
            )}
            {error && (
              <div className="error-container">
                <p>載入錯誤：{error}</p>
              </div>
            )}
            {!loading && !error && renderQuestionsTable()}
          </div>
        )}
      </div>
    </div>
  )
}

export default GuidePage

