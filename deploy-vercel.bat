@echo off
chcp 65001 >nul
cd /d "%~dp0"
title IVANAPAM — Deploy Vercel
echo.
echo  Deploy para Vercel (acesso de qualquer rede / internet)
echo  URL esperada apos o primeiro deploy: https://ivanapam-solutions.vercel.app
echo.
where npx >nul 2>&1
if errorlevel 1 (
  echo  Node.js/npx nao encontrado. Instala Node.js.
  pause
  exit /b 1
)
call npx vercel --prod
echo.
pause
