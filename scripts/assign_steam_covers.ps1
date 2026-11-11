$ErrorActionPreference = "Stop"

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$catalogPath = Join-Path $root "games.json"
$reportPath = Join-Path $root "COVER_REVIEW.md"
$placeholder = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80"
$stopWords = @("a", "an", "and", "at", "by", "edition", "for", "game", "of", "the", "web", "browser", "port", "online", "remastered", "version")

Add-Type -AssemblyName System.Net.Http
$handler = [System.Net.Http.HttpClientHandler]::new()
$handler.AllowAutoRedirect = $true
$client = [System.Net.Http.HttpClient]::new($handler)
$client.Timeout = [TimeSpan]::FromSeconds(25)
$client.DefaultRequestHeaders.UserAgent.ParseAdd("RetroCloudCoverCurator/1.0")

function Normalize-GameName([string]$value) {
    if (-not $value) { return "" }
    $name = $value.ToLowerInvariant()
    $name = [regex]::Replace($name, "\([^)]*\)|\[[^]]*\]", " ")
    $name = $name.Replace("&", " and ")
    $name = [regex]::Replace($name, "\b(html5|wasm|webgl|web\s*port|port|demo|browser|online|eaglercraftx)\b", " ")
    $name = [regex]::Replace($name, "[^a-z0-9]+", " ")
    $name = [regex]::Replace($name, "\s+", " ").Trim()
    $name = $name.Replace("gta ", "grand theft auto ")
    $name = $name.Replace("pes ", "pro evolution soccer ")
    $name = $name.Replace("fnaf ", "five nights at freddy s ")
    return $name
}

function Get-NameTokens([string]$value) {
    $tokens = [System.Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)
    foreach ($token in (Normalize-GameName $value).Split(" ", [StringSplitOptions]::RemoveEmptyEntries)) {
        if ($stopWords -notcontains $token) { [void]$tokens.Add($token) }
    }
    return ,$tokens
}

function Get-NameScore([string]$expected, [string]$candidate) {
    $left = Normalize-GameName $expected
    $right = Normalize-GameName $candidate
    if (-not $left -or -not $right) { return 0.0 }
    if ($left -eq $right) { return 1.0 }
    if ($right.StartsWith($left + " ") -or $right.StartsWith($left + ":")) { return 0.92 }
    if ($left.StartsWith($right + " ") -or $left.StartsWith($right + ":")) { return 0.82 }
    $leftTokens = Get-NameTokens $expected
    $rightTokens = Get-NameTokens $candidate
    if ($leftTokens.Count -eq 0 -or $rightTokens.Count -eq 0) { return 0.0 }
    $common = 0
    foreach ($token in $leftTokens) {
        if ($rightTokens.Contains($token)) { $common++ }
    }
    if ($common -eq 0) { return 0.0 }
    if ($common -eq 1 -and $leftTokens.Count -gt 1 -and $rightTokens.Count -gt 1) { return 0.0 }
    $recall = $common / $leftTokens.Count
    $precision = $common / $rightTokens.Count
    return 2 * $recall * $precision / ($recall + $precision)
}

function Get-TitleForSearch($game) {
    $title = [regex]::Replace([string]$game.title, "\([^)]*\)|\[[^]]*\]", " ")
    $title = [regex]::Replace($title, "\b(html5|wasm|webgl|web\s*port|port|demo|browser|online|eaglercraftx)\b", " ", "IgnoreCase")
    $title = [regex]::Replace($title, "\s+", " ").Trim(" ", "-", ":", "|")
    return $title
}

$document = [IO.File]::ReadAllText($catalogPath, [Text.Encoding]::UTF8) | ConvertFrom-Json
if (-not ($document.value -is [System.Array])) { throw 'games.json debe tener el formato {"value": [...]}.' }
$games = $document.value
$ids = @($games | ForEach-Object { $_.id })
$duplicateIds = @($ids | Group-Object -CaseSensitive | Where-Object { $_.Count -gt 1 })
if ($duplicateIds.Count -gt 0) { throw "Hay IDs duplicados; no se modificó el catálogo." }

$targets = @($games | Where-Object { $_.image -like "*images.unsplash.com*" })
Write-Output ("Juegos con portada genérica: {0}" -f $targets.Count)
$queries = @{}
$apiUrls = [System.Collections.Generic.List[string]]::new()
foreach ($game in $targets) {
    $searchTitle = Get-TitleForSearch $game
    $apiUrl = "https://store.steampowered.com/api/storesearch/?term=" + [Uri]::EscapeDataString($searchTitle) + "&l=english&cc=us"
    $queries[$game.id] = $apiUrl
    $apiUrls.Add($apiUrl)
}

