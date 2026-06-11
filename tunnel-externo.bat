@echo off
chcp 65001 >nul
cd /d "%~dp0"
title IVANAPAM — Acesso pela Internet
echo.
echo  Certifica-te que o servidor esta a correr (iniciar.bat noutra janela).
echo  A criar tunel publico para a porta 8080...
echo  Copia o link .loca.lt e partilha com quem quiseres.
echo.
where npx >nul 2>&1
if errorlevel 1 (
  echo  Node.js/npx nao encontrado. Instala Node.js ou usa deploy-vercel.bat
  pause
  exit /b 1
)
npx --yes localtunnel --port 8080
pause
