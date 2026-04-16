@echo off
:: Navigate to the folder where install.bat lives
cd /d "%~dp0"

echo ================================================
echo            BirdBox - Installation
echo ================================================
echo.


:: Check for admin privileges
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: Please run this script as Administrator
    echo Right-click install.bat and select "Run as administrator"
    pause
    exit /b 1
)

:: ================================================
:: CHECK / INSTALL NODE.JS
:: ================================================
echo [1/5] Checking Node.js...
node --version >nul 2>&1
if %errorLevel% neq 0 (
    echo Node.js not found. Downloading...
    curl -o node_installer.msi "https://nodejs.org/dist/v22.12.0/node-v22.12.0-x64.msi"
    echo Installing Node.js - this may take a minute...
    msiexec /i node_installer.msi /quiet /norestart
    del node_installer.msi
    echo Node.js installed.
    echo Please restart this script after installation completes.
    pause
    exit /b 0
) else (
    echo Node.js already installed.
)

:: ================================================
:: CHECK / INSTALL PYTHON
:: ================================================
echo.
echo [2/5] Checking Python...
python --version >nul 2>&1
if %errorLevel% neq 0 (
    echo Python not found. Downloading...
    curl -o python_installer.exe "https://www.python.org/ftp/python/3.11.9/python-3.11.9-amd64.exe"
    echo Installing Python - this may take a minute...
    python_installer.exe /quiet InstallAllUsers=1 PrependPath=1 Include_test=0
    del python_installer.exe
    echo Python installed.
    echo Please restart this script after installation completes.
    pause
    exit /b 0
) else (
    echo Python already installed.
)

:: ================================================
:: INSTALL NODE DEPENDENCIES
:: ================================================
echo.
echo [3/5] Installing Node packages...
call npm install
if %errorLevel% neq 0 (
    echo ERROR: npm install failed. Check your internet connection and try again.
    pause
    exit /b 1
)
echo Node packages installed.

:: ================================================
:: INSTALL PYTHON DEPENDENCIES
:: ================================================
echo.
echo [4/5] Installing Python packages...
if exist "ml\requirements.txt" (
    pip install -r ml\requirements.txt
    if %errorLevel% neq 0 (
        echo ERROR: pip install failed. Check your internet connection and try again.
        pause
        exit /b 1
    )
    echo Python packages installed.
) else (
    echo No requirements.txt found, skipping.
)

:: ================================================
:: BUILD APP
:: ================================================
echo.
echo [5/5] Building app...
call npm run build
if %errorLevel% neq 0 (
    echo ERROR: Build failed.
    pause
    exit /b 1
)
echo Build complete.

:: ================================================
:: CREATE LAUNCH SCRIPT
:: ================================================
echo Creating launch script...

echo @echo off > launch.bat
echo title BirdBox >> launch.bat
echo echo Starting BirdBox, please wait... >> launch.bat
echo start /min cmd /c "npm start" >> launch.bat
echo timeout /t 5 /nobreak ^>nul >> launch.bat
echo start "" "node_modules\.bin\electron" . >> launch.bat

echo.
echo ================================================
echo         Installation Complete!
echo ================================================
echo.
echo To start BirdBox, double-click launch.bat
echo.
pause