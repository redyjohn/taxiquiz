import { Link } from 'react-router-dom'
import AdBanner from './AdBanner'
import { getAllArticlesWithSummary } from '../data/guideArticles'
import './WelcomePage.css'

function WelcomePage({ onNavigate }) {
  const allArticles = getAllArticlesWithSummary(50)

  return (
    <div className="welcome-page">
      <header className="welcome-header">
        <p className="site-branding">計程車執業登記證題庫練習</p>
        <p className="welcome-subtitle">2026 最新全台地理與法規模擬測驗</p>

        <article className="guide-article">
          <h1>2026 年計程車執業登記證考照全攻略：制度概況與準備指南</h1>
          <p>
            要在台灣合法開啟計程車或多元計程車（如 Uber）的職業生涯，取得<strong>「計程車駕駛人執業登記證」</strong>是不可或缺的關鍵步驟。隨著 2026 年交通法規的精進，考照制度更加強調駕駛人的法規知識與地理環境熟悉度。
          </p>

          <h3>執業登記證報考基本資格</h3>
          <p>
            根據最新規定，報考者須年滿 20 歲且具備中華民國國籍，或持有有效之長期居留證。最重要的前提是必須先取得<strong>「職業小客車駕駛執照」</strong>。此外，申請人需前往各縣市警察局交通警察大隊報名，並通過嚴格的刑事紀錄審核（俗稱良民證），確保無重大違規或特定犯罪紀錄。
          </p>

          <h3>測驗科目與合格標準</h3>
          <p>
            計程車執業登記證考試主要分為兩大科目：
          </p>
          <p>
            <strong>執業相關法規</strong>：涵蓋《道路交通管理處罰條例》、《計程車客運服務業管理辦法》及相關安全法規。測驗包含選擇題與是非題，旨在確保駕駛者具備正確的法規意識。
          </p>
          <p>
            <strong>地理環境測驗</strong>：針對報考之考區（如北北基、中彰投、高屏區等）進行地方街道、重要機關、名勝古蹟的測驗。這要求駕駛人對該區域的交通網絡有深度了解。兩科總分均須達到 70 分以上方為合格。
          </p>

          <h3>為什麼選擇本站練習？</h3>
          <p>
            本系統收錄 2026 年全台 22 個縣市的最新題庫，包含法規選擇題 293 題、是非題 284 題，以及各考區數千題地理環境題目。透過模擬測驗與即時答題反饋，我們協助司機大哥精準掌握考試重點，大幅提升一次考取機率，縮短進入執業市場的等待期。
          </p>
          <p>
            使用前請至「內政部警政署計程車駕駛人服務網」下載最新題庫核對，如有錯誤歡迎來信：<a href="mailto:feworking1008@gmail.com">feworking1008@gmail.com</a>，祝大家金榜題名。
          </p>

          <p className="guide-cta">準備好了嗎？請在下方選擇您的考區開始練習</p>
        </article>

        <div className="welcome-ad-top">
          <AdBanner
            position="horizontal"
            adSlot="你的970x90廣告ID"
            className="welcome-ad-banner"
          />
        </div>

        <section className="function-section">
          <h2>立即開始線上模擬測驗</h2>
          <div className="welcome-buttons">
            <button
              className="welcome-button guide-button"
              onClick={() => onNavigate('read')}
            >
              <div className="button-icon">📖</div>
              <div className="button-content">
                <h3>題庫導讀</h3>
                <p>了解題庫結構與使用說明</p>
              </div>
            </button>
            <button
              className="welcome-button practice-button"
              onClick={() => onNavigate('practice')}
            >
              <div className="button-icon">✏️</div>
              <div className="button-content">
                <h3>題庫練習</h3>
                <p>開始進行線上測驗練習</p>
              </div>
            </button>
            <button
              className="welcome-button guide-encyclopedia-button"
              onClick={() => onNavigate('guide')}
            >
              <div className="button-icon">📚</div>
              <div className="button-content">
                <h3>考照百科中心</h3>
                <p>考試注意事項與準備技巧</p>
              </div>
            </button>
          </div>
        </section>

        <section className="guides-section">
          <h2>最新考訊與新手攻略</h2>
          <p className="guides-desc">精選考照百科中心文章，協助您掌握考情與準備技巧</p>
          <div className="guide-cards">
            {allArticles.map((article) => (
              <Link
                key={article.id}
                to={`/guide/${article.slug}`}
                className="guide-card"
              >
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <span className="guide-read-more">閱讀全文 →</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="welcome-ad-bottom">
          <AdBanner
            position="horizontal"
            adSlot="你的970x90廣告ID"
            className="welcome-ad-banner"
          />
        </div>
      </header>
    </div>
  )
}

export default WelcomePage
