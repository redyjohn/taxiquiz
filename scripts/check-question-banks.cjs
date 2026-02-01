const fs = require('fs')
const path = require('path')

function countQuestions(filePath) {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    const arr = Array.isArray(data) ? data : (data.questions || [])
    return arr.length
  } catch (e) {
    return -1
  }
}

// questionStructure regions that have end: 0 (題庫更新中)
const updatingInStructure = {
  選擇題: ['新北市','基隆市','桃園市','新竹市','新竹縣','苗栗縣','雲林縣','嘉義市','嘉義縣','台南市','高雄市','屏東縣','花蓮縣','宜蘭縣','澎湖縣','金門縣','連江縣'],
  是非題: ['新北市','基隆市','桃園市','新竹市','新竹縣','苗栗縣','雲林縣','嘉義市','嘉義縣','台南市','高雄市','屏東縣','台東縣','花蓮縣','宜蘭縣','澎湖縣','金門縣','連江縣']
}

const regionFileMap = {
  臺北市: 'Taipei', 新北市: 'NewTaipei', 基隆市: 'Keelung', 桃園市: 'Taoyuan',
  新竹市: 'HsinchuCity', 新竹縣: 'Hsinchu', 苗栗縣: 'Miaoli', 台中: 'Taichung',
  彰化: 'Changhua', 南投: 'Nantou', 雲林縣: 'Yunlin', 嘉義市: 'ChiayiCity',
  嘉義縣: 'Chiayi', 台南市: 'Tainan', 高雄市: 'Kaohsiung', 屏東縣: 'Pingtung',
  台東縣: 'Taitung', 花蓮縣: 'Hualien', 宜蘭縣: 'Yilan', 澎湖縣: 'Penghu',
  金門縣: 'Kinmen', 連江縣: 'Lienchiang'
}

const baseDir = path.join(__dirname, '..', 'public', 'data')

console.log('=== 地理題庫檢查 ===\n')

let incomplete = []
let needUpdate = []

// 選擇題
console.log('【選擇題】')
for (const [region, fileBase] of Object.entries(regionFileMap)) {
  const filePath = path.join(baseDir, 'Geography', 'MultipleChoice', `${fileBase}Multiple.json`)
  const n = countQuestions(filePath)
  const inStructure = updatingInStructure.選擇題.includes(region)
  const status = n <= 0 ? '無內容/無法讀取' : `${n} 題`
  const structureStatus = inStructure ? '題庫更新中' : '已設定範圍'
  
  if (n <= 0) {
    incomplete.push(`地理-選擇題-${region}`)
    console.log(`  ${region}: ${status} | questionStructure: ${structureStatus}`)
  } else if (inStructure && n > 0) {
    needUpdate.push({ region, type: '選擇題', count: n })
    console.log(`  ${region}: ${status} (有內容，需更新 questionStructure)`)
  } else {
    console.log(`  ${region}: ${status} ✓`)
  }
}

// 是非題
console.log('\n【是非題】')
for (const [region, fileBase] of Object.entries(regionFileMap)) {
  const filePath = path.join(baseDir, 'Geography', 'TrueOrFalse', `${fileBase}TF.json`)
  const n = countQuestions(filePath)
  const inStructure = updatingInStructure.是非題.includes(region)
  
  if (n <= 0) {
    incomplete.push(`地理-是非題-${region}`)
    console.log(`  ${region}: 無內容/無法讀取`)
  } else if (inStructure && n > 0) {
    needUpdate.push({ region, type: '是非題', count: n })
    console.log(`  ${region}: ${n} 題 (有內容，需更新 questionStructure)`)
  } else {
    console.log(`  ${region}: ${n} 題 ✓`)
  }
}

// 法規
console.log('\n=== 法規題庫 ===')
const reguMc = countQuestions(path.join(baseDir, 'Regulations', 'ReguMultChoice.json'))
const reguTf = countQuestions(path.join(baseDir, 'Regulations', 'ReguTuOrFalse.json'))
console.log(`  選擇題: ${reguMc > 0 ? reguMc + ' 題 ✓' : '無內容'}`)
console.log(`  是非題: ${reguTf > 0 ? reguTf + ' 題 ✓' : '無內容'}`)

console.log('\n=== 總結 ===')
if (incomplete.length > 0) {
  console.log('\n【尚未完成 / 無內容】')
  incomplete.forEach(i => console.log('  -', i))
}
if (needUpdate.length > 0) {
  console.log('\n【有題庫內容但 questionStructure 仍標為「題庫更新中」需更新】')
  needUpdate.forEach(u => console.log(`  - ${u.region} ${u.type}: ${u.count} 題`))
}
