const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../public/data/Geography/MultipleChoice/KaohsiungMultiple.json')
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
const arr = Array.isArray(data) ? data : (data.questions || [])

function toStandardFormat(q, index) {
  const id = q.id != null ? q.id : index + 1
  const question = q.question || ''
  let options = q.options
  let correct_answer = q.correct_answer

  // 已是標準格式：options 為物件、correct_answer 為字串
  if (options && typeof options === 'object' && !Array.isArray(options)) {
    const keys = Object.keys(options).sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
    options = {}
    keys.forEach(k => { options[String(k)] = q.options[k] })
    correct_answer = correct_answer !== undefined ? String(correct_answer) : ''
    return { id, question, options, correct_answer }
  }

  // 是非題格式：correct_answer 為 boolean，無 options → 轉成選項物件 + 字串答案
  if (typeof correct_answer === 'boolean') {
    options = { '1': '是', '2': '否' }
    correct_answer = correct_answer ? '1' : '2'
    return { id, question, options, correct_answer }
  }

  // options 為陣列：轉成物件 "1","2",...
  if (Array.isArray(options)) {
    const obj = {}
    options.forEach((v, i) => { obj[String(i + 1)] = v })
    let ans = correct_answer
    if (typeof correct_answer === 'number') ans = String(correct_answer + 1)
    else ans = String(correct_answer != null ? correct_answer : '1')
    return { id, question, options: obj, correct_answer: ans }
  }

  return { id, question, options: {}, correct_answer: '1' }
}

const out = arr.map((q, i) => toStandardFormat(q, i))
fs.writeFileSync(filePath, JSON.stringify(out, null, 2), 'utf8')
console.log('Done. Written', out.length, 'questions.')
console.log('Sample:', JSON.stringify(out[0], null, 2))
