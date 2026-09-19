import React, { useState } from 'react';
import { CalculationResult } from '../types';
import { MathView } from './MathView';
import {
  AlertCircle,
  Copy,
  Check,
  FileDown,
  Info,
  Layers,
  ChevronRight,
  Calculator,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface ResultsCardProps {
  result: CalculationResult;
}

export const ResultsCard: React.FC<ResultsCardProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  // Ошибка: знаменатель <= 0
  if (!result.isValid || result.errorMessage) {
    return (
      <div className="bg-white dark:bg-[#2D2D2D] rounded-xl p-6 shadow-md border border-rose-200 dark:border-rose-900/60 transition-all flex flex-col justify-center items-center text-center min-h-[460px]">
        <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-500 mb-4 border border-rose-200 dark:border-rose-800">
          <AlertCircle size={36} />
        </div>
        <h3 className="text-xl font-bold text-rose-600 dark:text-rose-400 mb-2">
          Ошибка расчета параметров
        </h3>
        <p className="text-base text-slate-700 dark:text-slate-200 max-w-md font-medium mb-3">
          {result.errorMessage || 'Некорректные параметры: уклон слишком велик для данной скорости'}
        </p>
        <div className="p-4 bg-slate-50 dark:bg-neutral-800/80 rounded-xl max-w-md w-full text-left text-xs text-slate-600 dark:text-neutral-400 border border-slate-200 dark:border-neutral-700 space-y-2">
          <div className="font-semibold text-slate-800 dark:text-slate-200">Физическая причина:</div>
          <p>
            Знаменатель расчетной формулы $127 \cdot (\mu \mp i_п)$ обращается в ноль или становится отрицательным:
          </p>
          <div className="font-mono bg-white dark:bg-neutral-900 p-2 rounded border border-slate-200 dark:border-neutral-700">
            {result.mu} {result.slopeSign === 1 ? '+' : '−'} {result.slopeFraction} = {result.innerParenthesis} &le; 0
          </div>
          <p className="text-slate-500">
            Уменьшите величину уклона от центра кривой или увеличьте расчетную скорость, чтобы значение $\mu$ превышало уклон.
          </p>
        </div>
      </div>
    );
  }

  const {
    speed,
    slopeFraction,
    slopeSign,
    mu,
    interpolation,
    vSquared,
    innerParenthesis,
    denominator,
    radiusRounded,
    radiusRecommended,
    warningMessage,
  } = result;

  // Форматирование знака для формулы
  const signSymbol = slopeSign === 1 ? '+' : '-';
  const signLabel = slopeSign === 1 ? 'Вираж (к центру)' : 'Обратный уклон (от центра)';

  const copyReport = () => {
    const report = `ОТЧЕТ ПО РАСЧЕТУ МИНИМАЛЬНОГО РАДИУСА КРИВОЙ В ПЛАНЕ
Нормативный документ: СП 396.1325800.2018 (Приложение Ж, п. Ж.1)
============================================================
1. Исходные параметры:
- Расчетная скорость V_расч: ${speed} км/ч
- Поперечный уклон i_п: ${result.slopePermille} ‰ (${slopeFraction} в долях)
- Направление уклона: ${signLabel}

2. Определение коэффициента поперечной силы μ (табл. Ж.1):
${interpolation.explanation}
Коэффициент μ = ${mu}

3. Расчетная формула:
R_min = V_расч² / [127 * (μ ∓ i_п)]

4. Подстановка значений:
R_min = ${speed}² / [127 * (${mu} ${signSymbol} ${slopeFraction})]
R_min = ${vSquared} / [127 * ${innerParenthesis}]
R_min = ${vSquared} / ${denominator}

5. Результат:
Минимальный расчетный радиус R_min = ${radiusRounded} м
Рекомендуемый нормативный радиус (округленный) = ${radiusRecommended} м
============================================================
Сформировано в расчетной программе СП 396`;

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportToWord = () => {
    const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>Расчет радиуса кривой в плане</title>
    <style>
      body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11pt; color: #1e293b; line-height: 1.5; }
      h2 { color: #0078d4; border-bottom: 2px solid #0078d4; padding-bottom: 6px; }
      h3 { color: #334155; margin-top: 20px; }
      table { border-collapse: collapse; width: 100%; margin: 12px 0; }
      th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
      th { background-color: #f1f5f9; }
      .formula { background: #f8fafc; border-left: 4px solid #0078d4; padding: 10px; font-family: 'Consolas', monospace; font-size: 12pt; margin: 10px 0; }
      .result-box { background: #f0fdf4; border: 2px solid #22c55e; padding: 14px; margin-top: 15px; border-radius: 6px; }
      .highlight { font-weight: bold; color: #0078d4; }
    </style>
    </head>
    <body>
      <h2>Расчет минимального радиуса кривой в плане</h2>
      <p><b>Нормативное основание:</b> СП 396.1325800.2018 «Улицы и дороги населенных пунктов», Приложение Ж, п. Ж.1.</p>
      
      <h3>1. Исходные данные</h3>
      <table>
        <tr><th>Параметр</th><th>Обозначение</th><th>Значение</th></tr>
        <tr><td>Расчетная скорость движения</td><td>V<sub>расч</sub></td><td><b>${speed} км/ч</b></td></tr>
        <tr><td>Величина поперечного уклона</td><td>i<sub>п</sub></td><td><b>${result.slopePermille} ‰</b> (${slopeFraction} в долях)</td></tr>
        <tr><td>Направление уклона</td><td>—</td><td>${signLabel}</td></tr>
      </table>

      <h3>2. Определение коэффициента поперечной силы &mu;</h3>
      <p>По таблице Ж.1 СП 396: <i>${interpolation.explanation}</i></p>
      <div class="formula">&mu; = ${mu}</div>

      <h3>3. Расчетная формула</h3>
      <div class="formula">R<sub>min</sub> = V<sub>расч</sub><sup>2</sup> / [127 &middot; (&mu; &plusmn; i<sub>п</sub>)]</div>

      <h3>4. Пошаговая подстановка чисел</h3>
      <p>1) Подстановка параметров:</p>
      <div class="formula">R<sub>min</sub> = ${speed}<sup>2</sup> / [127 &middot; (${mu} ${signSymbol} ${slopeFraction})]</div>
      <p>2) Вычисление числителя и внутренней скобки:</p>
      <div class="formula">R<sub>min</sub> = ${vSquared} / [127 &middot; ${innerParenthesis}]</div>
      <p>3) Окончательное деление:</p>
      <div class="formula">R<sub>min</sub> = ${vSquared} / ${denominator} = <b>${radiusRounded} м</b></div>

      <div class="result-box">
        <h3 style="margin: 0 0 6px 0; color: #15803d;">Итоговые результаты:</h3>
        <p style="margin: 4px 0;">Точный расчетный минимальный радиус: <b>${radiusRounded} м</b></p>
        <p style="margin: 4px 0;">Рекомендуемый строительный радиус по нормам: <b>${radiusRecommended} м</b></p>
      </div>
    </body>
    </html>`;

    const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Расчет_Rmin_${speed}кмч_${result.slopePermille}промилле.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-[#2D2D2D] rounded-xl p-6 shadow-md border border-slate-100 dark:border-neutral-800 transition-all space-y-4 h-full flex flex-col justify-start">
      {/* Заголовок результатов и кнопки экспорта */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-neutral-700/60">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <Calculator className="text-[#0078D4]" size={22} />
            <span>Математический отчет и прозрачность расчета</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
            СП 396.1325800.2018 (Приложение Ж, п. Ж.1, табл. Ж.1)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={copyReport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 rounded-lg transition"
            title="Скопировать текстовый протокол"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            <span>{copied ? 'Скопировано!' : 'Копировать'}</span>
          </button>

          <button
            type="button"
            onClick={exportToWord}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/50 border border-sky-200 dark:border-sky-800/60 rounded-lg transition"
            title="Экспортировать отчет в файл Word (.doc)"
          >
            <FileDown size={14} />
            <span>Отчет в Word</span>
          </button>
        </div>
      </div>

      {warningMessage && (
        <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/70 rounded-xl text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2">
          <Info size={16} className="shrink-0 text-amber-600 dark:text-amber-400" />
          <span>{warningMessage}</span>
        </div>
      )}

      {/* Блок 1: Исходные данные и интерполяция */}
      <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-neutral-800/50 border border-slate-200/80 dark:border-neutral-700/70 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center text-[11px] font-mono font-bold">
              1
            </span>
            <span>Определение коэффициента поперечной силы &mu; по таблице Ж.1</span>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 font-mono">
            &mu; = {mu}
          </span>
        </div>

        <div className="text-sm text-slate-700 dark:text-neutral-300 font-medium">
          Для расчетной скорости <span className="font-bold text-sky-600 dark:text-sky-400">{speed} км/ч</span> значение коэффициента{' '}
          <span className="font-bold text-amber-600 dark:text-amber-400">&mu; = {mu}</span>{' '}
          {interpolation.isExact
            ? 'принято непосредственно по таблице Ж.1.'
            : 'принято по таблице Ж.1.'}
        </div>
      </div>

      {/* Блок 2: Единый расчет минимального радиуса кривой в плане (Формула Ж.1) */}
      <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-neutral-800/50 border border-slate-200/80 dark:border-neutral-700/70 space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300 flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[11px] font-mono font-bold">
            2
          </span>
          <span>Расчет минимального радиуса кривой в плане (Формула Ж.1)</span>
        </div>

        {/* Все этапы развернутого расчета в одном компактном поле */}
        <div className="bg-white dark:bg-[#252525] px-3 py-2 rounded-lg border border-slate-200 dark:border-neutral-700 text-center overflow-x-auto">
          <MathView
            math={`R = \\frac{V_{расч}^2}{127 \\cdot (\\mu ${signSymbol} i_п)} = \\frac{${speed}^2}{127 \\cdot (${mu} ${signSymbol} ${slopeFraction})} = \\frac{${vSquared}}{${denominator}} = ${radiusRounded}\\text{ м}`}
            block
          />
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-neutral-400 pt-0.5">
          <span><strong>127</strong> — коэффициент размерности</span>
          <span><strong>i_п</strong> = {slopeFraction} ({result.slopePermille} ‰)</span>
          <span><strong>Знак:</strong> {signLabel}</span>
        </div>
      </div>

      {/* Блок 3: Итоговый результат */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-sky-50 to-emerald-50 dark:from-sky-950/30 dark:to-emerald-950/30 border border-sky-200/80 dark:border-sky-800/60">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
          <div className="bg-white dark:bg-[#202020] p-3.5 rounded-xl border border-sky-100 dark:border-neutral-700 text-center shadow-xs">
            <div className="text-xs text-slate-500 dark:text-neutral-400 font-medium">
              Минимальный расчетный радиус:
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0078D4] dark:text-sky-400 my-0.5 font-mono tracking-tight">
              {radiusRounded} <span className="text-base font-bold">м</span>
            </div>
            <div className="text-[11px] text-slate-400">Округление до 2 знаков</div>
          </div>

          <div className="bg-white dark:bg-[#202020] p-3.5 rounded-xl border border-emerald-200 dark:border-neutral-700 text-center shadow-xs">
            <div className="text-xs text-slate-500 dark:text-neutral-400 font-medium">
              Рекомендуемый строительный радиус:
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 my-0.5 font-mono tracking-tight">
              {radiusRecommended} <span className="text-base font-bold">м</span>
            </div>
            <div className="text-[11px] text-slate-400">По СП 396 для рабочей документации</div>
          </div>
        </div>
      </div>
    </div>
  );
};
