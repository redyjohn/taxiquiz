import { useState } from 'react'
import { questionStructure } from '../data/questionStructure'
import AdBanner from './AdBanner'
import './HomePage.css'

function HomePage({ onStartQuiz, onBack }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedType, setSelectedType] = useState(null)
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [selectedRange, setSelectedRange] = useState(null)

  const categories = Object.keys(questionStructure)

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setSelectedType(null)
    setSelectedRegion(null)
    setSelectedRange(null)
  }

  const handleTypeSelect = (type) => {
    setSelectedType(type)
    // 如果是法規類別，自動設置 region 為空字串
    const regions = Object.keys(questionStructure[selectedCategory][type])
    if (regions.length === 1 && regions[0] === "") {
      setSelectedRegion("")
    } else {
      setSelectedRegion(null)
    }
    setSelectedRange(null)
  }

  const handleRegionSelect = (region) => {
    setSelectedRegion(region)
    setSelectedRange(null)
  }

  const handleRangeSelect = (range) => {
    setSelectedRange(range)
  }

  const handleStart = () => {
    if (selectedCategory && selectedType && selectedRange) {
      onStartQuiz({
        category: selectedCategory,
        type: selectedType,
        region: selectedRegion || "",
        range: selectedRange
      })
    }
  }

  const renderRegions = () => {
    if (!selectedCategory || !selectedType) return null

    const regions = Object.keys(questionStructure[selectedCategory][selectedType])
    if (regions.length === 1 && regions[0] === "") {
      // 法規類別沒有地區分類
      return null
    }

    return (
      <div className="selection-step">
        <h3>選擇地區</h3>
        <div className="button-group">
          {regions.map(region => (
            <button
              key={region}
              className={`selection-button ${selectedRegion === region ? 'active' : ''}`}
              onClick={() => handleRegionSelect(region)}
            >
              {region}
            </button>
          ))}
        </div>
      </div>
    )
  }

  const renderRanges = () => {
    if (!selectedCategory || !selectedType) return null

    const regions = Object.keys(questionStructure[selectedCategory][selectedType])
    const targetRegion = selectedRegion !== null ? selectedRegion : (regions.length === 1 ? regions[0] : null)
    
    if (targetRegion === null || targetRegion === undefined) return null

    const ranges = questionStructure[selectedCategory][selectedType][targetRegion]

    return (
      <div className="selection-step">
        <h3>選擇題目範圍</h3>
        <div className="button-group">
          {ranges.map((range, index) => (
            <button
              key={index}
              className={`selection-button ${selectedRange === range ? 'active' : ''}`}
              onClick={() => handleRangeSelect(range)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="home-page">
      <header className="home-header">
        {onBack && (
          <button className="back-button" onClick={onBack}>
            ← 返回首頁
          </button>
        )}
        <h1>計程車執業登記證 題庫練習系統</h1>
        <p>選擇您要練習的題目範圍</p>
      </header>

      <div className="selection-container">
        <div className="selection-step">
          <h3>一、選擇類別</h3>
          <div className="button-group">
            {categories.map(category => (
              <button
                key={category}
                className={`selection-button category-button ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {selectedCategory && (
          <div className="selection-step">
            <h3>二、選擇題型</h3>
            <div className="button-group">
              {Object.keys(questionStructure[selectedCategory]).map(type => (
                <button
                  key={type}
                  className={`selection-button type-button ${selectedType === type ? 'active' : ''}`}
                  onClick={() => handleTypeSelect(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        {renderRegions()}
        {renderRanges()}

        {selectedCategory && selectedType && selectedRange && (
          <div className="start-section">
            <button className="start-button" onClick={handleStart}>
              開始練習
            </button>
          </div>
        )}
      </div>

      {/* 首頁底部廣告 */}
      <div className="home-footer-ad">
        <AdBanner 
          position="horizontal" 
          adSlot="你的970x90廣告ID" 
          className="home-ad-banner"
        />
      </div>
    </div>
  )
}

export default HomePage



