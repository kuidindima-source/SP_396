import React, { useState } from 'react';
import { BookOpen, HelpCircle, AlertTriangle, ArrowUpRight, Compass, Ruler } from 'lucide-react';

interface InputCardZh4Props {
  iVirazh: string;
  onIVirazhChange: (val: string) => void;
  iPop: string;
  onIPopChange: (val: string) => void;
  iPopSign: 1 | -1;
  onIPopSignChange: (sign: 1 | -1) => void;
  iSlopeIncrease: string;
  onISlopeIncreaseChange: (val: string) => void;
  bCarriageway: string;
  onBCarriagewayChange: (val: string) => void;
  onOpenManualModal: () => void;
}

export const InputCardZh4: React.FC<InputCardZh4Props> = ({
  iVirazh,
  onIVirazhChange,
  iPop,
  onIPopChange,
  iPopSign,
  onIPopSignChange,
  iSlopeIncrease,
  onISlopeIncreaseChange,
  bCarriageway,
  onBCarriagewayChange,
  onOpenManualModal,
}) => {
  const [showSignTooltip, setShowSignTooltip] = useState(false);

  const handleSlopePopInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.startsWith('-')) {
      onIPopSignChange(-1);
      onIPopChange(val.replace('-', ''));
    } else if (val.startsWith('+')) {
      onIPopSignChange(1);
      onIPopChange(val.replace('+', ''));
    } else {
      onIPopChange(val);
    }
  };

  const slopeIncNum = parseFloat(iSlopeIncrease) || 0;
  const isSlopeIncExceeded = slopeIncNum > 20;
  const isSlopeIncHigh = slopeIncNum > 10 && slopeIncNum <= 20;

  return (
    <div className="h-full bg-white dark:bg-[#202020] rounded-2xl shadow-sm border border-slate-200/80 dark:border-neutral-800 p-6 flex flex-col justify-between">
      <div className="space-y-5">
        {/* Заголовок карточки с кнопкой справки */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0078D4]"></span>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300">
              Исходные данные (Ж.4)
            </h2>
          </div>

          <button
            type="button"
            id="open-manual-7614-btn"
            onClick={onOpenManualModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 dark:bg-sky-950/50 hover:bg-sky-100 dark:hover:bg-sky-900/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-semibold transition cursor-pointer"
          >
            <BookOpen size={14} />
            <span>п. 7.6.14 — 7.6.18</span>
          </button>
        </div>

        {/* Параметр 1: Поперечный уклон виража i_в */}
        <div className="space-y-1.5">
          <label htmlFor="i-virazh-input" className="text-xs font-semibold text-slate-700 dark:text-neutral-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <ArrowUpRight size={14} className="text-sky-600" />
              <span>Поперечный уклон виража i<sub>в</sub>, ‰</span>
            </span>
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="decimal"
              id="i-virazh-input"
              value={iVirazh}
              onChange={(e) => onIVirazhChange(e.target.value)}
              placeholder="Введите уклон виража"
              className="w-full h-11 pl-3.5 pr-12 bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-700 rounded-xl text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs font-bold text-slate-400 dark:text-neutral-500 bg-slate-200 dark:bg-neutral-700 px-2 py-0.5 rounded">
              ‰
            </div>
          </div>
        </div>

        {/* Параметр 2: Поперечный уклон проезжей части i_поп (реализовано как в Ж.1) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-neutral-300 flex items-center gap-1.5">
              <Compass size={14} className="text-emerald-500" />
              <span>Направление поперечного уклона проезжей части</span>
            </label>

            <div className="relative inline-block">
              <button
                type="button"
                onMouseEnter={() => setShowSignTooltip(true)}
                onMouseLeave={() => setShowSignTooltip(false)}
                onClick={() => setShowSignTooltip(!showSignTooltip)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer"
              >
                <HelpCircle size={15} />
              </button>
              {showSignTooltip && (
                <div className="absolute right-0 bottom-full mb-2 w-72 p-2.5 bg-slate-900 text-white text-xs rounded-lg shadow-xl z-20 pointer-events-none border border-slate-700">
                  <p className="font-semibold text-sky-400 mb-1">Правило знака по п. Ж.4 СП 396:</p>
                  <p className="mb-1">
                    <span className="font-bold text-rose-400">− (со знаком минус)</span>: в случае, когда поверхности проезжей части до виража и на вираже имеют уклоны в противоположные стороны (двускатный профиль).
                  </p>
                  <p>
                    <span className="font-bold text-emerald-400">+ (со знаком плюс)</span>: когда уклон поверхности до виража направлен в ту же сторону, что и вираж (односкатный профиль).
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Segmented Switch (как в Ж.1) */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 dark:bg-neutral-800/80 rounded-xl border border-slate-200/80 dark:border-neutral-700">
            <button
              type="button"
              id="pop-slope-sign-plus"
              onClick={() => onIPopSignChange(1)}
              className={`py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                iPopSign === 1
                  ? 'bg-white dark:bg-[#2D2D2D] text-emerald-600 dark:text-emerald-400 shadow-sm border border-slate-200/50 dark:border-neutral-700'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="text-base font-bold leading-none">+</span>
              <span className="truncate">В сторону виража</span>
            </button>

            <button
              type="button"
              id="pop-slope-sign-minus"
              onClick={() => onIPopSignChange(-1)}
              className={`py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                iPopSign === -1
                  ? 'bg-white dark:bg-[#2D2D2D] text-rose-600 dark:text-rose-400 shadow-sm border border-slate-200/50 dark:border-neutral-700'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="text-base font-bold leading-none">−</span>
              <span className="truncate">В обратную сторону</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-neutral-400 italic">
            уклон в сторону центра кривой +, уклон направлен от центра -
          </p>

          {/* Поле ввода величины уклона i_поп */}
          <div className="relative mt-1.5">
            <input
              type="text"
              inputMode="decimal"
              id="i-pop-input"
              value={iPop}
              onChange={handleSlopePopInput}
              placeholder="Величина поперечного уклона проезжей части"
              className="w-full h-11 pl-3.5 pr-12 bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-700 rounded-xl text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs font-bold text-slate-400 dark:text-neutral-500 bg-slate-200 dark:bg-neutral-700 px-2 py-0.5 rounded">
              ‰
            </div>
          </div>
        </div>

        {/* Параметр 3: Величина нарастания продольного уклона I */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="i-slope-increase-input" className="text-xs font-semibold text-slate-700 dark:text-neutral-300">
              Величина нарастания продольного уклона I, ‰
            </label>
            <span className="text-[11px] text-slate-400 dark:text-neutral-500 font-mono">
              до 10‰ (до 20‰ в сложных)
            </span>
          </div>

          <div className="relative">
            <input
              type="text"
              inputMode="decimal"
              id="i-slope-increase-input"
              value={iSlopeIncrease}
              onChange={(e) => onISlopeIncreaseChange(e.target.value)}
              placeholder="По умолчанию 3‰ (макс. 10‰, в сложных 20‰)"
              className="w-full h-11 pl-3.5 pr-12 bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-700 rounded-xl text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs font-bold text-slate-400 dark:text-neutral-500 bg-slate-200 dark:bg-neutral-700 px-2 py-0.5 rounded">
              ‰
            </div>
          </div>

          {isSlopeIncExceeded && (
            <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-[11px] text-red-700 dark:text-red-300 flex items-center gap-1.5">
              <AlertTriangle size={14} className="shrink-0 text-red-600" />
              <span>Значение I превышает нормативный максимум 20‰ (п. Ж.4).</span>
            </div>
          )}

          {isSlopeIncHigh && !isSlopeIncExceeded && (
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <AlertTriangle size={14} className="shrink-0 text-amber-600" />
              <span>Значение I &gt; 10‰ допускается только в сложных условиях (п. Ж.4).</span>
            </div>
          )}
        </div>

        {/* Параметр 4: Расстояние B_пч от кромки до точки начала дополнительного подъема */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="b-carriageway-input" className="text-xs font-semibold text-slate-700 dark:text-neutral-300 flex items-center gap-1.5">
              <Ruler size={14} className="text-[#0078D4]" />
              <span>Расстояние B<sub>пч</sub> (от кромки до точки подъема), м</span>
            </label>
            <span className="text-[11px] text-slate-400 dark:text-neutral-500">Рисунок Ж.1</span>
          </div>

          <div className="relative">
            <input
              type="text"
              inputMode="decimal"
              id="b-carriageway-input"
              value={bCarriageway}
              onChange={(e) => onBCarriagewayChange(e.target.value)}
              placeholder="Например: 3.5 или 7.0"
              className="w-full h-11 pl-3.5 pr-12 bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-700 rounded-xl text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs font-bold text-slate-400 dark:text-neutral-500 bg-slate-200 dark:bg-neutral-700 px-2 py-0.5 rounded">
              м
            </div>
          </div>
        </div>

        {/* Схематическая плашка Рисунка Ж.1 */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-850 border border-slate-200/80 dark:border-neutral-800">
          <div className="text-[11px] font-semibold text-slate-600 dark:text-neutral-400 mb-1.5 text-center">
            Рисунок Ж.1 — Определение расстояния B<sub>пч</sub>
          </div>
          <svg viewBox="0 0 320 70" className="w-full h-16">
            {/* Левая схема: цельная ПЧ с осью вращения */}
            <g transform="translate(10, 5)">
              <rect x="0" y="24" width="130" height="8" fill="#e2e8f0" rx="1" />
              <line x1="0" y1="36" x2="130" y2="12" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
              <line x1="65" y1="5" x2="65" y2="45" stroke="#0284c7" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="65" cy="24" r="2.5" fill="#0284c7" />
              {/* Размерная линия B_пч */}
              <line x1="0" y1="52" x2="65" y2="52" stroke="#475569" strokeWidth="1" />
              <line x1="0" y1="48" x2="0" y2="56" stroke="#475569" strokeWidth="1" />
              <line x1="65" y1="48" x2="65" y2="56" stroke="#475569" strokeWidth="1" />
              <text x="32" y="63" fontSize="9" fill="#0369a1" textAnchor="middle" fontWeight="bold">Впч</text>
            </g>

            {/* Правая схема: с разделительной полосой */}
            <g transform="translate(170, 5)">
              <rect x="0" y="24" width="55" height="8" fill="#e2e8f0" rx="1" />
              <rect x="75" y="24" width="55" height="8" fill="#e2e8f0" rx="1" />
              <line x1="60" y1="5" x2="60" y2="45" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="70" y1="5" x2="70" y2="45" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="2" y1="12" x2="55" y2="28" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
              <line x1="75" y1="28" x2="128" y2="44" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
              {/* Размерная линия B_пч */}
              <line x1="0" y1="52" x2="55" y2="52" stroke="#475569" strokeWidth="1" />
              <line x1="0" y1="48" x2="0" y2="56" stroke="#475569" strokeWidth="1" />
              <line x1="55" y1="48" x2="55" y2="56" stroke="#475569" strokeWidth="1" />
              <text x="27" y="63" fontSize="9" fill="#0369a1" textAnchor="middle" fontWeight="bold">Впч</text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
