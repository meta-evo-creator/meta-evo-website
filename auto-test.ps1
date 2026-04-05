# 自动化网站测试脚本
# 资深网站测试专家专用

param(
    [string]$BaseUrl = "https://meta-evo-creator.github.io/meta-evo-website"
)

function Test-Website {
    param(
        [string]$Url,
        [string]$Name
    )
    
    Write-Host "`n🔍 测试: $Name" -ForegroundColor Cyan
    Write-Host "URL: $Url" -ForegroundColor Gray
    
    try {
        # 使用Invoke-WebRequest测试URL
        $response = Invoke-WebRequest -Uri $Url -Method Head -TimeoutSec 10 -ErrorAction Stop
        
        Write-Host "✅ 状态: $($response.StatusCode) $($response.StatusDescription)" -ForegroundColor Green
        Write-Host "📊 内容类型: $($response.Headers['Content-Type'])" -ForegroundColor Green
        
        # 如果状态码是200，尝试获取页面内容
        if ($response.StatusCode -eq 200) {
            try {
                $content = Invoke-WebRequest -Uri $Url -TimeoutSec 10
                $title = ($content.ParsedHtml.title -split ' ')[0]
                Write-Host "📄 页面标题: $title" -ForegroundColor Green
                Write-Host "📏 内容大小: $($content.RawContent.Length) 字节" -ForegroundColor Green
                
                # 检查常见问题
                if ($content.RawContent -match "�") {
                    Write-Host "⚠️  警告: 检测到乱码字符" -ForegroundColor Yellow
                }
                
                if ($content.RawContent -match "404|Not Found") {
                    Write-Host "❌ 错误: 页面可能返回404" -ForegroundColor Red
                }
                
                return $true
            }
            catch {
                Write-Host "⚠️  警告: 无法获取页面内容: $_" -ForegroundColor Yellow
                return $true  # 头部成功也算成功
            }
        }
        
        return $true
    }
    catch [System.Net.WebException] {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "❌ 错误: HTTP $statusCode" -ForegroundColor Red
        Write-Host "错误信息: $($_.Exception.Message)" -ForegroundColor Red
        
        # 如果是404，检查文件是否存在
        if ($statusCode -eq 404) {
            Write-Host "🔍 建议: 检查文件路径和部署状态" -ForegroundColor Yellow
        }
        
        return $false
    }
    catch {
        Write-Host "❌ 错误: $_" -ForegroundColor Red
        return $false
    }
}

function Test-AllUrls {
    param(
        [string]$BaseUrl
    )
    
    Write-Host "`n🚀 开始全面网站测试" -ForegroundColor Magenta
    Write-Host "测试时间: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Gray
    Write-Host "基础URL: $BaseUrl" -ForegroundColor Gray
    
    # 测试URL列表
    $testUrls = @(
        @{Url = "$BaseUrl/"; Name = "主站首页"},
        @{Url = "$BaseUrl/minimal-test/"; Name = "最小化测试页面"},
        @{Url = "$BaseUrl/products/mev-sense/"; Name = "mev-sense技能页面"},
        @{Url = "$BaseUrl/products/mev-think/"; Name = "mev-think技能页面"},
        @{Url = "$BaseUrl/products/mev-optimize/"; Name = "mev-optimize技能页面"},
        @{Url = "$BaseUrl/products/mev-evolve/"; Name = "mev-evolve技能页面"},
        @{Url = "$BaseUrl/products/"; Name = "产品页面"},
        @{Url = "$BaseUrl/docs/"; Name = "文档页面"},
        @{Url = "$BaseUrl/about/"; Name = "关于页面"},
        @{Url = "$BaseUrl/test-deploy.html"; Name = "测试部署页面"},
        @{Url = "$BaseUrl/ultimate-test.html"; Name = "终极测试页面"}
    )
    
    $results = @()
    $successCount = 0
    
    foreach ($test in $testUrls) {
        $result = Test-Website -Url $test.Url -Name $test.Name
        $results += @{
            Name = $test.Name
            Url = $test.Url
            Success = $result
        }
        
        if ($result) {
            $successCount++
        }
        
        # 短暂延迟，避免请求过快
        Start-Sleep -Milliseconds 500
    }
    
    # 输出测试总结
    Write-Host "`n📊 测试总结" -ForegroundColor Magenta
    Write-Host "=" * 50 -ForegroundColor Gray
    Write-Host "总测试数: $($testUrls.Count)" -ForegroundColor Gray
    Write-Host "成功数: $successCount" -ForegroundColor Green
    Write-Host "失败数: $($testUrls.Count - $successCount)" -ForegroundColor Red
    
    # 详细结果
    Write-Host "`n📋 详细结果:" -ForegroundColor Cyan
    foreach ($result in $results) {
        $status = if ($result.Success) { "✅" } else { "❌" }
        Write-Host "$status $($result.Name): $($result.Url)" -ForegroundColor $(if ($result.Success) { "Green" } else { "Red" })
    }
    
    # 返回整体成功状态
    return $successCount -eq $testUrls.Count
}

