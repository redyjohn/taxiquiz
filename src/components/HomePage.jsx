import { useState } from 'react'
import { questionStructure } from '../data/questionStructure'
import AdBanner from './AdBanner'
import './HomePage.css'

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

function HomePage({ onStartQuiz, onBack }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedExamDistrict, setSelectedExamDistrict] = useState(null)
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [selectedType, setSelectedType] = useState(null)
  const [selectedRange, setSelectedRange] = useState(null)

  const categories = Object.keys(questionStructure)

  // 取得類別下所有可用的地區（從所有題型中收集）
  const getRegionsForCategory = (category) => {
    if (!category) return []
    const types = Object.keys(questionStructure[category])
    const regionsSet = new Set()
    
    types.forEach(type => {
      const regions = Object.keys(questionStructure[category][type])
      regions.forEach(region => {
        if (region !== "") {
          regionsSet.add(region)
        }
      })
    })
    
    return Array.from(regionsSet)
  }

  // 取得考區內可用的地區（與題庫中有的地區交集）
  const getAvailableRegionsInDistrict = (category, examDistrict) => {
    if (!category || !examDistrict) return []
    
    const allRegions = getRegionsForCategory(category)
    const districtRegions = examDistricts[examDistrict] || []
    
    // 返回交集（考區包含的地區 且 題庫中有的地區）
    return districtRegions.filter(region => allRegions.includes(region))
  }

  // 取得該地區可用的題型
  const getTypesForRegion = (category, region) => {
    if (!category) return []
    const types = Object.keys(questionStructure[category])
    
    // 如果是法規類別（沒有地區），直接返回所有題型
    if (region === "") {
      return types
    }
    
    // 返回包含該地區的題型
    return types.filter(type => {
      const regions = Object.keys(questionStructure[category][type])
      return regions.includes(region)
    })
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setSelectedExamDistrict(null)
    setSelectedRegion(null)
    setSelectedType(null)
    setSelectedRange(null)
    
    // 如果是法規類別，自動設置 region 為空字串（跳過地區選擇）
    const regions = getRegionsForCategory(category)
    if (regions.length === 0) {
      setSelectedRegion("")
    }
  }

  const handleExamDistrictSelect = (examDistrict) => {
    setSelectedExamDistrict(examDistrict)
    setSelectedRegion(null)
    setSelectedType(null)
    setSelectedRange(null)
  }

  const handleRegionSelect = (region) => {
    setSelectedRegion(region)
    setSelectedType(null)
    setSelectedRange(null)
  }

  const handleTypeSelect = (type) => {
    setSelectedType(type)
    
    // 如果選擇「縣市綜合測驗」，自動設定特殊 range（跳過範圍選擇）
    if (type === '縣市綜合測驗') {
      setSelectedRange({ start: 1, end: 100, label: '綜合測驗' })
    } else {
      setSelectedRange(null)
    }
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

  const renderExamDistricts = () => {
    if (!selectedCategory) return null

    const allRegions = getRegionsForCategory(selectedCategory)
    
    // 如果沒有地區（如法規類別），不顯示考區選擇
    if (allRegions.length === 0) {
      return null
    }

    // 篩選出有可用地區的考區
    const availableDistricts = Object.keys(examDistricts).filter(district => {
      const districtRegions = examDistricts[district]
      return districtRegions.some(region => allRegions.includes(region))
    })

    return (
      <div className="selection-step">
        <h3>二、選擇考區</h3>
        <div className="button-group exam-district-group">
          {availableDistricts.map(district => (
            <button
              key={district}
              className={`selection-button ${selectedExamDistrict === district ? 'active' : ''}`}
              onClick={() => handleExamDistrictSelect(district)}
            >
              {district}
            </button>
          ))}
        </div>
      </div>
    )
  }

  const renderRegions = () => {
    if (!selectedCategory || !selectedExamDistrict) return null

    const regions = getAvailableRegionsInDistrict(selectedCategory, selectedExamDistrict)

    return (
      <div className="selection-step">
        <h3>三、選擇地區</h3>
        <div className="button-group region-group">
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

  const renderTypes = () => {
    if (!selectedCategory || selectedRegion === null) return null

    const types = getTypesForRegion(selectedCategory, selectedRegion)
    const stepNumber = selectedRegion === "" ? "二" : "四"

    // 地理類別且有選擇地區時，加入「縣市綜合測驗」選項
    const displayTypes = selectedCategory === '地理' && selectedRegion !== "" 
      ? [...types, '縣市綜合測驗'] 
      : types

    return (
      <div className="selection-step">
        <h3>{stepNumber}、選擇題型</h3>
        <div className="button-group">
          {displayTypes.map(type => (
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
    )
  }

  const renderRanges = () => {
    if (!selectedCategory || !selectedType || selectedRegion === null) return null

    // 「縣市綜合測驗」跳過範圍選擇
    if (selectedType === '縣市綜合測驗') return null

    const targetRegion = selectedRegion
    const ranges = questionStructure[selectedCategory][selectedType][targetRegion]
    
    if (!ranges) return null

    const stepNumber = selectedRegion === "" ? "三" : "五"

    return (
      <div className="selection-step">
        <h3>{stepNumber}、選擇題目範圍</h3>
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

        {renderExamDistricts()}
        {renderRegions()}
        {renderTypes()}
        {renderRanges()}

        {selectedCategory && selectedType && selectedRange && (
          <div className="start-section">
            {selectedRange.end === 0 ? (
              <div className="updating-notice">
                <p>🚧 此題庫正在更新中，敬請期待！</p>
              </div>
            ) : (
              <button className="start-button" onClick={handleStart}>
                開始練習
              </button>
            )}
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
