@echo off
chcp 65001 >nul
:: Permite acesso na rede local (porta 8080). Requer executar como Administrador.
cd /d "%~dp0"
net session >nul 2>&1
if errorlevel 1 (
  echo.
  echo  Clique com o botao direito neste ficheiro e escolha
  echo  "Executar como administrador".
  echo.
  pause
  exit /b 1
)
netsh advfirewall firewall delete rule name="IVANAPAM Solutions 8080" >nul 2>&1
netsh advfirewall firewall add rule name="IVANAPAM Solutions 8080" dir=in action=allow protocol=TCP localport=8080
echo.
echo  Regra de firewall criada: porta 8080 aberta para a rede local.
echo  Agora outros dispositivos na mesma Wi-Fi podem aceder ao site.
echo.
pause
