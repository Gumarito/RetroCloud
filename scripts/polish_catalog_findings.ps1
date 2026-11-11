$raw = Get-Content -Raw -Encoding UTF8 "games.json"
$games = ConvertFrom-Json $raw

foreach ($g in $games) {
    if ($g.id -eq "flappy-bird" -or $g.id -eq "2048") {
        if (-not ($g | Get-Member -Name "collection")) {
            $g | Add-Member -MemberType NoteProperty -Name "collection" -Value "indie"
        } else {
            $g.collection = "indie"
        }
    }
    # Arreglar http a https en dominios seguros conocidos
    if ($g.url -like "http://moon-zombies.pages.dev*") {
        $g.url = $g.url -replace "http://", "https://"
    }
    if ($g.url -like "http://xproger.info*") {
        $g.url = $g.url -replace "http://", "https://"
    }
}

$json = $games | ConvertTo-Json -Depth 10
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText("games.json", $json, $utf8NoBom)
Write-Output "games.json pulido con los hallazgos de catalog-auditor."
