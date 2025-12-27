# Schema.org 結構化數據說明與實作指南

## 一、什麼是 Schema.org 結構化數據？

### 1.1 基本概念

**Schema.org** 是由 Google、Microsoft、Yahoo 和 Yandex 於 2011 年共同發起的標準化標記語言，用於描述網頁內容的結構和語意。

**簡單來說：**
- 📝 它是一種「翻譯器」，幫助搜索引擎更好地理解您的網站內容
- 🏷️ 您用標準化的標籤「告訴」搜索引擎：這個頁面是什麼類型的內容
- 🎯 讓搜索引擎知道：這是文章？是 FAQ？是產品？還是服務？

### 1.2 為什麼需要結構化數據？

#### 對 SEO 的幫助：
✅ **提升搜尋結果可見性**：可能出現「豐富摘要」（Rich Snippets）  
✅ **更好的點擊率**：用戶更容易找到您的網站  
✅ **提高理解度**：搜索引擎更容易理解您的網站內容  

#### 對 AdSense 審核的幫助：
✅ **內容結構清晰**：讓 Google 更快理解網站內容  
✅ **提升內容品質評分**：結構化數據被視為高品質網站的標誌  
✅ **增加通過機率**：顯示網站專業度和技術水準  

### 1.3 格式選擇

**推薦格式：JSON-LD**（Google 官方推薦）
- ✅ 獨立於 HTML 結構，不會影響頁面代碼
- ✅ 易於維護和修改
- ✅ 可以放在 `<head>` 或 `<body>` 中

**範例：**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "計程車執業登記證題庫練習系統",
  "url": "https://taiwantaxiquiz.vercel.app",
  "description": "免費計程車執業登記證題庫練習系統"
}
</script>
```

---

## 二、適合您網站的結構化數據類型

### 2.1 主要頁面類型

#### 1. **WebSite** - 網站首頁
描述整個網站的基本資訊

#### 2. **FAQPage** - 常見問題頁面
適合「考試注意事項」頁面

#### 3. **Article** - 文章
適合五篇考試注意事項文章

#### 4. **EducationalOccupationalCredential** - 教育認證
描述計程車執業登記證相關資訊

#### 5. **WebApplication** - Web 應用程式
描述題庫練習系統的功能

---

## 三、實際實作範例

### 3.1 首頁 - WebSite + WebApplication

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "計程車執業登記證題庫練習系統",
  "url": "https://taiwantaxiquiz.vercel.app",
  "description": "免費計程車執業登記證題庫練習系統，提供法規和地理類別的選擇題、是非題線上測驗，包含台中、彰化、南投地區題庫，幫助您順利通過計程車執業登記證考試。",
  "inLanguage": "zh-TW",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://taiwantaxiquiz.vercel.app/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### 3.2 考試注意事項 - FAQPage

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "計程車司機需要具備什麼資格？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "要成為計程車司機，主要需要具備小型車職業駕照和計程車執業登記證兩大證照，並滿足年齡、駕照持有時間、品行良好等資格。"
      }
    },
    {
      "@type": "Question",
      "name": "什麼是職業小客車駕照？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "職業小客車駕照是台灣交通部公路局核發的職業汽車駕駛執照之一，主要用於以駕駛小客車為職業（如計程車、Uber、多元化計程車等營業用途）。"
      }
    },
    {
      "@type": "Question",
      "name": "什麼是計程車營業登記？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "計程車執業登記證是由警察機關核發的證照，專門用於計程車營業載客。必須同時持有職業駕照和執業登記證，才能正式開計程車營業。"
      }
    }
  ]
}
```

### 3.3 文章頁面 - Article

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "計程車司機需要具備什麼資格？",
  "description": "詳細說明成為計程車司機所需的證照、資格條件、申請流程",
  "author": {
    "@type": "Organization",
    "name": "計程車執業登記證題庫練習系統"
  },
  "publisher": {
    "@type": "Organization",
    "name": "計程車執業登記證題庫練習系統"
  },
  "datePublished": "2025-12-12",
  "dateModified": "2025-12-12",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://taiwantaxiquiz.vercel.app/notice"
  },
  "inLanguage": "zh-TW"
}
```

### 3.4 教育認證 - EducationalOccupationalCredential

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalCredential",
  "name": "計程車執業登記證",
  "description": "由台灣警察機關核發的計程車營業許可證，必須持有職業小客車駕照並通過執業相關法令及地理環境筆試後取得。",
  "credentialCategory": "Professional License",
  "recognizedBy": {
    "@type": "Organization",
    "name": "台灣各直轄市、縣（市）警察局"
  },
  "competencyRequired": "計程車駕駛人執業登記測驗及格（70分以上）",
  "educationalLevel": "Professional Certification"
}
```

---

## 四、如何在您的網站上實作

### 4.1 方法一：直接在 HTML 中添加（推薦）

在 `index.html` 的 `<head>` 中添加：

```html
<head>
  <!-- 現有的 meta 標籤 -->
  
  <!-- Schema.org 結構化數據 -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "計程車執業登記證題庫練習系統",
    "url": "https://taiwantaxiquiz.vercel.app",
    "description": "免費計程車執業登記證題庫練習系統，提供法規和地理類別的選擇題、是非題線上測驗。",
    "inLanguage": "zh-TW"
  }
  </script>
</head>
```

### 4.2 方法二：使用 React 組件動態生成

創建一個 Schema 組件，根據頁面類型動態生成結構化數據。

---

## 五、驗證結構化數據

### 5.1 Google Rich Results Test
- 網址：https://search.google.com/test/rich-results
- 輸入您的網站 URL
- 檢查是否有錯誤或警告

### 5.2 Schema.org Validator
- 網址：https://validator.schema.org/
- 可以測試結構化數據的有效性

---

## 六、對 AdSense 審核的具體幫助

### 6.1 提升內容理解度
- ✅ Google 能更快理解您的網站主題和內容類型
- ✅ 顯示網站結構清晰、技術水準高

### 6.2 增加信任度
- ✅ 結構化數據是專業網站的標誌
- ✅ 顯示網站所有者了解 SEO 最佳實踐

### 6.3 提升搜尋可見性
- ✅ 可能獲得豐富摘要（Rich Snippets）
- ✅ 提高點擊率，間接幫助審核

---

## 七、實作優先順序建議

### 高優先級 ⭐⭐⭐
1. **WebSite** - 首頁基本資訊（最簡單，影響最大）
2. **FAQPage** - 考試注意事項頁面

### 中優先級 ⭐⭐
3. **Article** - 五篇文章（如果每篇文章是獨立頁面）

### 低優先級 ⭐
4. **EducationalOccupationalCredential** - 認證資訊
5. **WebApplication** - 應用程式描述

---

## 八、注意事項

⚠️ **不要過度標記**
- 只標記實際存在的內容
- 不要添加虛假的結構化數據

⚠️ **保持準確**
- 確保標記的資訊與實際內容一致
- 定期檢查和更新

⚠️ **不要重複標記**
- 每個頁面只添加相關的結構化數據
- 避免同一內容多次標記

---

## 九、總結

**Schema.org 結構化數據：**
- 📝 是一種標準化的內容標記方式
- 🎯 幫助搜索引擎更好地理解您的網站
- ✅ 對 AdSense 審核有正面影響
- 🔧 實作相對簡單（JSON-LD 格式）

**建議：**
- 至少添加 **WebSite** 類型的結構化數據（最簡單且有效）
- 可以添加 **FAQPage**（適合考試注意事項頁面）
- 使用 Google Rich Results Test 驗證

需要我幫您實作這些結構化數據嗎？

