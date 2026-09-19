import React from 'react';
import { X, Check, Truck } from 'lucide-react';
import { TABLE_E1 } from '../data/vehicles';
import { VehicleTypeE1 } from '../types';

interface TableE1ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVehicle: (vehicle: VehicleTypeE1) => void;
  selectedVehicleId?: string;
}

export const TableE1Modal: React.FC<TableE1ModalProps> = ({
  isOpen,
  onClose,
  onSelectVehicle,
  selectedVehicleId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-white dark:bg-[#202020] rounded-2xl shadow-2xl border border-slate-200 dark:border-neutral-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-slate-100 dark:border-neutral-800 bg-slate-50/70 dark:bg-neutral-850">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 flex items-center justify-center shrink-0">
              <Truck size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-300 font-mono">
                  Приложение Е · Таблица Е.1
                </span>
                <span className="text-xs text-slate-400 dark:text-neutral-500">СП 396.1325800.2018</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mt-0.5">
                Основные параметры расчетных транспортных средств
              </h2>
            </div>
          </div>
          <button
            type="button"
            id="close-table-e1-modal"
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
                  <th rowSpan={2} className="p-3 border-r border-slate-200 dark:border-neutral-700">
                    Тип расчетного транспортного средства
                  </th>
                  <th rowSpan={2} className="p-3 text-center border-r border-slate-200 dark:border-neutral-700">
                    Обозначение
                  </th>
                  <th rowSpan={2} className="p-3 text-center border-r border-slate-200 dark:border-neutral-700">
                    База / расстояния между осями, м
                  </th>
                  <th colSpan={2} className="p-2 text-center border-b border-r border-slate-200 dark:border-neutral-700">
                    Общие размеры, м
                  </th>
                  <th colSpan={2} className="p-2 text-center border-b border-r border-slate-200 dark:border-neutral-700">
                    Свес, м
                  </th>
                  <th rowSpan={2} className="p-3 text-center border-r border-slate-200 dark:border-neutral-700 bg-sky-50/70 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 min-w-[145px] leading-tight">
                    <div>L (от бампера</div>
                    <div>до задней оси), м</div>
                  </th>
                  <th rowSpan={2} className="p-3 text-center">
                    Действие
                  </th>
                </tr>
                <tr className="bg-slate-100/60 dark:bg-neutral-800/60 text-slate-600 dark:text-neutral-300 font-medium border-b border-slate-200 dark:border-neutral-700">
                  <th className="p-2 text-center border-r border-slate-200 dark:border-neutral-700">длина</th>
                  <th className="p-2 text-center border-r border-slate-200 dark:border-neutral-700">ширина</th>
                  <th className="p-2 text-center border-r border-slate-200 dark:border-neutral-700">передний</th>
                  <th className="p-2 text-center border-r border-slate-200 dark:border-neutral-700">задний</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-neutral-800">
                {TABLE_E1.map((v) => {
                  const isSelected = v.id === selectedVehicleId;
                  return (
                    <tr
                      key={v.id}
                      onClick={() => {
                        onSelectVehicle(v);
                        onClose();
                      }}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-900 dark:text-sky-100 font-medium'
                          : 'hover:bg-slate-50 dark:hover:bg-neutral-800/60 text-slate-700 dark:text-neutral-300'
                      }`}
                    >
                      <td className="p-3 border-r border-slate-200 dark:border-neutral-800 flex items-center gap-2">
                        <span className="font-semibold text-slate-900 dark:text-white">{v.name}</span>
                      </td>
                      <td className="p-3 text-center border-r border-slate-200 dark:border-neutral-800 font-mono font-bold text-sky-700 dark:text-sky-400">
                        {v.code}
                      </td>
                      <td className="p-3 text-center border-r border-slate-200 dark:border-neutral-800 font-mono">
                        {v.wheelbase}
                      </td>
                      <td className="p-3 text-center border-r border-slate-200 dark:border-neutral-800 font-mono">
                        {v.lengthTotal.toFixed(2).replace('.', ',')}
                      </td>
                      <td className="p-3 text-center border-r border-slate-200 dark:border-neutral-800 font-mono">
                        {v.widthTotal.toFixed(2).replace('.', ',')}
                      </td>
                      <td className="p-3 text-center border-r border-slate-200 dark:border-neutral-800 font-mono">
                        {v.overhangFront.toFixed(2).replace('.', ',')}
                      </td>
                      <td className="p-3 text-center border-r border-slate-200 dark:border-neutral-800 font-mono">
                        {v.overhangRear > 0 ? v.overhangRear.toFixed(2).replace('.', ',') : '—'}
                      </td>
                      <td className="p-3 text-center border-r border-slate-200 dark:border-neutral-800 font-mono font-bold bg-sky-50/50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-300">
                        {v.lCalculated.toFixed(2).replace('.', ',')} м
                      </td>
                      <td className="p-3 text-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectVehicle(v);
                            onClose();
                          }}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer inline-flex items-center gap-1 ${
                            isSelected
                              ? 'bg-sky-600 text-white'
                              : 'bg-slate-100 hover:bg-sky-500 hover:text-white dark:bg-neutral-800 dark:hover:bg-sky-600 text-slate-700 dark:text-neutral-200'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check size={13} />
                              <span>Выбрано</span>
                            </>
                          ) : (
                            <span>Выбрать</span>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-neutral-850 text-slate-500 dark:text-neutral-400 text-xs flex items-start gap-2">
            <span className="font-semibold text-slate-700 dark:text-neutral-300 shrink-0">Примечание:</span>
            <span>
              &lt;*&gt; Применяется для детального проектирования. Расчетная длина <span className="font-mono font-semibold text-slate-800 dark:text-neutral-200">L</span> (от переднего бампера до задней оси) рассчитывается как разность общей длины и заднего свеса (или сумма переднего свеса и колесной базы до задней оси).
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-850 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-neutral-400">
            Кликните по строке автомобиля, чтобы подставить его параметры в расчет Ж.3
          </span>
          <button
            type="button"
            id="btn-close-e1"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-slate-800 dark:text-white text-xs font-semibold transition"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
