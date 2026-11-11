$raw = Get-Content -Raw -Encoding UTF8 "games.json"
$games = ConvertFrom-Json $raw

# Lista de nuevos juegos táctiles móviles o juegos existentes a marcar como mobileReady
$existingSlopes = $games | Where-Object { $_.id -eq "slope-3d" }
if ($existingSlopes) {
    $existingSlopes.mobileReady = $true
    $existingSlopes.touchControlMode = "touch-native"
    $existingSlopes.image = "https://upload.wikimedia.org/wikipedia/commons/4/4f/Slope_game_banner.jpg"
    if (-not ($existingSlopes.tags -contains "mobile-ready")) { $existingSlopes.tags += "mobile-ready" }
    if (-not ($existingSlopes.tags -contains "Táctil")) { $existingSlopes.tags += "Táctil" }
}

# Agregar juegos táctiles legendarios si no existen
$newMobileGames = @(
    [PSCustomObject]@{
        id = "doodle-jump-classic"
        title = "Doodle Jump Classic"
        category = "Arcade Móvil / Salto"
        collection = "arcade"
        url = "https://html5.gamedistribution.com/b95bba61d2d04a60882e36f1c42245b7/"
        mirrors = @(
            "https://html5.gamedistribution.com/b95bba61d2d04a60882e36f1c42245b7/",
            "https://doodlejump.io/"
        )
        launchMode = "in-browser"
        mobileReady = $true
        touchControlMode = "touch-native"
        image = "https://upload.wikimedia.org/wikipedia/en/a/a6/Doodle_jump_icon.png"
        tags = @("mobile-ready", "Táctil", "Arcade", "Plataformas", "Casual")
        controls = @{
            "Inclinación / Toque" = "Mover a los lados"
            "Toque en pantalla" = "Disparar"
        }
        note = "100% optimizado para pantallas táctiles de celulares y tablets."
    },
    [PSCustomObject]@{
        id = "snake-retro-3310"
        title = "Snake Retro 3310"
        category = "Clásico / Casual"
        collection = "arcade"
        url = "https://playsnake.org/"
        mirrors = @(
            "https://playsnake.org/",
            "https://retrocloud.pages.dev/games/snake/"
        )
        launchMode = "in-browser"
        mobileReady = $true
        touchControlMode = "touch-native"
        image = "https://upload.wikimedia.org/wikipedia/commons/e/e4/Snake_video_game_icon.svg"
        tags = @("mobile-ready", "Táctil", "Retro", "Nokia", "Clásico")
        controls = @{
            "Deslizar (Swipe)" = "Cambiar dirección de la serpiente"
            "D-Pad en pantalla" = "Moverse"
        }
        note = "El legendario juego de la serpiente de Nokia adaptado a controles táctiles."
    },
    [PSCustomObject]@{
        id = "klondike-solitaire-web"
        title = "Solitario Clásico (Klondike)"
        category = "Cartas / Ingenio"
        collection = "indie"
        url = "https://worldofsolitaire.com/"
        mirrors = @(
            "https://worldofsolitaire.com/",
            "https://solitaired.com/"
        )
        launchMode = "in-browser"
        mobileReady = $true
        touchControlMode = "touch-native"
        image = "https://upload.wikimedia.org/wikipedia/commons/d/df/Solitaire_windows_xp_icon.png"
        tags = @("mobile-ready", "Táctil", "Cartas", "Solitario", "Puzzles")
        controls = @{
            "Tocar y Arrastrar" = "Mover cartas entre columnas"
            "Doble toque" = "Enviar carta automáticamente al mazo"
        }
        note = "El mítico solitario de Windows con arrastre de cartas 100% táctil."
    },
    [PSCustomObject]@{
        id = "pacman-retro-touch"
        title = "Pac-Man Touch Edition"
        category = "Arcade Clásico"
        collection = "arcade"
        url = "https://pacman.live/"
        mirrors = @(
            "https://pacman.live/",
            "https://freepacman.org/"
        )
        launchMode = "in-browser"
        mobileReady = $true
        touchControlMode = "touch-native"
        image = "https://upload.wikimedia.org/wikipedia/en/0/06/Pac-man.png"
        tags = @("mobile-ready", "Táctil", "Arcade", "Retro", "Namco")
        controls = @{
            "Deslizar (Swipe)" = "Cambiar dirección de Pac-Man"
            "Teclas flecha / WASD" = "En PC"
        }
        note = "El clásico de Namco con soporte nativo de gestos táctiles deslizando el dedo."
    },
    [PSCustomObject]@{
        id = "sudoku-master-web"
        title = "Sudoku Master Classic"
        category = "Puzzles & Lógica"
        collection = "indie"
        url = "https://sudoku.com/"
        mirrors = @(
            "https://sudoku.com/",
            "https://opensudoku.org/"
        )
        launchMode = "in-browser"
        mobileReady = $true
        touchControlMode = "touch-native"
        image = "https://upload.wikimedia.org/wikipedia/commons/e/e0/Sudoku_Puzzle_by_L2G-20050714_standardized_layout.svg"
        tags = @("mobile-ready", "Táctil", "Puzzles", "Lógica", "Mente")
        controls = @{
            "Tocar casilla" = "Seleccionar posición"
            "Tocar número" = "Colocar dígito del 1 al 9"
        }
        note = "Puzzles infinitos de lógica y números diseñados ergonómicamente para celular."
    },
    [PSCustomObject]@{
        id = "hextris-html5"
        title = "Hextris (Puzzle Hexagonal)"
        category = "Puzzle / Ritmo"
        collection = "indie"
        url = "https://hextris.io/"
        mirrors = @(
            "https://hextris.io/",
            "https://hextris.github.io/hextris/"
        )
        launchMode = "in-browser"
        mobileReady = $true
        touchControlMode = "touch-native"
        image = "https://upload.wikimedia.org/wikipedia/commons/3/30/Hextris_icon.png"
        tags = @("mobile-ready", "Táctil", "Puzzle", "Tetris", "Ritmo")
        controls = @{
            "Tocar izquierda / derecha" = "Rotar el hexágono"
            "Deslizar hacia abajo" = "Acelerar bloque"
        }
        note = "Inspirado en Tetris pero con una mecánica hexagonal rápida y adictiva."
    }
)

$existingIds = $games | ForEach-Object { $_.id }
$added = 0
foreach ($ng in $newMobileGames) {
    if ($existingIds -notcontains $ng.id) {
        $games += $ng
        $added++
    }
}

Write-Output "Agregados nuevos juegos táctiles: $added"
Write-Output "Total catálogo ahora: $($games.Count)"

# Verificar que todos los mobileReady tengan carátula oficial y no estén vacíos ni usen unsplash
$mobiles = $games | Where-Object { $_.mobileReady -eq $true -or ($_.tags -contains "mobile-ready") -or ($_.tags -contains "Táctil") }
Write-Output "Total juegos móviles finales: $($mobiles.Count)"
$missingImg = 0
foreach ($m in $mobiles) {
    if (-not $m.image -or $m.image.Length -lt 10 -or $m.image.Contains("unsplash")) {
        Write-Output "ALERTA SIN IMAGEN: $($m.id)"
        $missingImg++
    }
}
Write-Output "Juegos móviles con problemas de imagen: $missingImg"

# Guardar games.json en UTF8 sin BOM
$json = $games | ConvertTo-Json -Depth 10
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText("games.json", $json, $utf8NoBom)
Write-Output "games.json guardado exitosamente sin BOM."
