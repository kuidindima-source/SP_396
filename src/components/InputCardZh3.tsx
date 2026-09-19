import React from 'react';
import { Truck, HelpCircle, BookOpen, Layers, FileText } from 'lucide-react';
import { TABLE_E1 } from '../data/vehicles';
import { VehicleTypeE1 } from '../types';

interface InputCardZh3Props {
  selectedVehicle: VehicleTypeE1;
  onSelectVehicle: (vehicle: VehicleTypeE1) => void;
  lLength: number;
  onLLengthChange: (value: number) => void;
  radius: number;
  onRadiusChange: (value: number) => void;
  onOpenTableE1: () => void;
  onOpenTableA4: () => void;
  onOpenTableM1: () => void;
}

export const InputCardZh3: React.FC<InputCardZh3Props> = ({
  selectedVehicle,
  onSelectVehicle,
  lLength,
  onLLengthChange,
  radius,
  onRadiusChange,
  onOpenTableE1,
  onOpenTableA4,
  onOpenTableM1,
}) => {
  return (
    <div className="h-full bg-white dark:bg-[#202020] rounded-2xl shadow-sm border border-slate-200/80 dark:border-neutral-800 p-6 flex flex-col justify-between">
      <div className="space-y-6">
        {/* Заголовок карточки */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0078D4]"></span>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300">
              Исходные данные (Ж.3)
            </h2>
          </div>
        </div>

        {/* Справочные кнопки модальных окон (3 справочника) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            type="button"
            id="open-table-e1-btn"
            onClick={onOpenTableE1}
            className="group flex flex-col justify-between p-3 rounded-xl bg-sky-50/70 hover:bg-sky-100/80 dark:bg-sky-950/40 dark:hover:bg-sky-950/70 border border-sky-200/80 dark:border-sky-900/60 transition text-left cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Truck size={15} />
              </div>
              <HelpCircle size={14} className="text-sky-500 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="text-xs font-bold text-sky-900 dark:text-sky-200">Таблица Е.1</div>
              <div className="text-[11px] text-sky-700 dark:text-sky-300 leading-tight mt-0.5">Параметры расчетных ТС</div>
            </div>
          </button>

          <button
            type="button"
            id="open-table-a4-btn"
            onClick={onOpenTableA4}
            className="group flex flex-col justify-between p-3 rounded-xl bg-amber-50/70 hover:bg-amber-100/80 dark:bg-amber-950/40 dark:hover:bg-amber-950/70 border border-amber-200/80 dark:border-amber-900/60 transition text-left cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <BookOpen size={15} />
              </div>
              <HelpCircle size={14} className="text-amber-500 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-900 dark:text-amber-200">Таблица А.4</div>
              <div className="text-[11px] text-amber-700 dark:text-amber-300 leading-tight mt-0.5">Рекомендуемые типы ТС</div>
            </div>
          </button>

          <button
            type="button"
            id="open-table-m1-btn"
            onClick={onOpenTableM1}
            className="group flex flex-col justify-between p-3 rounded-xl bg-purple-50/70 hover:bg-purple-100/80 dark:bg-purple-950/40 dark:hover:bg-purple-950/70 border border-purple-200/80 dark:border-purple-900/60 transition text-left cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <FileText size={15} />
              </div>
              <HelpCircle size={14} className="text-purple-500 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="text-xs font-bold text-purple-900 dark:text-purple-200">Приложение М</div>
              <div className="text-[11px] text-purple-700 dark:text-purple-300 leading-tight mt-0.5">Таблица М.1 (СП 396)</div>
            </div>
          </button>
        </div>

        {/* Параметр 1: Выбор расчетного автомобиля */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="vehicle-select" className="text-xs font-semibold text-slate-700 dark:text-neutral-300 flex items-center gap-1.5">
              <Layers size={14} className="text-[#0078D4]" />
              <span>Расчетное транспортное средство</span>
            </label>
            <span className="text-[11px] text-slate-400 dark:text-neutral-500">Приложение Е (СП 396)</span>
          </div>

          <select
            id="vehicle-select"
            value={selectedVehicle.id}
            onChange={(e) => {
              const found = TABLE_E1.find((v) => v.id === e.target.value);
              if (found) {
                onSelectVehicle(found);
                onLLengthChange(found.lCalculated);
              }
            }}
            className="w-full bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-sky-500 transition cursor-pointer"
          >
            {TABLE_E1.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} ({v.code}) — L = {v.lCalculated.toFixed(2).replace('.', ',')} м
              </option>
            ))}
          </select>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-850 text-xs text-slate-600 dark:text-neutral-300 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-neutral-400">Габариты (дл. × шир.):</span>
              <span className="font-mono font-medium">{selectedVehicle.lengthTotal.toFixed(2)} × {selectedVehicle.widthTotal.toFixed(2)} м</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-neutral-400">Колесная база / оси:</span>
              <span className="font-mono font-medium">{selectedVehicle.wheelbase} м</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-neutral-400">Свесы (передний / задний):</span>
              <span className="font-mono font-medium">
                {selectedVehicle.overhangFront.toFixed(2)} / {selectedVehicle.overhangRear > 0 ? selectedVehicle.overhangRear.toFixed(2) : '—'} м
              </span>
            </div>
          </div>
        </div>

        {/* Параметр 2: Длина L от переднего бампера до задней оси */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="l-length-input" className="text-xs font-semibold text-slate-700 dark:text-neutral-300">
              Длина ТС от переднего бампера до задней оси L, м
            </label>
            <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
              L = {lLength.toFixed(2).replace('.', ',')} м
            </span>
          </div>

          <div className="relative">
            <input
              type="number"
              id="l-length-input"
              value={lLength || ''}
              step="0.05"
              min="1"
              max="50"
              onChange={(e) => onLLengthChange(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 dark:text-neutral-500 pointer-events-none">
              м
            </span>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-neutral-500">
            Для выбранного ТС ({selectedVehicle.code}): {selectedVehicle.lengthTotal.toFixed(2)} м общая длина {selectedVehicle.overhangRear > 0 ? `– ${selectedVehicle.overhangRear.toFixed(2)} м задний свес` : ''} = {selectedVehicle.lCalculated.toFixed(2)} м.
          </p>
        </div>

        {/* Параметр 3: Радиус кривой в плане R */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="radius-input-zh3" className="text-xs font-semibold text-slate-700 dark:text-neutral-300">
              Радиус кривой в плане R, м
            </label>
            <span className="text-xs font-mono font-bold text-[#0078D4]">
              R = {radius} м
            </span>
          </div>

          <div className="relative">
            <input
              type="number"
              id="radius-input-zh3"
              value={radius || ''}
              min="1"
              max="5000"
              step="5"
              onChange={(e) => onRadiusChange(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
              placeholder="Введите радиус R (м)"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 dark:text-neutral-500 pointer-events-none">
              м
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
