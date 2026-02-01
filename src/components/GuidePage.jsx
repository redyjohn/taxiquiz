import { useState, useEffect } from 'react'
import { loadQuestionBank } from '../utils/questionLoader'
import { getQuestionBankPath, questionStructure } from '../data/questionStructure'
import './GuidePage.css'

// 考區與包含地區的對應
const examDistricts = {
  '北北基': ['宜蘭縣', '基隆市', '臺北市', '新北市', '桃園市'],
  '宜蘭區': ['花蓮縣', '宜蘭縣', '基隆市', '臺北市', '新北市'],
  '桃園區': ['基隆市', '臺北市', '新北市', '桃園市', '新竹縣', '新竹市'],
  '竹苗區': ['新竹市', '新竹縣', '苗栗縣'],
  '中彰投': ['台中', '彰化', '南投'],
  '高屏區': ['高雄市', '屏東縣'],
  '雲嘉區': ['雲林縣', '嘉義縣', '嘉義市'],
  '台南區': ['台南市', '嘉義縣', '嘉義市', '高雄市'],
  '花蓮區': ['花蓮縣', '台東縣', '宜蘭縣'],
  '台東區': ['台東縣'],
  '外離島': ['金門縣', '連江縣', '澎湖縣']
}

function GuidePage({ onBack }) {
  const [selectedCategory, setSelectedCategory] = useState(null) // '法規' 或 '地理'
  const [selectedExamDistrict, setSelectedExamDistrict] = useState(null)
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [selectedType, setSelectedType] = useState(null)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const categories = ['法規', '地理']

  // 取得地理類別下所有可用的地區
  const getAvailableRegions = () => {
    const types = Object.keys(questionStructure['地理'] || {})
    const regionsSet = new Set()
    types.forEach(type => {
      const regions = Object.keys(questionStructure['地理'][type] || {})
      regions.forEach(region => {
        if (region !== "") regionsSet.add(region)
      })
    })
    return Array.from(regionsSet)
  }

  // 取得考區內可用的地區
  const getAvailableRegionsInDistrict = (examDistrict) => {
    if (!examDistrict) return []
    const allRegions = getAvailableRegions()
    const districtRegions = examDistricts[examDistrict] || []
    return districtRegions.filter(region => allRegions.includes(region))
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setSelectedExamDistrict(null)
    setSelectedRegion(null)
    setSelectedType(null)
    setQuestions([])
    setError(null)
  }

  const handleExamDistrictSelect = (district) => {
    setSelectedExamDistrict(district)
    setSelectedRegion(null)
    setSelectedType(null)
    setQuestions([])
    setError(null)
  }

  const handleRegionSelect = (region) => {
    setSelectedRegion(region)
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
        region = selectedRegion
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
    setSelectedExamDistrict(null)
    setSelectedRegion(null)
    setSelectedType(null)
    setQuestions([])
    setError(null)
  }

  const handleBackToExamDistricts = () => {
    setSelectedExamDistrict(null)
    setSelectedRegion(null)
    setSelectedType(null)
    setQuestions([])
    setError(null)
  }

  const handleBackToRegions = () => {
    setSelectedRegion(null)
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
    if (questions.length === 0) {
      return (
        <div className="updating-notice-container">
          <div className="updating-notice">
            <p>🚧 題庫更新中！</p>
            <p className="updating-sub">此題庫正在準備中，敬請期待！</p>
          </div>
        </div>
      )
    }

    const displayTitle = selectedCategory === '法規' ? '法規' : selectedRegion

    return (
      <div className="questions-table-container">
        <h3>
          {displayTitle} - {selectedType}
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

  // 取得當前顯示的標題
  const getCurrentTitle = () => {
    if (selectedCategory === '法規') {
      return selectedType ? `法規 - ${selectedType}` : '法規 - 選擇題型'
    }
    if (selectedRegion) {
      return selectedType ? `${selectedRegion} - ${selectedType}` : `${selectedRegion} - 選擇題型`
    }
    if (selectedExamDistrict) {
      return `${selectedExamDistrict} - 選擇地區`
    }
    return '選擇考區'
  }

  // 渲染考區選擇
  const renderExamDistrictSelection = () => {
    const allRegions = getAvailableRegions()
    const availableDistricts = Object.keys(examDistricts).filter(district => {
      const districtRegions = examDistricts[district]
      return districtRegions.some(region => allRegions.includes(region))
    })

    return (
      <div className="exam-district-selection">
        <button className="back-link-button" onClick={handleBackToCategories}>
          ← 返回選擇類別
        </button>
        <h2>選擇考區</h2>
        <div className="button-group exam-district-group">
          {availableDistricts.map(district => (
            <button
              key={district}
              className="exam-district-button"
              onClick={() => handleExamDistrictSelect(district)}
            >
              {district}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // 渲染地區選擇
  const renderRegionSelection = () => {
    const regions = getAvailableRegionsInDistrict(selectedExamDistrict)

    return (
      <div className="region-selection">
        <button className="back-link-button" onClick={handleBackToExamDistricts}>
          ← 返回選擇考區
        </button>
        <h2>{selectedExamDistrict} - 選擇地區</h2>
        <div className="button-group region-group">
          {regions.map(region => (
            <button
              key={region}
              className="region-button"
              onClick={() => handleRegionSelect(region)}
            >
              {region}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // 渲染題型選擇（法規）
  const renderTypeSelectionForLaw = () => (
    <div className="type-selection">
      <button className="back-link-button" onClick={handleBackToCategories}>
        ← 返回選擇類別
      </button>
      <h2>法規 - 選擇題型</h2>
      <div className="button-group">
        <button className="type-button" onClick={() => handleTypeSelect('選擇題')}>
          選擇題
        </button>
        <button className="type-button" onClick={() => handleTypeSelect('是非題')}>
          是非題
        </button>
      </div>
    </div>
  )

  // 渲染題型選擇（地理）
  const renderTypeSelectionForGeo = () => (
    <div className="type-selection">
      <button className="back-link-button" onClick={handleBackToRegions}>
        ← 返回選擇地區
      </button>
      <h2>{selectedRegion} - 選擇題型</h2>
      <div className="button-group">
        <button className="type-button" onClick={() => handleTypeSelect('選擇題')}>
          選擇題
        </button>
        <button className="type-button" onClick={() => handleTypeSelect('是非題')}>
          是非題
        </button>
      </div>
    </div>
  )

  return (
    <div className="guide-page">
      <header className="guide-header">
        <button className="back-button" onClick={onBack}>
          ← 返回首頁
        </button>
        <h1>題庫導讀</h1>
      </header>

      <div className="guide-content">
        {/* 步驟1: 選擇類別 */}
        {!selectedCategory && (
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
        )}

        {/* 法規路線: 類別 -> 題型 -> 題目 */}
        {selectedCategory === '法規' && !selectedType && renderTypeSelectionForLaw()}

        {/* 地理路線: 類別 -> 考區 -> 地區 -> 題型 -> 題目 */}
        {selectedCategory === '地理' && !selectedExamDistrict && renderExamDistrictSelection()}
        {selectedCategory === '地理' && selectedExamDistrict && !selectedRegion && renderRegionSelection()}
        {selectedCategory === '地理' && selectedRegion && !selectedType && renderTypeSelectionForGeo()}

        {/* 顯示題目 */}
        {selectedType && (
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

