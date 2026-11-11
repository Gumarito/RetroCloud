$ErrorActionPreference = "Stop"

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$catalogPath = Join-Path $root "games.json"
$reportPath = Join-Path $root "COVER_REVIEW_WEB.md"
$timeoutSeconds = 15
$batchSize = 8

Add-Type -AssemblyName System.Net.Http
$handler = [System.Net.Http.HttpClientHandler]::new()
$handler.AllowAutoRedirect = $true
$client = [System.Net.Http.HttpClient]::new($handler)
$client.Timeout = [TimeSpan]::FromSeconds($timeoutSeconds)
$client.DefaultRequestHeaders.UserAgent.ParseAdd("RetroCloudCoverCurator/1.0")

function Get-MetaValue([string]$html, [string[]]$keys) {
    foreach ($tag in [regex]::Matches($html, '(?is)<meta\b[^>]*>')) {
        $property = [regex]::Match($tag.Value, '(?i)(?:property|name)\s*=\s*["'']([^"'']+)["'']')
        if (-not $property.Success -or $keys -notcontains $property.Groups[1].Value.ToLowerInvariant()) { continue }
        $content = [regex]::Match($tag.Value, '(?i)content\s*=\s*["'']([^"'']+)["'']')
        if ($content.Success) { return [Net.WebUtility]::HtmlDecode($content.Groups[1].Value) }
    }
    return ""
}

function Read-PagePrefix($response, [int]$maxChars) {
    $stream = $response.Content.ReadAsStreamAsync().GetAwaiter().GetResult()
    $reader = [IO.StreamReader]::new($stream)
    $buffer = New-Object char[] 8192
    $builder = [Text.StringBuilder]::new()
    while ($builder.Length -lt $maxChars) {
        $read = $reader.Read($buffer, 0, [Math]::Min($buffer.Length, $maxChars - $builder.Length))
        if ($read -le 0) { break }
        [void]$builder.Append($buffer, 0, $read)
    }
    $reader.Dispose()
    return $builder.ToString()
}

function Test-Image([string]$url) {
    try {
        $request = [System.Net.Http.HttpRequestMessage]::new([System.Net.Http.HttpMethod]::Head, $url)
        $response = $client.SendAsync($request, [System.Net.Http.HttpCompletionOption]::ResponseHeadersRead).GetAwaiter().GetResult()
        $status = [int]$response.StatusCode
        $type = ""
        if ($response.Content.Headers.ContentType) { $type = $response.Content.Headers.ContentType.MediaType }
        $response.Dispose()
        if ($status -ge 200 -and $status -lt 400 -and $type -like "image/*") {
            return [pscustomobject]@{ Ok = $true; Status = $status; ContentType = $type }
        }
        return [pscustomobject]@{ Ok = $false; Status = $status; ContentType = $type }
    }
    catch {
        return [pscustomobject]@{ Ok = $false; Status = 0; ContentType = "" }
    }
}

$document = [IO.File]::ReadAllText($catalogPath, [Text.Encoding]::UTF8) | ConvertFrom-Json
if (-not ($document.value -is [System.Array])) { throw 'games.json debe tener el formato {"value": [...]}.' }
$games = $document.value
$targets = @($games | Where-Object { $_.image -like "*images.unsplash.com*" })
$assigned = [System.Collections.Generic.List[object]]::new()
$unmatched = [System.Collections.Generic.List[object]]::new()
Write-Output ("Buscando imágenes Open Graph en las páginas de {0} juegos..." -f $targets.Count)

