import React, { useState } from 'react';
import { Gauge, HelpCircle, AlertTriangle, ArrowUpRight, Compass, Table } from 'lucide-react';

interface InputCardProps {
  speed: string;
  slope: string;
  slopeSign: 1 | -1;
  onSpeedChange: (val: string) => void;
  onSlopeChange: (val: string) => void;
  onSlopeSignChange: (sign: 1 | -1) => void;
  onOpenTableModal: () => void;
  speedWarning: string | null;
  speedError: string | null;
  slopeError: string | null;
  isValid: boolean;
}

export const InputCard: React.FC<InputCardProps> = ({
  speed,
  slope,
  slopeSign,
  onSpeedChange,
  onSlopeChange,
  onSlopeSignChange,
  onOpenTableModal,
  speedWarning,
  speedError,
  slopeError,
  isValid,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSpeedInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSpeedChange(e.target.value);
  };

  const handleSlopeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Если пользователь ввел знак минус в поле, переключаем сегмент на минус
    if (val.startsWith('-')) {
      onSlopeSignChange(-1);
      onSlopeChange(val.replace('-', ''));
    } else if (val.startsWith('+')) {
      onSlopeSignChange(1);
      onSlopeChange(val.replace('+', ''));
    } else {
      onSlopeChange(val);
    }
  };

  return (
    <div className="bg-white dark:bg-[#2D2D2D] rounded-xl p-6 shadow-md border border-slate-100 dark:border-neutral-800 transition-all">
      <div className="space-y-6">
        {/* Заголовок панели */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-neutral-700/60">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
              Исходные параметры
            </h2>
            <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
              Ввод расчетной скорости и характеристик виража
            </p>
          </div>
          <button
            onClick={onOpenTableModal}
            className="flex items-center gap-1.5 text-xs font-medium text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 bg-sky-50 dark:bg-sky-950/40 px-2.5 py-1.5 rounded-lg border border-sky-200 dark:border-sky-800/60 transition"
            title="Посмотреть таблицу Ж.1 коэффициентов поперечной силы"
          >
            <Table size={14} />
            <span>Табл. Ж.1</span>
          </button>
        </div>

        {/* Поле 1: Расчетная скорость */}
        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-neutral-300 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
            <Gauge size={14} className="text-sky-500" />
            <span>Расчетная скорость, км/ч</span>
          </label>
          <div className="relative group">
            <input
              id="speed-input"
              type="text"
              inputMode="decimal"
              value={speed}
              onChange={handleSpeedInput}
              placeholder="Например: 80 или 75"
              className={`w-full h-12 pl-4 pr-16 bg-slate-50 dark:bg-neutral-800/90 text-slate-900 dark:text-white rounded-xl border text-base font-medium transition outline-none focus:ring-2 ${
                speedError
                  ? 'border-rose-500 focus:ring-rose-500/20 bg-rose-50/30 dark:bg-rose-950/20'
                  : 'border-slate-200 dark:border-neutral-700 focus:border-sky-500 focus:ring-sky-500/20'
              }`}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs font-semibold text-slate-400 dark:text-neutral-500 bg-slate-200 dark:bg-neutral-700 px-2 py-0.5 rounded-md">
              км/ч
            </div>
          </div>

          {speedError && (
            <p className="text-xs text-rose-500 flex items-center gap-1 mt-1.5">
              <span>{speedError}</span>
            </p>
          )}

          {speedWarning && !speedError && (
            <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 rounded-lg flex items-start gap-2 text-xs text-amber-800 dark:text-amber-200 mt-2">
              <AlertTriangle size={15} className="shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
              <span>{speedWarning}</span>
            </div>
          )}
        </div>

        {/* Поле 2: Знак направления уклона (Segmented Control) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
              <Compass size={14} className="text-emerald-500" />
              <span>Направление уклона (вираж)</span>
            </label>

            {/* Всплывающая подсказка */}
            <div className="relative inline-block">
              <button
                type="button"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
              >
                <HelpCircle size={15} />
              </button>
              {showTooltip && (
                <div className="absolute right-0 bottom-full mb-2 w-64 p-2.5 bg-slate-900 text-white text-xs rounded-lg shadow-xl z-20 pointer-events-none border border-slate-700">
                  <p className="font-semibold text-sky-400 mb-1">Справка по знаку:</p>
                  <p className="mb-1">
                    <span className="font-bold text-emerald-400">+ (Вираж)</span>: уклон в сторону центра кривой, компенсирует центробежную силу (+0.02).
                  </p>
                  <p>
                    <span className="font-bold text-rose-400">− (От центра)</span>: двускатный профиль или обратный уклон, направлен от центра кривой.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Segmented Switch */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 dark:bg-neutral-800/80 rounded-xl border border-slate-200/80 dark:border-neutral-700">
            <button
              type="button"
              id="slope-sign-plus"
              onClick={() => onSlopeSignChange(1)}
              className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                slopeSign === 1
                  ? 'bg-white dark:bg-[#2D2D2D] text-emerald-600 dark:text-emerald-400 shadow-sm border border-slate-200/50 dark:border-neutral-700'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="text-base font-bold leading-none">+</span>
              <span>К центру кривой (вираж)</span>
            </button>

            <button
              type="button"
              id="slope-sign-minus"
              onClick={() => onSlopeSignChange(-1)}
              className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                slopeSign === -1
                  ? 'bg-white dark:bg-[#2D2D2D] text-rose-600 dark:text-rose-400 shadow-sm border border-slate-200/50 dark:border-neutral-700'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="text-base font-bold leading-none">−</span>
              <span>От центра (обратный)</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-neutral-400 italic">
            уклон в сторону центра кривой +, уклон направлен от центра -
          </p>
        </div>

        {/* Поле 3: Величина уклона в промилле (‰) */}
        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-neutral-300 uppercase tracking-wider flex items-center justify-between mb-2.5">
            <span className="flex items-center gap-1.5">
              <ArrowUpRight size={14} className="text-amber-500" />
              <span>Величина поперечного уклона, ‰</span>
            </span>
            <span className="text-[11px] font-normal lowercase text-slate-400 dark:text-neutral-500">
              {Number(slope) > 0 ? `= ${(Number(slope) / 1000).toFixed(3)} в долях` : ''}
            </span>
          </label>
          <div className="relative group">
            <input
              id="slope-input"
              type="text"
              inputMode="decimal"
              value={slope}
              onChange={handleSlopeInput}
              placeholder="Например: 20 или 40"
              className={`w-full h-12 pl-4 pr-16 bg-slate-50 dark:bg-neutral-800/90 text-slate-900 dark:text-white rounded-xl border text-base font-medium transition outline-none focus:ring-2 ${
                slopeError
                  ? 'border-rose-500 focus:ring-rose-500/20 bg-rose-50/30 dark:bg-rose-950/20'
                  : 'border-slate-200 dark:border-neutral-700 focus:border-sky-500 focus:ring-sky-500/20'
              }`}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-sm font-semibold text-slate-400 dark:text-neutral-500 bg-slate-200 dark:bg-neutral-700 px-2.5 py-0.5 rounded-md">
              ‰
            </div>
          </div>

          {slopeError && (
            <p className="text-xs text-rose-500 flex items-center gap-1 mt-1">
              <span>{slopeError}</span>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
