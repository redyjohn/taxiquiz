import { Link, useParams, useNavigate } from 'react-router-dom'
import { getArticleBySlug, getArticleTitleBySlug } from '../data/guideArticles'
import './ArticleContent.css'

function ArticleContent() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const article = getArticleBySlug(slug)

  if (!article) {
    return (
      <div className="article-content-page">
        <div className="article-error">
          <p>找不到此文章</p>
          <Link to="/guide">返回考照百科中心</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="article-content-page">
      <header className="article-header">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate('/guide')}
        >
          ← 返回考照百科中心
        </button>
        <h1>{article.title}</h1>
        <div className="article-meta">
          <span>最後更新日期：{article.lastUpdated}</span>
          {article.professionalReview && (
            <span className="professional-badge">專業編輯團隊審核</span>
          )}
        </div>
      </header>

      <article className="article-body">
        {article.sections.map((section, idx) => (
          <section key={idx}>
            <h2>{section.h2}</h2>
            {section.subsections.map((sub, subIdx) => (
              <div key={subIdx} className="subsection">
                <h3>{sub.h3}</h3>
                {sub.content.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>
            ))}
          </section>
        ))}

        <section className="related-reading">
          <h2>相關閱讀</h2>
          <ul>
            {article.relatedSlugs.map((relSlug) => (
              <li key={relSlug}>
                <Link to={`/guide/${relSlug}`}>{getArticleTitleBySlug(relSlug)}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="disclaimer">
          <h2>免責聲明</h2>
          <p>
            本平台所提供之法規、資格、流程、收入等資訊，僅供參考。實際規定以交通部公路局、警政署計程車駕駛人服務網及各地警察局、監理所最新公告為準。規定可能隨年度微調，請於報考前再次確認。
          </p>
        </section>
      </article>
    </div>
  )
}

export default ArticleContent
