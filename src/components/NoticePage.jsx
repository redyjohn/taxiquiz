import { Link } from 'react-router-dom'
import { articles } from '../data/guideArticles'
import './NoticePage.css'

function NoticePage() {
  return (
    <div className="notice-page">
      <header className="notice-header">
        <Link to="/" className="back-link">← 返回首頁</Link>
        <h1>考照百科中心</h1>
        <p className="notice-subtitle">計程車執業登記證相關資訊、準備技巧與產業分析</p>
      </header>

      <div className="notice-content">
        <div className="notice-index">
          <h2 className="index-title">文章索引</h2>
          <p className="index-description">
            點選下方卡片，即可閱讀完整文章。每篇文章均經專業編輯團隊審核，並定期更新。
          </p>
          <div className="article-cards">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/guide/${article.slug}`}
                className="article-card"
              >
                <span className="article-card-number">{article.id}</span>
                <div className="article-card-content">
                  <h3 className="article-card-title">{article.title}</h3>
                  <p className="article-card-meta">更新：{article.lastUpdated}</p>
                </div>
                <span className="article-card-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoticePage
