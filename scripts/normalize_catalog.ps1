$raw = Get-Content -Raw -Encoding UTF8 "games.json"
$parsed = ConvertFrom-Json $raw
$list = if ($parsed.value) { $parsed.value } else { $parsed }

Write-Output "TOTAL_GAMES: $($list.Count)"
$mob = $list | Where-Object { $_.mobileReady -eq $true -or ($_.tags -contains "mobile-ready") -or ($_.tags -contains "Táctil") }
Write-Output "TOTAL_MOBILE: $($mob.Count)"
$uns = $list | Where-Object { $_.image -like "*unsplash*" }
Write-Output "TOTAL_UNSPLASH: $($uns.Count)"

# Normalizar games.json a arreglo plano
$json = $list | ConvertTo-Json -Depth 10
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText("games.json", $json, $utf8NoBom)
Write-Output "games.json normalizado a arreglo plano UTF8 sin BOM."
