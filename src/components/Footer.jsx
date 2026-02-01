import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-links">
        <Link to="/about">關於我們</Link>
        <span className="separator">|</span>
        <Link to="/privacy">隱私權聲明</Link>
      </div>
    </footer>
  )
}

export default Footer
