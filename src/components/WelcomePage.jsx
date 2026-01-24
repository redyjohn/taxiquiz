import './WelcomePage.css'

function WelcomePage({ onNavigate }) {
  return (
    <div className="welcome-page">
      <header className="welcome-header">
        <h1>計程車執業登記證測驗</h1>
        <p>歡迎使用線上測驗系統</p>
        <div className="disclaimer">
          <p>
            使用本程式之前請先至「內政部警政署計程車駕駛人服務網」下載最新題庫，核對「題庫導讀」之正確答案與題目內容，如有錯誤歡迎寄信告訴我們，我們將會盡快修正錯誤，祝大家金榜題名。
          </p>
          <p className="contact-email">
            聯絡信箱：<a href="mailto:feworking1008@gmail.com">feworking1008@gmail.com</a>
          </p>
        </div>
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




