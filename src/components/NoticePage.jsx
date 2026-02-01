import { useState, Fragment } from 'react'
import './NoticePage.css'

const noticeItems = [
  {
    id: 1,
    title: '如何一次考上營業登記',
    content: `其實考計程車營業登記是一個小困難的過程，但我認為考試最困難的並不是題目本身，而是到底要考什麼?要怎麼考?

**詳細流程請參考：[什麼是計程車營業登記?](article:4)**

扣除建構網站跟了解流程部分，我大概用兩週積極刷題，就考過了，以下是我的心得分享，希望可以大大提高大家的合格率：

## 1. 選擇題題目請盡量用諧音記法

**例如法規：**
公共汽車招呼站多少公尺內不得臨時停車?(1)5公尺(2)10公尺(3)15公尺。正確答案是(2)10公尺
我就會用「臨10停車」去記答案

**例如地理：**
二水鄉公所位於二水鄉哪條路上？A. 二水街 B. 南通路 C. 中山路。正確答案是 B. 南通路
我就會用「惡(二)水難(南)通」去記答案

題目本身不會改內容，但有可能會改順序，所以記題目，不要記選項。

## 2. 是非題部分

只看正確題目，錯誤題目一率跳過，千萬不要讓錯誤題目留在你的腦海裡。只要你看到有印象的題目就選是，完全沒印象的就選否，大概也可以達到80分以上。

## 3. 最重要但是我考前不知道的——出題是有比例的！

這次考試前有跟監考人員確認考試範圍，因為很怕背錯範圍。例如我這次是中彰投考區，我就去問監考人員說「我的准考證上面沒有寫我是哪一個營業區域，會不會考到苗栗地區?」（因為台中營業區域是中彰投苗）

承辦人回覆我說「這個考區就只考中彰投地區的題庫，台中比例最高」。

所以～先問一下你要考的地區，它的正確考試範圍，不要多花時間準備錯方向，然後有沒有比重較重的區域，如果時間不夠可以優先準備比重重的地方。

## 我給大家的建議是

1. **法規先優先讀完**，題目是固定的

2. **先讀選擇題再讀是非題**，選擇題比較好記，有很多諧音可以使用

3. **是非題只看正確的**，不要對錯都看，看越多越混淆

### 最後祝大家金榜題名！`
  },
  {
    id: 2,
    title: '計程車司機需要具備什麼資格?',
    content: `要成為計程車司機，主要需要具備小型車職業駕照和計程車執業登記證兩大證照，並滿足年齡、駕照持有時間、品行良好等資格，且完成靠行掛牌才能正式上路載客營業。整體流程包含先考職業駕照，再考執業登記證，最後掛牌。

## 一、基本資格與條件

**年齡：** 通常須年滿21歲以上，65歲以下，但有特殊規定，例如滿60歲需每年體檢。

**駕照：** 持有有效之小型車職業駕照。

**品行：** 無重大刑事紀錄（如妨害風化、傷害、公共危險等）且未有嚴重道路交通違規紀錄。

## 二、必備證照與流程

**考取職業駕照：**

先取得小型車普通駕照，並有一定駕駛年資 (例如普通駕照滿3個月)。

報名監理站的職業駕照考照，通過筆試和路考後，換發職業駕照。

**考取執業登記證：**

持有職業駕照後，才能報考計程車執業登記證。

需通過「執業相關法令」及「執業地地理環境」的筆試（各科需70分以上）。

參加執業前講習。

取得合格成績單後，在期限內向警察局辦理登記並領取執業登記證。

**完成靠行與掛牌：**

將職業駕照、執業登記證及車輛等文件，向計程車客運業或運輸合作社辦理靠行。

最後到監理站驗車、申請計程車牌照。

## 三、重點提醒

**無不良紀錄：** 需提供「良民證」與交通違規紀錄證明。

**連續持有：** 申請個人經營車行可能要求連續持有執業登記證達6年以上。

**多元化計程車：** 與傳統小黃所需證照相同，都是職業駕照+執業登記證。

**查詢：** 若對自身資格有疑慮，可至當地交通警察大隊查詢。`
  },
  {
    id: 3,
    title: '什麼是職業小客車駕照?',
    content: `職業小客車駕照（也稱職業小型車駕照，或簡稱職小）是台灣交通部公路局核發的職業汽車駕駛執照之一，主要用於以駕駛小客車為職業（如計程車、Uber、多元化計程車等營業用途）。它與普通小型車駕照（自用小客車駕照）最大的差別在於：

**普通駕照：** 只能用於自用或非營業。

**職業駕照：** 專門用於營業載客，如計程車司機必須持有此照才能進一步考取「計程車執業登記證」。

## 職業小客車駕照可駕駛的車種包括：

輕型機車

小貨車

小客車

代用小客車

小客貨兩用車

## 考取條件（2025年最新規定，依交通部公路局為準）

**年齡：** 滿20歲，未滿65歲（現役軍公教人員不得報考）。

**駕照資格：**

已持有普通小型車駕照滿3個月以上（最常見途徑）。

或無駕照者：持有學習駕駛證滿6個月以上。

**其他：** 無重大違規紀錄（違規需先繳清或繳銷）。

## 考取流程（目前全台統一採網路預約）

**體檢（最先做，建議提前1週）：**

至公立醫院、衛生所或監理所指定診所進行體格檢查 + 體能測驗。

60歲以上需至特定醫院，取得專用表格。

費用約300-600元不等（依醫院而異）。

體檢合格後取得紅色體檢表，考試當天必帶。

**網路報名預約：**

至監理服務網（https://www.mvdis.gov.tw） → 考照預約報名。

預約考試日期（開放30天前開始，考前2天截止）。

**考試當天（先到先考，順序：體檢 → 筆試 → 路考）：**

**筆試：** 僅考「機械常識」（是非 + 選擇題，及格60分）。

持普通駕照者不考交通規則。

可線上練習：交通部公路局網站有模擬考與題庫下載（國語/台語/客語語音）。

**路考：** 使用監理站手排車考驗。

比普通路考更嚴格，多考「曲線進退（S型）」、「曲巷調頭（T型）」。

若持自排普通駕照，還需考「換檔穩定測試」與「上下坡道」。

路考注意事項：胎壓檢查、兩段式開門、安全帶、方向燈、遵守號誌等。

建議先報名駕訓班練習（至少3堂，費用約1200元/堂）。

**通過後：**

繳費領照（約200元）。

總費用（不含體檢與練車）：約650-900元（報名450元 + 考驗車費50元 + 領照200元）。

## 常見建議

**強烈建議：** 先去合格駕訓班練習（尤其是手排車 + 職業專用場地），通過率可大幅提升。許多車隊（如大都會、台灣大、皇冠等）會提供免費或補助考照輔導。

**考照失敗：** 筆試未過不能路考；路考未過可1年內補考（免筆試）。無故缺考2次，禁報3個月。

**考取後：** 若要開計程車，還需再考「計程車執業登記證」筆試，並靠行車行掛牌。

最新資訊請以交通部公路局監理服務網（https://www.mvdis.gov.tw）或各地監理所公告為準，規定可能隨年度微調。祝你順利考取！🚕`
  },
  {
    id: 4,
    title: '什麼是計程車營業登記?',
    content: `計程車執業登記證（簡稱執業登記證）是由警察機關（各直轄市/縣市警察局）核發的證照，專門用於計程車營業載客。它與職業小客車駕照（職小）不同：

**職業駕照：** 由公路監理單位（交通部公路局）核發，證明你有資格駕駛營業小客車（可開計程車、租賃車等）。

**執業登記證：** 由警察局核發，是計程車專屬的「營業許可證」，必須同時持有職業駕照 + 執業登記證，才能靠行車行掛牌、正式開計程車營業（小黃、多元化計程車皆需）。

執業登記證有效期通常為3年（依地區略有差異），每年需查驗一次，過期或無效就不能營業。

## 取得條件（2025年最新規定，依《計程車駕駛人執業登記管理辦法》）

已持有有效職業小客車駕照（職小）。

**年齡：** 通常20歲以上，無嚴格上限，但70歲以上需特殊審核。

**無不得辦理執業登記的情形：** 如重大刑責、特定犯罪紀錄、酒駕吊扣等，詳見《道路交通管理處罰條例》第36條、第37條。

**需有執業事實：** 如靠行車行、合作社社員、受僱等證明。

## 取得流程（全台統一由各警察局交通隊辦理）

**先考取職業小客車駕照（如前述）：**

這是前提，沒職小就不能報考執業登記證。

**報名測驗：**

地點：戶籍地或執業地的警察局交通大隊/交通隊（建議先去戶籍地，避免跨區地理測驗）。

方式：臨櫃報名（部分地區支援線上，如警政署「計程車駕駛人服務網」https://tx3.npa.gov.tw）。

費用：約300元（測驗+講習費）。

所需文件：

身分證正本

職業駕照正本

最近3個月內2吋彩色照片2-4張（脫帽、無色鏡）

申請書、切結書（現場填寫）

**參加測驗（筆試）：**

科目二科（各50題：是非+選擇題，每題2分，70分及格）：

執業相關法令（交通法規、計程車管理辦法等）

地理環境（依報考區域，例如台北區域考台北市、新北市、桃園市、基隆市、宜蘭縣等）

考題刁鑽，通過率約28-40%，建議利用本網站模擬練習以提升通過率（提供全部題庫+模擬考）。

題庫：警政署官網下載。

**測驗通過後參加講習：**

約8-16小時（分2-3天），內容包括服務禮儀、事故處理、防制犯罪、地區特性等。

缺席或遲到超過15分鐘視同不合格，需重考。

通過後取得合格證明。

**領證：**

檢附合格證明、身分證、職照、照片、執業事實證明（車行同意書或行照）。

領取執業登記證及其副證（費用約200元）。

證照到手後，即可靠行車行掛牌（監理所辦理），正式營業。

## 常見注意事項

**跨區執業：** 若換執業縣市，需參加新地區地理測驗（部分免測，如同一區域內）。

**查驗：** 每年出生月前後1個月內到原發證警察局查驗（攜身分證、職照、執業事實證明）。

**也可透過大型車隊：** 如台灣大55688、優良計程車、皇冠大車隊，他們提供全程免費輔導（含題庫、模擬考、靠行掛牌），通過率高很多。

**最新資訊：** 以警政署計程車駕駛人服務網（https://tx3.npa.gov.tw）或各地警察局公告為準，規定偶有微調。

考取後就能正式當計程車司機，時間自由、收入可觀！如果有特定地區（如台北、新北），可以再提供更精確資訊。加油！🚕`
  },
  {
    id: 5,
    title: '計程車司機收入分析',
    content: `台灣計程車司機收入差異很大，主要取決於專職/兼職、地區、車隊類型（傳統小黃 vs 多元化計程車）、工作時數、是否加入派遣車隊、個人努力程度（如專跑機場、熱門區域）等因素。以下根據交通部公路局2023年（民國112年）計程車營運狀況調查（最新官方統計，2024年11月公布）及相關報導進行分析。2025年目前無新官方統計，但費率微調與經濟環境下，收入大致維持或略增（通膨影響）。

## 官方平均數據（2023年調查，專職計程車司機）

**每月營業總收入：** 約 4.88萬元（較2021年增約17%）。

**每月營業支出（油費、保養、服務費、停車、保險等）：** 約 2.18萬元。

**每月淨收入（扣除成本後實際到手）：** 約 2.7萬元（2萬6,957元，較2021年增22.6%）。

比基本工資（2.74萬元）略低，月休僅4.7天，每天營業9.1小時（工時長）。

**多元化計程車（如Uber、Line Taxi等平台派車）：** 淨收入更高，約 3.24萬元（較傳統高約5,500元）。

**加入派遣車隊（如大都會、台灣大、優良等）：** 淨收入較未加入者高約 8,900元（派車效率高，空車率低）。

**兼職司機（占比18.3%）：** 淨收入約 1.48萬元（時數較少）。

## 實際收入差異（車隊/司機分享與報導）

許多車隊宣傳或司機自述收入遠高於官方平均，因為官方統計包含低效率/傳統攬客司機，而加入APP派遣的司機（尤其多元化）收入更接近以下水準：

**一般專職：** 月淨收入 5-8萬元（每天開8-10小時，加入車隊）。

**努力型/專跑熱點（如台北信義區、桃園機場排班）：** 月淨收入 10-15萬元（時薪400-600元以上，月營業額20萬+，扣成本後7折）。

例如：桃園機場長程載客，一趟淨利2,700元，時薪可達900元。

**頂尖司機：** 月淨收入 15-20萬元（年薪破百萬至200萬），多為機場排班或多元化APP高效率司機。

## 收入類型比較表

**官方平均（專職）：** 月淨收入 2.7萬元 | 全台平均，含低效率司機 | 交通部2023調查

**一般加入車隊：** 月淨收入 5-8萬元 | 台北/新北/桃園，8-10小時 | 車隊分享

**多元化計程車：** 月淨收入 3.2-10萬元+ | 加入APP派車 | 交通部 + 車隊

**頂尖/機場專跑：** 月淨收入 10-20萬元 | 桃園機場、台北熱區，努力拼 | 司機自述/車隊案例

## 影響收入關鍵因素

**地區差異：**

北部（台北、新北、桃園）：最高，月營業總收入約5.5萬元（客源多、機場長程）。

中南部：較低，客源較少。

**車隊 vs 平台：**

傳統車隊（如大都會、台灣大）：抽成15%或月費固定（2,500-3,000元），但派車穩定。

多元化（Uber、Line Taxi等）：抽成25%（成本高），但客源多，淨收入仍可高於傳統。

**成本：**

油/電費、保養、靠行費、保險、折舊等，每月2-3萬元。

多元化免燃料稅/牌照稅，成本較低。

**工時與效率：**

空車率26.4%（近4年最低），但仍需努力接派。

加入APP + 車隊輔導，通過率高，收入可翻倍。

## 結論與建議

**平均收入不高（官方2.7萬），適合有經驗、肯拼的人。**

**想賺10萬以上：** 強烈建議加入大型車隊（如大都會、台灣大、優良、皇冠），提供免費輔導、題庫、靠行，通過率高，收入穩定。

**風險：** 工時長（月休少）、油價波動、罰單、事故等。

**最新資訊：** 以交通部公路局（https://www.thb.gov.tw）或警政署計程車服務網為準，規定可能微調。`
  },
  {
    id: 6,
    title: '台灣Uber司機比較',
    content: `台灣 Uber 司機比較分析（2025年最新數據）

在台灣，Uber 司機主要分為兩類：

**Uber 多元化計程車（UberX / 多元化）：** 合法計程車（白底紅字車牌），需持有職業小客車駕照 + 計程車執業登記證，加入合作車隊（如大慶、皇冠、Q Taxi等）上線。

**Uber 傳統計程車（Uber Taxi / 優步小黃）：** 透過 Uber App 叫傳統黃色計程車（小黃），司機屬於傳統車隊。

以下比較 Uber 多元化計程車司機 vs 傳統計程車司機（小黃），收入、成本、工作條件等。數據來自交通部、車隊分享、司機自述（2025年最新，含 Bolt 等競爭影響）。

## 收入比較（專職，全職8-12小時/天，月工作25天）

**Uber 多元化：**

月總營業額：約 10-20萬元

月淨收入（扣成本後）：約 6-12萬元

平均時薪：300-600元

關鍵影響因素：抽成25%（平台）+車隊費，客源多（App 派單），北部/機場熱區高

**傳統小黃：**

月總營業額：約 8-15萬元

月淨收入（扣成本後）：約 5-10萬元

平均時薪：250-500元

關鍵影響因素：抽成0-15%（車隊），靠路邊攬客+車隊派單，空車率較高

**頂尖司機：**

月總營業額：約 12-25萬元+

月淨收入（扣成本後）：約 8-15萬元+

平均時薪：400-800元

關鍵影響因素：低抽成（月費制）、公平派單，許多司機轉自 Uber 後收入增

Uber 多元化：平台抽成高（25%），但客源穩定（App 推送）、長程單多。北部（台北/桃園）專跑機場/信義區可達15萬淨利。

傳統小黃：成本低（無平台抽成），但客源靠運氣，競爭激烈（9萬運將）。

頂尖：機場排班或努力型，月淨利可破15-20萬（但工時長）。

## 成本比較（每月固定+浮動）

**Uber 多元化：**

平台/車隊抽成：25%（Uber）+車隊月費/趟費

靠行費：500-3,000元

稅金：免營業稅、牌照稅、燃料稅

油/電+保養：2-3萬元

保險+其他：較高（營業險）

總成本：3-5萬元（抽成吃掉大頭）

**傳統小黃：**

平台/車隊抽成：0-15%（車隊）

靠行費：500-2,000元

稅金：同（免營業稅、牌照稅、燃料稅）

油/電+保養：2-3萬元

保險+其他：較高

總成本：2-3萬元

Uber 多元化：抽成高，但免稅+派單效率高，省空車油錢。許多司機抱怨「努力不一定多賺」（平台平衡派單）。

傳統：成本低，但空車率高（26-30%），北部較好。

## 工作條件比較

**Uber 多元化：**

工作時間：彈性（App 上線/下線）

客源：App 派單穩定，長程/熱區多

壓力：評分機制嚴（低於85%可能停權）、奧客

優勢：無現金交易、乘客預估車資

缺點：高抽成、系統平衡派單（不獎勵努力）

地區差異：北部（台北/桃園）最高，中南部較低

**傳統小黃：**

工作時間：彈性，但需靠行車隊

客源：路邊攬客+車隊派單，運氣成分大

壓力：路邊競爭、繞路糾紛

優勢：抽成低、熟悉路段

缺點：空車多、雨天/旺季競爭激烈

地區差異：同（北部較高）

## 結論與建議

**收入：** Uber 多元化平均略高於傳統小黃（因客源多），但抽成吃掉優勢。**加入優質車隊（如大都會、皇冠、優良）**的多元化司機，收入往往勝過純 Uber 或傳統小黃（低抽成 + 公平派單）。

**適合誰：** 時間自由、想兼職 → Uber 多元化；想省成本、熟悉路段 → 傳統小黃。

**想賺更多：** 強烈建議加入大型車隊（大都會/台灣大/皇冠），他們提供免費輔導、題庫、靠行，通過率高，收入穩定。許多 Uber 司機轉車隊後月增2-5萬。

**風險：** 工時長（10+小時）、油價波動、罰單、事故。2025年 Bolt 等競爭加劇，客源分散。`
  }
]

