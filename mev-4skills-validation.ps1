# MEV 4大技能网站验证脚本
# 应用mev-sense、mev-think、mev-optimize、mev-evolve进行系统验证

Write-Host "🧠⚡👁️🔄 MEV 4大技能网站验证系统" -ForegroundColor Cyan
Write-Host "=========================================="
Write-Host "验证时间: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Write-Host ""

# 👁️ mev-sense: 感知当前状态
Write-Host "👁️ 阶段1: mev-sense (感知洞察)" -ForegroundColor Yellow
Write-Host "------------------------------------------"

# 1.1 检查本地文件状态
Write-Host "📁 检查本地文件状态:" -ForegroundColor White
$requiredFiles = @(
    "index.html",
    "products/mev-sense/index.html",
    "products/mev-think/index.html", 
    "products/mev-optimize/index.html",
    "products/mev-evolve/index.html"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        $size = (Get-Item $file).Length
        Write-Host "  ✅ $file - $size bytes" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file 缺失" -ForegroundColor Red
    }
}

# 1.2 检查Git状态
Write-Host "`n📊 检查Git状态:" -ForegroundColor White
try {
    $gitStatus = git status --short 2>$null
    if ($gitStatus) {
        Write-Host "  ⚠️  有未提交的更改" -ForegroundColor Yellow
        Write-Host "  $gitStatus" -ForegroundColor Gray
    } else {
        Write-Host "  ✅ 工作区干净" -ForegroundColor Green
    }
} catch {
    Write-Host "  ⚠️  Git状态检查失败" -ForegroundColor Yellow
}

# 🧠 mev-think: 分析验证策略
Write-Host "`n🧠 阶段2: mev-think (思考规划)" -ForegroundColor Yellow
Write-Host "------------------------------------------"

# 2.1 定义验证目标
$validationTargets = @(
    @{Name="主站"; URL="https://meta-evo.com/"; Priority=1},
    @{Name="产品页面"; URL="https://meta-evo.com/products/"; Priority=2},
    @{Name="mev-sense技能"; URL="https://meta-evo.com/products/mev-sense/"; Priority=3},
    @{Name="mev-think技能"; URL="https://meta-evo.com/products/mev-think/"; Priority=3},
    @{Name="mev-optimize技能"; URL="https://meta-evo.com/products/mev-optimize/"; Priority=3},
    @{Name="mev-evolve技能"; URL="https://meta-evo.com/products/mev-evolve/"; Priority=3},
    @{Name="文档页面"; URL="https://meta-evo.com/docs/"; Priority=2},
    @{Name="关于页面"; URL="https://meta-evo.com/about/"; Priority=2}
)

Write-Host "🎯 验证目标:" -ForegroundColor White
foreach ($target in $validationTargets) {
    Write-Host "  • $($target.Name): $($target.URL)" -ForegroundColor Gray
}

# ⚡ mev-optimize: 执行验证
Write-Host "`n⚡ 阶段3: mev-optimize (优化执行)" -ForegroundColor Yellow
Write-Host "------------------------------------------"

