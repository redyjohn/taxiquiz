# Schema.org 結構化數據實作範例

## 快速開始：最簡單的方法

我已經在 `index.html` 中添加了基本的 **WebSite** 結構化數據。這是最簡單且最有效的方法！

### 已添加的內容

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "計程車執業登記證題庫練習系統",
  "url": "https://taiwantaxiquiz.vercel.app",
  "description": "免費計程車執業登記證題庫練習系統...",
  "inLanguage": "zh-TW",
  "publisher": {
    "@type": "Organization",
    "name": "計程車執業登記證題庫練習系統"
  }
}
</script>
```

---

## 進階實作：使用 React 組件（可選）

如果您想要根據不同頁面動態添加不同的結構化數據，可以使用我創建的 `SchemaScript` 組件。

### 1. 在 App.jsx 中使用

```jsx
import SchemaScript from './components/SchemaScript'

function App() {
  const [currentPage, setCurrentPage] = useState('welcome')
  
  return (
    <div className="App">
      {/* 根據頁面類型添加結構化數據 */}
      {currentPage === 'welcome' && <SchemaScript type="website" />}
      {currentPage === 'notice' && <SchemaScript type="faq" />}
      {currentPage === 'practice' && <SchemaScript type="webapp" />}
      
      {/* 其他組件 */}
    </div>
  )
}
```

### 2. 在 NoticePage 中使用（文章類型）

```jsx
import SchemaScript from './components/SchemaScript'

function NoticePage({ onBack }) {
  const [selectedId, setSelectedId] = useState(null)
  const selectedItem = noticeItems.find(item => item.id === selectedId)
  
  return (
    <div className="notice-page">
      {/* 當顯示文章時，添加 Article 結構化數據 */}
      {selectedItem && (
        <SchemaScript 
          type="article" 
          articleData={{
            id: selectedItem.id,
            title: selectedItem.title,
            description: selectedItem.content.substring(0, 200)
          }}
        />
      )}
      
      {/* 當顯示列表時，添加 FAQPage 結構化數據 */}
      {!selectedItem && <SchemaScript type="faq" />}
      
      {/* 其他內容 */}
    </div>
  )
}
```

---

## 可用的結構化數據類型

### 1. WebSite（網站基本資訊）✅ 已實作
```jsx
<SchemaScript type="website" />
```
- 適用於：首頁
- 說明：描述整個網站的基本資訊

### 2. WebApplication（Web 應用程式）✅ 已實作
```jsx
<SchemaScript type="webapp" />
```
- 適用於：題庫練習頁面
- 說明：描述應用程式的功能和特性

### 3. FAQPage（常見問題）✅ 已實作
```jsx
<SchemaScript type="faq" />
```
- 適用於：考試注意事項頁面
- 說明：將五篇文章以 FAQ 形式標記

### 4. Article（文章）✅ 已實作
```jsx
<SchemaScript type="article" articleData={articleData} />
```
- 適用於：單篇文章頁面
- 說明：標記單篇文章的詳細資訊

### 5. EducationalOccupationalCredential（教育認證）✅ 已實作
```jsx
<SchemaScript type="credential" />
```
- 適用於：認證說明頁面
- 說明：描述計程車執業登記證的認證資訊

---

## 驗證結構化數據

### 方法一：Google Rich Results Test（推薦）
1. 訪問：https://search.google.com/test/rich-results
2. 輸入您的網站 URL：`https://taiwantaxiquiz.vercel.app`
3. 點擊「測試網址」
4. 查看結果：
   - ✅ 綠色 = 通過
   - ⚠️ 黃色 = 警告（可忽略）
   - ❌ 紅色 = 錯誤（需要修正）

### 方法二：Schema.org Validator
1. 訪問：https://validator.schema.org/
2. 選擇「Fetch URL」
3. 輸入您的網站 URL
4. 查看驗證結果

---

## 預期效果

### 在搜尋結果中可能出現：
- 📋 **網站連結框**：顯示網站名稱和描述
- ❓ **FAQ 豐富摘要**：顯示常見問題和答案
- 📰 **文章資訊**：顯示文章標題、發布日期等

### 對 AdSense 審核的幫助：
- ✅ 讓 Google 更快理解網站內容結構
- ✅ 提升網站專業度和技術水準評分
- ✅ 增加通過審核的機率

---

## 下一步

1. ✅ **已完成**：在 `index.html` 中添加了 WebSite 結構化數據
2. 💡 **可選**：在各個頁面組件中使用 `SchemaScript` 組件添加更多結構化數據
3. ✅ **建議**：使用 Google Rich Results Test 驗證結構化數據是否正確

---

## 注意事項

⚠️ **不要過度標記**
- 只標記實際存在的內容類型
- 每個頁面只添加相關的結構化數據

⚠️ **保持一致性**
- 確保標記的資訊與實際內容一致
- 定期檢查和更新

⚠️ **測試驗證**
- 添加後務必使用驗證工具檢查
- 修正任何錯誤或警告

---

**現在您已經有了基本的結構化數據！這將有助於 Google 更好地理解您的網站，並提升 AdSense 審核的通過機率。** 🎉




