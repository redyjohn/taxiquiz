import { useEffect } from 'react'
import './AdBanner.css'

function AdBanner({ position = 'horizontal', className = '', adSlot = '' }) {
  useEffect(() => {
    // 初始化 AdSense 廣告
    try {
      if (window.adsbygoogle && window.adsbygoogle.loaded !== true) {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (e) {
      console.error('AdSense error:', e)
    }
  }, [])

  // 根據位置設置廣告尺寸
  const getAdStyle = () => {
    switch (position) {
      case 'horizontal':
        return { display: 'inline-block', width: '728px', height: '90px' }
      case 'vertical':
        return { display: 'inline-block', width: '300px', height: '250px' }
      case 'square':
        return { display: 'inline-block', width: '300px', height: '300px' }
      default:
        return { display: 'inline-block', width: '728px', height: '90px' }
    }
  }

  const adContent = (
    <div className={`ad-banner ad-${position} ${className}`}>
      <div className="ad-label">廣告</div>
      <div className="ad-content">
        {adSlot ? (
          <ins
            className="adsbygoogle"
            style={getAdStyle()}
            data-ad-client="ca-pub-4218582490253078"
            data-ad-slot={adSlot}
          />
        ) : (
          <div className="ad-placeholder">
            <p>廣告位置</p>
            <p className="ad-size">{position === 'horizontal' ? '728x90' : position === 'vertical' ? '300x250' : '300x300'}</p>
            <p className="ad-note">請設定 adSlot 屬性以顯示廣告</p>
          </div>
        )}
      </div>
    </div>
  )

  return adContent
}

export default AdBanner

