# 將專案推到 GitHub - 請在 PowerShell 中執行此腳本
Set-Location $PSScriptRoot
git add -A
git status
git commit -m "考區邏輯、題庫導讀考區、考區綜合模擬測驗與各縣市題庫更新"
git push origin main
