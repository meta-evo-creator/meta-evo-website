# MEV4自主测试脚本 - 不请求用户协助

Write-Host "🧠⚡👁️🔄 MEV4自主测试开始" -ForegroundColor Magenta
Write-Host "时间: $(Get-Date -Format 'yyyy-MM-dd HH:mm')" -ForegroundColor Cyan
Write-Host "原则: 自主执行，不请求用户协助" -ForegroundColor Green

$baseUrl = "https://meta-evo-creator.github.io/meta-evo-website"
$testResults = @()

# 测试页面列表
$pages = @(
    @{Path="/"; Name="主站首页"},
    @{Path="/products/"; Name="产品页面"},
    @{Path="/products/mev-sense/"; Name="mev-sense技能页面"},
    @{Path="/products/mev-think/"; Name="mev-think技能页面"},
    @{Path="/products/mev-optimize/"; Name="mev-optimize技能页面"},
    @{Path="/products/mev-evolve/"; Name="mev-evolve技能页面"},
    @{Path="/docs/"; Name="文档页面"},
    @{Path="/about/"; Name="关于页面"},
    @{Path="/test-deploy.html"; Name="测试页面"},
    @{Path="/ultimate-simple/"; Name="终极简单测试"},
    @{Path="/minimal-test/"; Name="最小化测试"}
)

Write-Host "`n🔍 开始测试所有页面..." -ForegroundColor Yellow

foreach ($page in $pages) {
    $url = $baseUrl + $page.Path
    Write-Host "`n测试: $($page.Name)" -ForegroundColor Cyan
    Write-Host "URL: $url" -ForegroundColor Gray
    
    try {
        # 使用Head方法快速测试
        $response = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 10 -ErrorAction Stop
        
        if ($response.StatusCode -eq 200) {
            Write-Host "状态: ✅ HTTP 200" -ForegroundColor Green
            
            # 获取内容分析
            try {
                $content = Invoke-WebRequest -Uri $url -TimeoutSec 5
                $size = $content.RawContent.Length
                $title = ""
                
                # 尝试获取标题
                if ($content.ParsedHtml -and $content.ParsedHtml.title) {
                    $title = $content.ParsedHtml.title
                } elseif ($content.RawContent -match '<title[^>]*>(.*?)</title>') {
                    $title = $matches[1]
                }
                
                Write-Host "标题: $title" -ForegroundColor Green
                Write-Host "大小: $size bytes" -ForegroundColor Green
                
                # 检查编码问题
                $hasGarbled = $content.RawContent -match "�"
                if ($hasGarbled) {
                    Write-Host "警告: 检测到乱码字符" -ForegroundColor Yellow
                }
                
                # 检查内容完整性
                if ($size -lt 100) {
                    Write-Host "警告: 内容过小，可能为空" -ForegroundColor Yellow
                }
                
                # 记录结果
                $testResults += @{
                    Name = $page.Name
                    Status = "✅ 可访问"
                    Code = 200
                    Size = $size
                    Title = $title
                    HasGarbled = $hasGarbled
                    URL = $url
                }
            }
            catch {
                Write-Host "内容分析失败: $_" -ForegroundColor Yellow
                $testResults += @{
                    Name = $page.Name
                    Status = "⚠️ 可访问但内容分析失败"
                    Code = 200
                    Size = 0
                    Title = ""
                    HasGarbled = $false
                    URL = $url
                }
            }
        }
        else {
            Write-Host "状态: ⚠️ HTTP $($response.StatusCode)" -ForegroundColor Yellow
            $testResults += @{
                Name = $page.Name
                Status = "⚠️ HTTP $($response.StatusCode)"
                Code = $response.StatusCode
                Size = 0
                Title = ""
                HasGarbled = $false
                URL = $url
            }
        }
    }
    catch [System.Net.WebException] {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "状态: ❌ HTTP $statusCode" -ForegroundColor Red
        $testResults += @{
            Name = $page.Name
            Status = "❌ HTTP $statusCode"
            Code = $statusCode
            Size = 0
            Title = ""
            HasGarbled = $false
            URL = $url
        }
    }
    catch {
        Write-Host "错误: ❌ $_" -ForegroundColor Red
        $testResults += @{
            Name = $page.Name
            Status = "❌ 连接失败"
            Code = 0
            Size = 0
            Title = ""
            HasGarbled = $false
            URL = $url
        }
    }
    
    # 短暂延迟避免请求过快
    Start-Sleep -Milliseconds 500
}

# 生成测试报告
Write-Host "`n📊 MEV4自主测试报告" -ForegroundColor Magenta
Write-Host "=" * 50 -ForegroundColor Gray

$successCount = ($testResults | Where-Object { $_.Code -eq 200 }).Count
$totalCount = $testResults.Count
$successRate = [math]::Round(($successCount / $totalCount) * 100, 1)

Write-Host "测试页面总数: $totalCount" -ForegroundColor Gray
Write-Host "成功访问数: $successCount" -ForegroundColor Green
Write-Host "成功率: $successRate%" -ForegroundColor Green

Write-Host "`n📋 详细结果:" -ForegroundColor Cyan
foreach ($result in $testResults) {
    $statusColor = if ($result.Code -eq 200) { "Green" } else { "Red" }
    Write-Host "$($result.Name): $($result.Status)" -ForegroundColor $statusColor
}

# 检查编码问题
$garbledPages = $testResults | Where-Object { $_.HasGarbled -eq $true }
if ($garbledPages.Count -gt 0) {
    Write-Host "`n🚨 发现编码问题页面:" -ForegroundColor Red
    foreach ($page in $garbledPages) {
        Write-Host "• $($page.Name)" -ForegroundColor Yellow
    }
}

# 生成建议
Write-Host "`n🎯 MEV4自主优化建议:" -ForegroundColor Magenta

if ($successRate -lt 100) {
    Write-Host "1. 🔧 需要修复不可访问的页面" -ForegroundColor Yellow
}

if ($garbledPages.Count -gt 0) {
    Write-Host "2. 🔠 需要修复编码问题的页面" -ForegroundColor Yellow
}

Write-Host "3. 🎨 实施世界顶尖级设计增强" -ForegroundColor Green
Write-Host "4. 📱 优化移动端响应式设计" -ForegroundColor Green
Write-Host "5. ⚡ 提升页面加载性能" -ForegroundColor Green

Write-Host "`n🚀 MEV4自主执行下一步:" -ForegroundColor Magenta
Write-Host "基于测试结果，我将自主实施优化措施，完成后直接汇报完整结果。" -ForegroundColor Cyan

# 保存测试结果
$reportPath = "C:\Users\shibi\.openclaw\workspace\meta-evo-website\MEV4_AUTO_TEST_REPORT_$(Get-Date -Format 'yyyyMMdd_HHmm').json"
$testResults | ConvertTo-Json | Out-File -FilePath $reportPath -Encoding UTF8
Write-Host "`n📁 测试报告已保存: $reportPath" -ForegroundColor Gray