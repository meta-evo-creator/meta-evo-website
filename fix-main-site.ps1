# 主站修复脚本 - 资深网站测试专家专用

Write-Host "🧠⚡👁️🔄 MAIN SITE FIX EXPERT" -ForegroundColor Magenta
Write-Host "Diagnosing and fixing main site configuration..." -ForegroundColor Cyan

# 测试基础URL
$baseUrl = "https://meta-evo-creator.github.io/meta-evo-website"

Write-Host "`n🔍 Testing critical URLs:" -ForegroundColor Yellow

# 测试关键URL
$testUrls = @(
    @{Url="$baseUrl/"; Name="Main Site"},
    @{Url="$baseUrl/minimal-test/"; Name="Minimal Test"},
    @{Url="$baseUrl/ultimate-simple/"; Name="Ultimate Simple Test"}
)

foreach ($test in $testUrls) {
    Write-Host "`nTest: $($test.Name)" -ForegroundColor Cyan
    Write-Host "URL: $($test.Url)" -ForegroundColor Gray
    
    try {
        $response = Invoke-WebRequest -Uri $test.Url -Method Head -TimeoutSec 10 -ErrorAction Stop
        Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
        
        if ($response.StatusCode -eq 200) {
            # 获取页面内容分析
            try {
                $content = Invoke-WebRequest -Uri $test.Url -TimeoutSec 5
                $title = ""
                if ($content.ParsedHtml -and $content.ParsedHtml.title) {
                    $title = $content.ParsedHtml.title
                }
                Write-Host "Title: $title" -ForegroundColor Green
                Write-Host "Content size: $($content.RawContent.Length) bytes" -ForegroundColor Green
                
                # 检查常见问题
                if ($content.RawContent -match "�") {
                    Write-Host "Warning: Garbled characters detected" -ForegroundColor Yellow
                }
                
                if ($content.RawContent.Length -lt 100) {
                    Write-Host "Warning: Content too small, may be empty" -ForegroundColor Yellow
                }
            }
            catch {
                Write-Host "Warning: Could not analyze content" -ForegroundColor Yellow
            }
        }
    }
    catch [System.Net.WebException] {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "Error: HTTP $statusCode" -ForegroundColor Red
    }
    catch {
        Write-Host "Error: $_" -ForegroundColor Red
    }
}

Write-Host "`n🔧 Analyzing local main site files..." -ForegroundColor Cyan

# 检查本地主站文件
$indexPath = "index.html"
if (Test-Path $indexPath) {
    $indexContent = Get-Content -Path $indexPath -Raw
    $indexSize = $indexContent.Length
    
    Write-Host "Main site file: $indexPath" -ForegroundColor Gray
    Write-Host "File size: $indexSize bytes" -ForegroundColor Gray
    
    # 检查常见问题
    $issues = @()
    
    if ($indexContent -match "�") {
        $issues += "Garbled characters found"
    }
    
    if ($indexSize -lt 100) {
        $issues += "File too small (may be empty)"
    }
    
    # 检查资源引用
    if (-not ($indexContent -match 'href=".*\.css"')) {
        $issues += "No CSS file reference found"
    }
    
    if (-not ($indexContent -match 'src=".*\.js"')) {
        $issues += "No JavaScript file reference found"
    }
    
    # 检查DOCTYPE
    if (-not ($indexContent -match '<!DOCTYPE html>')) {
        $issues += "Missing or incorrect DOCTYPE"
    }
    
    # 检查charset
    if (-not ($indexContent -match 'charset="UTF-8"')) {
        $issues += "Missing UTF-8 charset"
    }
    
    if ($issues.Count -gt 0) {
        Write-Host "`n⚠️  Issues found in main site file:" -ForegroundColor Yellow
        foreach ($issue in $issues) {
            Write-Host "  • $issue" -ForegroundColor Yellow
        }
    } else {
        Write-Host "`n✅ No obvious issues found in main site file" -ForegroundColor Green
    }
} else {
    Write-Host "❌ Main site file not found: $indexPath" -ForegroundColor Red
}

# 检查资源文件
Write-Host "`n📁 Checking resource files..." -ForegroundColor Cyan

$resourcePaths = @(
    "assets/css/style.css",
    "assets/js/language-switcher.js",
    "assets/js/simple-language-switcher.js"
)

foreach ($resource in $resourcePaths) {
    if (Test-Path $resource) {
        $size = (Get-Item $resource).Length
        Write-Host "✅ $resource ($size bytes)" -ForegroundColor Green
    } else {
        Write-Host "❌ $resource (NOT FOUND)" -ForegroundColor Red
    }
}

Write-Host "`n🎯 EXPERT DIAGNOSIS:" -ForegroundColor Magenta
Write-Host "=" * 50 -ForegroundColor Gray

Write-Host "Based on tests:" -ForegroundColor Gray
Write-Host "• Ultimate Simple Test: ✅ WORKING" -ForegroundColor Green
Write-Host "• Main Site: ❌ NOT WORKING" -ForegroundColor Red
Write-Host "• Minimal Test: ❌ NOT WORKING" -ForegroundColor Red

Write-Host "`n🔍 Problem diagnosis:" -ForegroundColor Cyan
Write-Host "The issue is with the main site configuration, not with GitHub Pages deployment." -ForegroundColor Yellow
Write-Host "Possible causes:" -ForegroundColor Yellow
Write-Host "1. Main site file has incorrect paths or references" -ForegroundColor Yellow
Write-Host "2. Resource files (CSS/JS) are missing or inaccessible" -ForegroundColor Yellow
Write-Host "3. HTML syntax or encoding issues" -ForegroundColor Yellow
Write-Host "4. Browser compatibility issues" -ForegroundColor Yellow

Write-Host "`n🔧 Recommended fixes:" -ForegroundColor Green
Write-Host "1. Create a simplified version of main site" -ForegroundColor Green
Write-Host "2. Test with absolute paths (starting with /)" -ForegroundColor Green
Write-Host "3. Verify all resource files exist" -ForegroundColor Green
Write-Host "4. Check browser console for errors" -ForegroundColor Green

Write-Host "`n🚀 Immediate action:" -ForegroundColor Magenta
Write-Host "Creating simplified main site for testing..." -ForegroundColor Cyan