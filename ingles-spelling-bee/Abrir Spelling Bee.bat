@echo off
REM Lanzador del Spelling Bee servido por http://localhost
REM Asi Chrome recuerda el permiso del microfono para siempre
cd /d "%~dp0"
echo.
echo  ================================================
echo   SPELLING BEE - Servidor local iniciado
echo  ================================================
echo.
echo   Abriendo en el navegador...
echo   Mantenga esta ventana abierta mientras juega.
echo   Para cerrar, pulse Ctrl+C o cierre esta ventana.
echo.
start http://localhost:8765/spelling_bee.html
python -m http.server 8765 2>nul
if errorlevel 1 (
  echo.
  echo Python no encontrado. Probando con py...
  start http://localhost:8765/spelling_bee.html
  py -m http.server 8765
)
pause
