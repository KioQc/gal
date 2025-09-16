@echo off
echo === Lancement de la Galerie Yiff ===

REM Aller dans le dossier backend et démarrer le serveur
cd /d "%~dp0backend"
start cmd /k "npm start"

REM Attendre un peu que le serveur démarre
timeout /t 3 >nul

REM Ouvrir la page frontend
cd /d "%~dp0frontend"
start "" "index.html"

echo === Tout est prêt ! ===