$apiResults = @{}
$uniqueUrls = @($apiUrls | Select-Object -Unique)
$batchSize = 6
for ($start = 0; $start -lt $uniqueUrls.Count; $start += $batchSize) {
    $end = [Math]::Min($start + $batchSize - 1, $uniqueUrls.Count - 1)
    $batch = @($uniqueUrls[$start..$end])
    $tasks = [System.Collections.Generic.List[System.Threading.Tasks.Task[string]]]::new()
    foreach ($url in $batch) { [void]$tasks.Add($client.GetStringAsync($url)) }
    try { [void][System.Threading.Tasks.Task]::WhenAll($tasks.ToArray()).GetAwaiter().GetResult() } catch {}
    for ($index = 0; $index -lt $tasks.Count; $index++) {
        $url = $batch[$index]
        if ($tasks[$index].Status -eq [System.Threading.Tasks.TaskStatus]::RanToCompletion) {
            try { $apiResults[$url] = $tasks[$index].Result | ConvertFrom-Json } catch { $apiResults[$url] = $null }
        }
        else { $apiResults[$url] = $null }
    }
    if ($start + $batchSize -lt $uniqueUrls.Count) { Start-Sleep -Milliseconds 250 }
    if (([Math]::Min($start + $batchSize, $uniqueUrls.Count)) % 60 -eq 0) {
        Write-Output ("Búsquedas de Steam: {0}/{1}" -f [Math]::Min($start + $batchSize, $uniqueUrls.Count), $uniqueUrls.Count)
    }
}

$steamMatches = [System.Collections.Generic.List[object]]::new()
$unmatched = [System.Collections.Generic.List[object]]::new()
foreach ($game in $targets) {
    $response = $apiResults[$queries[$game.id]]
    $items = @()
    if ($response -and $response.items) { $items = @($response.items | Where-Object { $_.type -eq "app" }) }
    $best = $null
    $bestScore = 0.0
    foreach ($item in $items) {
        $score = Get-NameScore $game.title $item.name
        if ($score -gt $bestScore) {
            $best = $item
            $bestScore = $score
        }
    }
    if (-not $best -and $items.Count -gt 0) { $best = $items[0] }
    if (-not $best) {
        $unmatched.Add([pscustomobject]@{ Title = $game.title; Id = $game.id })
        continue
    }
    $coverUrl = "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/$($best.id)/library_600x900.jpg"
    $doubt = ""
    if ($bestScore -lt 0.75) {
        $doubt = "La coincidencia de nombre es aproximada (similitud $([Math]::Round($bestScore, 2))); revisar que sea el juego y la edición correctos."
    }
    $steamMatches.Add([pscustomobject]@{
        Game = $game
        Candidate = $best
        Score = $bestScore
        CoverUrl = $coverUrl
        Doubt = $doubt
    })
}

$coverChecks = @{}
$coverBatchSize = 12
$coverUrls = @($steamMatches | ForEach-Object { $_.CoverUrl } | Select-Object -Unique)
for ($start = 0; $start -lt $coverUrls.Count; $start += $coverBatchSize) {
    $end = [Math]::Min($start + $coverBatchSize - 1, $coverUrls.Count - 1)
    $batch = @($coverUrls[$start..$end])
    $tasks = [System.Collections.Generic.List[System.Threading.Tasks.Task[System.Net.Http.HttpResponseMessage]]]::new()
    foreach ($url in $batch) {
        $request = [System.Net.Http.HttpRequestMessage]::new([System.Net.Http.HttpMethod]::Head, $url)
        [void]$tasks.Add($client.SendAsync($request, [System.Net.Http.HttpCompletionOption]::ResponseHeadersRead))
    }
    try { [void][System.Threading.Tasks.Task]::WhenAll($tasks.ToArray()).GetAwaiter().GetResult() } catch {}
    for ($index = 0; $index -lt $tasks.Count; $index++) {
        $url = $batch[$index]
        if ($tasks[$index].Status -eq [System.Threading.Tasks.TaskStatus]::RanToCompletion) {
            $response = $tasks[$index].Result
            $coverChecks[$url] = [int]$response.StatusCode
            $response.Dispose()
        }
        else { $coverChecks[$url] = 0 }
    }
}

$assigned = [System.Collections.Generic.List[object]]::new()
foreach ($match in $steamMatches) {
    $candidate = $match.Candidate
    $coverUrl = $match.CoverUrl
    $status = $coverChecks[$coverUrl]
    if ($status -lt 200 -or $status -ge 400) {
        if ($candidate.tiny_image) {
            $coverUrl = [string]$candidate.tiny_image
            $match.Doubt = ($match.Doubt + " La portada vertical de Steam no está disponible; se usa su cápsula horizontal de resolución menor.").Trim()
        }
        else {
            $unmatched.Add([pscustomobject]@{ Title = $match.Game.title; Id = $match.Game.id })
            continue
        }
    }
    $match.Game.image = $coverUrl
    $assigned.Add([pscustomobject]@{
        Title = $match.Game.title
        Id = $match.Game.id
        SteamName = $candidate.name
        AppId = $candidate.id
        Url = $coverUrl
        Score = $match.Score
        Doubt = $match.Doubt
        StoreUrl = "https://store.steampowered.com/app/$($candidate.id)/"
    })
}

