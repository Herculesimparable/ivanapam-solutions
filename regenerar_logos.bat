@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Regenerando logos dos parceiros...
py scripts\process_gelsadas_logo.py
py scripts\process_global_logo.py
py scripts\process_chimbungos_logo.py
echo.
echo Logos prontos. Abre iniciar.bat para ver o site.
pause
