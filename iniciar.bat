@echo off
chcp 65001 >nul
cd /d "%~dp0"
title IVANAPAM Solutions — Servidor
echo.
echo  IVANAPAM Solutions
echo  ==================
echo.
echo  A iniciar servidor (rede local + este PC)...
echo  Telefone/tablet na mesma Wi-Fi: veja o IP na janela do servidor.
echo  Ficheiro com URLs: ultimas-urls.txt
echo.

where py >nul 2>&1
if errorlevel 1 (
  echo  Python nao encontrado. Instale Python e marque "Add to PATH".
  pause
  exit /b 1
)

start "" "http://localhost:8080/?fresh=1"
py scripts\serve.py
