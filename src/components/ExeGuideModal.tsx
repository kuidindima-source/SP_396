import React, { useState } from 'react';
import { X, Terminal, Check, Copy, FileCode, ShieldCheck, Cpu } from 'lucide-react';

interface ExeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExeGuideModal: React.FC<ExeGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedScript, setCopiedScript] = useState(false);

  if (!isOpen) return null;

  const buildBatContent = `@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Build Single-File EXE - SP 396

echo ========================================================
echo   Building Standalone Application (Single-File Release)
echo   SP 396 Curve Radius Calculator
echo ========================================================
echo.

rem Check .NET SDK existence
dotnet --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] .NET SDK was not found on this system!
    echo Please download and install .NET 8 SDK from:
    echo https://dotnet.microsoft.com/download/dotnet/8.0
    echo.
    pause
    exit /b 1
)

rem Close previous running instance if opened
taskkill /f /im CalculatorApp.exe 2>nul

rem Recreate dist folder
if exist "dist" rd /s /q "dist"
mkdir "dist"

echo [*] Compiling and packaging all runtime dependencies into one file...
echo [*] Please wait a few moments...

dotnet publish "CalculatorApp.csproj" -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true -p:IncludeNativeLibrariesForSelfExtract=true -p:EnableCompressionInSingleFile=false -o "dist"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Build failed! Check the output above.
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================================
echo [SUCCESS] Build completed successfully!
echo Executable file is located at:
echo "%~dp0dist\\CalculatorApp.exe"
echo.
echo You can copy this single .exe file to any Windows 10/11 PC.
echo ========================================================
echo.
pause`;

  const copyBat = () => {
    navigator.clipboard.writeText(buildBatContent);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#2D2D2D] text-slate-800 dark:text-slate-100 rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 dark:border-neutral-700">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-neutral-700">
          <div className="flex items-center gap-2">
            <Cpu className="text-sky-500" size={20} />
            <div>
              <h3 className="font-semibold text-lg">Сборка автономного .EXE файла</h3>
              <p className="text-xs text-slate-500 dark:text-neutral-400">
                По инструкции README_EXE.md (.NET 8 WinForms Self-Contained)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4 text-sm">
          {/* Свойства сборки */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 dark:bg-neutral-800/80 rounded-xl border border-slate-200 dark:border-neutral-700 flex items-center gap-2">
              <ShieldCheck className="text-emerald-500 shrink-0" size={20} />
              <div>
                <div className="text-xs font-semibold">Без админ-прав</div>
                <div className="text-[11px] text-slate-400">Запуск на чистой Win 10/11</div>
              </div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-neutral-800/80 rounded-xl border border-slate-200 dark:border-neutral-700 flex items-center gap-2">
              <FileCode className="text-sky-500 shrink-0" size={20} />
              <div>
                <div className="text-xs font-semibold">Single-File Release</div>
                <div className="text-[11px] text-slate-400">Все DLL внутри .exe</div>
              </div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-neutral-800/80 rounded-xl border border-slate-200 dark:border-neutral-700 flex items-center gap-2">
              <Terminal className="text-amber-500 shrink-0" size={20} />
              <div>
                <div className="text-xs font-semibold">Скрипт build.bat</div>
                <div className="text-[11px] text-slate-400">Сборка в 1 клик</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200">
              Где находятся исходники в проекте:
            </h4>
            <p className="text-xs text-slate-600 dark:text-neutral-400">
              В корне проекта подготовлена папка <code className="font-mono bg-slate-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-sky-600">/csharp/</code> со всеми готовыми файлами для компиляции:
            </p>
            <ul className="list-disc list-inside text-xs space-y-1 text-slate-600 dark:text-neutral-400">
              <li><code className="font-mono">CalculatorApp.csproj</code> — конфигурация Single-File для .NET 8 WinForms.</li>
              <li><code className="font-mono">Program.cs</code> — точка входа с безопасным перехватом сбоев в <code className="font-mono">crash.log</code>.</li>
              <li><code className="font-mono">MainForm.cs</code> — полнофункциональное окно с вводом скорости, уклона, расчетом по СП 396, таблицей Ж.1 и экспортом в Excel (ClosedXML) и Word.</li>
              <li><code className="font-mono">build.bat</code> — готовый командный файл сборщика.</li>
              <li><code className="font-mono">README_EXE.md</code> — подробное руководство.</li>
            </ul>
          </div>

          {/* Содержимое build.bat */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Командный файл сборки (csharp/build.bat):
              </span>
              <button
                type="button"
                onClick={copyBat}
                className="flex items-center gap-1 text-xs text-sky-600 dark:text-sky-400 hover:underline"
              >
                {copiedScript ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedScript ? 'Скопировано' : 'Копировать скрипт'}</span>
              </button>
            </div>
            <pre className="p-3 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800">
              {buildBatContent}
            </pre>
          </div>

          <div className="p-3.5 bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 rounded-xl text-xs text-sky-800 dark:text-sky-200">
            <strong>Инструкция запуска на вашем компьютере:</strong>
            <ol className="list-decimal list-inside space-y-1 mt-1">
              <li>Скачайте файлы из папки <code className="font-mono">csharp</code> на рабочий стол или диск.</li>
              <li>Убедитесь, что установлен .NET 8 SDK (достаточно один раз скачать с сайта Microsoft).</li>
              <li>Дважды кликните по <code className="font-mono">build.bat</code>.</li>
              <li>В появившейся папке <code className="font-mono">dist\</code> будет лежать автономный <code className="font-mono font-bold">CalculatorApp.exe</code> (~50 МБ), готовый для работы на любых ПК.</li>
            </ol>
          </div>
        </div>

        <div className="px-6 py-3 bg-slate-50 dark:bg-neutral-800/50 border-t border-slate-100 dark:border-neutral-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium bg-slate-200 hover:bg-slate-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded-lg transition"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
