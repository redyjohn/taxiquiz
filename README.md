# 計程車執業登記證題庫練習系統

這是一個使用 React + Vite 建立的計程車執業登記證題庫練習網站，支援 JSON 格式的題庫檔案。

## 功能特色

- 📚 **多分類題庫**：支援法規、地理兩大類別
- 📝 **多種題型**：選擇題、是非題、模擬測驗
- 🗺️ **考區分類**：地理題庫按考區（北北基、宜蘭區、桃園區、竹苗區、中彰投、高屏區、雲嘉區、台南區、花蓮區、台東區、外離島）組織
- 🏙️ **22 個縣市完整題庫**：涵蓋全台各縣市地理題庫
- 📊 **即時答題反饋**：答題後立即顯示正確答案與解析
- 🎯 **清楚的答題進度**：顯示當前進度與答題狀態
- 📖 **題庫導讀**：可瀏覽所有題目與正確答案
- 💾 **JSON 檔案管理**：題庫易於維護與擴充
- 🎲 **模擬測驗模式**：隨機抽取 25 題選擇題 + 25 題是非題

## 技術棧

- **React 18** - 使用者介面函式庫
- **Vite** - 快速的前端建置工具
- **CSS3** - 現代化響應式設計

## 開始使用

### 安裝依賴套件

```bash
npm install
```

### 啟動開發伺服器

```bash
npm run dev
```

開發伺服器會啟動在 `http://localhost:5173`

### 建置生產版本

```bash
npm run build
```

### 預覽生產版本

```bash
npm run preview
```

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

#### 各縣市題數（選擇題 / 是非題）
| 縣市 | 選擇題 | 是非題 |
|------|--------|--------|
| 臺北市 | 88 | 90 |
| 新北市 | 79 | 80 |
| 基隆市 | 79 | 78 |
| 桃園市 | 80 | 80 |
| 新竹市 | 143 | 147 |
| 新竹縣 | 115 | 129 |
| 苗栗縣 | 130 | 130 |
| 台中 | 201 | 197 |
| 彰化 | 100 | 100 |
| 南投 | 102 | 112 |
| 雲林縣 | 143 | 148 |
| 嘉義市 | 103 | 106 |
| 嘉義縣 | 150 | 150 |
| 台南市 | 253 | 250 |
| 高雄市 | 219 | 243 |
| 屏東縣 | 148 | 143 |
| 台東縣 | 212 | 221 |
| 花蓮縣 | 218 | 203 |
| 宜蘭縣 | 80 | 80 |
| 澎湖縣 | 100 | 100 |
| 金門縣 | 146 | 152 |
| 連江縣 | 120 | 115 |

#### 模擬測驗
- 南投：隨機 50 題（選擇 25 + 是非 25）

## 題庫檔案格式

題庫 JSON 檔案應存放在 `public/data/` 目錄下，詳細格式請參考 [JSON題庫格式說明.md](./JSON題庫格式說明.md)

### 基本格式

```json
{
  "category": "地理",
  "type": "選擇題",
  "region": "台中",
  "questions": [
    {
      "id": 1,
      "question": "題目內容",
      "options": ["選項A", "選項B", "選項C", "選項D"],
      "correctAnswer": 0
    }
  ]
}
```

## 專案結構

```
taxiquiz/
├── public/
│   ├── data/                      # JSON 題庫檔案目錄
│   │   ├── Geography/             # 地理題庫
│   │   │   ├── MultipleChoice/    # 選擇題（22 個縣市）
│   │   │   │   ├── TaipeiMultiple.json
│   │   │   │   ├── NewTaipeiMultiple.json
│   │   │   │   ├── KeelungMultiple.json
│   │   │   │   └── ...（共 22 個檔案）
│   │   │   └── TrueOrFalse/       # 是非題（22 個縣市）
│   │   │       ├── TaipeiTF.json
│   │   │       ├── NewTaipeiTF.json
│   │   │       └── ...（共 22 個檔案）
│   │   └── Regulations/           # 法規題庫
│   │       ├── ReguMultChoice.json  # 法規選擇題
│   │       └── ReguTuOrFalse.json   # 法規是非題
│   ├── ads.txt                    # Google AdSense 驗證
│   └── robots.txt                 # SEO 設定
├── src/
│   ├── components/                # React 元件
│   │   ├── WelcomePage.jsx        # 歡迎頁面
│   │   ├── HomePage.jsx           # 題庫練習選擇頁面
│   │   ├── QuizPage.jsx           # 答題頁面
│   │   ├── QuizResult.jsx         # 結果頁面
│   │   ├── GuidePage.jsx          # 題庫導讀頁面
│   │   ├── NoticePage.jsx         # 注意事項頁面
│   │   └── AdBanner.jsx           # 廣告橫幅元件
│   ├── data/
│   │   └── questionStructure.js   # 題目結構定義與路徑映射
│   ├── utils/
│   │   ├── questionLoader.js      # 題目載入工具
│   │   └── questionValidator.js   # 題目格式驗證與轉換
│   ├── App.jsx                    # 主應用程式
│   ├── App.css                    # 全域樣式
│   └── main.jsx                   # 應用程式入口點
├── scripts/                       # 工具腳本
│   ├── check-question-banks.cjs   # 檢查題庫完整性
│   ├── verify-question-banks.cjs  # 驗證題庫類型正確性
│   └── update-question-structure.cjs  # 更新題目結構配置
├── index.html                     # HTML 範本
├── vite.config.js                 # Vite 設定檔
├── vercel.json                    # Vercel 部署設定
├── package.json                   # 專案設定和依賴
├── README.md                      # 專案說明文件
└── JSON題庫格式說明.md             # 題庫格式詳細說明
```

