# 計程車執業登記證題庫練習系統

這是一個使用 React + Vite 建立的計程車執業登記證題庫練習網站，支援 JSON 格式的題庫檔案。2026 年全台 22 縣市地理與法規模擬測驗，符合 Google AdSense 審核規範。

## 功能特色

- 📚 **多分類題庫**：支援法規、地理兩大類別
- 📝 **多種題型**：選擇題、是非題、模擬測驗、縣市綜合測驗
- 🗺️ **考區分類**：地理題庫按考區（北北基、宜蘭區、桃園區、竹苗區、中彰投、高屏區、雲嘉區、台南區、花蓮區、台東區、外離島）組織
- 🏙️ **22 個縣市完整題庫**：涵蓋全台各縣市地理題庫
- 📊 **即時答題反饋**：答題後立即顯示正確答案與解析
- 🎯 **清楚的答題進度**：顯示當前進度與答題狀態
- 📖 **題庫導讀**：可瀏覽所有題目與正確答案
- 📚 **考照百科中心**：6 篇考照攻略文章，語意化 URL（`/guide/:slug`）
- 📄 **隱私權聲明 / 關於我們**：AdSense 合規頁面
- 💾 **JSON 檔案管理**：題庫易於維護與擴充
- 🎲 **模擬測驗**：法規／地理隨機 50 題（選擇 25 + 是非 25）
- 🎯 **縣市綜合測驗**：單一縣市隨機 100 題（選擇 50 + 是非 50）

## 技術棧

- **React 18** - 使用者介面函式庫
- **React Router DOM 7** - 前端路由（語意化 URL）
- **Vite 5** - 快速的前端建置工具
- **CSS3** - 現代化響應式設計

## 網站架構與路由

### 路由表（React Router）

| 路徑 | 元件 | 說明 |
|------|------|------|
| `/` | WelcomePage | 首頁（考照全攻略、功能入口、最新考訊） |
| `/practice` | HomePage | 題庫練習選擇（類別→考區→地區→題型→範圍） |
| `/read` | GuidePage | 題庫導讀（瀏覽題庫結構與答案） |
| `/guide` | NoticePage | 考照百科中心（文章索引） |
| `/guide/:slug` | ArticleContent | 單篇文章（語意化 URL） |
| `/notice` | Redirect → `/guide` | 舊路徑重導向 |
| `/quiz` | QuizPage | 答題頁面（需 state.config） |
| `/privacy` | PrivacyPolicy | 隱私權聲明 |
| `/about` | AboutPage | 關於我們 |

### 考照百科文章 slug 對照表

| slug | 文章標題 |
|------|----------|
| `how-to-pass` | 如何一次考上營業登記 |
| `driver-qualifications` | 計程車司機需要具備什麼資格？ |
| `professional-license` | 什麼是職業小客車駕照？ |
| `business-registration` | 什麼是計程車營業登記？ |
| `income-analysis` | 計程車司機收入分析 |
| `uber-comparison` | 台灣 Uber 司機比較 |

### 連結與導航流程

```
首頁 (/)
├── 題庫導讀 → /read (GuidePage)
├── 題庫練習 → /practice (HomePage)
│   └── 開始練習 → /quiz (QuizPage，state: { config } )
└── 考照百科中心 → /guide (NoticePage)
    └── 文章卡片 → /guide/:slug (ArticleContent)

Footer（全域）
├── 關於我們 → /about
└── 隱私權聲明 → /privacy
```

## 各頁面使用技術與功能

### WelcomePage（首頁 `/`）

- **技術**：React 函式元件、`onNavigate` 回呼、`Link`（React Router）
- **內容**：
  - 考照全攻略文章（`<article>`、`<h1>`、`<h3>`、`<p>`）
  - AdBanner 置於文字與功能區之間（符合誤點擊政策）
  - 三個功能按鈕：題庫導讀、題庫練習、考照百科中心
  - 最新考訊與新手攻略（6 篇文章卡片，`getAllArticlesWithSummary`）
- **樣式**：`WelcomePage.css`，深色主題、金色主色 `#FFB800`
- **連結**：導向 `/read`、`/practice`、`/guide/:slug`

### HomePage（題庫練習 `/practice`）

- **技術**：`useState` 多層選擇、`questionStructure`、`examDistricts` 考區對應
- **流程**：類別 → 考區 → 地區 → 題型 → 範圍 → 開始練習
- **題型**：選擇題、是非題、模擬測驗、縣市綜合測驗
- **連結**：`onStartQuiz(config)` → `navigate('/quiz', { state: { config } })`

