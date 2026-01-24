import { useEffect } from 'react'
import { 
  getWebSiteSchema, 
  getWebApplicationSchema,
  getFAQPageSchema,
  getCredentialSchema,
  getArticleSchema
} from '../utils/schemaData'

/**
 * Schema.org 結構化數據組件
 * 根據頁面類型動態添加結構化數據到 head
 */
function SchemaScript({ type = 'website', articleData = null }) {
  useEffect(() => {
    // 移除現有的 schema script
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]')
    existingScripts.forEach(script => script.remove())

    let schemaData = null

    // 根據類型生成對應的結構化數據
    switch (type) {
      case 'website':
        schemaData = getWebSiteSchema()
        break
      case 'webapp':
        schemaData = getWebApplicationSchema()
        break
      case 'faq':
        schemaData = getFAQPageSchema()
        break
      case 'credential':
        schemaData = getCredentialSchema()
        break
      case 'article':
        if (articleData) {
          schemaData = getArticleSchema(articleData)
        }
        break
      default:
        schemaData = getWebSiteSchema()
    }

    // 創建並添加 script 標籤
    if (schemaData) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = JSON.stringify(schemaData, null, 2)
      document.head.appendChild(script)
    }

    // 清理函數
    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]')
      scripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      })
    }
  }, [type, articleData])

  return null // 此組件不渲染任何可見內容
}

export default SchemaScript




