$ErrorActionPreference = "Stop"

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$catalogPath = Join-Path $root "games.json"
$reportPath = Join-Path $root "CATALOG_AUDIT.md"
$timeoutSeconds = 5
$batchSize = 40

Add-Type -AssemblyName System.Net.Http
$handler = [System.Net.Http.HttpClientHandler]::new()
$handler.AllowAutoRedirect = $true
$client = [System.Net.Http.HttpClient]::new($handler)
$client.Timeout = [TimeSpan]::FromSeconds($timeoutSeconds)
$client.DefaultRequestHeaders.UserAgent.ParseAdd("RetroCloudCatalogAudit/1.0")

function Get-HeaderValue($headers, [string]$name) {
    if ($headers.Contains($name)) {
        return (@($headers.GetValues($name)) -join "; ")
    }
    return ""
}

function Test-UrlBatch([string[]]$urls) {
    $uniqueUrls = @($urls | Where-Object { $_ -match "^https?://" } | Select-Object -Unique)
    $results = @{}
    for ($start = 0; $start -lt $uniqueUrls.Count; $start += $batchSize) {
        $end = [Math]::Min($start + $batchSize - 1, $uniqueUrls.Count - 1)
        $batch = @($uniqueUrls[$start..$end])
        $tasks = [System.Collections.Generic.List[System.Threading.Tasks.Task[System.Net.Http.HttpResponseMessage]]]::new()
        foreach ($url in $batch) {
            [void]$tasks.Add($client.GetAsync($url, [System.Net.Http.HttpCompletionOption]::ResponseHeadersRead))
        }
        try {
            [void][System.Threading.Tasks.Task]::WhenAll($tasks.ToArray()).GetAwaiter().GetResult()
        }
        catch {
            # Collect successful responses and report failures per URL below.
        }
        for ($index = 0; $index -lt $tasks.Count; $index++) {
            $url = $batch[$index]
            $task = $tasks[$index]
            if ($task.Status -ne [System.Threading.Tasks.TaskStatus]::RanToCompletion) {
                $message = "request failed"
                try { $message = $task.Exception.GetBaseException().Message } catch {}
                $results[$url] = [pscustomobject]@{
                    Status = 0
                    FinalUrl = ""
                    ContentType = ""
                    XFrameOptions = ""
                    FrameAncestors = ""
                    Error = $message
                }
                continue
            }
            $response = $task.Result
            $status = [int]$response.StatusCode
            $contentType = ""
            if ($response.Content.Headers.ContentType) {
                $contentType = $response.Content.Headers.ContentType.MediaType
            }
            $xfo = Get-HeaderValue $response.Headers "X-Frame-Options"
            if (-not $xfo) { $xfo = Get-HeaderValue $response.Content.Headers "X-Frame-Options" }
            $csp = Get-HeaderValue $response.Headers "Content-Security-Policy"
            if (-not $csp) { $csp = Get-HeaderValue $response.Content.Headers "Content-Security-Policy" }
            $frameAncestors = ""
            if ($csp -match "(?i)frame-ancestors\s+([^;]+)") { $frameAncestors = $Matches[1].Trim() }
            $results[$url] = [pscustomobject]@{
                Status = $status
                FinalUrl = [string]$response.RequestMessage.RequestUri
                ContentType = $contentType
                XFrameOptions = $xfo
                FrameAncestors = $frameAncestors
                Error = ""
            }
            $response.Dispose()
        }
        if ($start + $batchSize -lt $uniqueUrls.Count) { Start-Sleep -Milliseconds 200 }
        if (([Math]::Min($start + $batchSize, $uniqueUrls.Count)) % 120 -eq 0) {
            Write-Host ("URLs comprobadas: {0}/{1}" -f [Math]::Min($start + $batchSize, $uniqueUrls.Count), $uniqueUrls.Count)
        }
    }
    return $results
}

$document = [IO.File]::ReadAllText($catalogPath, [Text.Encoding]::UTF8) | ConvertFrom-Json
if (-not ($document.value -is [System.Array])) {
    throw 'games.json debe tener el formato {"value": [...]}'
}
$games = $document.value
$pageUrls = [System.Collections.Generic.List[string]]::new()
$imageUrls = [System.Collections.Generic.List[string]]::new()
foreach ($game in $games) {
    if ($game.url) { $pageUrls.Add([string]$game.url) }
    foreach ($mirror in $game.mirrors) {
        if ($mirror.url) { $pageUrls.Add([string]$mirror.url) }
    }
    if ($game.image) { $imageUrls.Add([string]$game.image) }
}

$uniquePageUrls = @($pageUrls | Select-Object -Unique)
$uniqueImageUrls = @($imageUrls | Select-Object -Unique)
Write-Output ("Comprobando {0} URL de juego/mirror y {1} imágenes..." -f $uniquePageUrls.Count, $uniqueImageUrls.Count)
$pageResults = Test-UrlBatch $uniquePageUrls
$imageResults = Test-UrlBatch $uniqueImageUrls