### GuidePage（題庫導讀 `/read`）

- **技術**：與 HomePage 相同考區邏輯，`getQuestionBankPath` 載入題庫
- **功能**：以表格形式顯示題目與正確答案
- **連結**：`onBack` → `/`

### NoticePage（考照百科中心 `/guide`）

- **技術**：`Link` 至 `/guide/:slug`，`articles` 來自 `guideArticles.js`
- **版面**：文章卡片索引（標題、更新日期）
- **連結**：每張卡片 → `/guide/:slug`

### ArticleContent（文章頁 `/guide/:slug`）

- **技術**：`useParams()` 取得 slug，`getArticleBySlug()` 取得文章
- **結構**：`<article>`、`<section>`、`<h2>`、`<h3>`、`<p>`
- **E-E-A-T**：最後更新日期、專業編輯團隊審核、免責聲明
- **相關閱讀**：5 篇內部連結（`Link` 至其他文章）
- **連結**：返回考照百科中心 → `/guide`

### QuizPage（答題頁 `/quiz`）

- **技術**：`useLocation().state.config` 取得測驗設定，`loadQuestionBank`、`shuffleQuestions`、`filterQuestionsByRange`
- **模式**：法規模擬、地理模擬、縣市綜合測驗、一般題庫
- **AdBanner**：上方橫幅，`margin` 足夠避免誤點擊
- **連結**：返回 → `/practice`

### QuizResult（結果頁）

- **技術**：內嵌於 QuizPage，`showResult` 控制顯示
- **功能**：答題統計、錯題回顧、再練習

### PrivacyPolicy（隱私權聲明 `/privacy`）

- **技術**：`Link` 返回首頁，靜態內容
- **內容**：Cookie、Google AdSense、第三方服務說明
- **連結**：`Link to="/"` 返回

### AboutPage（關於我們 `/about`）

- **技術**：`Link` 返回首頁，靜態內容
- **內容**：平台介紹、特色、目標、聯絡方式
- **連結**：`Link to="/"` 返回

### Footer（全域）

- **技術**：`Link` 至 `/about`、`/privacy`
- **顯示**：所有頁面底部

## 題庫結構

### 一、法規題庫

#### 選擇題（293 題）
- 1-50題、51-100題、101-150題、151-200題、201-250題、251-293題

#### 是非題（284 題）
- 1-50題、51-100題、101-150題、151-200題、201-250題、251-284題

#### 模擬測驗
- 隨機 50 題（選擇 25 + 是非 25）

### 二、地理題庫（22 個縣市）

#### 考區分類
- **北北基**：宜蘭縣、基隆市、臺北市、新北市、桃園市
- **宜蘭區**：花蓮縣、宜蘭縣、基隆市、臺北市、新北市
- **桃園區**：基隆市、臺北市、新北市、桃園市、新竹縣、新竹市
- **竹苗區**：新竹市、新竹縣、苗栗縣
- **中彰投**：台中、彰化、南投
- **高屏區**：高雄市、屏東縣
- **雲嘉區**：雲林縣、嘉義縣、嘉義市
- **台南區**：台南市、嘉義縣、嘉義市、高雄市
- **花蓮區**：花蓮縣、台東縣、宜蘭縣
- **台東區**：台東縣
- **外離島**：金門縣、連江縣、澎湖縣

#### 縣市綜合測驗
- 從選定縣市隨機抽取 50 題選擇題 + 50 題是非題（共 100 題）

#### 模擬測驗
- 南投：隨機 50 題（選擇 25 + 是非 25）

## 題庫檔案格式

題庫 JSON 檔案應存放在 `public/data/` 目錄下，詳細格式請參考 [JSON題庫格式說明.md](./JSON題庫格式說明.md)

## 專案結構

