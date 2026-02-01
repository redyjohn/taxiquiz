import { Link } from 'react-router-dom'
import './AboutPage.css'

function AboutPage() {
  return (
    <div className="about-page">
      <header className="about-header">
        <Link to="/" className="back-link">← 返回首頁</Link>
        <h1>關於我們</h1>
      </header>

      <div className="about-content">
        <section className="intro">
          <h2>計程車執業登記證題庫練習平台</h2>
          <p>
            本平台是一個專為計程車執業登記證考試所設計的題庫練習系統，目標是幫助有意成為計程車司機的學員，透過系統化練習提升考照通過率。
          </p>
        </section>

        <section>
          <h2>平台特色</h2>
          <ul>
            <li><strong>完整題庫涵蓋：</strong>法規與地理兩大類別，涵蓋全台 22 縣市考區</li>
            <li><strong>多元練習模式：</strong>選擇題、是非題、模擬測驗、縣市綜合測驗</li>
            <li><strong>即時反饋：</strong>答題後立即顯示正確答案與解析</li>
            <li><strong>題庫導讀：</strong>可完整瀏覽所有題目與正確答案</li>
            <li><strong>考試注意事項：</strong>提供考照流程、準備技巧與相關資訊</li>
          </ul>
        </section>

        <section>
          <h2>我們的目標</h2>
          <p>
            計程車執業登記證考試是成為計程車司機的重要門檻。我們希望透過免費、易用的線上題庫練習，降低學員的準備負擔，讓更多人能順利通過考試，實現職業目標。
          </p>
        </section>

        <section>
          <h2>聯絡我們</h2>
          <p>
            如有題庫錯誤回報或建議，歡迎來信：
            <a href="mailto:feworking1008@gmail.com">feworking1008@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  )
}

export default AboutPage