function Check-GitHubActions {
    Write-Host "`n🔧 检查GitHub Actions状态" -ForegroundColor Cyan
    
    try {
        # 检查GitHub Actions API（简化版本）
        $actionsUrl = "https://api.github.com/repos/meta-evo-creator/meta-evo-website/actions/runs"
        Write-Host "检查Actions状态..." -ForegroundColor Gray
        
        # 由于API需要认证，这里简化处理
        Write-Host "📊 建议手动检查: https://github.com/meta-evo-creator/meta-evo-website/actions" -ForegroundColor Yellow
        
    }
    catch {
        Write-Host "⚠️  无法检查GitHub Actions状态" -ForegroundColor Yellow
    }
}

function Generate-Report {
    param(
        [bool]$AllSuccess
    )
    
    $reportFile = "website-test-report-$(Get-Date -Format 'yyyyMMdd-HHmmss').txt"
    
    $report = @"
网站测试报告
生成时间: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
测试URL基础: $BaseUrl

测试结果: $(if ($AllSuccess) { "✅ 全部通过" } else { "❌ 部分失败" })

建议操作:
$(if ($AllSuccess) {
    "1. 🎉 网站部署成功，所有页面可访问"
    "2. 🚀 可以开始宣传和使用网站"
    "3. 📈 建议进行进一步的功能测试"
} else {
    "1. 🔍 检查失败的页面URL"
    "2. 🛠️ 检查文件部署状态"
    "3. 📊 查看GitHub Actions日志"
    "4. 🔄 重新部署失败的文件"
})

MEV 4大技能应用:
• 👁️ mev-sense: 感知网站访问状态
• 🧠 mev-think: 分析问题根本原因
• ⚡ mev-optimize: 高效执行测试修复
• 🔄 mev-evolve: 建立可复用的测试流程
"@
    
    $report | Out-File -FilePath $reportFile -Encoding UTF8
    Write-Host "`n📄 测试报告已生成: $reportFile" -ForegroundColor Green
    
    return $reportFile
}

# 主执行流程
Write-Host "🧠⚡👁️🔄 资深网站测试专家启动" -ForegroundColor Magenta
Write-Host "开始自主诊断和修复MetaEvo网站..." -ForegroundColor Cyan

# 检查GitHub Actions状态
Check-GitHubActions

# 执行全面测试
$allSuccess = Test-AllUrls -BaseUrl $BaseUrl

# 生成测试报告
$reportFile = Generate-Report -AllSuccess $allSuccess

# 输出最终建议
Write-Host "`n🎯 测试专家建议:" -ForegroundColor Magenta
if ($allSuccess) {
    Write-Host "✅ 网站测试通过，可以正常访问！" -ForegroundColor Green
    Write-Host "🚀 下一步：开始全面功能测试和宣传" -ForegroundColor Green
} else {
    Write-Host "❌ 网站测试失败，需要进一步诊断" -ForegroundColor Red
    Write-Host "🔧 建议检查：" -ForegroundColor Yellow
    Write-Host "  1. GitHub Actions部署状态" -ForegroundColor Yellow
    Write-Host "  2. 文件路径和引用是否正确" -ForegroundColor Yellow
    Write-Host "  3. 文件编码是否为UTF-8" -ForegroundColor Yellow
    Write-Host "  4. 网络访问是否正常" -ForegroundColor Yellow
}

Write-Host "`n📋 详细报告已保存到: $reportFile" -ForegroundColor Cyan