```
taxiquiz/
├── public/
│   ├── data/                      # JSON 題庫檔案目錄
│   │   ├── Geography/             # 地理題庫
│   │   │   ├── MultipleChoice/    # 選擇題（22 個縣市）
│   │   │   └── TrueOrFalse/       # 是非題（22 個縣市）
│   │   └── Regulations/           # 法規題庫
│   │       ├── ReguMultChoice.json
│   │       └── ReguTuOrFalse.json
│   ├── ads.txt                    # Google AdSense 驗證
│   ├── robots.txt                 # 爬蟲規則與 Sitemap
│   ├── sitemap.xml                # 網站地圖
│   └── og-image.png               # Open Graph 圖片
├── src/
│   ├── components/
│   │   ├── WelcomePage.jsx        # 首頁（考照全攻略、功能入口）
│   │   ├── HomePage.jsx           # 題庫練習選擇
│   │   ├── GuidePage.jsx          # 題庫導讀
│   │   ├── NoticePage.jsx         # 考照百科中心索引
│   │   ├── ArticleContent.jsx     # 單篇文章頁
│   │   ├── QuizPage.jsx           # 答題頁面
│   │   ├── QuizResult.jsx         # 結果頁面
│   │   ├── PrivacyPolicy.jsx      # 隱私權聲明
│   │   ├── AboutPage.jsx          # 關於我們
│   │   ├── Footer.jsx             # 全域頁尾
│   │   └── AdBanner.jsx           # 廣告橫幅元件
│   ├── data/
│   │   ├── questionStructure.js   # 題目結構與路徑映射
│   │   └── guideArticles.js       # 考照百科文章資料
│   ├── utils/
│   │   ├── questionLoader.js      # 題目載入工具
│   │   └── questionValidator.js   # 題目格式驗證
│   ├── App.jsx                    # 主應用程式（Routes）
│   ├── App.css                    # 全域樣式
│   └── main.jsx                   # 應用程式入口點
├── scripts/
│   ├── check-question-banks.cjs   # 檢查題庫完整性
│   ├── verify-question-banks.cjs  # 驗證題庫類型
│   └── update-question-structure.cjs  # 更新題目結構
├── index.html                     # HTML 範本（SEO meta）
├── vite.config.js                 # Vite 設定
├── vercel.json                    # Vercel 部署（SPA rewrite）
└── package.json
```

## 技術合規（ads.txt、robots.txt）

### ads.txt

- **路徑**：`public/ads.txt`
- **格式**：`google.com, pub-4218582490253078, DIRECT, f08c47fec0942fa0`
- **用途**：Google AdSense 驗證

### robots.txt

- **路徑**：`public/robots.txt`
- **內容**：
  ```
  User-agent: *
  Allow: /

  Sitemap: https://taiwantaxiquiz.vercel.app/sitemap.xml
  ```
- **用途**：允許所有爬蟲抓取，並指定 Sitemap

### AdBanner 誤點擊政策

- **margin**：`2rem 0`（手機版 `1.5rem 0`）
- **padding**：`1rem 0`（手機版 `0.75rem 0`）
- **QuizPage**：廣告與題目區間距 `2.5rem`，與按鈕區間距 `2rem`
- **廣告位置**：置於文字區與功能區之間，不置於按鈕中間

## 開始使用

### 安裝依賴

```bash
npm install
```

### 啟動開發伺服器

```bash
npm run dev
```

開發伺服器會啟動在 `http://localhost:5173`

### 建置與預覽

```bash
npm run build
npm run preview
```

## 使用說明

### 題庫練習

1. 選擇類別：法規 或 地理
2. 選擇考區（地理）：北北基、宜蘭區...等
3. 選擇地區（地理）：考區內的縣市
4. 選擇題型：選擇題、是非題、模擬測驗、縣市綜合測驗
5. 選擇題目範圍（非縣市綜合測驗時）
6. 開始練習 → 答題 → 查看結果

### 縣市綜合測驗

- 選擇地理 → 考區 → 縣市（如宜蘭縣）→ 縣市綜合測驗
- 隨機 50 題選擇題 + 50 題是非題（共 100 題）

### 題庫導讀

- 選擇類別 → 考區 → 地區 → 題型
- 以表格瀏覽題目與正確答案

### 考照百科中心

- 點選文章卡片進入完整文章
- 文末「相關閱讀」可跳轉至其他文章

## 系統架構說明

### 核心邏輯

- **questionStructure.js**：題庫分類、地區、題型、題數範圍、路徑映射
- **questionLoader.js**：`fetch` 載入 JSON、格式轉換、篩選、隨機排序
- **guideArticles.js**：考照百科 6 篇文章、slug 對應、摘要產生

### 考區與縣市綜合測驗

- **examDistricts**（HomePage、GuidePage）：考區與縣市對應
- **縣市綜合測驗**（QuizPage）：`buildCityComprehensiveQuestions(region)`，50 MC + 50 TF

### 工具腳本

```bash
node scripts/check-question-banks.cjs    # 檢查題庫完整性
node scripts/verify-question-banks.cjs   # 驗證題庫類型
node scripts/update-question-structure.cjs  # 更新 questionStructure.js
```

## 授權

MIT License
