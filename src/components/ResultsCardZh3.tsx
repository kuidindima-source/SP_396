import React, { useState } from 'react';
import { CalculationZh3Result, VehicleTypeE1 } from '../types';
import { MathView } from './MathView';
import {
  AlertCircle,
  Copy,
  Check,
  FileDown,
  Calculator,
  Truck,
  ArrowRight,
} from 'lucide-react';

interface ResultsCardZh3Props {
  result: CalculationZh3Result;
  selectedVehicle: VehicleTypeE1;
}

export const ResultsCardZh3: React.FC<ResultsCardZh3Props> = ({
  result,
  selectedVehicle,
}) => {
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
          {result.errorMessage || 'Некорректные параметры: проверьте радиус кривой R и длину L'}
        </p>
      </div>
    );
  }

  const {
    lLength,
    lSquared,
    radius,
    twoR,
    deltaExact,
    deltaRounded,
    deltaRecommended,
  } = result;

  const copyReport = () => {
    const report = `ОТЧЕТ ПО РАСЧЕТУ ВЕЛИЧИНЫ УШИРЕНИЯ ОДНОЙ ПОЛОСЫ ДВИЖЕНИЯ
Нормативный документ: СП 396.1325800.2018 (Приложение Ж, п. Ж.3, формула Ж.3)
============================================================
1. Исходные параметры:
- Расчетное транспортное средство: ${selectedVehicle.name} (${selectedVehicle.code})
- Длина от бампера до задней оси L: ${lLength.toFixed(2)} м
  (общая длина: ${selectedVehicle.lengthTotal.toFixed(2)} м, задний свес: ${selectedVehicle.overhangRear.toFixed(2)} м)
- Радиус кривой в плане R: ${radius} м

2. Расчетная формула (Ж.3):
Δ = L² / (2 * R)

3. Подстановка значений:
Δ = ${lLength.toFixed(2)}² / (2 * ${radius})
Δ = ${lSquared.toFixed(2)} / ${twoR.toFixed(1)}
Δ = ${deltaRounded.toFixed(2)} м

4. Результаты:
- Точная расчетная величина уширения: Δ = ${deltaRounded.toFixed(2)} м
- Рекомендуемая строительная величина уширения: ${deltaRecommended.toFixed(2)} м (кратно 0,05 м)
============================================================
Сформировано в расчетной программе СП 396`;

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportToWord = () => {
    const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>Расчет величины уширения одной полосы движения</title>
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
      <h2>Расчет величины уширения одной полосы движения</h2>
      <p><b>Нормативное основание:</b> СП 396.1325800.2018 «Улицы и дороги населенных пунктов», Приложение Ж, п. Ж.3, формула (Ж.3).</p>
      
      <h3>1. Исходные данные</h3>
      <table>
        <tr><th>Параметр</th><th>Обозначение</th><th>Значение</th></tr>
        <tr><td>Тип расчетного транспортного средства</td><td>—</td><td><b>${selectedVehicle.name} (${selectedVehicle.code})</b></td></tr>
        <tr><td>Длина ТС от переднего бампера до задней оси</td><td>L</td><td><b>${lLength.toFixed(2)} м</b></td></tr>
        <tr><td>Общие габариты ТС (длина &times; ширина)</td><td>—</td><td>${selectedVehicle.lengthTotal.toFixed(2)} &times; ${selectedVehicle.widthTotal.toFixed(2)} м</td></tr>
        <tr><td>Радиус кривой в плане</td><td>R</td><td><b>${radius} м</b></td></tr>
      </table>

      <h3>2. Расчетная формула Ж.3</h3>
      <div class="formula">&Delta; = L<sup>2</sup> / (2 &middot; R)</div>

      <h3>3. Подстановка параметров и вычисление</h3>
      <p>1) Подстановка параметров:</p>
      <div class="formula">&Delta; = ${lLength.toFixed(2)}<sup>2</sup> / (2 &middot; ${radius})</div>
      <p>2) Возведение в квадрат длины и удвоение радиуса:</p>
      <div class="formula">&Delta; = ${lSquared.toFixed(2)} / ${twoR.toFixed(1)} = <b>${deltaRounded.toFixed(2)} м</b></div>

      <div class="result-box">
        <h3 style="margin-top:0; color:#15803d;">4. Результаты расчета:</h3>
        <p>Точная расчетная величина уширения одной полосы: <b>&Delta; = ${deltaRounded.toFixed(2)} м</b> (точно: ${deltaExact.toFixed(4)} м)</p>
        <p>Рекомендуемая строительная величина уширения полосы (с округлением кратно 0,05 м): <b>${deltaRecommended.toFixed(2)} м</b></p>
      </div>

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
    link.download = `Расчет_уширения_Ж3_R${radius}_${selectedVehicle.code}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full bg-white dark:bg-[#202020] rounded-2xl shadow-sm border border-slate-200/80 dark:border-neutral-800 p-6 flex flex-col justify-between">
      <div className="space-y-6">
        {/* Заголовок карточки с действиями */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300">
              Результаты расчета (Ж.3)
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="copy-report-zh3"
              onClick={copyReport}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 transition cursor-pointer flex items-center gap-1 text-xs"
              title="Копировать отчет в буфер обмена"
            >
              {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              <span className="hidden sm:inline">{copied ? 'Скопировано' : 'Копировать'}</span>
            </button>
            <button
              type="button"
              id="export-word-zh3"
              onClick={exportToWord}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 transition cursor-pointer flex items-center gap-1 text-xs"
              title="Экспорт в Word (.doc)"
            >
              <FileDown size={14} />
              <span className="hidden sm:inline">Word</span>
            </button>
          </div>
        </div>

        {/* Главный блок результата: Уширение полосы */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/50 flex flex-col justify-between">
            <span className="text-xs font-semibold text-sky-800 dark:text-sky-300 flex items-center gap-1.5">
              <Calculator size={14} />
              <span>Расчетное уширение Δ</span>
            </span>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold tracking-tight text-sky-950 dark:text-sky-100 font-mono">
                {deltaRounded.toFixed(2).replace('.', ',')}
              </span>
              <span className="text-sm font-semibold text-sky-700 dark:text-sky-300">м</span>
            </div>
            <span className="text-[11px] text-sky-600/80 dark:text-sky-400/80 mt-1">
              Точное значение: {deltaExact.toFixed(4).replace('.', ',')} м
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 flex flex-col justify-between">
            <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <Check size={14} />
              <span>Строительное уширение</span>
            </span>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold tracking-tight text-emerald-950 dark:text-emerald-100 font-mono">
                {deltaRecommended.toFixed(2).replace('.', ',')}
              </span>
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">м</span>
            </div>
            <span className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80 mt-1">
              Округление в большую сторону с шагом 0,05 м
            </span>
          </div>
        </div>

        {/* Формула с подстановкой значений */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-850/80 border border-slate-200/60 dark:border-neutral-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-neutral-300">
              Математический расчет по формуле Ж.3:
            </span>
            <span className="text-[11px] font-mono text-slate-400">СП 396, прил. Ж</span>
          </div>

          <div className="py-2 flex justify-center text-center">
            <MathView
              math={`\\Delta = \\frac{L^2}{2R} = \\frac{${lLength.toFixed(2)}^2}{2 \\cdot ${radius}} = \\frac{${lSquared.toFixed(2)}}{${twoR.toFixed(1)}} = ${deltaRounded.toFixed(2)}\\text{ м}`}
              block
              className="overflow-visible"
            />
          </div>
        </div>

        {/* Сводка параметров в табличном виде */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-700 dark:text-neutral-300">
            Сводка расчетных характеристик:
          </span>
          <div className="rounded-xl border border-slate-200/70 dark:border-neutral-800 overflow-hidden text-xs">
            <div className="flex items-center justify-between p-2.5 bg-slate-50/50 dark:bg-neutral-850 border-b border-slate-100 dark:border-neutral-800">
              <span className="text-slate-500 dark:text-neutral-400 flex items-center gap-1.5">
                <Truck size={13} className="text-slate-400" />
                <span>Расчетный автомобиль:</span>
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {selectedVehicle.name} ({selectedVehicle.code})
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 border-b border-slate-100 dark:border-neutral-800">
              <span className="text-slate-500 dark:text-neutral-400">Длина до задней оси L:</span>
              <span className="font-mono font-bold text-slate-800 dark:text-neutral-200">
                {lLength.toFixed(2).replace('.', ',')} м
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50/50 dark:bg-neutral-850 border-b border-slate-100 dark:border-neutral-800">
              <span className="text-slate-500 dark:text-neutral-400">Квадрат длины L²:</span>
              <span className="font-mono font-medium text-slate-800 dark:text-neutral-200">
                {lSquared.toFixed(2).replace('.', ',')} м²
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 border-b border-slate-100 dark:border-neutral-800">
              <span className="text-slate-500 dark:text-neutral-400">Радиус кривой R:</span>
              <span className="font-mono font-bold text-[#0078D4]">
                {radius} м
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50/50 dark:bg-neutral-850">
              <span className="text-slate-500 dark:text-neutral-400">Удвоенный радиус 2R:</span>
              <span className="font-mono font-medium text-slate-800 dark:text-neutral-200">
                {twoR.toFixed(1).replace('.', ',')} м
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Поясняющая справка внизу */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-neutral-800 text-xs text-slate-500 dark:text-neutral-400 flex items-start gap-2">
        <ArrowRight size={14} className="text-slate-400 shrink-0 mt-0.5" />
        <span>
          Уширение предусматривается с внутренней стороны кривой в плане. При проектировании двухполосных и многополосных дорог общее уширение проезжей части умножается на количество полос движения.
        </span>
      </div>
    </div>
  );
};
