import './WelcomePage.css'

function WelcomePage({ onNavigate }) {
  return (
    <div className="welcome-page">
      <header className="welcome-header">
        <h1>計程車執業登記證測驗</h1>
        <p>歡迎使用線上測驗系統</p>
      </header>

      <div className="welcome-content">
        <div className="welcome-buttons">
          <button 
            className="welcome-button guide-button"
            onClick={() => onNavigate('guide')}
          >
            <div className="button-icon">📖</div>
            <div className="button-content">
              <h2>題庫導讀</h2>
              <p>了解題庫結構與使用說明</p>
            </div>
          </button>

          <button 
            className="welcome-button practice-button"
            onClick={() => onNavigate('practice')}
          >
            <div className="button-icon">✏️</div>
            <div className="button-content">
              <h2>題庫練習</h2>
              <p>開始進行線上測驗練習</p>
            </div>
          </button>

          <button 
            className="welcome-button notice-button"
            onClick={() => onNavigate('notice')}
          >
            <div className="button-icon">📋</div>
            <div className="button-content">
              <h2>考試注意事項</h2>
              <p>查看考試相關注意事項</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage


