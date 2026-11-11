$raw = Get-Content -Raw -Encoding UTF8 "games.json"
$games = ConvertFrom-Json $raw
$candidates = $games | Where-Object { 
    $_.mobileReady -ne $true -and 
    ($_.title -match "Doodle|Slope|Angry|Run|Snake|Pac|Chess|Ajedrez|Crossy|Temple|Jetpack|Fruit|Candy|Solitaire|Sudoku|2048|Flappy|Jump|Birds|Paper|Slither|Agar|Helix|Drive|Car|Bike|Motor|Hill|Rider|Clicker|Tap|Touch")
}
Write-Output "CANDIDATES: $($candidates.Count)"
foreach ($c in $candidates) {
    Write-Output "ID: $($c.id) | Title: $($c.title) | Category: $($c.category) | Img: $($c.image)"
}
