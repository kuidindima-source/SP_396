import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Clock } from 'lucide-react';
import { SectionType } from '../types';

interface SectionSelectorProps {
  currentSection: SectionType;
  onSelectSection: (section: SectionType) => void;
}

interface SectionOption {
  id: SectionType;
  code: string;
  title: string;
  normative: string;
  description: string;
  isAvailable: boolean;
}

export const SECTIONS: SectionOption[] = [
  {
    id: 'zh1',
    code: 'Ж.1',
    title: 'Расчет минимального радиуса кривой в плане',
    normative: 'СП 396.1325800.2018 (Приложение Ж) · Таблица Ж.1',
    description: 'Определение минимального радиуса по условиям устойчивости автомобиля против заноса и опрокидывания',
    isAvailable: true,
  },
  {
    id: 'zh2',
    code: 'Ж.2',
    title: 'Ж.2 Наименьшие длины переходных кривых',
    normative: 'СП 396.1325800.2018 (Приложение Ж) · Формула Ж.2',
    description: 'Расчет наименьшей длины переходной кривой по допустимому нарастанию центробежного ускорения',
    isAvailable: true,
  },
  {
    id: 'zh3',
    code: 'Ж.3',
    title: 'Ж.3 Величина уширения одной полосы движения',
    normative: 'СП 396.1325800.2018 (Приложение Ж) · Формула Ж.3',
    description: 'Расчет величины уширения одной полосы движения по радиусу и длине расчетного автомобиля',
    isAvailable: true,
  },
  {
    id: 'zh4',
    code: 'Ж.4',
    title: 'Ж.4 Минимальная длина участка отгона виража',
    normative: 'СП 396.1325800.2018 (Приложение Ж) · Формула Ж.4',
    description: 'Определение минимальной длины отгона виража по поперечным уклонам и нарастанию продольного уклона',
    isAvailable: true,
  },
];

export const SectionSelector: React.FC<SectionSelectorProps> = ({
  currentSection,
  onSelectSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = SECTIONS.find((s) => s.id === currentSection) || SECTIONS[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Кнопка открытия выпадающего списка - наглядный выпадающий список */}
      <button
        type="button"
        id="section-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center justify-between gap-3 text-left py-1.5 px-3 rounded-xl border transition-all cursor-pointer ${
          isOpen
            ? 'bg-sky-50/90 dark:bg-neutral-800 border-sky-400 dark:border-sky-500 shadow-sm ring-2 ring-sky-500/20'
            : 'bg-slate-50 hover:bg-slate-100 dark:bg-neutral-800/80 dark:hover:bg-neutral-800 border-slate-200 hover:border-slate-300 dark:border-neutral-700 dark:hover:border-neutral-600'
        }`}
        title="Нажмите, чтобы выбрать раздел расчета"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-[#0078D4] text-white font-mono leading-none">
              {selected.code}
            </span>
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              {selected.title}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-neutral-400 flex items-center gap-1.5 mt-0.5">
            <span>{selected.normative}</span>
          </p>
        </div>

        <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-white dark:bg-neutral-700 border border-slate-200 dark:border-neutral-600 shadow-2xs group-hover:border-sky-400 dark:group-hover:border-sky-500 transition-colors">
          <ChevronDown
            size={18}
            className={`text-slate-600 dark:text-slate-300 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-sky-600 dark:text-sky-400' : ''
            }`}
          />
        </div>
      </button>

      {/* Выпадающее меню */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-[420px] max-w-[92vw] bg-white dark:bg-[#2D2D2D] rounded-2xl shadow-2xl border border-slate-200 dark:border-neutral-700 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-4 py-2 border-b border-slate-100 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Выберите расчет по СП 396
            </span>
            <span className="text-[11px] text-slate-400 dark:text-neutral-500">
              Приложение Ж
            </span>
          </div>

          <div className="p-2 space-y-1">
            {SECTIONS.map((sec) => {
              const isCurrent = sec.id === currentSection;
              return (
                <button
                  key={sec.id}
                  type="button"
                  id={`section-item-${sec.id}`}
                  disabled={!sec.isAvailable}
                  onClick={() => {
                    if (sec.isAvailable) {
                      onSelectSection(sec.id);
                      setIsOpen(false);
                    }
                  }}
                  className={`w-full text-left p-3 rounded-xl transition flex items-start gap-3 cursor-pointer ${
                    isCurrent
                      ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-900 dark:text-sky-100 border border-sky-200 dark:border-sky-800/80'
                      : sec.isAvailable
                      ? 'hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-700 dark:text-neutral-200 border border-transparent'
                      : 'opacity-50 cursor-not-allowed text-slate-400 dark:text-neutral-500 border border-transparent'
                  }`}
                >
                  <div
                    className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs font-mono mt-0.5 ${
                      isCurrent
                        ? 'bg-[#0078D4] text-white shadow-xs'
                        : sec.isAvailable
                        ? 'bg-slate-200 dark:bg-neutral-700 text-slate-700 dark:text-neutral-200'
                        : 'bg-slate-100 dark:bg-neutral-800 text-slate-400'
                    }`}
                  >
                    {sec.code}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-sm leading-snug">
                        {sec.title}
                      </span>
                      {isCurrent ? (
                        <span className="text-sky-600 dark:text-sky-400 shrink-0">
                          <Check size={18} />
                        </span>
                      ) : !sec.isAvailable ? (
                        <span className="text-[10px] font-medium bg-slate-100 dark:bg-neutral-800 text-slate-500 dark:text-neutral-400 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                          <Clock size={11} />
                          <span>Скоро</span>
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1 leading-snug">
                      {sec.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
