@echo off
setlocal
cd /d "%~dp0"

echo ========================================================
echo   SP 396 - Build Standalone EXE (WebView2)
echo ========================================================
echo.

echo [*] Current directory: %cd%
echo.

rem Step 1: Check .NET SDK
where dotnet >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] .NET SDK is not installed or not in PATH!
    echo Download and install .NET 8 SDK:
    echo https://dotnet.microsoft.com/download/dotnet/8.0
    echo.
    goto :fail
)

echo [*] .NET SDK found:
dotnet --version
echo.

rem Step 2: Build Frontend (if npm is available)
where npm >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [*] Node.js/npm found. Building frontend web interface...
    pushd ".."
    call npm run build
    popd
    if %ERRORLEVEL% NEQ 0 (
        echo [WARNING] npm run build returned an error. Proceeding with existing dist files...
    )
) else (
    echo [INFO] npm not found in PATH. Using pre-built dist/wwwroot files.
)
echo.

rem Step 3: Stop old process if running and clear WebView2 cache
taskkill /f /im CalculatorApp.exe 2>nul
if exist "%LOCALAPPDATA%\CalculatorApp_WebView2" rd /s /q "%LOCALAPPDATA%\CalculatorApp_WebView2" 2>nul

rem Step 4: Synchronize latest wwwroot from root dist
if exist "..\dist" (
    echo [*] Cleaning and syncing latest interface from ..\dist to wwwroot...
    if exist "wwwroot" rd /s /q "wwwroot" 2>nul
    mkdir "wwwroot"
    xcopy /E /I /Y "..\dist\*" "wwwroot\" >nul
)

if not exist "wwwroot\index.html" (
    echo [ERROR] wwwroot\index.html not found!
    echo Please run 'npm run build' in the project root folder first.
    goto :fail
)

rem Step 5: Clean old build cache and dist folder
if exist "bin" rd /s /q "bin" 2>nul
if exist "obj" rd /s /q "obj" 2>nul
if exist "dist" rd /s /q "dist" 2>nul
mkdir "dist"

rem Step 6: Publish self-contained EXE
echo [*] Publishing self-contained EXE...
echo [*] Please wait 15-30 seconds...
echo.

dotnet publish "CalculatorApp.csproj" -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true -p:IncludeNativeLibrariesForSelfExtract=true -p:EnableCompressionInSingleFile=false -o "dist"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] dotnet publish failed with error code %ERRORLEVEL%!
    goto :fail
)

rem Step 7: Copy fresh wwwroot to output dist
if exist "dist\wwwroot" rd /s /q "dist\wwwroot" 2>nul
if exist "wwwroot" (
    xcopy /E /I /Y "wwwroot" "dist\wwwroot\" >nul
)

echo.
echo ========================================================
echo [SUCCESS] Build finished successfully!
echo Executable: "%~dp0dist\CalculatorApp.exe"
echo Interface:  "%~dp0dist\wwwroot\"
echo ========================================================
echo.
pause
exit /b 0

:fail
echo.
echo ========================================================
echo [STOP] An error occurred during execution.
echo Read the message above before closing this window.
echo ========================================================
echo.
pause
exit /b 1
