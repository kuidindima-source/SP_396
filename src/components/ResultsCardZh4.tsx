import React, { useState } from 'react';
import { Copy, Check, Info, ShieldCheck, AlertTriangle, FileDown } from 'lucide-react';
import { CalculationZh4Result } from '../types';
import { MathView } from './MathView';

interface ResultsCardZh4Props {
  calculation: CalculationZh4Result;
}

export const ResultsCardZh4: React.FC<ResultsCardZh4Props> = ({ calculation }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!calculation.isValid) return;
    const text = [
      `ОТЧЕТ ПО РАСЧЕТУ МИНИМАЛЬНОЙ ДЛИНЫ УЧАСТКА ОТГОНА ВИРАЖА`,
      `Нормативный документ: СП 396.1325800.2018 (Приложение Ж, п. Ж.4, формула Ж.4, п. 7.6.14, п. 7.6.17)`,
      `============================================================`,
      `1. Исходные параметры:`,
      `- Поперечный уклон виража i_в: ${calculation.iVirazh} ‰`,
      `- Поперечный уклон проезжей части i_поп: ${calculation.iPopSigned > 0 ? `+${calculation.iPopValue}` : `-${calculation.iPopValue}`} ‰`,
      `- Дополнительный продольный уклон (величина нарастания) I: ${calculation.iSlopeIncrease} ‰`,
      `- Расстояние от оси вращения до кромки проезжей части B_пч: ${calculation.bCarriageway} м`,
      ``,
      `2. Расчетная формула (Ж.4):`,
      `L = ((i_в - i_поп) / I) · B_пч`,
      ``,
      `3. Подстановка значений и вычисление:`,
      `Разность уклонов: Δi = ${calculation.iVirazh} - (${calculation.iPopSigned}) = ${calculation.numeratorDelta} ‰`,
      `L = (${calculation.numeratorDelta} / ${calculation.iSlopeIncrease}) · ${calculation.bCarriageway} = ${calculation.lengthRounded} м`,
      ``,
      `4. Результаты:`,
      `- Минимальная расчетная длина отгона виража: L = ${calculation.lengthRounded} м`,
      `- Рекомендуемая строительная длина отгона L: ${calculation.lengthRecommended} м${calculation.isBelowMinReconstruction ? ' (с учетом мин. 30,0 м при реконструкции по п. 7.6.17)' : ''}`,
      `============================================================`,
      `Сформировано в расчетной программе СП 396`,
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportToWord = () => {
    if (!calculation.isValid) return;

    const signText = calculation.iPopSigned < 0 ? `-${calculation.iPopValue}` : `+${calculation.iPopValue}`;
    const signFormattedPop = calculation.iPopSigned < 0 ? `(-${calculation.iPopValue})` : `${calculation.iPopValue}`;

    const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>Расчет минимальной длины участка отгона виража</title>
    <style>
      body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11pt; color: #1e293b; line-height: 1.5; }
      h2 { color: #0078d4; border-bottom: 2px solid #0078d4; padding-bottom: 6px; }
      h3 { color: #334155; margin-top: 20px; }
      table { border-collapse: collapse; width: 100%; margin: 12px 0; }
      th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
      th { background-color: #f1f5f9; }
      .formula { background: #f8fafc; border-left: 4px solid #0078d4; padding: 10px; font-family: 'Consolas', monospace; font-size: 12pt; margin: 10px 0; }
      .result-box { background: #f0fdf4; border: 2px solid #22c55e; padding: 14px; margin-top: 15px; border-radius: 6px; }
      .warning-box { background: #fffbeb; border: 2px solid #f59e0b; padding: 12px; margin-top: 15px; border-radius: 6px; }
    </style>
    </head>
    <body>
      <h2>Расчет минимальной длины участка отгона виража</h2>
      <p><b>Нормативное основание:</b> СП 396.1325800.2018 «Улицы и дороги населенных пунктов», Приложение Ж, п. Ж.4, формула (Ж.4), п. 7.6.14, п. 7.6.17.</p>
      
      <h3>1. Исходные данные</h3>
      <table>
        <tr><th>Параметр</th><th>Обозначение</th><th>Значение</th></tr>
        <tr><td>Поперечный уклон проезжей части на вираже</td><td>i<sub>в</sub></td><td><b>${calculation.iVirazh} ‰</b></td></tr>
        <tr><td>Поперечный уклон проезжей части при двухскатном профиле</td><td>i<sub>поп</sub></td><td><b>${signText} ‰</b></td></tr>
        <tr><td>Величина нарастания продольного уклона (дополнительный уклон наружной бровки)</td><td>I</td><td><b>${calculation.iSlopeIncrease} ‰</b></td></tr>
        <tr><td>Расстояние от оси вращения до кромки проезжей части</td><td>B<sub>пч</sub></td><td><b>${calculation.bCarriageway} м</b></td></tr>
      </table>

      <h3>2. Расчетная формула Ж.4</h3>
      <div class="formula">L = ((i<sub>в</sub> &minus; i<sub>поп</sub>) / I) &middot; B<sub>пч</sub></div>

      <h3>3. Подстановка параметров и вычисление</h3>
      <p>1) Вычисление разности поперечных уклонов:</p>
      <div class="formula">&Delta;i = i<sub>в</sub> &minus; (${signFormattedPop}) = ${calculation.numeratorDelta} ‰</div>
      <p>2) Определение минимальной длины отгона виража:</p>
      <div class="formula">L = (${calculation.numeratorDelta} / ${calculation.iSlopeIncrease}) &middot; ${calculation.bCarriageway} = <b>${calculation.lengthRounded.toFixed(2)} м</b></div>

      <div class="result-box">
        <h3 style="margin-top:0; color:#15803d;">4. Результаты расчета:</h3>
        <p>Минимальная расчетная длина участка отгона виража: <b>L = ${calculation.lengthRounded.toFixed(2)} м</b></p>
        <p>Рекомендуемая строительная длина участка отгона: <b>L<sub>рек</sub> = ${calculation.lengthRecommended.toFixed(2)} м</b></p>
      </div>

      ${calculation.isBelowMinReconstruction ? `
      <div class="warning-box">
        <p><b>Примечание по п. 7.6.17 СП 396:</b> Расчетная длина L = ${calculation.lengthRounded} м меньше нормативного порога 30,0 м. В условиях реконструкции на всех категориях улиц (кроме магистральной сети) минимальную длину перехода к односкатному профилю допускается принимать не менее <b>30,0 м</b>.</p>
      </div>` : `
      <p style="margin-top:10px; color:#15803d;"><b>Соответствие нормам:</b> Расчетное значение L = ${calculation.lengthRounded} м удовлетворяет условию п. 7.6.17 СП 396 (не менее 30,0 м при реконструкции).</p>`}

      <p style="margin-top: 30px; font-size: 9pt; color: #64748b;">
        Документ сформирован автоматически в расчетной программе СП 396.1325800.2018. Дата: ${new Date().toLocaleDateString('ru-RU')}.
      </p>
    </body>
    </html>`;

    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/msword;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Расчет_отгона_виража_Ж4_L${calculation.lengthRounded}m.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!calculation.isValid) {
    return (
      <div className="h-full bg-white dark:bg-[#202020] rounded-2xl shadow-sm border border-slate-200/80 dark:border-neutral-800 p-6 flex flex-col justify-center items-center text-center">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
          <AlertTriangle size={24} />
        </div>
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">
          Недостаточно данных для расчета
        </h3>
        <p className="text-xs text-slate-500 dark:text-neutral-400 max-w-sm">
          {calculation.errorMessage || 'Заполните параметры: уклон виража i_в, уклон проезжей части i_поп, нарастание уклона I и ширину B_пч.'}
        </p>
      </div>
    );
  }

  // Латекс формулы и подстановки
  const latexGeneral = `L = \\frac{i_{\\text{в}} - i_{\\text{поп}}}{I} \\cdot B_{\\text{пч}}`;
  
  const signFormattedPop = calculation.iPopSigned < 0 
    ? `(-${calculation.iPopValue})`
    : `${calculation.iPopValue}`;

  const latexSubst = `L = \\frac{${calculation.iVirazh} - ${signFormattedPop}}{${calculation.iSlopeIncrease}} \\cdot ${calculation.bCarriageway} = \\frac{${calculation.numeratorDelta}}{${calculation.iSlopeIncrease}} \\cdot ${calculation.bCarriageway} = ${calculation.lengthRounded}\\text{ м}`;

  return (
    <div className="h-full bg-white dark:bg-[#202020] rounded-2xl shadow-sm border border-slate-200/80 dark:border-neutral-800 p-6 flex flex-col justify-between">
      <div className="space-y-5">
        {/* Заголовок с кнопками действий: Word и Копировать */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300">
              Результаты расчета (Ж.4)
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="export-word-zh4-btn"
              onClick={exportToWord}
              className="p-1.5 px-2.5 rounded-lg text-slate-600 hover:text-slate-900 dark:text-neutral-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold border border-slate-200/80 dark:border-neutral-700 shadow-sm"
              title="Экспорт отчета в формате Microsoft Word (.doc)"
            >
              <FileDown size={14} className="text-blue-600 dark:text-blue-400" />
              <span>Word</span>
            </button>

            <button
              type="button"
              id="copy-zh4-results-btn"
              onClick={handleCopy}
              className="p-1.5 px-2.5 rounded-lg text-slate-600 hover:text-slate-900 dark:text-neutral-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold border border-slate-200/80 dark:border-neutral-700 shadow-sm"
              title="Копировать расчет в буфер обмена"
            >
              {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              <span>{copied ? 'Скопировано' : 'Копировать'}</span>
            </button>
          </div>
        </div>

        {/* Формула Ж.4 с подстановкой */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-neutral-850 border border-slate-200/80 dark:border-neutral-800 space-y-3 w-full overflow-hidden no-scrollbar">
          <div className="text-xs text-slate-500 dark:text-neutral-400">
            <span className="font-semibold">Формула Ж.4 (СП 396.1325800.2018):</span>
          </div>

          <div className="py-1 flex justify-center w-full overflow-hidden no-scrollbar">
            <MathView math={latexGeneral} block className="overflow-hidden no-scrollbar" />
          </div>

          <div className="border-t border-slate-200/60 dark:border-neutral-700/60 pt-2.5">
            <div className="text-[11px] font-semibold text-slate-500 dark:text-neutral-400 mb-1">
              Подстановка параметров:
            </div>
            <div className="py-1 flex justify-center w-full overflow-hidden no-scrollbar">
              <MathView math={latexSubst} block className="overflow-hidden no-scrollbar" />
            </div>
          </div>
        </div>

        {/* Главный блок результата */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50/80 to-blue-50/40 dark:from-sky-950/30 dark:to-neutral-900 border border-sky-200/80 dark:border-sky-800/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300">
              Минимальная длина отгона виража L
            </span>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-200">
              СП 396 (Ж.4)
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold font-mono text-[#0078D4] dark:text-sky-400 tracking-tight">
              {calculation.lengthRounded.toFixed(2).replace('.', ',')}
            </span>
            <span className="text-lg font-bold text-slate-600 dark:text-neutral-400">
              м
            </span>
          </div>

          <div className="pt-2 border-t border-sky-200/60 dark:border-sky-800/40 flex items-center justify-between text-xs text-slate-600 dark:text-neutral-300">
            <span>Разность уклонов (i<sub>в</sub> − i<sub>поп</sub>):</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">
              {calculation.numeratorDelta} ‰
            </span>
          </div>
        </div>

        {/* Нормативная проверка на реконструкцию (п. 7.6.17) */}
        {calculation.isBelowMinReconstruction ? (
          <div className="p-3.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-start gap-2.5">
            <AlertTriangle size={18} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
              <span className="font-bold">Внимание (п. 7.6.17 СП 396):</span> расчетное значение L = {calculation.lengthRounded} м меньше <strong>30,0 м</strong>. В условиях реконструкции на всех категориях улиц (кроме магистральной сети) минимальную длину перехода к односкатному профилю допускается принимать не менее <strong>30,0 м</strong>.
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/50 flex items-center gap-2.5">
            <ShieldCheck size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div className="text-xs text-emerald-900 dark:text-emerald-200 font-medium">
              Расчетная длина L = {calculation.lengthRounded} м превышает нормативный порог 30,0 м (п. 7.6.17).
            </div>
          </div>
        )}
      </div>

      {/* Поясняющая подсказка в подвале */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-neutral-800 flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-neutral-500">
        <Info size={13} className="shrink-0" />
        <span>Отгон виража выполняется на длине переходной кривой по п. 7.6.14.</span>
      </div>
    </div>
  );
};

