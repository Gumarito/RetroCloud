$raw = Get-Content -Raw -Encoding UTF8 "games.json"
$games = ConvertFrom-Json $raw

$sitemap = @"
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://gumarito.github.io/RetroCloud/</loc>
    <lastmod>$((Get-Date).ToString("yyyy-MM-dd"))</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
"@

foreach ($g in $games) {
    $gameId = [System.Security.SecurityElement]::Escape($g.id)
    $sitemap += @"

  <url>
    <loc>https://gumarito.github.io/RetroCloud/#game-$gameId</loc>
    <lastmod>$((Get-Date).ToString("yyyy-MM-dd"))</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
"@
}

$sitemap += "`n</urlset>"

$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText("sitemap.xml", $sitemap, $utf8NoBom)
Write-Output "sitemap.xml generado con $($games.Count) URLs de juegos."
