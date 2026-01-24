// Schema.org 結構化數據生成工具

// 網站基本信息
export const getWebSiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "計程車執業登記證題庫練習系統",
    "url": "https://taiwantaxiquiz.vercel.app",
    "description": "免費計程車執業登記證題庫練習系統，提供法規和地理類別的選擇題、是非題線上測驗，包含台中、彰化、南投地區題庫，幫助您順利通過計程車執業登記證考試。",
    "inLanguage": "zh-TW",
    "publisher": {
      "@type": "Organization",
      "name": "計程車執業登記證題庫練習系統"
    }
  }
}

// WebApplication 結構化數據
export const getWebApplicationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "計程車執業登記證題庫練習系統",
    "url": "https://taiwantaxiquiz.vercel.app",
    "description": "免費線上測驗平台，提供超過 1,400 題的計程車執業登記證題庫練習，包含即時答題反饋、成績統計、錯題複習等功能。",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "TWD"
    },
    "featureList": [
      "線上測驗練習",
      "即時答題反饋",
      "成績統計",
      "錯題複習",
      "題庫導讀",
      "模擬測驗"
    ]
  }
}

// FAQPage 結構化數據（考試注意事項）
export const getFAQPageSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "計程車司機需要具備什麼資格？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "要成為計程車司機，主要需要具備小型車職業駕照和計程車執業登記證兩大證照，並滿足年齡、駕照持有時間、品行良好等資格，且完成靠行掛牌才能正式上路載客營業。"
        }
      },
      {
        "@type": "Question",
        "name": "什麼是職業小客車駕照？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "職業小客車駕照（也稱職業小型車駕照，或簡稱職小）是台灣交通部公路局核發的職業汽車駕駛執照之一，主要用於以駕駛小客車為職業（如計程車、Uber、多元化計程車等營業用途）。"
        }
      },
      {
        "@type": "Question",
        "name": "什麼是計程車營業登記？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "計程車執業登記證是由警察機關（各直轄市/縣市警察局）核發的證照，專門用於計程車營業載客。必須同時持有職業駕照和執業登記證，才能靠行車行掛牌、正式開計程車營業。"
        }
      },
      {
        "@type": "Question",
        "name": "計程車司機收入如何？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "根據交通部公路局2023年調查，專職計程車司機每月淨收入約 2.7 萬元。加入派遣車隊或多元化計程車平台，收入可達 5-15 萬元不等，主要取決於地區、車隊類型、工作時數等因素。"
        }
      },
      {
        "@type": "Question",
        "name": "Uber 多元化計程車與傳統小黃有什麼差別？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Uber 多元化計程車是合法計程車（白底紅字車牌），需持有職業駕照和執業登記證，透過 Uber App 派單。傳統小黃是黃色計程車，主要靠路邊攬客和車隊派單。在收入方面，Uber 多元化平台抽成較高（25%），但客源穩定；傳統小黃成本較低，但空車率較高。"
        }
      }
    ]
  }
}

// Article 結構化數據（單篇文章）
export const getArticleSchema = (articleData) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": articleData.title,
    "description": articleData.description || articleData.title,
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
      "@id": `https://taiwantaxiquiz.vercel.app/notice#${articleData.id}`
    },
    "inLanguage": "zh-TW",
    "articleSection": "考試注意事項"
  }
}

// 教育認證結構化數據
export const getCredentialSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    "name": "計程車執業登記證",
    "description": "由台灣警察機關核發的計程車營業許可證，必須持有職業小客車駕照並通過執業相關法令及地理環境筆試（各科70分以上）後取得。",
    "credentialCategory": "Professional License",
    "recognizedBy": {
      "@type": "Organization",
      "name": "台灣各直轄市、縣（市）警察局"
    },
    "competencyRequired": "計程車駕駛人執業登記測驗及格（各科70分以上）",
    "educationalLevel": "Professional Certification"
  }
}




