const fs = require('fs')
const path = require('path')

const baseDir = path.join(__dirname, '..', 'public', 'data', 'Geography')

const regionFileMap = {
  臺北市: 'Taipei', 新北市: 'NewTaipei', 基隆市: 'Keelung', 桃園市: 'Taoyuan',
  新竹市: 'HsinchuCity', 新竹縣: 'Hsinchu', 苗栗縣: 'Miaoli', 台中: 'Taichung',
  彰化: 'Changhua', 南投: 'Nantou', 雲林縣: 'Yunlin', 嘉義市: 'ChiayiCity',
  嘉義縣: 'Chiayi', 台南市: 'Tainan', 高雄市: 'Kaohsiung', 屏東縣: 'Pingtung',
  台東縣: 'Taitung', 花蓮縣: 'Hualien', 宜蘭縣: 'Yilan', 澎湖縣: 'Penghu',
  金門縣: 'Kinmen', 連江縣: 'Lienchiang'
}

function loadQuestions(filePath) {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    return Array.isArray(data) ? data : (data.questions || [])
  } catch (e) {
    return null
  }
}

function checkQuestionType(question) {
  // 選擇題特徵：options 有 3-4 個選項（非 是/否）
  // 是非題特徵：options 只有 2 個選項（是/否），或 correct_answer 是 boolean
  
  if (question.correct_answer === true || question.correct_answer === false) {
    return 'tf' // 是非題 (boolean correct_answer)
  }
  
  const options = question.options
  if (!options) return 'unknown'
  
  // options 可能是 object {"1":"...", "2":"..."} 或 array ["...", "..."]
  let optionValues = []
  if (Array.isArray(options)) {
    optionValues = options
  } else if (typeof options === 'object') {
    optionValues = Object.values(options)
  }
  
  // 是非題：2 個選項且是 是/否 或 ○/×
  if (optionValues.length === 2) {
    const lower = optionValues.map(v => String(v).trim())
    if ((lower.includes('是') && lower.includes('否')) ||
        (lower.includes('○') && lower.includes('×')) ||
        (lower.includes('O') && lower.includes('X'))) {
      return 'tf'
    }
  }
  
  // 3個以上選項 = 選擇題
  if (optionValues.length >= 3) {
    return 'mc'
  }
  
  // 2個選項但不是 是/否 => 可能是選擇題
  if (optionValues.length === 2) {
    return 'mc' // 2選項選擇題
  }
  
  return 'unknown'
}

console.log('=== 題庫完整性與類型檢查 ===\n')

let missingFiles = []
let typeErrors = []
let allCorrect = []

for (const [region, fileBase] of Object.entries(regionFileMap)) {
  // 檢查選擇題
  const mcPath = path.join(baseDir, 'MultipleChoice', `${fileBase}Multiple.json`)
  const mcExists = fs.existsSync(mcPath)
  
  if (!mcExists) {
    missingFiles.push(`${region} 選擇題 (${fileBase}Multiple.json)`)
  } else {
    const mcQuestions = loadQuestions(mcPath)
    if (mcQuestions === null) {
      missingFiles.push(`${region} 選擇題 - 檔案無法讀取`)
    } else if (mcQuestions.length === 0) {
      missingFiles.push(`${region} 選擇題 - 題庫為空`)
    } else {
      // 檢查前10題的類型
      let tfCount = 0, mcCount = 0
      const sampleSize = Math.min(10, mcQuestions.length)
      for (let i = 0; i < sampleSize; i++) {
        const type = checkQuestionType(mcQuestions[i])
        if (type === 'tf') tfCount++
        else if (type === 'mc') mcCount++
      }
      
      if (tfCount > mcCount) {
        typeErrors.push({
          file: `${fileBase}Multiple.json`,
          region: region,
          folder: 'MultipleChoice',
          expected: '選擇題',
          found: '是非題',
          detail: `抽樣 ${sampleSize} 題中 ${tfCount} 題為是非題格式`
        })
      } else {
        allCorrect.push(`${region} 選擇題 (${mcQuestions.length} 題) ✓`)
      }
    }
  }
  
  // 檢查是非題
  const tfPath = path.join(baseDir, 'TrueOrFalse', `${fileBase}TF.json`)
  const tfExists = fs.existsSync(tfPath)
  
  if (!tfExists) {
    missingFiles.push(`${region} 是非題 (${fileBase}TF.json)`)
  } else {
    const tfQuestions = loadQuestions(tfPath)
    if (tfQuestions === null) {
      missingFiles.push(`${region} 是非題 - 檔案無法讀取`)
    } else if (tfQuestions.length === 0) {
      missingFiles.push(`${region} 是非題 - 題庫為空`)
    } else {
      // 檢查前10題的類型
      let tfCount = 0, mcCount = 0
      const sampleSize = Math.min(10, tfQuestions.length)
      for (let i = 0; i < sampleSize; i++) {
        const type = checkQuestionType(tfQuestions[i])
        if (type === 'tf') tfCount++
        else if (type === 'mc') mcCount++
      }
      
      if (mcCount > tfCount) {
        typeErrors.push({
          file: `${fileBase}TF.json`,
          region: region,
          folder: 'TrueOrFalse',
          expected: '是非題',
          found: '選擇題',
          detail: `抽樣 ${sampleSize} 題中 ${mcCount} 題為選擇題格式`
        })
      } else {
        allCorrect.push(`${region} 是非題 (${tfQuestions.length} 題) ✓`)
      }
    }
  }
}

// 輸出結果
console.log('【一、缺少的題庫檔案】')
if (missingFiles.length === 0) {
  console.log('  全部縣市題庫檔案皆存在 ✓')
} else {
  missingFiles.forEach(m => console.log('  ✗', m))
}

console.log('\n【二、題目類型錯誤】')
if (typeErrors.length === 0) {
  console.log('  所有題庫類型皆正確 ✓')
} else {
  typeErrors.forEach(e => {
    console.log(`  ✗ ${e.region}`)
    console.log(`    檔案: ${e.folder}/${e.file}`)
    console.log(`    期望: ${e.expected}`)
    console.log(`    實際: ${e.found}`)
    console.log(`    說明: ${e.detail}`)
    console.log('')
  })
}

console.log('\n【三、正確的題庫】')
allCorrect.forEach(c => console.log(' ', c))

console.log('\n=== 總結 ===')
console.log(`缺少/空白題庫: ${missingFiles.length} 個`)
console.log(`類型錯誤: ${typeErrors.length} 個`)
console.log(`正確題庫: ${allCorrect.length} 個`)
