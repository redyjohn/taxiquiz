import './NoticePage.css'

function NoticePage({ onBack }) {
  return (
    <div className="notice-page">
      <header className="notice-header">
        <button className="back-button" onClick={onBack}>
          ← 返回首頁
        </button>
        <h1>考試注意事項</h1>
      </header>

      <div className="notice-content">
        <section className="notice-section">
          <h2>測驗說明</h2>
          <div className="notice-card">
            <ul>
              <li>本系統為線上練習平台，供考生熟悉題目類型與測驗流程</li>
              <li>測驗題目分為「法規」與「地理」兩大類別</li>
              <li>每題僅能選擇一個答案，選擇後可隨時更換</li>
              <li>完成所有題目後，系統會自動計算成績</li>
            </ul>
          </div>
        </section>

        <section className="notice-section">
          <h2>評分標準</h2>
          <div className="notice-card">
            <ul>
              <li>及格分數：60 分</li>
              <li>分數計算：答對題數 ÷ 總題數 × 100</li>
              <li>90 分以上：優秀</li>
              <li>80-89 分：良好</li>
              <li>60-79 分：及格</li>
              <li>60 分以下：需要再加強</li>
            </ul>
          </div>
        </section>

        <section className="notice-section">
          <h2>注意事項</h2>
          <div className="notice-card">
            <ul>
              <li>請仔細閱讀題目，確保理解題意後再作答</li>
              <li>選擇答案後系統會自動跳轉，請確認答案無誤</li>
              <li>可使用「上一題」按鈕返回檢查已作答的題目</li>
              <li>建議在穩定的網路環境下進行測驗</li>
              <li>測驗過程中請勿重新整理頁面，以免遺失作答紀錄</li>
            </ul>
          </div>
        </section>

        <section className="notice-section">
          <h2>學習建議</h2>
          <div className="notice-card">
            <ul>
              <li>建議先完成「題庫導讀」，了解題庫結構</li>
              <li>可從單一範圍開始練習，逐步擴展到完整題庫</li>
              <li>測驗結束後，仔細查看錯題說明，加強弱項</li>
              <li>使用「重新練習錯題」功能，針對錯誤題目加強練習</li>
              <li>建議定期進行模擬測驗，熟悉考試節奏</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

export default NoticePage

