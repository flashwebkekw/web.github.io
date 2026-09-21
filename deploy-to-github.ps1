param(
    [string]$RepoUrl
)

$gitExe = "C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\Common7\IDE\CommonExtensions\Microsoft\TeamFoundation\Team Explorer\Git\cmd\git.exe"

if (-not (Test-Path $gitExe)) {
    Write-Error "git.exe not found at $gitExe"
    exit 1
}

if (-not $RepoUrl) {
    $RepoUrl = Read-Host "Zadejte URL vaseho GitHub repozitare (napr. https://github.com/uzivatel/wage.git)"
}

if (-not $RepoUrl) {
    Write-Warning "Nebylo zadano zadne URL."
    exit 1
}

Write-Host "Nastavuji vzdaleny repozitar na $RepoUrl ..."
$currentRemote = & $gitExe remote get-url origin 2>$null
if ($currentRemote) {
    & $gitExe remote set-url origin $RepoUrl
} else {
    & $gitExe remote add origin $RepoUrl
}

Write-Host "Nahravam soubory do vetve main na GitHub..."
& $gitExe push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nUSPESNE NAHRANO!" -ForegroundColor Green
    Write-Host "Nyni jen bezte do nastaveni repozitare na GitHubu:"
    Write-Host "1. Settings -> Pages"
    Write-Host "2. V sekci 'Build and deployment' zvolte 'Deploy from a branch'"
    Write-Host "3. Branch: 'main', Folder: '/docs'"
    Write-Host "4. Kliknete na 'Save'."
    Write-Host "Vas web bude bezet na GitHub Pages!`n" -ForegroundColor Green
} else {
    Write-Error "Chyba pri nahravani. Zkontrolujte prihlaseni k uctu nebo prava k repozitari."
}
