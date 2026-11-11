$raw = Get-Content -Raw -Encoding UTF8 "games.json"
$games = ConvertFrom-Json $raw
$mob = $games | Where-Object { $_.mobileReady -eq $true -or ($_.tags -contains "mobile-ready") -or ($_.tags -contains "Táctil") }
Write-Output "TOTAL_MOBILE: $($mob.Count)"
foreach ($g in $mob) {
    $hasImg = if ($g.image -and $g.image.Length -gt 10) { "YES" } else { "NO" }
    $isUnsplash = if ($g.image -and $g.image.Contains("unsplash")) { "UNSPLASH" } else { "OFFICIAL" }
    Write-Output "ID: $($g.id) | Title: $($g.title) | HasImg: $hasImg | Type: $isUnsplash | Img: $($g.image)"
}
