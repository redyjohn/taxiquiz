import { Link } from 'react-router-dom'
import './PrivacyPolicy.css'

function PrivacyPolicy() {
  return (
    <div className="privacy-page">
      <header className="privacy-header">
        <Link to="/" className="back-link">← 返回首頁</Link>
        <h1>隱私權聲明</h1>
        <p className="last-updated">最後更新：2026年2月</p>
      </header>

      <div className="privacy-content">
        <section>
          <h2>一、概述</h2>
          <p>
            計程車執業登記證題庫練習平台（以下稱「本平台」）重視您的隱私權。本隱私權聲明說明我們如何收集、使用、儲存及保護您的個人資料，以及您對資料的相關權利。
          </p>
        </section>

        <section>
          <h2>二、Cookie 使用</h2>
          <p>
            本平台可能使用 Cookie 及類似技術來改善您的使用體驗。Cookie 是儲存於您裝置上的小型文字檔，用於：
          </p>
          <ul>
            <li>記住您的偏好設定（如語言、主題）</li>
            <li>分析網站流量與使用情況</li>
            <li>提供個人化內容</li>
          </ul>
          <p>
            您可以透過瀏覽器設定管理或刪除 Cookie。若選擇停用 Cookie，部分網站功能可能無法正常運作。
          </p>
        </section>

        <section>
          <h2>三、Google AdSense 廣告</h2>
          <p>
            本平台使用 Google AdSense 提供廣告服務。Google AdSense 是由 Google Inc. 提供的第三方廣告服務，會：
          </p>
          <ul>
            <li>在網站上展示個人化廣告</li>
            <li>使用 Cookie 收集瀏覽紀錄，以提供更相關的廣告內容</li>
            <li>可能收集您的 IP 位址、瀏覽器類型、造訪頁面等非個人識別資訊</li>
          </ul>
          <p>
            Google 的廣告 Cookie 讓 Google 及其合作夥伴能夠依據您造訪本平台及其他網站的情況投放廣告。您可前往
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer"> Google 廣告設定</a>
            管理您的廣告偏好，或透過
            <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer"> Your Online Choices</a>
            選擇退出個人化廣告。
          </p>
          <p>
            更多關於 Google 如何使用資料的說明，請參閱
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"> Google 隱私權政策</a>。
          </p>
        </section>

        <section>
          <h2>四、第三方服務</h2>
          <p>本平台可能使用以下第三方服務：</p>
          <ul>
            <li><strong>Google AdSense：</strong>廣告投放與收益服務</li>
            <li><strong>分析工具：</strong>了解網站使用情況以改善服務</li>
            <li><strong>託管服務：</strong>網站託管與 CDN 服務</li>
          </ul>
          <p>
            這些第三方服務有其各自的隱私權政策。使用本平台即表示您同意這些服務依其政策處理相關資料。
          </p>
        </section>

        <section>
          <h2>五、資料安全</h2>
          <p>
            我們採取適當的技術與組織措施保護您的資料安全，防止未經授權的存取、洩露或毀損。
          </p>
        </section>

        <section>
          <h2>六、聯絡我們</h2>
          <p>
            若您對本隱私權聲明有任何疑問，歡迎來信：
            <a href="mailto:feworking1008@gmail.com">feworking1008@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  )
}

export default PrivacyPolicy
