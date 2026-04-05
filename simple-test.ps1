# 简单网站测试脚本
Write-Host "🧠⚡👁️🔄 资深网站测试专家启动" -ForegroundColor Magenta
Write-Host "开始测试MetaEvo网站..." -ForegroundColor Cyan

$baseUrl = "https://meta-evo-creator.github.io/meta-evo-website"
$testUrls = @(
    "$baseUrl/",
    "$baseUrl/minimal-test/",
    "$baseUrl/products/mev-sense/",
    "$baseUrl/products/mev-think/",
    "$baseUrl/products/mev-optimize/",
    "$baseUrl/products/mev-evolve/",
    "$baseUrl/products/",
    "$baseUrl/docs/",
    "$baseUrl/about/",
    "$baseUrl/test-deploy.html"
)

Write-Host "`n🔍 测试URL列表:" -ForegroundColor Yellow
foreach ($url in $testUrls) {
    Write-Host "  $url" -ForegroundColor Gray
}

Write-Host "`n🚀 开始测试..." -ForegroundColor Green

$results = @()
foreach ($url in $testUrls) {
    $name = $url.Replace($baseUrl, "")
    if ($name -eq "") { $name = "/" }
    
    Write-Host "`n测试: $name" -ForegroundColor Cyan
    Write-Host "URL: $url" -ForegroundColor Gray
    
    try {
        # 使用Invoke-WebRequest测试
        $response = $null
        $response = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 10 -ErrorAction Stop
        
        Write-Host "✅ 状态: $($response.StatusCode)" -ForegroundColor Green
        
        if ($response.StatusCode -eq 200) {
            # 尝试获取内容
            try {
                $content = Invoke-WebRequest -Uri $url -TimeoutSec 5
                $title = ""
                if ($content.ParsedHtml -and $content.ParsedHtml.title) {
                    $title = $content.ParsedHtml.title
                }
                Write-Host "📄 标题: $title" -ForegroundColor Green
            }
            catch {
                Write-Host "⚠️  无法获取完整内容" -ForegroundColor Yellow
            }
            
            $results += @{Url=$url; Success=$true; Status="200 OK"}
        }
        else {
            $results += @{Url=$url; Success=$false; Status="$($response.StatusCode)"}
        }
    }
    catch [System.Net.WebException] {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "❌ 错误: HTTP $statusCode" -ForegroundColor Red
        $results += @{Url=$url; Success=$false; Status="HTTP $statusCode"}
    }
    catch {
        Write-Host "❌ 错误: $_" -ForegroundColor Red
        $results += @{Url=$url; Success=$false; Status="Connection Failed"}
    }
    
    # 短暂延迟
    Start-Sleep -Milliseconds 500
}

# 输出总结
Write-Host "`n📊 测试总结" -ForegroundColor Magenta
Write-Host "=" * 50 -ForegroundColor Gray

$successCount = ($results | Where-Object { $_.Success -eq $true }).Count
$totalCount = $results.Count

Write-Host "总测试数: $totalCount" -ForegroundColor Gray
Write-Host "成功数: $successCount" -ForegroundColor Green
Write-Host "失败数: $($totalCount - $successCount)" -ForegroundColor Red

Write-Host "`n📋 详细结果:" -ForegroundColor Cyan
foreach ($result in $results) {
    $statusIcon = if ($result.Success) { "✅" } else { "❌" }
    $color = if ($result.Success) { "Green" } else { "Red" }
    Write-Host "$statusIcon $($result.Url.Replace($baseUrl, '')) - $($result.Status)" -ForegroundColor $color
}

# 生成报告
$report = @"
网站测试报告
生成时间: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
基础URL: $baseUrl

测试结果:
总测试数: $totalCount
成功数: $successCount
失败数: $($totalCount - $successCount)

详细结果:
$($results | ForEach-Object { "$(if ($_.Success) {'✅'} else {'❌'}) $($_.Url.Replace($baseUrl, '')) - $($_.Status)" } | Out-String)

建议:
$(if ($successCount -eq $totalCount) {
    "✅ 所有测试通过，网站部署成功！"
    "🚀 可以开始使用和宣传网站"
} else {
    "❌ 部分测试失败，需要进一步诊断"
    "🔧 建议检查失败的页面URL"
    "📊 查看GitHub Actions部署状态"
    "🔄 重新部署失败的文件"
})
"@

$reportFile = "test-report-$(Get-Date -Format 'yyyyMMdd-HHmmss').txt"
$report | Out-File -FilePath $reportFile -Encoding UTF8

Write-Host "`n📄 测试报告已保存到: $reportFile" -ForegroundColor Green

# 最终建议
Write-Host "`n🎯 测试专家建议:" -ForegroundColor Magenta
if ($successCount -eq $totalCount) {
    Write-Host "✅ 网站测试完全通过！" -ForegroundColor Green
    Write-Host "🎉 庆祝：MEV 4大技能网站成功上线！" -ForegroundColor Green
} else {
    Write-Host "❌ 网站测试失败，需要修复" -ForegroundColor Red
    Write-Host "🔧 立即检查失败的页面" -ForegroundColor Yellow
}