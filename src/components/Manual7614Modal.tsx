import React from 'react';
import { X, BookOpen, AlertCircle } from 'lucide-react';

interface Manual7614ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Manual7614Modal: React.FC<Manual7614ModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-[#202020] rounded-2xl shadow-2xl border border-slate-200 dark:border-neutral-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-slate-100 dark:border-neutral-800 bg-slate-50/70 dark:bg-neutral-850">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 flex items-center justify-center shrink-0">
              <BookOpen size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-300 font-mono">
                  СП 396.1325800.2018
                </span>
                <span className="text-xs text-slate-400 dark:text-neutral-500">
                  Пункты 7.6.14 — 7.6.18
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mt-0.5">
                Переход от односкатного к двускатному профилю и устройство виража
              </h2>
            </div>
          </div>
          <button
            type="button"
            id="close-manual-7614-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-700 dark:text-neutral-300">
          {/* Пункт 7.6.14 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-800">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              Пункт 7.6.14
            </h3>
            <p className="leading-relaxed">
              <strong>Переход от односкатного к двухскатному поперечному профилю</strong> следует производить на участках отгона виража.
            </p>
            <p className="leading-relaxed mt-1 text-slate-600 dark:text-neutral-400">
              Отгон виража выполняется на длине переходной кривой, а при ее отсутствии — на длине, равной длине переходной кривой, но не менее установленной п. 7.6.16.
            </p>
          </div>

          {/* Пункт 7.6.15 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-800 space-y-2.5">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              Пункт 7.6.15. Оси вращения плоскости проезжей части
            </h3>
            <p className="leading-relaxed">
              Изменение поперечного уклона проезжей части на участке отгона виража может выполняться вращением плоскости проезжей части относительно:
            </p>
            <ul className="list-disc pl-5 space-y-1 font-medium text-slate-800 dark:text-neutral-200">
              <li>оси проезжей части;</li>
              <li>внутренней кромки проезжей части;</li>
              <li>внешней кромки проезжей части.</li>
            </ul>
            <p className="leading-relaxed text-xs text-slate-600 dark:text-neutral-400">
              Выбор оси вращения плоскости проезжей части зависит от проектных решений, принятых в плане и поперечном профиле (наличие направленных в одну сторону или разнонаправленных кривых в плане, общая или обособленная проезжая часть и т.д.).
            </p>
            <p className="leading-relaxed text-xs text-slate-600 dark:text-neutral-400">
              В случае если проезжие части противоположных направлений обособлены, вращение их плоскостей возможно выполнять как отдельно, так и совместно.
              В случае вращения плоскости проезжей части относительно кромки и наличия полосы безопасности, вращение выполняют по внешней кромке линии полосы безопасности.
            </p>
            <p className="leading-relaxed text-xs text-slate-600 dark:text-neutral-400">
              При проектировании улиц и дорог с выделением проезжих частей под каждое направление движения, их поперечный уклон в пределах отгона виража следует изменять, как правило, вращением поверхности вокруг осей проезжих частей каждого направления (рисунок 7.21). В отдельных случаях раздельные проезжие части допускается вращать вокруг своих кромок у разделительной полосы или вокруг оси улицы или дороги.
            </p>
          </div>

          {/* Рисунок 7.21: Схема способов изменения профиля */}
          <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-3 text-center">
              Рисунок 7.21 — Способы изменения поперечного профиля проезжей части при устройстве виража
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Случай 1 */}
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-700 flex flex-col items-center text-center">
                <span className="text-xs font-bold text-sky-700 dark:text-sky-400 mb-2">
                  1 · Типовой случай
                </span>
                <svg viewBox="0 0 160 80" className="w-full h-24 stroke-slate-800 dark:stroke-neutral-200">
                  {/* Оси */}
                  <line x1="80" y1="5" x2="80" y2="75" strokeDasharray="3 3" strokeWidth="1" />
                  <line x1="40" y1="5" x2="40" y2="75" strokeDasharray="2 2" strokeWidth="0.8" stroke="#94a3b8" />
                  <line x1="120" y1="5" x2="120" y2="75" strokeDasharray="2 2" strokeWidth="0.8" stroke="#94a3b8" />
                  {/* Проезжие части под наклоном к разделительной */}
                  <line x1="10" y1="20" x2="70" y2="45" strokeWidth="5" strokeLinecap="round" />
                  <line x1="90" y1="20" x2="150" y2="45" strokeWidth="5" strokeLinecap="round" />
                  {/* Центры вращения */}
                  <circle cx="70" cy="45" r="2.5" fill="#0284c7" strokeWidth="1" />
                  <circle cx="90" cy="20" r="2.5" fill="#0284c7" strokeWidth="1" />
                </svg>
                <span className="text-[11px] text-slate-500 dark:text-neutral-400 mt-1 leading-tight">
                  Вращение раздельных ПЧ вокруг кромок у разделительной полосы
                </span>
              </div>

              {/* Случай 2 */}
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-700 flex flex-col items-center text-center">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-2">
                  2 · Исключительный случай
                </span>
                <svg viewBox="0 0 160 80" className="w-full h-24 stroke-slate-800 dark:stroke-neutral-200">
                  {/* Общая центральная ось */}
                  <line x1="80" y1="5" x2="80" y2="75" strokeDasharray="3 3" strokeWidth="1.2" stroke="#0284c7" />
                  <line x1="10" y1="25" x2="70" y2="43" strokeWidth="5" strokeLinecap="round" />
                  <line x1="90" y1="49" x2="150" y2="67" strokeWidth="5" strokeLinecap="round" />
                  <circle cx="80" cy="46" r="2.5" fill="#d97706" strokeWidth="1" />
                </svg>
                <span className="text-[11px] text-slate-500 dark:text-neutral-400 mt-1 leading-tight">
                  Вращение вокруг общей оси улицы или дороги
                </span>
              </div>

              {/* Случай 3 */}
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-700 flex flex-col items-center text-center">
                <span className="text-xs font-bold text-purple-700 dark:text-purple-400 mb-2">
                  3 · Исключительный случай
                </span>
                <svg viewBox="0 0 160 80" className="w-full h-24 stroke-slate-800 dark:stroke-neutral-200">
                  <line x1="80" y1="5" x2="80" y2="75" strokeDasharray="3 3" strokeWidth="1" />
                  <line x1="10" y1="20" x2="70" y2="45" strokeWidth="5" strokeLinecap="round" />
                  <line x1="90" y1="52" x2="150" y2="72" strokeWidth="5" strokeLinecap="round" />
                  {/* Ось вращения на кромке */}
                  <circle cx="80" cy="48" r="3" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
                </svg>
                <span className="text-[11px] text-slate-500 dark:text-neutral-400 mt-1 leading-tight">
                  Вращение вокруг внутренней или внешней кромки
                </span>
              </div>
            </div>
          </div>

          {/* Пункт 7.6.17 и Таблица 7.17 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-800 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              Пункт 7.6.17. Нарастание продольного уклона и водоотвод
            </h3>
            <p className="leading-relaxed">
              Величину нарастания продольного уклона (дополнительный уклон кромки проезжей части) следует назначать индивидуально, но <strong>не более 10‰</strong>, а в сложных условиях — <strong>20‰</strong>.
            </p>
            <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/60 text-sky-950 dark:text-sky-200 text-xs">
              <strong>В условиях реконструкции</strong> на всех категориях улиц, кроме магистральной сети, допускается уменьшать длину перехода от двускатного профиля улицы к односкатному, но <strong>принимать не менее 30,0 м</strong>.
            </div>
            <p className="leading-relaxed text-xs text-slate-600 dark:text-neutral-400">
              На участках отгона виража для обеспечения водоотвода с проезжей части рекомендуется принимать продольный уклон проезжей части не меньше значений, приведенных в таблице 7.17. В любом случае необходимо обеспечить суммарный (косой) уклон в каждой точке проезжей части в соответствии с п. 7.6.3.
            </p>

            {/* Таблица 7.17 */}
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-neutral-700 mt-2">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-200/80 dark:bg-neutral-800 text-slate-800 dark:text-neutral-200 font-semibold border-b border-slate-200 dark:border-neutral-700">
                    <th rowSpan={2} className="p-2.5 border-r border-slate-200 dark:border-neutral-700">
                      Условия проектирования
                    </th>
                    <th colSpan={2} className="p-2 text-center">
                      Продольный уклон, ‰
                    </th>
                  </tr>
                  <tr className="bg-slate-100 dark:bg-neutral-850 text-slate-700 dark:text-neutral-300 border-b border-slate-200 dark:border-neutral-700">
                    <th className="p-2 text-center border-r border-slate-200 dark:border-neutral-700">
                      Середина проезжей части
                    </th>
                    <th className="p-2 text-center">
                      Кромка проезжей части
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-neutral-800 bg-white dark:bg-[#202020]">
                  <tr>
                    <td className="p-2.5 font-medium text-slate-900 dark:text-white border-r border-slate-200 dark:border-neutral-800">
                      Новое строительство
                    </td>
                    <td className="p-2.5 text-center font-mono font-bold text-sky-700 dark:text-sky-400 border-r border-slate-200 dark:border-neutral-800">
                      10,0
                    </td>
                    <td className="p-2.5 text-center font-mono font-bold text-sky-700 dark:text-sky-400">
                      5,0
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-slate-900 dark:text-white border-r border-slate-200 dark:border-neutral-800">
                      Реконструкция
                    </td>
                    <td className="p-2.5 text-center font-mono font-bold text-amber-700 dark:text-amber-400 border-r border-slate-200 dark:border-neutral-800">
                      7,0
                    </td>
                    <td className="p-2.5 text-center font-mono font-bold text-amber-700 dark:text-amber-400">
                      2,0
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Пункт 7.6.18 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-800">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              Пункт 7.6.18. Смещение нулевой точки
            </h3>
            <p className="leading-relaxed">
              В случае невозможности обеспечения достаточных продольных уклонов в местах сопряжения элементов прямая — клотоида — круговая кривая, нулевая точка поперечного уклона может быть смещена относительно точки стыковки клотоиды и круговой кривой на величину:
            </p>
            <div className="mt-2 inline-block px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-900 font-mono font-bold text-sm text-sky-700 dark:text-sky-400 border border-slate-200 dark:border-neutral-700">
              L = 0,1 · A
            </div>
            <span className="ml-3 text-xs text-slate-500 dark:text-neutral-400">
              где A — параметр клотоиды.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-850 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-neutral-400">
            СП 396.1325800.2018 «Улицы и дороги населенных пунктов»
          </span>
          <button
            type="button"
            id="btn-close-manual-7614"
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
