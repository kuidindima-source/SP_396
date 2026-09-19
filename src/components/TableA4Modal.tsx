import React from 'react';
import { X, BookOpen } from 'lucide-react';
import { TABLE_A4 } from '../data/vehicles';

interface TableA4ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TableA4Modal: React.FC<TableA4ModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-5xl max-h-[90vh] flex flex-col bg-white dark:bg-[#202020] rounded-2xl shadow-2xl border border-slate-200 dark:border-neutral-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-slate-100 dark:border-neutral-800 bg-slate-50/70 dark:bg-neutral-850">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
              <BookOpen size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 font-mono">
                  Таблица А.4
                </span>
                <span className="text-xs text-slate-400 dark:text-neutral-500">
                  Методические рекомендации по применению СП 396 (Справочно)
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mt-0.5">
                Рекомендуемые расчетные типы транспортных средств
              </h2>
            </div>
          </div>
          <button
            type="button"
            id="close-table-a4-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 transition cursor-pointer"
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
                  <th className="p-3 border-r border-slate-200 dark:border-neutral-700 w-1/4">
                    Функциональная классификация улиц и дорог
                  </th>
                  <th className="p-3 border-r border-slate-200 dark:border-neutral-700 w-1/4">
                    Допускаемые типы транспортных средств
                  </th>
                  <th className="p-3 border-r border-slate-200 dark:border-neutral-700 w-1/5">
                    Тип расчетного транспортного средства
                  </th>
                  <th className="p-3">
                    Примечание
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-neutral-800">
                {TABLE_A4.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50 dark:hover:bg-neutral-800/50 transition-colors text-slate-700 dark:text-neutral-300"
                  >
                    <td className="p-3 font-semibold text-slate-900 dark:text-white border-r border-slate-200 dark:border-neutral-800 align-top">
                      {row.classification}
                    </td>
                    <td className="p-3 border-r border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-300 align-top">
                      {row.allowedVehicles}
                    </td>
                    <td className="p-3 border-r border-slate-200 dark:border-neutral-800 align-top">
                      <div className="font-semibold text-sky-800 dark:text-sky-300">
                        {row.recommendedVehicles}
                      </div>
                    </td>
                    <td className="p-3 text-slate-500 dark:text-neutral-400 align-top text-[11px] leading-relaxed">
                      {row.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200 text-xs">
            <span className="font-semibold">Справочно:</span> Для проектирования проездов парковок как расчетное транспортное средство может использоваться легковой автомобиль.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-850 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-neutral-400">
            Методическое пособие по применению СП 396.1325800.2018
          </span>
          <button
            type="button"
            id="btn-close-a4"
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
