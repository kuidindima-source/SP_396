import React, { useState, useMemo, useEffect } from 'react';
import { calculateRadius, calculateZh2, calculateZh3, calculateZh4 } from './utils/sp396';
import { InputCard } from './components/InputCard';
import { ResultsCard } from './components/ResultsCard';
import { InputCardZh2, CATEGORIES } from './components/InputCardZh2';
import { ResultsCardZh2 } from './components/ResultsCardZh2';
import { InputCardZh3 } from './components/InputCardZh3';
import { ResultsCardZh3 } from './components/ResultsCardZh3';
import { InputCardZh4 } from './components/InputCardZh4';
import { ResultsCardZh4 } from './components/ResultsCardZh4';
import { SectionSelector } from './components/SectionSelector';
import { TableModal } from './components/TableModal';
import { ExeGuideModal } from './components/ExeGuideModal';
import { TableE1Modal } from './components/TableE1Modal';
import { TableA4Modal } from './components/TableA4Modal';
import { TableM1Modal } from './components/TableM1Modal';
import { Manual7614Modal } from './components/Manual7614Modal';
import { TABLE_E1 } from './data/vehicles';
import { BookOpen, Sparkles } from 'lucide-react';
import { SectionType, VehicleTypeE1 } from './types';

export default function App() {
  // Текущий активный раздел СП 396
  const [section, setSection] = useState<SectionType>('zh1');

  // Тема оформления: 'light' | 'dark'
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Исходные данные формы Ж.1
  const [speedStr, setSpeedStr] = useState<string>('80');
  const [slopeStr, setSlopeStr] = useState<string>('20');
  const [slopeSign, setSlopeSign] = useState<1 | -1>(1);

  // Исходные данные формы Ж.2
  const [zh2SpeedStr, setZh2SpeedStr] = useState<string>('80');
  const [zh2RadiusStr, setZh2RadiusStr] = useState<string>('400');
  const [zh2IPermissible, setZh2IPermissible] = useState<number>(0.8);
  const [zh2ICategoryLabel, setZh2ICategoryLabel] = useState<string>(CATEGORIES[0].description);

  // Исходные данные формы Ж.3 (по умолчанию грузовой автомобиль Г)
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleTypeE1>(TABLE_E1[0]);
  const [zh3LLength, setZh3LLength] = useState<number>(TABLE_E1[0].lCalculated);
  const [zh3Radius, setZh3Radius] = useState<number>(100);

  // Исходные данные формы Ж.4 (Минимальная длина участка отгона виража)
  const [zh4IVirazh, setZh4IVirazh] = useState<string>('40');
  const [zh4IPop, setZh4IPop] = useState<string>('20');
  const [zh4IPopSign, setZh4IPopSign] = useState<1 | -1>(-1);
  const [zh4ISlopeIncrease, setZh4ISlopeIncrease] = useState<string>('3'); // Установлено по умолчанию 3‰ по запросу
  const [zh4BCarriageway, setZh4BCarriageway] = useState<string>('3.5');

  // Модальные окна
  const [isTableModalOpen, setIsTableModalOpen] = useState<boolean>(false);
  const [isExeModalOpen, setIsExeModalOpen] = useState<boolean>(false);
  const [isTableE1Open, setIsTableE1Open] = useState<boolean>(false);
  const [isTableA4Open, setIsTableA4Open] = useState<boolean>(false);
  const [isTableM1Open, setIsTableM1Open] = useState<boolean>(false);
  const [isManual7614Open, setIsManual7614Open] = useState<boolean>(false);

  // Применяем класс dark к <html> элементу
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Валидация расчетной скорости для Ж.1
  const { speedNum, speedError, speedWarning } = useMemo(() => {
    const trimmed = speedStr.trim();
    if (!trimmed) {
      return { speedNum: 0, speedError: 'Поле не может быть пустым', speedWarning: null };
    }
    const num = Number(trimmed.replace(',', '.'));
    if (isNaN(num)) {
      return { speedNum: 0, speedError: 'Введите корректное число', speedWarning: null };
    }
    if (num <= 0) {
      return { speedNum: 0, speedError: 'Скорость должна быть больше нуля', speedWarning: null };
    }
    if (num > 300) {
      return { speedNum: 0, speedError: 'Скорость превышает допустимый предел (300 км/ч)', speedWarning: null };
    }

    let warning: string | null = null;
    if (num <= 20 || num >= 140) {
      warning = 'Скорость выходит за пределы таблицы, значения приняты по ближайшей границе.';
    } else if (num < 30 || num > 130) {
      warning = 'Скорость выходит за пределы таблицы, значения приняты по ближайшей границе.';
    }

    return { speedNum: num, speedError: null, speedWarning: warning };
  }, [speedStr]);

  // Валидация уклона для Ж.1
  const { slopeNum, slopeError } = useMemo(() => {
    const trimmed = slopeStr.trim();
    if (!trimmed) {
      return { slopeNum: 0, slopeError: 'Поле не может быть пустым' };
    }
    const num = Number(trimmed.replace(',', '.'));
    if (isNaN(num)) {
      return { slopeNum: 0, slopeError: 'Введите корректное число' };
    }
    if (num < 0) {
      return { slopeNum: 0, slopeError: 'Введите положительное число или переключите знак' };
    }
    if (num > 200) {
      return { slopeNum: 0, slopeError: 'Уклон превышает предельные значения (до 200 ‰)' };
    }
    return { slopeNum: num, slopeError: null };
  }, [slopeStr]);

  const isFormValid = !speedError && !slopeError && speedNum > 0;

  // Вычисление результата Ж.1 на лету
  const calculationResult = useMemo(() => {
    if (!isFormValid) {
      return null;
    }
    return calculateRadius(speedNum, slopeNum, slopeSign);
  }, [isFormValid, speedNum, slopeNum, slopeSign]);

  // Валидация скорости для Ж.2
  const { zh2SpeedNum, zh2SpeedError } = useMemo(() => {
    const trimmed = zh2SpeedStr.trim();
    if (!trimmed) {
      return { zh2SpeedNum: 0, zh2SpeedError: 'Поле не может быть пустым' };
    }
    const num = Number(trimmed.replace(',', '.'));
    if (isNaN(num)) {
      return { zh2SpeedNum: 0, zh2SpeedError: 'Введите корректное число' };
    }
    if (num <= 0) {
      return { zh2SpeedNum: 0, zh2SpeedError: 'Скорость должна быть больше нуля' };
    }
    if (num > 300) {
      return { zh2SpeedNum: 0, zh2SpeedError: 'Скорость превышает допустимый предел (300 км/ч)' };
    }
    return { zh2SpeedNum: num, zh2SpeedError: null };
  }, [zh2SpeedStr]);

  // Валидация радиуса для Ж.2
  const { zh2RadiusNum, zh2RadiusError } = useMemo(() => {
    const trimmed = zh2RadiusStr.trim();
    if (!trimmed) {
      return { zh2RadiusNum: 0, zh2RadiusError: 'Поле не может быть пустым' };
    }
    const num = Number(trimmed.replace(',', '.'));
    if (isNaN(num)) {
      return { zh2RadiusNum: 0, zh2RadiusError: 'Введите корректное число' };
    }
    if (num <= 0) {
      return { zh2RadiusNum: 0, zh2RadiusError: 'Радиус должен быть больше нуля' };
    }
    if (num > 50000) {
      return { zh2RadiusNum: 0, zh2RadiusError: 'Радиус превышает предельное значение' };
    }
    return { zh2RadiusNum: num, zh2RadiusError: null };
  }, [zh2RadiusStr]);

  const isZh2FormValid = !zh2SpeedError && !zh2RadiusError && zh2SpeedNum > 0 && zh2RadiusNum > 0;

  // Вычисление результата Ж.2 на лету
  const calculationZh2Result = useMemo(() => {
    if (!isZh2FormValid) {
      return null;
    }
    return calculateZh2(zh2SpeedNum, zh2RadiusNum, zh2IPermissible, zh2ICategoryLabel);
  }, [isZh2FormValid, zh2SpeedNum, zh2RadiusNum, zh2IPermissible, zh2ICategoryLabel]);

  // Вычисление результата Ж.3 на лету
  const calculationZh3Result = useMemo(() => {
    return calculateZh3(zh3LLength, zh3Radius, selectedVehicle.id, selectedVehicle.name);
  }, [zh3LLength, zh3Radius, selectedVehicle]);

  // Вычисление результата Ж.4 на лету
  const calculationZh4Result = useMemo(() => {
    const iVirazhNum = parseFloat(zh4IVirazh.replace(',', '.')) || 0;
    const iPopNum = parseFloat(zh4IPop.replace(',', '.')) || 0;
    const iSlopeIncreaseNum = parseFloat(zh4ISlopeIncrease.replace(',', '.')) || 0;
    const bCarriagewayNum = parseFloat(zh4BCarriageway.replace(',', '.')) || 0;

    return calculateZh4(iVirazhNum, iPopNum, zh4IPopSign, iSlopeIncreaseNum, bCarriagewayNum);
  }, [zh4IVirazh, zh4IPop, zh4IPopSign, zh4ISlopeIncrease, zh4BCarriageway]);

  return (
    <div className="min-h-screen bg-[#F3F3F3] dark:bg-[#1E1E1E] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Верхняя навигационная панель */}
      <header className="border-b border-slate-200/80 dark:border-neutral-800 bg-white/90 dark:bg-[#2D2D2D]/90 backdrop-blur-md sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0078D4] text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
              СП
            </div>
            {/* Выпадающий список заголовка */}
            <SectionSelector
              currentSection={section}
              onSelectSection={setSection}
            />
          </div>
        </div>
      </header>

      {/* Основной контент: Две колонки (Десктоп ПК) */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        {section === 'zh1' && (
          <div className="grid grid-cols-12 gap-6 items-stretch">
            {/* Левая колонка: Ввод параметров Ж.1 */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
              <InputCard
                speed={speedStr}
                slope={slopeStr}
                slopeSign={slopeSign}
                onSpeedChange={setSpeedStr}
                onSlopeChange={setSlopeStr}
                onSlopeSignChange={setSlopeSign}
                onOpenTableModal={() => setIsTableModalOpen(true)}
                speedWarning={speedWarning}
                speedError={speedError}
                slopeError={slopeError}
                isValid={isFormValid}
              />

              {/* Справка по формуле Ж.1 */}
              <div className="bg-white dark:bg-[#2D2D2D] rounded-xl p-5 shadow-md border border-slate-100 dark:border-neutral-800 text-xs text-slate-600 dark:text-neutral-400 flex-1 flex flex-col justify-start gap-3">
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-2">
                    <Sparkles size={14} className="text-sky-500" />
                    <span>Нормативная справка СП 396:</span>
                  </div>
                  <p className="leading-relaxed">
                    Формула <strong className="text-slate-800 dark:text-slate-200">Ж.1</strong> определяет предельно допустимый минимальный радиус закругления трассы в плане исходя из условий устойчивости автомобиля против заноса и опрокидывания при воздействии поперечной центробежной силы.
                  </p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-neutral-800/60 rounded-lg border border-slate-200/60 dark:border-neutral-700/60">
                  <div className="font-medium text-slate-700 dark:text-neutral-300 mb-1.5">О знаках уклона:</div>
                  <ul className="space-y-1 list-disc list-inside">
                    <li><strong>+ (Вираж)</strong>: уклон направлен к центру кривой, уменьшая необходимый радиус.</li>
                    <li><strong>− (От центра)</strong>: уклон направлен наружу, требуя существенно больший радиус для обеспечения безопасности движения.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Правая колонка: Расчеты и результат Ж.1 */}
            <div id="results-section" className="col-span-12 lg:col-span-7 flex flex-col h-full">
              {calculationResult ? (
                <ResultsCard result={calculationResult} />
              ) : (
                <div className="bg-white dark:bg-[#2D2D2D] rounded-xl p-8 shadow-md border border-slate-100 dark:border-neutral-800 text-center flex flex-col items-center justify-center h-full min-h-[460px]">
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-neutral-800 text-slate-400 flex items-center justify-center mb-3">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200 mb-1">
                    Ожидание ввода параметров
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 max-w-sm">
                    Введите расчетную скорость и величину уклона на панели слева для отображения пошагового математического расчета.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {section === 'zh2' && (
          <div className="grid grid-cols-12 gap-6 items-stretch">
            {/* Левая колонка: Ввод параметров Ж.2 */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
              <InputCardZh2
                speed={zh2SpeedStr}
                radius={zh2RadiusStr}
                iPermissible={zh2IPermissible}
                onSpeedChange={setZh2SpeedStr}
                onRadiusChange={setZh2RadiusStr}
                onIPermissibleChange={(val, label) => {
                  setZh2IPermissible(val);
                  setZh2ICategoryLabel(label);
                }}
                speedError={zh2SpeedError}
                radiusError={zh2RadiusError}
              />

              {/* Справка по формуле Ж.2 */}
              <div className="bg-white dark:bg-[#2D2D2D] rounded-xl p-5 shadow-md border border-slate-100 dark:border-neutral-800 text-xs text-slate-600 dark:text-neutral-400 flex-1 flex flex-col justify-start gap-3">
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-2">
                    <Sparkles size={14} className="text-sky-500" />
                    <span>Нормативная справка СП 396 (п. Ж.2):</span>
                  </div>
                  <p className="leading-relaxed">
                    Наименьшие длины переходных кривых следует определять расчетом по формуле <strong className="text-slate-800 dark:text-slate-200">Ж.2</strong>:
                  </p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-neutral-800/60 rounded-lg border border-slate-200/60 dark:border-neutral-700/60 space-y-1.5">
                  <div className="font-semibold text-slate-700 dark:text-neutral-300">Обозначения параметров:</div>
                  <ul className="space-y-1">
                    <li><strong className="text-slate-800 dark:text-neutral-200">L</strong> — длина переходной кривой, м;</li>
                    <li><strong className="text-slate-800 dark:text-neutral-200">V<sub>расч</sub></strong> — расчетная скорость, км/ч;</li>
                    <li><strong className="text-slate-800 dark:text-neutral-200">R</strong> — радиус кривой в плане, м;</li>
                    <li><strong className="text-slate-800 dark:text-neutral-200">I<sub>доп</sub></strong> — допустимая скорость нарастания центробежного ускорения: <strong>0,8 м/с³</strong> для магистральных дорог и улиц общегородского/районного значения; <strong>1,0 м/с³</strong> для всех остальных дорог и улиц.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Правая колонка: Расчеты и результат Ж.2 */}
            <div id="results-section-zh2" className="col-span-12 lg:col-span-7 flex flex-col h-full">
              {calculationZh2Result ? (
                <ResultsCardZh2 result={calculationZh2Result} />
              ) : (
                <div className="bg-white dark:bg-[#2D2D2D] rounded-xl p-8 shadow-md border border-slate-100 dark:border-neutral-800 text-center flex flex-col items-center justify-center h-full min-h-[460px]">
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-neutral-800 text-slate-400 flex items-center justify-center mb-3">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200 mb-1">
                    Ожидание ввода параметров
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 max-w-sm">
                    Введите расчетную скорость и радиус кривой на панели слева для отображения пошагового расчета переходной кривой.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {section === 'zh3' && (
          <div className="grid grid-cols-12 gap-6 items-stretch">
            {/* Левая колонка: Ввод параметров Ж.3 */}
            <div className="col-span-12 lg:col-span-5 flex flex-col h-full">
              <InputCardZh3
                selectedVehicle={selectedVehicle}
                onSelectVehicle={(veh) => {
                  setSelectedVehicle(veh);
                  setZh3LLength(veh.lCalculated);
                }}
                lLength={zh3LLength}
                onLLengthChange={setZh3LLength}
                radius={zh3Radius}
                onRadiusChange={setZh3Radius}
                onOpenTableE1={() => setIsTableE1Open(true)}
                onOpenTableA4={() => setIsTableA4Open(true)}
                onOpenTableM1={() => setIsTableM1Open(true)}
              />
            </div>

            {/* Правая колонка: Расчеты и результат Ж.3 */}
            <div id="results-section-zh3" className="col-span-12 lg:col-span-7 flex flex-col h-full">
              {calculationZh3Result ? (
                <ResultsCardZh3
                  result={calculationZh3Result}
                  selectedVehicle={selectedVehicle}
                />
              ) : (
                <div className="bg-white dark:bg-[#202020] rounded-2xl p-8 shadow-sm border border-slate-200/80 dark:border-neutral-800 text-center flex flex-col items-center justify-center h-full min-h-[460px]">
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-neutral-800 text-slate-400 flex items-center justify-center mb-3">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200 mb-1">
                    Ожидание ввода параметров
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 max-w-sm">
                    Введите длину L и радиус кривой R для отображения расчета уширения полосы движения.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {section === 'zh4' && (
          <div className="grid grid-cols-12 gap-6 items-stretch">
            {/* Левая колонка: Ввод параметров Ж.4 */}
            <div className="col-span-12 lg:col-span-5 flex flex-col h-full">
              <InputCardZh4
                iVirazh={zh4IVirazh}
                onIVirazhChange={setZh4IVirazh}
                iPop={zh4IPop}
                onIPopChange={setZh4IPop}
                iPopSign={zh4IPopSign}
                onIPopSignChange={setZh4IPopSign}
                iSlopeIncrease={zh4ISlopeIncrease}
                onISlopeIncreaseChange={setZh4ISlopeIncrease}
                bCarriageway={zh4BCarriageway}
                onBCarriagewayChange={setZh4BCarriageway}
                onOpenManualModal={() => setIsManual7614Open(true)}
              />
            </div>

            {/* Правая колонка: Расчеты и результат Ж.4 */}
            <div id="results-section-zh4" className="col-span-12 lg:col-span-7 flex flex-col h-full">
              <ResultsCardZh4 calculation={calculationZh4Result} />
            </div>
          </div>
        )}
      </main>

      {/* Модальное окно: Таблица Ж.1 */}
      <TableModal
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
        currentSpeed={speedNum || 80}
      />

      {/* Модальное окно: Сборка EXE */}
      <ExeGuideModal
        isOpen={isExeModalOpen}
        onClose={() => setIsExeModalOpen(false)}
      />

      {/* Модальное окно: Таблица Е.1 (Параметры расчетных ТС) */}
      <TableE1Modal
        isOpen={isTableE1Open}
        onClose={() => setIsTableE1Open(false)}
        onSelectVehicle={(veh) => {
          setSelectedVehicle(veh);
          setZh3LLength(veh.lCalculated);
        }}
        selectedVehicleId={selectedVehicle.id}
      />

      {/* Модальное окно: Таблица А.4 (Рекомендуемые типы ТС - Справочно) */}
      <TableA4Modal
        isOpen={isTableA4Open}
        onClose={() => setIsTableA4Open(false)}
      />

      {/* Модальное окно: Приложение М (Таблица М.1) */}
      <TableM1Modal
        isOpen={isTableM1Open}
        onClose={() => setIsTableM1Open(false)}
      />

      {/* Модальное окно: Справочный материал п. 7.6.14 - 7.6.18 */}
      <Manual7614Modal
        isOpen={isManual7614Open}
        onClose={() => setIsManual7614Open(false)}
      />
    </div>
  );
}
