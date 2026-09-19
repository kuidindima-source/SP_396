import React from 'react';
import { Gauge, CircleDot, Activity, AlertTriangle } from 'lucide-react';

interface InputCardZh2Props {
  speed: string;
  radius: string;
  iPermissible: number;
  onSpeedChange: (val: string) => void;
  onRadiusChange: (val: string) => void;
  onIPermissibleChange: (val: number, label: string) => void;
  speedError: string | null;
  radiusError: string | null;
}

export const CATEGORIES = [
  {
    value: 0.8,
    title: '0,8 м/с³',
    description: 'Магистральные улицы и дороги, городские дороги и улицы общегородского значения, улицы и дороги районного значения',
  },
  {
    value: 1.0,
    title: '1,0 м/с³',
    description: 'Все остальные улицы и дороги',
  },
];

export const InputCardZh2: React.FC<InputCardZh2Props> = ({
  speed,
  radius,
  iPermissible,
  onSpeedChange,
  onRadiusChange,
  onIPermissibleChange,
  speedError,
  radiusError,
}) => {
  return (
    <div className="bg-white dark:bg-[#2D2D2D] rounded-xl p-6 shadow-md border border-slate-100 dark:border-neutral-800 transition-all">
      <div className="space-y-6">
        {/* Заголовок панели */}
        <div className="pb-3 border-b border-slate-100 dark:border-neutral-700/60">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            Исходные параметры
          </h2>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
            Параметры для расчета наименьшей длины переходной кривой (Ж.2)
          </p>
        </div>

        {/* Поле 1: Расчетная скорость */}
        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-neutral-300 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
            <Gauge size={14} className="text-sky-500" />
            <span>Расчетная скорость V<sub>расч</sub>, км/ч</span>
          </label>
          <div className="relative group">
            <input
              id="zh2-speed-input"
              type="text"
              inputMode="decimal"
              value={speed}
              onChange={(e) => onSpeedChange(e.target.value)}
              placeholder="Например: 80 или 60"
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
        </div>

        {/* Поле 2: Радиус кривой в плане */}
        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-neutral-300 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
            <CircleDot size={14} className="text-emerald-500" />
            <span>Радиус кривой в плане R, м</span>
          </label>
          <div className="relative group">
            <input
              id="zh2-radius-input"
              type="text"
              inputMode="decimal"
              value={radius}
              onChange={(e) => onRadiusChange(e.target.value)}
              placeholder="Например: 400 или 250"
              className={`w-full h-12 pl-4 pr-16 bg-slate-50 dark:bg-neutral-800/90 text-slate-900 dark:text-white rounded-xl border text-base font-medium transition outline-none focus:ring-2 ${
                radiusError
                  ? 'border-rose-500 focus:ring-rose-500/20 bg-rose-50/30 dark:bg-rose-950/20'
                  : 'border-slate-200 dark:border-neutral-700 focus:border-sky-500 focus:ring-sky-500/20'
              }`}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs font-semibold text-slate-400 dark:text-neutral-500 bg-slate-200 dark:bg-neutral-700 px-2 py-0.5 rounded-md">
              м
            </div>
          </div>

          {radiusError && (
            <p className="text-xs text-rose-500 flex items-center gap-1 mt-1.5">
              <span>{radiusError}</span>
            </p>
          )}
        </div>

        {/* Поле 3: Допустимая скорость нарастания центробежного ускорения Iдоп */}
        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-neutral-300 uppercase tracking-wider flex items-center justify-between gap-1.5 mb-2.5">
            <span className="flex items-center gap-1.5">
              <Activity size={14} className="text-amber-500" />
              <span>Допустимое нарастание ускорения I<sub>доп</sub>, м/с³</span>
            </span>
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 font-mono">
              {iPermissible === 0.8 ? '0,8' : '1,0'} м/с³
            </span>
          </label>

          <div className="space-y-2.5">
            {CATEGORIES.map((cat) => {
              const isSelected = iPermissible === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => onIPermissibleChange(cat.value, cat.description)}
                  className={`w-full p-3 text-left rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? 'bg-sky-50/80 dark:bg-sky-950/40 border-sky-400 dark:border-sky-700 ring-1 ring-sky-400/40'
                      : 'bg-slate-50 dark:bg-neutral-800/70 border-slate-200 dark:border-neutral-700 hover:border-slate-300 dark:hover:border-neutral-600'
                  }`}
                >
                  <div className="mt-0.5">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-sky-600 bg-sky-600 dark:border-sky-400 dark:bg-sky-400'
                          : 'border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-700'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-neutral-900" />}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                        {cat.title}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] uppercase font-bold tracking-wider text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-900/60 px-1.5 py-0.5 rounded">
                          Выбрано
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-neutral-400 mt-1 leading-snug">
                      {cat.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
