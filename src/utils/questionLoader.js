// 題目載入工具函數
import { convertTrueOrFalseFormat, convertMultipleChoiceFormat } from './questionValidator'

/**
 * 從 JSON 檔案載入題目
 * @param {string} path - JSON 檔案路徑
 * @returns {Promise<Object>} 題庫資料
 */
export async function loadQuestionBank(path) {
  try {
    const response = await fetch(path)
    if (!response.ok) {
      throw new Error(`無法載入題庫: ${response.statusText}`)
    }
    const data = await response.json()
    
    // 處理舊格式（直接是陣列，沒有外層結構）
    if (Array.isArray(data)) {
      // 判斷是選擇題還是是非題
      const isTrueOrFalse = data.length > 0 && 
                           data[0].correct_answer !== undefined &&
                           (typeof data[0].correct_answer === "boolean" || data[0].options === undefined)
      
      let convertedQuestions
      if (isTrueOrFalse) {
        convertedQuestions = convertTrueOrFalseFormat(data)
      } else {
        // 選擇題：檢查是否為舊格式
        convertedQuestions = data.map(convertMultipleChoiceFormat)
      }
      
      return {
        category: path.includes("Geography") ? "地理" : "法規",
        type: isTrueOrFalse ? "是非題" : "選擇題",
        region: path.includes("Taichung") ? "台中" : 
                path.includes("Changhua") ? "彰化" :
                path.includes("Nantou") ? "南投" : "",
        questions: convertedQuestions
      }
    }
    
    // 處理標準格式
    if (data.questions && Array.isArray(data.questions)) {
      // 檢查是否需要轉換格式
      if (data.questions.length > 0) {
        const firstQuestion = data.questions[0]
        
        // 檢查是否為是非題舊格式
        if (firstQuestion.correct_answer !== undefined && 
            firstQuestion.options === undefined) {
          data.questions = convertTrueOrFalseFormat(data.questions)
        }
        // 檢查是否為選擇題舊格式（options 是物件）
        else if (firstQuestion.options && 
                 typeof firstQuestion.options === "object" && 
                 !Array.isArray(firstQuestion.options)) {
          data.questions = data.questions.map(convertMultipleChoiceFormat)
        }
        // 檢查是否需要轉換 correct_answer 為 correctAnswer（法規選擇題的情況）
        else if (firstQuestion.correct_answer !== undefined && 
                 firstQuestion.correctAnswer === undefined &&
                 Array.isArray(firstQuestion.options)) {
          data.questions = data.questions.map(q => {
            const { correct_answer, ...rest } = q
            // 將 1-based 索引轉換為 0-based 索引（correct_answer: 2 表示第二個選項，應轉為索引 1）
            let correctAnswerIndex = correct_answer
            if (typeof correct_answer === 'number' && correct_answer > 0) {
              correctAnswerIndex = correct_answer - 1
            }
            return {
              ...rest,
              correctAnswer: correctAnswerIndex
            }
          })
        }
      }
    }
    
    return data
  } catch (error) {
    console.error("載入題庫時發生錯誤:", error)
    throw error
  }
}

/**
 * 根據範圍篩選題目
 * @param {Array} questions - 題目陣列
 * @param {number} start - 起始題號
 * @param {number} end - 結束題號
 * @returns {Array} 篩選後的題目
 */
export function filterQuestionsByRange(questions, start, end) {
  return questions.filter(q => q.id >= start && q.id <= end)
}

/**
 * 打亂題目順序
 * @param {Array} questions - 題目陣列
 * @returns {Array} 打亂後的題目
 */
export function shuffleQuestions(questions) {
  const shuffled = [...questions]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}