function NoticePage({ onBack }) {
  const [selectedId, setSelectedId] = useState(null)

  const handleTitleClick = (id) => {
    setSelectedId(id)
  }

  const handleBackToIndex = () => {
    setSelectedId(null)
  }

  const handlePrevious = () => {
    if (selectedId === null) return
    const currentIndex = noticeItems.findIndex(item => item.id === selectedId)
    if (currentIndex > 0) {
      setSelectedId(noticeItems[currentIndex - 1].id)
    }
  }

  const handleNext = () => {
    if (selectedId === null) return
    const currentIndex = noticeItems.findIndex(item => item.id === selectedId)
    if (currentIndex < noticeItems.length - 1) {
      setSelectedId(noticeItems[currentIndex + 1].id)
    }
  }

  const currentItem = noticeItems.find(item => item.id === selectedId)
  const currentIndex = selectedId !== null ? noticeItems.findIndex(item => item.id === selectedId) : -1

  // 點擊內部連結時跳轉至指定文章
  const handleArticleLinkClick = (articleId) => {
    setSelectedId(articleId)
    // 捲動至內容區頂部，讓使用者清楚看到已切換文章
    setTimeout(() => {
      const el = document.querySelector('.notice-detail .detail-content')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  // 將文字中的 [連結文字](article:id) 轉為可點擊連結（支援全形括號）
  const renderInlineContent = (text) => {
    const linkRegex = /[\[［]([^\]］]+)[\]］][\(（]article:(\d+)[\)）]/g
    const parts = []
    let lastIndex = 0
    let match
    let partKey = 0
    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index))
      }
      const targetId = Number(match[2])
      parts.push(
        <button
          key={`link-${partKey++}`}
          type="button"
          className="content-internal-link"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleArticleLinkClick(targetId)
          }}
        >
          {match[1]}
        </button>
      )
      lastIndex = match.index + match[0].length
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }
    return parts.length > 0 ? parts : [text]
  }

  // 格式化內容（將 Markdown 風格的標題轉換為 HTML）
  const formatContent = (content) => {
    const lines = content.split('\n')
    const result = []
    let currentParagraph = []
    let keyIndex = 0

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(' ')
        // 處理 **粗體** 標記
        const parts = text.split(/(\*\*.*?\*\*)/g)
        const formattedParts = parts.map((part, idx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const innerText = part.replace(/\*\*/g, '')
            return <strong key={idx}>{renderInlineContent(innerText)}</strong>
          }
          return <Fragment key={idx}>{renderInlineContent(part)}</Fragment>
        })
        result.push(<p key={keyIndex++} className="content-paragraph">{formattedParts}</p>)
        currentParagraph = []
      }
    }

    lines.forEach((line) => {
      const trimmedLine = line.trim()
      
      if (trimmedLine.startsWith('## ')) {
        flushParagraph()
        result.push(<h3 key={keyIndex++} className="content-subtitle">{trimmedLine.replace('## ', '')}</h3>)
      } else if (trimmedLine.startsWith('### ')) {
        flushParagraph()
        result.push(<p key={keyIndex++} className="content-blessing">{trimmedLine.replace('### ', '')}</p>)
      } else if (trimmedLine === '') {
        flushParagraph()
        result.push(<br key={keyIndex++} />)
      } else {
        currentParagraph.push(trimmedLine)
      }
    })

    flushParagraph()
    return result
  }

  return (
    <div className="notice-page">
      <header className="notice-header">
        <button className="back-button" onClick={onBack}>
          ← 返回首頁
        </button>
        <h1>考試注意事項</h1>
      </header>

      <div className="notice-content">
        {selectedId === null ? (
          // 標題列表視圖
          <div className="notice-index">
            <h2 className="index-title">選擇要查看的內容</h2>
            <div className="notice-title-list">
              {noticeItems.map((item) => (
                <button
                  key={item.id}
                  className="notice-title-card"
                  onClick={() => handleTitleClick(item.id)}
                >
                  <div className="title-card-content">
                    <span className="title-number">{item.id}</span>
                    <span className="title-text">{item.title}</span>
                  </div>
                  <span className="title-arrow">→</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          // 內容詳細視圖
          <div className="notice-detail">
            <button className="back-to-index-button" onClick={handleBackToIndex}>
              ← 返回目錄
            </button>
            <div className="detail-header">
              <h2 className="detail-title">{currentItem.title}</h2>
            </div>
            <div className="detail-content">
              {formatContent(currentItem.content)}
            </div>
            <div className="detail-navigation">
              <button
                className="nav-button prev-button"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
              >
                ← 上一個
              </button>
              <button
                className="nav-button next-button"
                onClick={handleNext}
                disabled={currentIndex === noticeItems.length - 1}
              >
                下一個 →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NoticePage