## 使用說明

### 題庫練習

1. **選擇類別**：法規 或 地理
2. **選擇考區**（地理類別）：北北基、宜蘭區、桃園區...等
3. **選擇地區**（地理類別）：選擇考區內的縣市
4. **選擇題型**：選擇題、是非題 或 模擬測驗
5. **選擇題目範圍**：依題數分組（每 50 題一組）
6. **開始練習**：進入答題頁面
7. **答題**：選擇答案後立即顯示正確答案與反饋
8. **瀏覽題目**：使用「上一題」和「下一題」切換
9. **查看結果**：完成後查看詳細統計與錯題回顧

### 題庫導讀

1. **選擇類別**：法規 或 地理
2. **選擇考區**（地理類別）：選擇考區
3. **選擇地區**（地理類別）：選擇縣市
4. **選擇題型**：選擇題 或 是非題
5. **瀏覽題目**：以表格形式顯示所有題目與正確答案

## 系統架構說明

### 核心邏輯

#### 1. 題庫結構管理（`questionStructure.js`）
- 定義所有題庫的分類、地區、題型、題數範圍
- 提供路徑映射函數（`getQuestionBankPath`）將中文名稱轉換為檔案路徑
- 支援動態題數範圍配置（每 50 題一組）

#### 2. 題目載入系統（`questionLoader.js`）
- 使用 `fetch` API 動態載入 JSON 題庫
- 支援題目格式自動轉換與驗證
- 提供題目篩選、隨機排序功能

#### 3. 考區分類系統
- 在 `HomePage.jsx` 和 `GuidePage.jsx` 中定義 `examDistricts` 對應表
- 依考區篩選可用地區
- 支援跨考區地區顯示

#### 4. 模擬測驗模式
- 法規模擬測驗：隨機抽取法規選擇題 25 題 + 是非題 25 題
- 地理模擬測驗：從指定地區（如南投）隨機抽取選擇題 25 題 + 是非題 25 題

### 題庫檔案命名規則

#### 地理題庫
- **選擇題**：`{RegionName}Multiple.json`
  - 例：`TaipeiMultiple.json`（臺北市選擇題）
- **是非題**：`{RegionName}TF.json`
  - 例：`TaipeiTF.json`（臺北市是非題）

#### 法規題庫
- **選擇題**：`ReguMultChoice.json`
- **是非題**：`ReguTuOrFalse.json`

### 地區名稱映射

| 中文名稱 | 檔案名稱前綴 |
|---------|-------------|
| 臺北市 | Taipei |
| 新北市 | NewTaipei |
| 基隆市 | Keelung |
| 桃園市 | Taoyuan |
| 新竹市 | HsinchuCity |
| 新竹縣 | Hsinchu |
| 苗栗縣 | Miaoli |
| 台中 | Taichung |
| 彰化 | Changhua |
| 南投 | Nantou |
| 雲林縣 | Yunlin |
| 嘉義市 | ChiayiCity |
| 嘉義縣 | Chiayi |
| 台南市 | Tainan |
| 高雄市 | Kaohsiung |
| 屏東縣 | Pingtung |
| 台東縣 | Taitung |
| 花蓮縣 | Hualien |
| 宜蘭縣 | Yilan |
| 澎湖縣 | Penghu |
| 金門縣 | Kinmen |
| 連江縣 | Lienchiang |

## 開發與維護

### 新增題庫

1. **準備 JSON 檔案**：依照格式準備題庫（參考 `JSON題庫格式說明.md`）
2. **放置檔案**：
   - 地理選擇題 → `public/data/Geography/MultipleChoice/`
   - 地理是非題 → `public/data/Geography/TrueOrFalse/`
   - 法規題庫 → `public/data/Regulations/`
3. **更新題庫結構**：執行 `node scripts/update-question-structure.cjs` 自動更新 `questionStructure.js`
4. **驗證題庫**：
   - 檢查完整性：`node scripts/check-question-banks.cjs`
   - 驗證類型：`node scripts/verify-question-banks.cjs`

### 修改考區分類

編輯 `src/components/HomePage.jsx` 和 `src/components/GuidePage.jsx` 中的 `examDistricts` 物件：

```javascript
const examDistricts = {
  '考區名稱': ['縣市1', '縣市2', '縣市3'],
  // ...
}
```

### 修改介面

- **樣式**：編輯對應元件的 `.css` 檔案
- **邏輯**：編輯對應的 `.jsx` 元件檔案
- **全域樣式**：編輯 `src/App.css` 或 `src/index.css`

### 工具腳本

```bash
# 檢查題庫完整性與題數
node scripts/check-question-banks.cjs

# 驗證題庫類型正確性
node scripts/verify-question-banks.cjs

# 自動更新 questionStructure.js
node scripts/update-question-structure.cjs
```

## 授權

MIT License