$liveCount = 0
$blockedCount = 0
$failedCount = 0
$pageNetworkErrors = 0
$brokenImages = 0
$unverifiedImages = 0
$unsplashCount = 0
$duplicateIds = @($games | Group-Object -Property id | Where-Object Count -gt 1).Count
$rows = [System.Collections.Generic.List[string]]::new()
$rows.Add("| ID | Juego | Página principal | Iframe | Portada | Relevancia | Acción sugerida |")
$rows.Add("|---|---|---:|---|---|---|---|")

foreach ($game in $games) {
    $page = $null
    if ($game.url -and $pageResults.ContainsKey([string]$game.url)) { $page = $pageResults[[string]$game.url] }
    $pageStatus = if ($page -and $page.Status -eq 0) { "error de red" } elseif ($page) { [string]$page.Status } else { "sin URL" }
    $iframeStatus = "No verificado"
    if ($page) {
        if ($page.Status -ge 200 -and $page.Status -lt 400) {
            $blocked = $page.XFrameOptions -match "(?i)deny|sameorigin" -or $page.FrameAncestors -match "(?i)^'none'|'self'$"
            if ($blocked) {
                $iframeStatus = "Bloqueado por cabeceras"
                $blockedCount++
            }
            else {
                $iframeStatus = "Sin bloqueo detectado"
                $liveCount++
            }
        }
        elseif ($page.Status -eq 0) {
            $pageNetworkErrors++
            $iframeStatus = "Sin respuesta HTTP"
        }
        else {
            $iframeStatus = "No accesible"
            $failedCount++
        }
    }

    $image = $null
    if ($game.image -and $imageResults.ContainsKey([string]$game.image)) { $image = $imageResults[[string]$game.image] }
    $imageStatus = "Sin imagen"
    if ($game.image -like "*images.unsplash.com*") {
        $unsplashCount++
        $imageStatus = "Genérica (Unsplash)"
    }
    elseif ($image -and $image.Status -eq 0) {
        $imageStatus = "No verificada (error de red)"
        $unverifiedImages++
    }
    elseif ($image) {
        if ($image.Status -ge 200 -and $image.Status -lt 400 -and $image.ContentType -like "image/*") {
            $imageStatus = "OK ($($image.ContentType))"
        }
        else {
            $imageStatus = "Rota/inesperada ($($image.Status), $($image.ContentType))"
            $brokenImages++
        }
    }

    $metaCount = 0
    foreach ($field in @("year", "developer", "rating", "summary")) {
        if ($game.$field) { $metaCount++ }
    }
    $metadataStatus = "$metaCount/4 metadatos"
    $action = "Revisión manual"
    if ($pageStatus -eq "error de red" -or $pageStatus -eq "sin URL") { $action = "Reintentar/revisar enlace" }
    elseif ($iframeStatus -eq "Bloqueado por cabeceras") { $action = "Probar mirror o lanzamiento externo" }
    elseif ($imageStatus -like "Genérica*") { $action = "Buscar portada específica" }
    elseif ($imageStatus -like "No verificada*") { $action = "Reintentar verificación de portada" }
    elseif ($imageStatus -like "Rota*") { $action = "Reparar portada" }

    $safeTitle = ([string]$game.title).Replace("|", "\|")
    $rows.Add("| ``$($game.id)`` | $safeTitle | $pageStatus | $iframeStatus | $imageStatus | $metadataStatus; relevancia IA pendiente | $action |")
}

$report = [System.Collections.Generic.List[string]]::new()
$report.Add("# Auditoría técnica del catálogo RetroCloud")
$report.Add("")
$report.Add("- Fecha: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss K")")
$report.Add("- Método: comprobación HTTP de solo lectura de URL principal, mirrors e imágenes; análisis de cabeceras de bloqueo iframe.")
$report.Add("- Umbral de red: timeout de $timeoutSeconds s, hasta $batchSize solicitudes concurrentes; los errores de red se registran como no verificados, no como roturas confirmadas.")
$report.Add("- Límite: HTTP 200 no garantiza que el juego arranque ni que su apariencia sea correcta. Las páginas no se ejecutaron ni se capturaron; calidad visual y relevancia requieren auditoría con navegador/modelo.")
$report.Add("")
$report.Add("## Métricas")
$report.Add("")
$report.Add("| Métrica | Total |")
$report.Add("|---|---:|")
$report.Add("| Juegos | $($games.Count) |")
$report.Add("| IDs duplicados | $duplicateIds |")
$report.Add("| Página principal accesible sin bloqueo iframe detectado | $liveCount |")
$report.Add("| Bloqueo de iframe detectado | $blockedCount |")
$report.Add("| Página principal no accesible | $failedCount |")
$report.Add("| Página principal sin respuesta HTTP | $pageNetworkErrors |")
$report.Add("| Imágenes genéricas Unsplash | $unsplashCount |")
$report.Add("| Imágenes rotas o con tipo inesperado | $brokenImages |")
$report.Add("| Imágenes no verificadas por error de red | $unverifiedImages |")
$report.Add("")
$report.Add("## Revisión juego por juego")
$report.Add("")
foreach ($row in $rows) { $report.Add($row) }
[IO.File]::WriteAllLines($reportPath, $report, [System.Text.UTF8Encoding]::new($false))
$client.Dispose()
$handler.Dispose()
Write-Output ("Auditoría terminada: {0} juegos. Informe: CATALOG_AUDIT.md" -f $games.Count)
