# MEV4 Auto Test Script - English only to avoid encoding issues

Write-Host "🧠⚡👁️🔄 MEV4 Auto Test Start" -ForegroundColor Magenta
Write-Host "Time: $(Get-Date -Format 'yyyy-MM-dd HH:mm')" -ForegroundColor Cyan
Write-Host "Principle: Autonomous execution, no user assistance" -ForegroundColor Green

$baseUrl = "https://meta-evo-creator.github.io/meta-evo-website"
$testResults = @()

# Test pages list (English only)
$pages = @(
    @{Path="/"; Name="Main Homepage"},
    @{Path="/products/"; Name="Products Page"},
    @{Path="/products/mev-sense/"; Name="mev-sense Skill Page"},
    @{Path="/products/mev-think/"; Name="mev-think Skill Page"},
    @{Path="/products/mev-optimize/"; Name="mev-optimize Skill Page"},
    @{Path="/products/mev-evolve/"; Name="mev-evolve Skill Page"},
    @{Path="/docs/"; Name="Docs Page"},
    @{Path="/about/"; Name="About Page"},
    @{Path="/test-deploy.html"; Name="Test Page"},
    @{Path="/ultimate-simple/"; Name="Ultimate Simple Test"},
    @{Path="/minimal-test/"; Name="Minimal Test"}
)

Write-Host "`n🔍 Testing all pages..." -ForegroundColor Yellow

foreach ($page in $pages) {
    $url = $baseUrl + $page.Path
    Write-Host "`nTest: $($page.Name)" -ForegroundColor Cyan
    Write-Host "URL: $url" -ForegroundColor Gray
    
    try {
        # Use Head method for quick test
        $response = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 10 -ErrorAction Stop
        
        if ($response.StatusCode -eq 200) {
            Write-Host "Status: ✅ HTTP 200" -ForegroundColor Green
            
            # Get content for analysis
            try {
                $content = Invoke-WebRequest -Uri $url -TimeoutSec 5
                $size = $content.RawContent.Length
                $title = ""
                
                # Try to get title
                if ($content.ParsedHtml -and $content.ParsedHtml.title) {
                    $title = $content.ParsedHtml.title
                } elseif ($content.RawContent -match '<title[^>]*>(.*?)</title>') {
                    $title = $matches[1]
                }
                
                Write-Host "Title: $title" -ForegroundColor Green
                Write-Host "Size: $size bytes" -ForegroundColor Green
                
                # Check for encoding issues
                $hasGarbled = $content.RawContent -match "�"
                if ($hasGarbled) {
                    Write-Host "Warning: Garbled characters detected" -ForegroundColor Yellow
                }
                
                # Check content completeness
                if ($size -lt 100) {
                    Write-Host "Warning: Content too small, may be empty" -ForegroundColor Yellow
                }
                
                # Record result
                $testResults += @{
                    Name = $page.Name
                    Status = "✅ Accessible"
                    Code = 200
                    Size = $size
                    Title = $title
                    HasGarbled = $hasGarbled
                    URL = $url
                }
            }
            catch {
                Write-Host "Content analysis failed: $_" -ForegroundColor Yellow
                $testResults += @{
                    Name = $page.Name
                    Status = "⚠️ Accessible but content analysis failed"
                    Code = 200
                    Size = 0
                    Title = ""
                    HasGarbled = $false
                    URL = $url
                }
            }
        }
        else {
            Write-Host "Status: ⚠️ HTTP $($response.StatusCode)" -ForegroundColor Yellow
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
        Write-Host "Status: ❌ HTTP $statusCode" -ForegroundColor Red
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
        Write-Host "Error: ❌ $_" -ForegroundColor Red
        $testResults += @{
            Name = $page.Name
            Status = "❌ Connection failed"
            Code = 0
            Size = 0
            Title = ""
            HasGarbled = $false
            URL = $url
        }
    }
    
    # Short delay to avoid too many requests
    Start-Sleep -Milliseconds 500
}

# Generate test report
Write-Host "`n📊 MEV4 Auto Test Report" -ForegroundColor Magenta
Write-Host "=" * 50 -ForegroundColor Gray

$successCount = ($testResults | Where-Object { $_.Code -eq 200 }).Count
$totalCount = $testResults.Count
$successRate = [math]::Round(($successCount / $totalCount) * 100, 1)

Write-Host "Total pages tested: $totalCount" -ForegroundColor Gray
Write-Host "Successfully accessed: $successCount" -ForegroundColor Green
Write-Host "Success rate: $successRate%" -ForegroundColor Green

Write-Host "`n📋 Detailed results:" -ForegroundColor Cyan
foreach ($result in $testResults) {
    $statusColor = if ($result.Code -eq 200) { "Green" } else { "Red" }
    Write-Host "$($result.Name): $($result.Status)" -ForegroundColor $statusColor
}

# Check encoding issues
$garbledPages = $testResults | Where-Object { $_.HasGarbled -eq $true }
if ($garbledPages.Count -gt 0) {
    Write-Host "`n🚨 Pages with encoding issues:" -ForegroundColor Red
    foreach ($page in $garbledPages) {
        Write-Host "• $($page.Name)" -ForegroundColor Yellow
    }
}

# Generate recommendations
Write-Host "`n🎯 MEV4 Autonomous Optimization Recommendations:" -ForegroundColor Magenta

if ($successRate -lt 100) {
    Write-Host "1. 🔧 Fix inaccessible pages" -ForegroundColor Yellow
}

if ($garbledPages.Count -gt 0) {
    Write-Host "2. 🔠 Fix encoding issues" -ForegroundColor Yellow
}

Write-Host "3. 🎨 Implement world-class design enhancements" -ForegroundColor Green
Write-Host "4. 📱 Optimize mobile responsive design" -ForegroundColor Green
Write-Host "5. ⚡ Improve page loading performance" -ForegroundColor Green

Write-Host "`n🚀 MEV4 Next Autonomous Actions:" -ForegroundColor Magenta
Write-Host "Based on test results, I will autonomously implement optimizations and report complete results." -ForegroundColor Cyan

# Save test results
$reportPath = "C:\Users\shibi\.openclaw\workspace\meta-evo-website\MEV4_AUTO_TEST_REPORT_$(Get-Date -Format 'yyyyMMdd_HHmm').json"
$testResults | ConvertTo-Json | Out-File -FilePath $reportPath -Encoding UTF8
Write-Host "`n📁 Test report saved: $reportPath" -ForegroundColor Gray