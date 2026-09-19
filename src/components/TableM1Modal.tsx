import React from 'react';
import { X, FileText, AlertTriangle } from 'lucide-react';

interface TableM1ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TABLE_M1_DATA = [
  { radius: 400, widening: 0.2 },
  { radius: 300, widening: 0.3 },
  { radius: 230, widening: 0.4 },
  { radius: 180, widening: 0.5 },
  { radius: 140, widening: 0.6 },
  { radius: 120, widening: 0.7 },
  { radius: 100, widening: 0.8 },
  { radius: 90, widening: 0.9 },
  { radius: 80, widening: 1.0 },
  { radius: 70, widening: 1.2 },
  { radius: 60, widening: 1.4 },
  { radius: 50, widening: 1.6 },
  { radius: 45, widening: 1.8 },
  { radius: 40, widening: 2.0 },
];

export const TableM1Modal: React.FC<TableM1ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white dark:bg-[#202020] rounded-2xl shadow-2xl border border-slate-200 dark:border-neutral-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-slate-100 dark:border-neutral-800 bg-slate-50/70 dark:bg-neutral-850">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0">
              <FileText size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 font-mono">
                  Приложение М
                </span>
                <span className="text-xs text-slate-400 dark:text-neutral-500">
                  (в ред. Изменения № 1, утв. Приказом Минстроя России от 19.09.2019 № 557/пр)
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mt-0.5">
                УШИРЕНИЕ ПОЛОСЫ ДВИЖЕНИЯ НА КРИВЫХ В ПЛАНЕ
              </h2>
              <div className="text-xs font-medium text-slate-500 dark:text-neutral-400">
                Таблица М.1
              </div>
            </div>
          </div>
          <button
            type="button"
            id="close-table-m1-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Table */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-neutral-800">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/80 dark:bg-neutral-800/90 text-slate-700 dark:text-neutral-200 font-semibold border-b border-slate-200 dark:border-neutral-700">
                  <th className="p-3 border-r border-slate-200 dark:border-neutral-700 text-center w-1/2">
                    Радиус кривой в плане, м, менее
                  </th>
                  <th className="p-3 text-center w-1/2">
                    Значение уширения на каждую полосу, м
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-neutral-800">
                {TABLE_M1_DATA.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50 dark:hover:bg-neutral-800/50 transition-colors text-slate-700 dark:text-neutral-300"
                  >
                    <td className="p-2.5 text-center font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-neutral-800">
                      {row.radius}
                    </td>
                    <td className="p-2.5 text-center font-mono font-bold text-[#0078D4] dark:text-sky-400">
                      {row.widening.toFixed(1).replace('.', ',')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Красная плашка: Отсутствует в СП 42 */}
          <div className="mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-center justify-center gap-2">
            <AlertTriangle className="text-red-600 dark:text-red-400 shrink-0" size={18} />
            <span className="text-sm font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
              Отсутствует в СП 42
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-850 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-neutral-400">
            СП 396.1325800.2018 · Приложение М, Таблица М.1
          </span>
          <button
            type="button"
            id="btn-close-m1"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-slate-800 dark:text-white text-xs font-semibold transition cursor-pointer"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
