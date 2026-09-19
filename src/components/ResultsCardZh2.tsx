import React, { useState } from 'react';
import { CalculationZh2Result } from '../types';
import { MathView } from './MathView';
import {
  AlertCircle,
  Copy,
  Check,
  FileDown,
  Calculator,
  Compass,
} from 'lucide-react';

interface ResultsCardZh2Props {
  result: CalculationZh2Result;
}

export const ResultsCardZh2: React.FC<ResultsCardZh2Props> = ({ result }) => {
  const [copied, setCopied] = useState(false);

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
          {result.errorMessage || 'Некорректные параметры: проверьте введенные значения'}
        </p>
      </div>
    );
  }

  const {
    speed,
    vCubed,
    radius,
    iPermissible,
    iCategoryLabel,
    denominator,
    lengthRounded,
    lengthRecommended,
  } = result;

  const copyReport = () => {
    const report = `ОТЧЕТ ПО РАСЧЕТУ НАИМЕНЬШЕЙ ДЛИНЫ ПЕРЕХОДНОЙ КРИВОЙ
Нормативный документ: СП 396.1325800.2018 (Приложение Ж, п. Ж.2, формула Ж.2)
============================================================
1. Исходные параметры:
- Расчетная скорость V_расч: ${speed} км/ч
- Радиус кривой в плане R: ${radius} м
- Допустимое нарастание центробежного ускорения I_доп: ${iPermissible} м/с³
  (${iCategoryLabel})

2. Расчетная формула (Ж.2):
L >= V_расч³ / (47 * R * I_доп)

3. Подстановка значений:
L >= ${speed}³ / (47 * ${radius} * ${iPermissible})
L >= ${vCubed} / ${denominator}
L >= ${lengthRounded} м

4. Результат:
Точная минимальная длина переходной кривой L_min = ${lengthRounded} м
Рекомендуемая строительная длина (с округлением) = ${lengthRecommended} м
============================================================
Сформировано в расчетной программе СП 396`;

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportToWord = () => {
    const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>Расчет наименьшей длины переходной кривой</title>
    <style>
      body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11pt; color: #1e293b; line-height: 1.5; }
      h2 { color: #0078d4; border-bottom: 2px solid #0078d4; padding-bottom: 6px; }
      h3 { color: #334155; margin-top: 20px; }
      table { border-collapse: collapse; width: 100%; margin: 12px 0; }
      th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
      th { background-color: #f1f5f9; }
      .formula { background: #f8fafc; border-left: 4px solid #0078d4; padding: 10px; font-family: 'Consolas', monospace; font-size: 12pt; margin: 10px 0; }
      .result-box { background: #f0fdf4; border: 2px solid #22c55e; padding: 14px; margin-top: 15px; border-radius: 6px; }
    </style>
    </head>
    <body>
      <h2>Расчет наименьшей длины переходных кривых</h2>
      <p><b>Нормативное основание:</b> СП 396.1325800.2018 «Улицы и дороги населенных пунктов», Приложение Ж, п. Ж.2, формула (Ж.2).</p>
      
      <h3>1. Исходные данные</h3>
      <table>
        <tr><th>Параметр</th><th>Обозначение</th><th>Значение</th></tr>
        <tr><td>Расчетная скорость движения</td><td>V<sub>расч</sub></td><td><b>${speed} км/ч</b></td></tr>
        <tr><td>Радиус кривой в плане</td><td>R</td><td><b>${radius} м</b></td></tr>
        <tr><td>Допустимая скорость нарастания ускорения</td><td>I<sub>доп</sub></td><td><b>${iPermissible} м/с³</b></td></tr>
        <tr><td>Категория улично-дорожной сети</td><td>—</td><td>${iCategoryLabel}</td></tr>
      </table>

      <h3>2. Расчетная формула Ж.2</h3>
      <div class="formula">L &ge; V<sub>расч</sub><sup>3</sup> / (47 &middot; R &middot; I<sub>доп</sub>)</div>

      <h3>3. Подстановка параметров и вычисление</h3>
      <p>1) Подстановка параметров в формулу:</p>
      <div class="formula">L &ge; ${speed}<sup>3</sup> / (47 &middot; ${radius} &middot; ${iPermissible})</div>
      <p>2) Вычисление числителя и знаменателя:</p>
      <div class="formula">L &ge; ${vCubed} / ${denominator} = <b>${lengthRounded} м</b></div>

      <div class="result-box">
        <h3 style="margin: 0 0 6px 0; color: #15803d;">Итоговые результаты:</h3>
        <p style="margin: 4px 0;">Наименьшая расчетная длина переходной кривой L: <b>${lengthRounded} м</b></p>
        <p style="margin: 4px 0;">Рекомендуемая строительная длина L: <b>${lengthRecommended} м</b></p>
      </div>
    </body>
    </html>`;

    const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Расчет_L_переходной_${speed}кмч_R${radius}м.doc`;
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
            СП 396.1325800.2018 (Приложение Ж, п. Ж.2, формула Ж.2)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={copyReport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 rounded-lg transition cursor-pointer"
            title="Скопировать текстовый протокол"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            <span>{copied ? 'Скопировано!' : 'Копировать'}</span>
          </button>

          <button
            type="button"
            onClick={exportToWord}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/50 border border-sky-200 dark:border-sky-800/60 rounded-lg transition cursor-pointer"
            title="Экспортировать отчет в файл Word (.doc)"
          >
            <FileDown size={14} />
            <span>Отчет в Word</span>
          </button>
        </div>
      </div>

      {/* Блок 1: Исходные данные */}
      <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-neutral-800/50 border border-slate-200/80 dark:border-neutral-700/70 space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center text-[11px] font-mono font-bold">
              1
            </span>
            <span>Принятые исходные значения</span>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 font-mono">
            I<sub>доп</sub> = {iPermissible === 0.8 ? '0,8' : '1,0'} м/с³
          </span>
        </div>

        <div className="text-xs text-slate-600 dark:text-neutral-300 flex flex-wrap gap-x-6 gap-y-1">
          <div>
            Скорость: <strong className="text-slate-800 dark:text-white font-mono">{speed} км/ч</strong>
          </div>
          <div>
            Радиус кривой: <strong className="text-slate-800 dark:text-white font-mono">{radius} м</strong>
          </div>
          <div>
            Ускорение: <strong className="text-slate-800 dark:text-white font-mono">{iPermissible} м/с³</strong>
          </div>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-neutral-400 leading-snug">
          {iCategoryLabel}
        </p>
      </div>

      {/* Блок 2: Формула Ж.2 и пошаговый расчет */}
      <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-neutral-800/50 border border-slate-200/80 dark:border-neutral-700/70 space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300 flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[11px] font-mono font-bold">
            2
          </span>
          <span>Расчет наименьшей длины переходной кривой (Формула Ж.2)</span>
        </div>

        {/* Все этапы развернутого расчета в одном компактном поле */}
        <div className="bg-white dark:bg-[#252525] px-3 py-2 rounded-lg border border-slate-200 dark:border-neutral-700 text-center flex justify-center">
          <MathView
            math={`L \\ge \\frac{V_{расч}^3}{47 \\cdot R \\cdot I_{доп}} = \\frac{${speed}^3}{47 \\cdot ${radius} \\cdot ${iPermissible}} = \\frac{${vCubed}}{${denominator}} = ${lengthRounded}\\text{ м}`}
            block
            className="overflow-visible"
          />
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-neutral-400 pt-0.5">
          <span><strong>47</strong> — эмпирический размерный коэффициент формулы</span>
          <span><strong>V<sub>расч</sub>³</strong> = {vCubed}</span>
          <span><strong>47 &middot; R &middot; I<sub>доп</sub></strong> = {denominator}</span>
        </div>
      </div>

      {/* Блок 3: Итоговый результат */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-sky-50 to-emerald-50 dark:from-sky-950/30 dark:to-emerald-950/30 border border-sky-200/80 dark:border-sky-800/60">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
          <div className="bg-white dark:bg-[#202020] p-3.5 rounded-xl border border-sky-100 dark:border-neutral-700 text-center shadow-xs">
            <div className="text-xs text-slate-500 dark:text-neutral-400 font-medium">
              Минимальная расчетная длина L:
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0078D4] dark:text-sky-400 my-0.5 font-mono tracking-tight">
              {lengthRounded} <span className="text-base font-bold">м</span>
            </div>
            <div className="text-[11px] text-slate-400">Точный расчет по формуле Ж.2</div>
          </div>

          <div className="bg-white dark:bg-[#202020] p-3.5 rounded-xl border border-emerald-200 dark:border-neutral-700 text-center shadow-xs">
            <div className="text-xs text-slate-500 dark:text-neutral-400 font-medium">
              Рекомендуемая строительная длина L:
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 my-0.5 font-mono tracking-tight">
              {lengthRecommended} <span className="text-base font-bold">м</span>
            </div>
            <div className="text-[11px] text-slate-400">Округление в большую сторону (кратно 5 м)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
