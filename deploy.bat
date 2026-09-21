@echo off
chcp 65001 >nul
echo ===================================================
echo   Nahravani webu na GitHub (flashwebkekw/web.github.io)
echo ===================================================
echo.
set "GIT_EXE=C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\Common7\IDE\CommonExtensions\Microsoft\TeamFoundation\Team Explorer\Git\cmd\git.exe"

"%GIT_EXE%" push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===================================================
    echo   USPESNE NAHRANO NA GITHUB!
    echo ===================================================
    echo.
    echo Nyni na GitHubu (https://github.com/flashwebkekw/web.github.io):
    echo 1. Otevřete Settings -^> Pages
    echo 2. Source: 'Deploy from a branch'
    echo 3. Branch: 'main', Folder: '/docs'
    echo 4. Kliknete na 'Save'.
    echo.
) else (
    echo.
    echo Nastala chyba pri nahravani. Zkontrolujte prihlaseni k GitHubu.
)
pause