for ($start = 0; $start -lt $targets.Count; $start += $batchSize) {
    $end = [Math]::Min($start + $batchSize - 1, $targets.Count - 1)
    $batch = @($targets[$start..$end])
    foreach ($game in $batch) {
        if ($game.url -notmatch "^https?://") {
            $unmatched.Add([pscustomobject]@{ Title = $game.title; Id = $game.id; Reason = "URL inválida o ausente." })
            continue
        }
        $response = $null
        try {
            $response = $client.GetAsync([string]$game.url, [System.Net.Http.HttpCompletionOption]::ResponseHeadersRead).GetAwaiter().GetResult()
            $contentType = ""
            if ($response.Content.Headers.ContentType) { $contentType = $response.Content.Headers.ContentType.MediaType }
            if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400 -or $contentType -notlike "text/html*") {
                $unmatched.Add([pscustomobject]@{ Title = $game.title; Id = $game.id; Reason = "La URL no devolvió HTML con metadatos de imagen." })
                continue
            }

            $finalUrl = [string]$response.RequestMessage.RequestUri
            $html = Read-PagePrefix $response 524288
            $ogTitle = Get-MetaValue $html @("og:title", "twitter:title")
            $candidate = Get-MetaValue $html @("og:image", "og:image:url", "twitter:image", "twitter:image:src")
            if (-not $candidate -or $candidate.StartsWith("data:", [StringComparison]::OrdinalIgnoreCase) -or $candidate.Contains("unsplash.com")) {
                $unmatched.Add([pscustomobject]@{ Title = $game.title; Id = $game.id; Reason = "La página no ofrece una imagen Open Graph específica." })
                continue
            }
            try {
                $candidate = [Uri]::new([Uri]$finalUrl, $candidate).AbsoluteUri
            }
            catch {
                $unmatched.Add([pscustomobject]@{ Title = $game.title; Id = $game.id; Reason = "La imagen Open Graph tiene una URL inválida." })
                continue
            }
            $imageCheck = Test-Image $candidate
            if (-not $imageCheck.Ok) {
                $unmatched.Add([pscustomobject]@{ Title = $game.title; Id = $game.id; Reason = "La imagen Open Graph no responde como imagen HTTP válida." })
                continue
            }

            $doubt = ""
            if (-not $ogTitle) {
                $doubt = "La portada viene de la página del lanzador, pero no se pudo contrastar su título Open Graph."
            }
            elseif ($ogTitle -notmatch [regex]::Escape(([string]$game.title -replace "\s*\([^)]*\)", ""))) {
                $doubt = "El título Open Graph difiere del nombre del catálogo; confirmar que la imagen sea del mismo juego."
            }
            $game.image = $candidate
            $assigned.Add([pscustomobject]@{
                Title = $game.title
                Id = $game.id
                PageTitle = $ogTitle
                PageUrl = $finalUrl
                ImageUrl = $candidate
                ContentType = $imageCheck.ContentType
                Doubt = $doubt
            })
        }
        catch {
            $unmatched.Add([pscustomobject]@{ Title = $game.title; Id = $game.id; Reason = "Error al consultar la página o validar su imagen: $($_.Exception.Message)" })
        }
        finally {
            if ($response) { $response.Dispose() }
        }
    }
    if ($start + $batchSize -lt $targets.Count) { Start-Sleep -Milliseconds 250 }
    if (([Math]::Min($start + $batchSize, $targets.Count)) % 40 -eq 0) {
        Write-Output ("Páginas examinadas: {0}/{1}" -f [Math]::Min($start + $batchSize, $targets.Count), $targets.Count)
    }
}

if ($assigned.Count -gt 0) {
    $serialized = ConvertTo-Json -InputObject $document -Depth 100
    $serialized += "`n"
    $null = $serialized | ConvertFrom-Json
    $temporary = $catalogPath + ".tmp"
    [IO.File]::WriteAllText($temporary, $serialized, [System.Text.UTF8Encoding]::new($false))
    Move-Item -LiteralPath $temporary -Destination $catalogPath -Force
}

$stillUnsplash = @($games | Where-Object { $_.image -like "*images.unsplash.com*" })
$report = [System.Collections.Generic.List[string]]::new()
$report.Add("# Portadas obtenidas de las páginas de juegos")
$report.Add("")
$report.Add("- Juegos procesados en esta pasada: $($targets.Count)")
$report.Add("- Imágenes Open Graph válidas asignadas: $($assigned.Count)")
$report.Add("- Sin imagen candidata verificable: $($unmatched.Count)")
$report.Add("- Unsplash restante en catálogo: $($stillUnsplash.Count)")
$report.Add("")
$report.Add("## Dudas")
$report.Add("")
$doubts = @($assigned | Where-Object { $_.Doubt })
if ($doubts.Count -eq 0) { $report.Add("- Ninguna.") }
else {
    foreach ($item in $doubts) {
        $report.Add(("- **{0}**: {1} Título de página: {2}." -f $item.Title, $item.Doubt, $item.PageTitle))
    }
}
$report.Add("")
$report.Add("## Imágenes asignadas")
$report.Add("")
foreach ($item in $assigned) {
    $report.Add(("- **{0}**: [imagen]({1}); obtenida de [{2}]({3})." -f $item.Title, $item.ImageUrl, $item.PageTitle, $item.PageUrl))
}
$report.Add("")
$report.Add("## Sin candidata verificable")
$report.Add("")
foreach ($item in $unmatched) { $report.Add(("- **{0}** (`{1}`): {2}" -f $item.Title, $item.Id, $item.Reason)) }
[IO.File]::WriteAllLines($reportPath, $report, [System.Text.UTF8Encoding]::new($false))
$client.Dispose()
$handler.Dispose()
Write-Output ("Open Graph: {0} asignadas; {1} pendientes; {2} aún Unsplash." -f $assigned.Count, $unmatched.Count, $stillUnsplash.Count)
