@echo off
cd /d "%~dp0"
echo Regenerando fotos IVANAPAM (apenas imagens geradas)...
py scripts\process_images.py
py scripts\fetch_partner_logos.py
echo.
echo Listo. Abre iniciar.bat para ver o site em http://localhost:8080
pause
