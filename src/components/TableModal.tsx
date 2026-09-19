import React from 'react';
import { TABLE_ZH1 } from '../utils/sp396';
import { X, CheckCircle, ArrowRight } from 'lucide-react';

interface TableModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSpeed: number;
}

export const TableModal: React.FC<TableModalProps> = ({ isOpen, onClose, currentSpeed }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#2D2D2D] text-slate-800 dark:text-slate-100 rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 dark:border-neutral-700">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-neutral-700">
          <div>
            <h3 className="font-semibold text-lg">СП 396.1325800.2018</h3>
            <p className="text-xs text-slate-500 dark:text-neutral-400">
              Приложение Ж, Таблица Ж.1 — Расчетные значения коэффициентов поперечной силы
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="mb-4 text-sm text-slate-600 dark:text-neutral-300">
            Текущая расчетная скорость в программе: <span className="font-bold text-sky-600 dark:text-sky-400">{currentSpeed} км/ч</span>
          </div>

          <table className="w-full text-left border-collapse border border-slate-200 dark:border-neutral-700 rounded-lg overflow-hidden text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-neutral-800/80 text-slate-700 dark:text-neutral-300 font-medium">
                <th className="p-3 border-b border-r border-slate-200 dark:border-neutral-700">
                  Расчетная скорость, км/ч
                </th>
                <th className="p-3 border-b border-slate-200 dark:border-neutral-700">
                  Коэффициент поперечной силы &mu;
                </th>
              </tr>
            </thead>
            <tbody>
              {TABLE_ZH1.map((row) => {
                const isExactMatch = row.speed === currentSpeed;
                return (
                  <tr
                    key={row.speed}
                    className={`transition-colors border-b border-slate-100 dark:border-neutral-800 ${
                      isExactMatch
                        ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 font-semibold'
                        : 'hover:bg-slate-50/60 dark:hover:bg-neutral-800/40'
                    }`}
                  >
                    <td className="p-3 border-r border-slate-200 dark:border-neutral-700 flex items-center justify-between">
                      <span>{row.speed === 30 ? '30 и менее' : row.speed}</span>
                      {isExactMatch && (
                        <span className="flex items-center text-xs text-sky-600 dark:text-sky-400 font-medium gap-1">
                          <CheckCircle size={14} /> Выбрано
                        </span>
                      )}
                    </td>
                    <td className="p-3 font-mono font-medium">
                      {row.mu.toFixed(2).replace('.', ',')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-lg text-xs text-amber-800 dark:text-amber-200">
            <strong>Примечание к таблице Ж.1:</strong> Промежуточные значения коэффициентов поперечной силы следует определять интерполяцией.
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
