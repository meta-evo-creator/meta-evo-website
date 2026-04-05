# GitHub Pages 部署诊断脚本
Write-Host "🔍 GitHub Pages 部署诊断" -ForegroundColor Cyan
Write-Host "=========================="

# 1. 检查基本文件
Write-Host "`n📁 检查基本文件:" -ForegroundColor Yellow
$requiredFiles = @(".nojekyll", "index.html", "CNAME")
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  ✅ $file 存在" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file 缺失" -ForegroundColor Red
    }
}

# 2. 检查文件编码
Write-Host "`n🔤 检查文件编码 (前5个HTML文件):" -ForegroundColor Yellow
$htmlFiles = Get-ChildItem -Filter "*.html" | Select-Object -First 5
foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -TotalCount 1 -Raw
    if ($content -match "^<!DOCTYPE html>") {
        Write-Host "  ✅ $($file.Name) 编码正常" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  $($file.Name) 可能编码问题" -ForegroundColor Yellow
    }
}

# 3. 检查GitHub Actions配置
Write-Host "`n⚙️ 检查GitHub Actions配置:" -ForegroundColor Yellow
if (Test-Path ".github/workflows/deploy.yml") {
    Write-Host "  ✅ deploy.yml 存在" -ForegroundColor Green
    $workflow = Get-Content ".github/workflows/deploy.yml" -Raw
    if ($workflow -match "actions/deploy-pages") {
        Write-Host "  ✅ 使用正确的deploy-pages action" -ForegroundColor Green
    }
} else {
    Write-Host "  ❌ deploy.yml 缺失" -ForegroundColor Red
}

# 4. 检查CNAME文件
Write-Host "`n🌐 检查CNAME配置:" -ForegroundColor Yellow
if (Test-Path "CNAME") {
    $cname = Get-Content "CNAME" -Raw
    Write-Host "  ✅ CNAME: $cname" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  CNAME文件缺失" -ForegroundColor Yellow
}

# 5. 检查文件大小
Write-Host "`n📊 检查大文件 (可能超限):" -ForegroundColor Yellow
$largeFiles = Get-ChildItem -Recurse -File | Where-Object { $_.Length -gt 10485760 } | Select-Object Name, @{Name="SizeMB";Expression={[math]::Round($_.Length/1MB,2)}}
if ($largeFiles) {
    foreach ($file in $largeFiles) {
        Write-Host "  ⚠️  $($file.Name) - $($file.SizeMB) MB (可能过大)" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ✅ 没有过大的文件" -ForegroundColor Green
}

# 6. 检查特殊字符
Write-Host "`n🔣 检查可能的问题字符:" -ForegroundColor Yellow
$problematicFiles = Get-ChildItem -Recurse -File -Include "*.html", "*.md", "*.yml" | Where-Object {
    $content = Get-Content $_.FullName -Raw
    $content -match "[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]"
}
if ($problematicFiles) {
    foreach ($file in $problematicFiles) {
        Write-Host "  ⚠️  $($file.Name) 包含控制字符" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ✅ 没有发现控制字符" -ForegroundColor Green
}

Write-Host "`n🎯 诊断完成" -ForegroundColor Cyan
Write-Host "建议:"
Write-Host "1. 检查GitHub仓库的Actions标签查看详细错误"
Write-Host "2. 确保所有文件使用UTF-8编码"
Write-Host "3. 检查文件路径没有特殊字符"
Write-Host "4. 验证CNAME配置正确"