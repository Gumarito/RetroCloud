$raw = Get-Content -Raw -Encoding UTF8 "games.json"
$games = ConvertFrom-Json $raw

foreach ($g in $games) {
    if ($g.id -eq "minecraft-pocket-edition") {
        $g.image = "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png"
    }
    if ($g.id -eq "minesweeper-plus") {
        $g.image = "https://upload.wikimedia.org/wikipedia/commons/8/81/Minesweeper_Windows_7.png"
    }
}

$json = $games | ConvertTo-Json -Depth 10
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText("games.json", $json, $utf8NoBom)
Write-Output "Caratulas corregidas en games.json."
