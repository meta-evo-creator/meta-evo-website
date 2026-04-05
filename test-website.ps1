# Website Test Script - English only to avoid encoding issues

Write-Host "=== WEBSITE TEST EXPERT ===" -ForegroundColor Magenta
Write-Host "Testing MetaEvo website..." -ForegroundColor Cyan

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

Write-Host "`nURLs to test:" -ForegroundColor Yellow
foreach ($url in $testUrls) {
    Write-Host "  $url" -ForegroundColor Gray
}

Write-Host "`nStarting tests..." -ForegroundColor Green

$results = @()
foreach ($url in $testUrls) {
    $name = $url.Replace($baseUrl, "")
    if ($name -eq "") { $name = "/" }
    
    Write-Host "`nTest: $name" -ForegroundColor Cyan
    Write-Host "URL: $url" -ForegroundColor Gray
    
    try {
        $response = $null
        $response = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 10 -ErrorAction Stop
        
        Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
        
        if ($response.StatusCode -eq 200) {
            try {
                $content = Invoke-WebRequest -Uri $url -TimeoutSec 5
                $title = ""
                if ($content.ParsedHtml -and $content.ParsedHtml.title) {
                    $title = $content.ParsedHtml.title
                }
                Write-Host "Title: $title" -ForegroundColor Green
            }
            catch {
                Write-Host "Warning: Could not get full content" -ForegroundColor Yellow
            }
            
            $results += @{Url=$url; Success=$true; Status="200 OK"}
        }
        else {
            $results += @{Url=$url; Success=$false; Status="$($response.StatusCode)"}
        }
    }
    catch [System.Net.WebException] {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "Error: HTTP $statusCode" -ForegroundColor Red
        $results += @{Url=$url; Success=$false; Status="HTTP $statusCode"}
    }
    catch {
        Write-Host "Error: $_" -ForegroundColor Red
        $results += @{Url=$url; Success=$false; Status="Connection Failed"}
    }
    
    Start-Sleep -Milliseconds 500
}

# Summary
Write-Host "`n=== TEST SUMMARY ===" -ForegroundColor Magenta
Write-Host "=" * 50 -ForegroundColor Gray

$successCount = ($results | Where-Object { $_.Success -eq $true }).Count
$totalCount = $results.Count

Write-Host "Total tests: $totalCount" -ForegroundColor Gray
Write-Host "Success: $successCount" -ForegroundColor Green
Write-Host "Failed: $($totalCount - $successCount)" -ForegroundColor Red

Write-Host "`nDetailed results:" -ForegroundColor Cyan
foreach ($result in $results) {
    $statusIcon = if ($result.Success) { "[OK]" } else { "[FAIL]" }
    $color = if ($result.Success) { "Green" } else { "Red" }
    Write-Host "$statusIcon $($result.Url.Replace($baseUrl, '')) - $($result.Status)" -ForegroundColor $color
}

# Generate report
$report = @"
WEBSITE TEST REPORT
Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
Base URL: $baseUrl

Results:
Total tests: $totalCount
Success: $successCount
Failed: $($totalCount - $successCount)

Detailed results:
$($results | ForEach-Object { "$(if ($_.Success) {'[OK]'} else {'[FAIL]'}) $($_.Url.Replace($baseUrl, '')) - $($_.Status)" } | Out-String)

Recommendations:
$(if ($successCount -eq $totalCount) {
    "All tests passed. Website deployment successful!"
    "Ready for use and promotion."
} else {
    "Some tests failed. Further diagnosis needed."
    "Check failed page URLs."
    "Review GitHub Actions deployment status."
    "Redeploy failed files."
})
"@

$reportFile = "test-report-$(Get-Date -Format 'yyyyMMdd-HHmmss').txt"
$report | Out-File -FilePath $reportFile -Encoding UTF8

Write-Host "`nReport saved to: $reportFile" -ForegroundColor Green

# Final recommendation
Write-Host "`n=== EXPERT RECOMMENDATION ===" -ForegroundColor Magenta
if ($successCount -eq $totalCount) {
    Write-Host "WEBSITE TEST PASSED!" -ForegroundColor Green
    Write-Host "MEV 4 Skills website is live and working!" -ForegroundColor Green
} else {
    Write-Host "WEBSITE TEST FAILED" -ForegroundColor Red
    Write-Host "Immediate action needed for failed pages" -ForegroundColor Yellow
}