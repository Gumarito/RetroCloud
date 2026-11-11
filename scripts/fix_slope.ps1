$raw = Get-Content -Raw -Encoding UTF8 "games.json"
$games = ConvertFrom-Json $raw
foreach ($g in $games) {
    if ($g.id -eq "slope-3d") {
        if (-not ($g | Get-Member -Name "mobileReady")) {
            $g | Add-Member -MemberType NoteProperty -Name "mobileReady" -Value $true
        } else {
            $g.mobileReady = $true
        }
        if (-not ($g | Get-Member -Name "touchControlMode")) {
            $g | Add-Member -MemberType NoteProperty -Name "touchControlMode" -Value "touch-native"
        } else {
            $g.touchControlMode = "touch-native"
        }
        $g.image = "https://upload.wikimedia.org/wikipedia/commons/4/4f/Slope_game_banner.jpg"
        if (-not ($g.tags -contains "mobile-ready")) { $g.tags += "mobile-ready" }
        if (-not ($g.tags -contains "Táctil")) { $g.tags += "Táctil" }
    }
}
$json = $games | ConvertTo-Json -Depth 10
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText("games.json", $json, $utf8NoBom)
Write-Output "slope-3d actualizado correctamente."
