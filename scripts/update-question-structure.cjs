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

function countQuestions(filePath) {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    const arr = Array.isArray(data) ? data : (data.questions || [])
    return arr.length
  } catch (e) {
    return 0
  }
}

// 生成題目範圍配置（每 50 題一組）
function generateRanges(totalQuestions) {
  if (totalQuestions === 0) {
    return [{ start: 1, end: 0, label: "題庫更新中！" }]
  }
  
  const ranges = []
  let start = 1
  
  while (start <= totalQuestions) {
    const end = Math.min(start + 49, totalQuestions)
    ranges.push({ start, end, label: `${start}-${end}題` })
    start = end + 1
  }
  
  return ranges
}

// 收集所有縣市的題數
const mcCounts = {}
const tfCounts = {}

for (const [region, fileBase] of Object.entries(regionFileMap)) {
  const mcPath = path.join(baseDir, 'MultipleChoice', `${fileBase}Multiple.json`)
  const tfPath = path.join(baseDir, 'TrueOrFalse', `${fileBase}TF.json`)
  
  mcCounts[region] = countQuestions(mcPath)
  tfCounts[region] = countQuestions(tfPath)
}

// 生成新的 questionStructure
const newStructure = {
  地理: {
    選擇題: {},
    是非題: {},
    模擬測驗: {
      南投: [
        { start: 1, end: 1, label: "隨機 50 題（選擇 25 + 是非 25）" }
      ]
    }
  },
  法規: {
    選擇題: {
      "": [
        { start: 1, end: 50, label: "1-50題" },
        { start: 51, end: 100, label: "51-100題" },
        { start: 101, end: 150, label: "101-150題" },
        { start: 151, end: 200, label: "151-200題" },
        { start: 201, end: 250, label: "201-250題" },
        { start: 251, end: 293, label: "251-293題" }
      ]
    },
    是非題: {
      "": [
        { start: 1, end: 50, label: "1-50題" },
        { start: 51, end: 100, label: "51-100題" },
        { start: 101, end: 150, label: "101-150題" },
        { start: 151, end: 200, label: "151-200題" },
        { start: 201, end: 250, label: "201-250題" },
        { start: 251, end: 284, label: "251-284題" }
      ]
    },
    模擬測驗: {
      "": [
        { start: 1, end: 1, label: "隨機 50 題（選擇 25 + 是非 25）" }
      ]
    }
  }
}

// 填入選擇題範圍
for (const [region, count] of Object.entries(mcCounts)) {
  newStructure.地理.選擇題[region] = generateRanges(count)
}

// 填入是非題範圍
for (const [region, count] of Object.entries(tfCounts)) {
  newStructure.地理.是非題[region] = generateRanges(count)
}

// 生成完整的 questionStructure.js 檔案內容
const fileContent = `// 題目分類結構定義
export const questionStructure = ${JSON.stringify(newStructure, null, 2)}

// 生成題庫檔案路徑的輔助函數
export function getQuestionBankPath(category, type, region = "") {
  // 映射中文分類到英文路徑
  const categoryMap = {
    地理: "Geography",
    法規: "Regulations"
  }
  
  const typeMap = {
    選擇題: "MultipleChoice",
    是非題: "TrueOrFalse"
  }
  
  const regionMap = {
    臺北市: "Taipei",
    新北市: "NewTaipei",
    基隆市: "Keelung",
    桃園市: "Taoyuan",
    新竹市: "HsinchuCity",
    新竹縣: "Hsinchu",
    苗栗縣: "Miaoli",
    台中: "Taichung",
    彰化: "Changhua",
    南投: "Nantou",
    雲林縣: "Yunlin",
    嘉義市: "ChiayiCity",
    嘉義縣: "Chiayi",
    台南市: "Tainan",
    高雄市: "Kaohsiung",
    屏東縣: "Pingtung",
    台東縣: "Taitung",
    花蓮縣: "Hualien",
    宜蘭縣: "Yilan",
    澎湖縣: "Penghu",
    金門縣: "Kinmen",
    連江縣: "Lienchiang"
  }
  
  const categoryPath = categoryMap[category] || category
  const typePath = typeMap[type] || type
  
  if (region) {
    const regionFileName = type === "選擇題" 
      ? \`\${regionMap[region] || region}Multiple.json\`
      : \`\${regionMap[region] || region}TF.json\`
    return \`/data/\${categoryPath}/\${typePath}/\${regionFileName}\`
  }
  
  // 法規類別
  const fileName = type === "選擇題" 
    ? "ReguMultChoice.json"
    : "ReguTuOrFalse.json"
  return \`/data/\${categoryPath}/\${fileName}\`
}

// 生成題庫檔案的唯一識別碼
export function getQuestionBankId(category, type, region = "") {
  return \`\${category}_\${type}_\${region || "all"}\`
}

`

// 寫入檔案
const targetPath = path.join(__dirname, '..', 'src', 'data', 'questionStructure.js')
fs.writeFileSync(targetPath, fileContent, 'utf8')

console.log('✓ questionStructure.js 已更新')
console.log('\n更新摘要：')
console.log('選擇題：')
for (const [region, count] of Object.entries(mcCounts)) {
  if (count > 0) {
    console.log(`  ${region}: ${count} 題`)
  }
}
console.log('\n是非題：')
for (const [region, count] of Object.entries(tfCounts)) {
  if (count > 0) {
    console.log(`  ${region}: ${count} 題`)
  }
}
