// 題目分類結構定義
export const questionStructure = {
  地理: {
    選擇題: {
      台中: [
        { start: 1, end: 50, label: "1-50題" },
        { start: 51, end: 100, label: "51-100題" },
        { start: 101, end: 150, label: "101-150題" },
        { start: 151, end: 201, label: "151-201題" }
      ],
      彰化: [
        { start: 1, end: 50, label: "1-50題" },
        { start: 51, end: 100, label: "51-100題" }
      ],
      南投: [
        { start: 1, end: 50, label: "1-50題" },
        { start: 51, end: 102, label: "51-102題" }
      ]
    },
    是非題: {
      台中: [
        { start: 1, end: 50, label: "1-50題" },
        { start: 51, end: 100, label: "51-100題" },
        { start: 101, end: 150, label: "101-150題" },
        { start: 151, end: 197, label: "151-197題" }
      ],
      彰化: [
        { start: 1, end: 50, label: "1-50題" },
        { start: 51, end: 100, label: "51-100題" }
      ],
      南投: [
        { start: 1, end: 56, label: "1-56題" },
        { start: 57, end: 112, label: "57-112題" }
      ]
    },
    模擬測驗: {
      南投: [
        // 固定抽題：從三個地區的選擇題抽 25 題 + 是非題抽 25 題（共 50 題）
        // start/end 在模擬測驗模式下不使用，僅用於沿用既有「選範圍 -> 開始練習」UI 流程
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
        // 固定抽題：選擇題 25 + 是非題 25（共 50 題）
        // start/end 在模擬測驗模式下不使用，僅用於沿用既有「選範圍 -> 開始練習」UI 流程
        { start: 1, end: 1, label: "隨機 50 題（選擇 25 + 是非 25）" }
      ]
    }
  }
}

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
    台中: "Taichung",
    彰化: "Changhua",
    南投: "Nantou"
  }
  
  const categoryPath = categoryMap[category] || category
  const typePath = typeMap[type] || type
  
  if (region) {
    const regionFileName = type === "選擇題" 
      ? `${regionMap[region] || region}Multiple.json`
      : `${regionMap[region] || region}TF.json`
    return `/data/${categoryPath}/${typePath}/${regionFileName}`
  }
  
  // 法規類別
  const fileName = type === "選擇題" 
    ? "ReguMultChoice.json"
    : "ReguTuOrFalse.json"
  return `/data/${categoryPath}/${fileName}`
}

// 生成題庫檔案的唯一識別碼
export function getQuestionBankId(category, type, region = "") {
  return `${category}_${type}_${region || "all"}`
}