$serialized = ConvertTo-Json -InputObject $document -Depth 100
$serialized += "`n"
$null = $serialized | ConvertFrom-Json
$temporary = $catalogPath + ".tmp"
[IO.File]::WriteAllText($temporary, $serialized, [System.Text.UTF8Encoding]::new($false))
Move-Item -LiteralPath $temporary -Destination $catalogPath -Force

$oldReport = ""
if (Test-Path -LiteralPath $reportPath) { $oldReport = [IO.File]::ReadAllText($reportPath, [Text.Encoding]::UTF8) }
$oldDoubts = ""
$oldSources = ""
if ($oldReport -match "(?s)(## Coincidencias dudosas.*?)(?=\r?\n## Dudas de Steam|\r?\n## Sin candidato verificable)") { $oldDoubts = $Matches[1].Trim() }
$oldSteamDoubts = ""
if ($oldReport -match "(?s)(## Dudas de Steam.*?)(?=\r?\n## Juegos sin candidato Steam)") { $oldSteamDoubts = $Matches[1].Trim() }
$oldSteamSources = ""
if ($oldReport -match "(?s)(## Nuevas fuentes Steam.*?)(?=\r?\n## Fuentes y licencias|$)") { $oldSteamSources = $Matches[1].Trim() }
if ($oldReport -match "(?s)(## Fuentes y licencias.*)$") { $oldSources = $Matches[1].Trim() }
$oldAssigned = 0
if ($oldReport -match "Imágenes asignadas desde Wikidata o por coincidencia de catálogo:\s*(\d+)") { $oldAssigned = [int]$Matches[1] }
if ($oldReport -match "Portadas previas anotadas:\s*(\d+)") { $oldAssigned = [int]$Matches[1] }
if ($oldReport -match "Portadas nuevas de Steam asignadas y enlace comprobado:\s*(\d+)") { $oldAssigned += [int]$Matches[1] }

$stillUnsplash = @($targets | Where-Object { $_.image -like "*images.unsplash.com*" })
$doubtCount = @($assigned | Where-Object { $_.Doubt }).Count
$report = [System.Collections.Generic.List[string]]::new()
$report.Add("# Revisión de portadas asignadas")
$report.Add("")
$report.Add("- Juegos en catálogo: $($games.Count)")
$report.Add("- Portadas previas anotadas: $oldAssigned")
$report.Add("- Portadas nuevas de Steam asignadas y enlace comprobado: $($assigned.Count)")
$report.Add("- Juegos que aún conservan Unsplash: $($stillUnsplash.Count)")
$report.Add("- Juegos con coincidencia dudosa en esta pasada: $doubtCount")
$report.Add("- Sin candidato Steam: $($unmatched.Count)")
$report.Add("")
$report.Add("Las imágenes de Steam son ilustraciones oficiales de producto (no siempre la portada física original). Las coincidencias no exactas y las cápsulas horizontales quedan marcadas para revisión.")
$report.Add("")
if ($oldDoubts) { $report.Add($oldDoubts); $report.Add("") }
if ($oldSteamDoubts) { $report.Add($oldSteamDoubts); $report.Add("") }
$report.Add("## Dudas de Steam")
$report.Add("")
$steamDoubts = @($assigned | Where-Object { $_.Doubt })
if ($steamDoubts.Count -eq 0) { $report.Add("- Ninguna.") }
else {
    foreach ($item in ($steamDoubts | Sort-Object -Property Title)) {
        $report.Add(("- **{0}**: {1} Candidato: [{2}]({3}); similitud {4}." -f $item.Title, $item.Doubt, $item.SteamName, $item.StoreUrl, [Math]::Round($item.Score, 2)))
    }
}
$report.Add("")
$report.Add("## Juegos sin candidato Steam; placeholder conservado")
$report.Add("")
if ($unmatched.Count -eq 0) { $report.Add("- Ninguno.") }
else {
    foreach ($item in ($unmatched | Sort-Object -Property Title)) {
        $report.Add(("- **{0}** (`{1}`)" -f $item.Title, $item.Id))
    }
}
$report.Add("")
$report.Add("## Nuevas fuentes Steam")
$report.Add("")
foreach ($item in ($assigned | Sort-Object -Property Title)) {
    $report.Add(("- **{0}**: [{1}]({2}) — [imagen]({3}); similitud {4}." -f $item.Title, $item.SteamName, $item.StoreUrl, $item.Url, [Math]::Round($item.Score, 2)))
}
if ($oldSources) {
    $report.Add("")
    $report.Add($oldSources)
}
if ($oldSteamSources) {
    $report.Add("")
    $report.Add($oldSteamSources)
}
[IO.File]::WriteAllLines($reportPath, $report, [System.Text.UTF8Encoding]::new($false))
$client.Dispose()
$handler.Dispose()
Write-Output ("Portadas Steam asignadas: {0}; dudas: {1}; aún Unsplash: {2}" -f $assigned.Count, $doubtCount, $stillUnsplash.Count)
