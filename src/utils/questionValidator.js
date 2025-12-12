// JSON 題庫驗證工具

/**
 * 驗證題庫 JSON 格式
 * @param {Object} data - 題庫資料
 * @returns {Object} { valid: boolean, errors: string[] }
 */
export function validateQuestionBank(data) {
  const errors = []

  // 檢查基本結構
  if (!data) {
    errors.push("題庫資料為空")
    return { valid: false, errors }
  }

  // 檢查必需欄位
  if (!data.category) {
    errors.push("缺少 category 欄位")
  }
  if (!data.type) {
    errors.push("缺少 type 欄位")
  }
  if (data.category === "地理" && !data.region) {
    errors.push("地理類別缺少 region 欄位")
  }
  if (!data.questions || !Array.isArray(data.questions)) {
    errors.push("questions 必須是一個陣列")
    return { valid: false, errors }
  }

  // 檢查每個題目
  data.questions.forEach((question, index) => {
    if (!question.id) {
      errors.push(`題目 ${index + 1} 缺少 id`)
    }
    if (!question.question) {
      errors.push(`題目 ${index + 1} 缺少 question 欄位`)
    }
    if (!question.options || !Array.isArray(question.options)) {
      errors.push(`題目 ${index + 1} (id: ${question.id}) 缺少 options 陣列`)
    } else {
      if (question.options.length === 0) {
        errors.push(`題目 ${index + 1} (id: ${question.id}) options 陣列為空`)
      }
    }
    if (question.correctAnswer === undefined || question.correctAnswer === null) {
      errors.push(`題目 ${index + 1} (id: ${question.id}) 缺少 correctAnswer`)
    } else {
      if (typeof question.correctAnswer !== "number") {
        errors.push(`題目 ${index + 1} (id: ${question.id}) correctAnswer 必須是數字`)
      } else if (
        question.options &&
        (question.correctAnswer < 0 || question.correctAnswer >= question.options.length)
      ) {
        errors.push(
          `題目 ${index + 1} (id: ${question.id}) correctAnswer 索引超出範圍 (${question.correctAnswer}, options 長度: ${question.options.length})`
        )
      }
    }
  })

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * 轉換選擇題格式（從舊格式 options 物件和 correct_answer 字串轉換）
 * @param {Object} question - 題目物件
 * @returns {Object} 轉換後的題目
 */
export function convertMultipleChoiceFormat(question) {
  if (question.options && typeof question.options === "object" && !Array.isArray(question.options)) {
    // options 是物件，需要轉換為陣列
    const optionsArray = []
    const keys = Object.keys(question.options).sort((a, b) => {
      const numA = parseInt(a)
      const numB = parseInt(b)
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB
      }
      return a.localeCompare(b)
    })
    
    keys.forEach(key => {
      optionsArray.push(question.options[key])
    })
    
    // 轉換 correct_answer 字串為數字索引
    let correctAnswerIndex = 0
    if (question.correct_answer !== undefined) {
      const answerStr = String(question.correct_answer).trim()
      const foundIndex = keys.findIndex(k => k === answerStr)
      if (foundIndex !== -1) {
        correctAnswerIndex = foundIndex
      } else {
        // 嘗試數字轉換
        const answerNum = parseInt(answerStr)
        if (!isNaN(answerNum) && answerNum > 0) {
          correctAnswerIndex = answerNum - 1
        }
      }
    }
    
    return {
      id: question.id,
      question: question.question,
      options: optionsArray,
      correctAnswer: correctAnswerIndex
    }
  }
  
  // 已經是正確格式
  return question
}

/**
 * 驗證是非題格式並轉換
 * @param {Array} questions - 題目陣列（原始格式）
 * @returns {Array} 轉換後的題目陣列
 */
export function convertTrueOrFalseFormat(questions) {
  return questions.map((q) => {
    if (q.correct_answer !== undefined) {
      // 轉換舊格式 (correct_answer: true/false) 為新格式
      return {
        id: q.id,
        question: q.question,
        options: ["是", "否"],
        correctAnswer: q.correct_answer === true ? 0 : 1
      }
    }
    // 已經是正確格式
    return q
  })
}