# 3.1 并行验证函数
function Test-WebsiteAccess {
    param(
        [string]$Url,
        [string]$Name,
        [int]$Timeout = 10
    )
    
    Write-Host "  🔍 测试: $Name" -ForegroundColor White -NoNewline
    
    try {
        # 使用简单的HTTP测试
        $request = [System.Net.WebRequest]::Create($Url)
        $request.Timeout = $Timeout * 1000
        $request.Method = "HEAD"
        
        $response = $request.GetResponse()
        $statusCode = [int]$response.StatusCode
        $response.Close()
        
        if ($statusCode -eq 200) {
            Write-Host " - ✅ 可访问 (HTTP $statusCode)" -ForegroundColor Green
            return $true
        } else {
            Write-Host " - ⚠️  状态码: $statusCode" -ForegroundColor Yellow
            return $false
        }
    } catch {
        Write-Host " - ❌ 无法访问: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# 3.2 执行验证（按优先级）
Write-Host "🚀 开始网站验证:" -ForegroundColor White

$results = @{}
foreach ($target in $validationTargets | Sort-Object Priority) {
    $result = Test-WebsiteAccess -Url $target.URL -Name $target.Name
    $results[$target.Name] = @{
        URL = $target.URL
        Accessible = $result
        Priority = $target.Priority
    }
    
    # 添加延迟避免请求过快
    Start-Sleep -Milliseconds 500
}

# 🔄 mev-evolve: 评估和改进
Write-Host "`n🔄 阶段4: mev-evolve (持续进化)" -ForegroundColor Yellow
Write-Host "------------------------------------------"

# 4.1 评估结果
Write-Host "📊 验证结果汇总:" -ForegroundColor White

$accessibleCount = ($results.Values | Where-Object { $_.Accessible -eq $true }).Count
$totalCount = $results.Count
$successRate = [math]::Round(($accessibleCount / $totalCount) * 100, 1)

Write-Host "  ✅ 可访问: $accessibleCount/$totalCount ($successRate%)" -ForegroundColor Green

# 4.2 详细结果
Write-Host "`n📋 详细结果:" -ForegroundColor White
foreach ($key in ($results.Keys | Sort-Object { $results[$_].Priority })) {
    $result = $results[$key]
    $status = if ($result.Accessible) { "✅" } else { "❌" }
    Write-Host "  $status $key" -ForegroundColor $(if ($result.Accessible) { "Green" } else { "Red" })
    Write-Host "    URL: $($result.URL)" -ForegroundColor Gray
}

# 4.3 4大技能专项验证
Write-Host "`n🎯 MEV 4大技能专项验证:" -ForegroundColor White

$mevSkills = @("mev-sense", "mev-think", "mev-optimize", "mev-evolve")
$mevResults = @{}

foreach ($skill in $mevSkills) {
    $url = "https://meta-evo.com/products/$skill/"
    $result = Test-WebsiteAccess -Url $url -Name $skill
    $mevResults[$skill] = $result
}

$mevAccessible = ($mevResults.Values | Where-Object { $_ -eq $true }).Count
Write-Host "  🎯 4大技能可访问: $mevAccessible/4" -ForegroundColor $(if ($mevAccessible -eq 4) { "Green" } else { "Yellow" })

# 4.4 改进建议
Write-Host "`n💡 改进建议:" -ForegroundColor White

if ($successRate -lt 100) {
    $failed = $results.Keys | Where-Object { $results[$_].Accessible -eq $false }
    Write-Host "  ⚠️  需要关注的页面:" -ForegroundColor Yellow
    foreach ($page in $failed) {
        Write-Host "    • $page: $($results[$page].URL)" -ForegroundColor Yellow
    }
    
    Write-Host "`n  🔧 建议措施:" -ForegroundColor White
    Write-Host "    1. 检查GitHub Pages部署状态" -ForegroundColor Gray
    Write-Host "    2. 验证GitHub Actions工作流" -ForegroundColor Gray
    Write-Host "    3. 检查域名解析设置" -ForegroundColor Gray
    Write-Host "    4. 查看浏览器控制台错误" -ForegroundColor Gray
} else {
    Write-Host "  ✅ 所有页面均可访问，网站状态优秀！" -ForegroundColor Green
}

# 4.5 生成验证报告
Write-Host "`n📈 验证报告摘要:" -ForegroundColor Cyan
Write-Host "------------------------------------------"
Write-Host "验证时间: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Write-Host "总测试页面: $totalCount"
Write-Host "成功访问: $accessibleCount"
Write-Host "成功率: $successRate%"
Write-Host "MEV 4技能展示: $mevAccessible/4"
Write-Host "整体状态: $(if ($successRate -ge 90) { '优秀' } elseif ($successRate -ge 70) { '良好' } else { '需要改进' })"
Write-Host "------------------------------------------"

# 返回验证结果
return @{
    TotalTests = $totalCount
    Successful = $accessibleCount
    SuccessRate = $successRate
    MEVSkillsAccessible = $mevAccessible
    DetailedResults = $results
    MEVSkillResults = $mevResults
}