import { TableRow, InterpolationStep, CalculationResult, CalculationZh2Result, CalculationZh3Result } from '../types';

export const TABLE_ZH1: TableRow[] = [
  { speed: 130, mu: 0.09 },
  { speed: 120, mu: 0.09 },
  { speed: 100, mu: 0.12 },
  { speed: 80, mu: 0.14 },
  { speed: 60, mu: 0.15 },
  { speed: 50, mu: 0.16 },
  { speed: 40, mu: 0.17 },
  { speed: 30, mu: 0.18 },
];

// Упорядоченный по возрастанию скорости массив для интерполяции
export const SORTED_TABLE: TableRow[] = [...TABLE_ZH1].sort((a, b) => a.speed - b.speed);

/**
 * Определение коэффициента поперечной силы mu по скорости с интерполяцией
 */
export function getMu(speed: number): InterpolationStep {
  // Проверка граничных условий
  if (speed <= 30) {
    const isBelow = speed < 30;
    return {
      speed,
      mu: 0.18,
      isExact: speed === 30,
      isOutOfRange: isBelow,
      outOfRangeSide: isBelow ? 'low' : undefined,
      explanation: isBelow
        ? `Скорость ${speed} км/ч меньше нижней границы таблицы (30 км/ч). Значение принято по нижней границе: \\mu = 0.18`
        : `Для скорости 30 км/ч \\mu = 0.18 (по табл. Ж.1)`,
      latexFormula: `\\mu = 0.18`,
    };
  }

  if (speed >= 130) {
    const isAbove = speed > 130;
    return {
      speed,
      mu: 0.09,
      isExact: speed === 130,
      isOutOfRange: isAbove,
      outOfRangeSide: isAbove ? 'high' : undefined,
      explanation: isAbove
        ? `Скорость ${speed} км/ч превышает верхнюю границу таблицы (130 км/ч). Значение принято по верхней границе: \\mu = 0.09`
        : `Для скорости 130 км/ч \\mu = 0.09 (по табл. Ж.1)`,
      latexFormula: `\\mu = 0.09`,
    };
  }

  // Проверка на точное совпадение
  const exactMatch = TABLE_ZH1.find((row) => row.speed === speed);
  if (exactMatch) {
    return {
      speed,
      mu: exactMatch.mu,
      isExact: true,
      isOutOfRange: false,
      explanation: `Для скорости ${speed} км/ч \\mu = ${exactMatch.mu} (точное значение по таблице Ж.1)`,
      latexFormula: `\\mu = ${exactMatch.mu}`,
    };
  }

  // Поиск интервала [vLower, vUpper]
  let lower = SORTED_TABLE[0];
  let upper = SORTED_TABLE[SORTED_TABLE.length - 1];

  for (let i = 0; i < SORTED_TABLE.length - 1; i++) {
    if (speed >= SORTED_TABLE[i].speed && speed <= SORTED_TABLE[i + 1].speed) {
      lower = SORTED_TABLE[i];
      upper = SORTED_TABLE[i + 1];
      break;
    }
  }

  // Линейная интерполяция
  // mu = mu_lower + (mu_upper - mu_lower) * (speed - lower.speed) / (upper.speed - lower.speed)
  const fraction = (speed - lower.speed) / (upper.speed - lower.speed);
  const rawMu = lower.mu + (upper.mu - lower.mu) * fraction;
  const mu = Math.round(rawMu * 10000) / 10000;

  const latexFormula = `\\mu = \\mu_1 + (\\mu_2 - \\mu_1) \\cdot \\frac{V_{расч} - V_1}{V_2 - V_1}`;
  const latexSubstitution = `\\mu = ${lower.mu} + (${upper.mu} - ${lower.mu}) \\cdot \\frac{${speed} - ${lower.speed}}{${upper.speed} - ${lower.speed}} = ${mu}`;

  return {
    speed,
    mu,
    isExact: false,
    isOutOfRange: false,
    lowerPoint: lower,
    upperPoint: upper,
    latexFormula,
    latexSubstitution,
    explanation: `Линейная интерполяция между ${lower.speed} км/ч (\\mu=${lower.mu}) и ${upper.speed} км/ч (\\mu=${upper.mu})`,
  };
}

/**
 * Строительное округление радиуса (нормативные значения по СП 396/СП 34)
 */
export function getRecommendedRadius(exactRadius: number): number {
  if (exactRadius <= 0) return 0;
  if (exactRadius < 100) {
    return Math.ceil(exactRadius / 5) * 5;
  }
  if (exactRadius < 300) {
    return Math.ceil(exactRadius / 10) * 10;
  }
  if (exactRadius < 1000) {
    return Math.ceil(exactRadius / 25) * 25;
  }
  return Math.ceil(exactRadius / 50) * 50;
}

/**
 * Основной расчет минимального радиуса по СП 396, Приложение Ж
 */
export function calculateRadius(
  speed: number,
  slopePermille: number,
  slopeSign: 1 | -1
): CalculationResult {
  const interpolation = getMu(speed);
  const mu = interpolation.mu;

  // Перевод промилле в доли
  const absSlopePermille = Math.abs(slopePermille);
  const slopeFraction = absSlopePermille / 1000;
  const signedSlopeFraction = slopeSign * slopeFraction;

  let warningMessage: string | null = null;
  if (speed <= 20 || speed >= 140) {
    warningMessage = 'Скорость выходит за пределы таблицы, значения приняты по ближайшей границе.';
  } else if (interpolation.isOutOfRange) {
    warningMessage = 'Скорость выходит за пределы таблицы, значения приняты по ближайшей границе.';
  }

  // Физический смысл знака:
  // При вираже в сторону центра кривой (+): уклон помогает повороту -> (mu + i_п)
  // При уклоне от центра кривой (-): уклон мешает повороту -> (mu - i_п)
  const innerParenthesis = mu + signedSlopeFraction;
  const denominator = 127 * innerParenthesis;
  const vSquared = speed * speed;

  // Проверка на деление на ноль или отрицательный знаменатель
  if (innerParenthesis <= 0 || denominator <= 0) {
    return {
      isValid: false,
      errorMessage: 'Некорректные параметры: уклон слишком велик для данной скорости',
      warningMessage,
      speed,
      slopePermille: absSlopePermille,
      slopeFraction,
      slopeSign,
      signedSlopeFraction,
      mu,
      interpolation,
      vSquared,
      innerParenthesis,
      denominator,
      radiusExact: 0,
      radiusRounded: 0,
      radiusRecommended: 0,
    };
  }

  const radiusExact = vSquared / denominator;
  const radiusRounded = Math.round(radiusExact * 100) / 100;
  const radiusRecommended = getRecommendedRadius(radiusExact);

  return {
    isValid: true,
    errorMessage: null,
    warningMessage,
    speed,
    slopePermille: absSlopePermille,
    slopeFraction,
    slopeSign,
    signedSlopeFraction,
    mu,
    interpolation,
    vSquared,
    innerParenthesis: Math.round(innerParenthesis * 10000) / 10000,
    denominator: Math.round(denominator * 10000) / 10000,
    radiusExact,
    radiusRounded,
    radiusRecommended,
  };
}

/**
 * Расчет наименьшей длины переходной кривой по СП 396, Приложение Ж, п. Ж.2 (формула Ж.2)
 * L >= V_расч^3 / (47 * R * I_доп)
 */
export function calculateZh2(
  speed: number,
  radius: number,
  iPermissible: number,
  iCategoryLabel: string
): CalculationZh2Result {
  if (speed <= 0 || radius <= 0 || iPermissible <= 0) {
    return {
      isValid: false,
      errorMessage: 'Все параметры (скорость, радиус, Iдоп) должны быть положительными числами',
      speed,
      vCubed: speed > 0 ? Math.pow(speed, 3) : 0,
      radius,
      iPermissible,
      iCategoryLabel,
      denominator: 0,
      lengthExact: 0,
      lengthRounded: 0,
      lengthRecommended: 0,
    };
  }

  const vCubed = Math.pow(speed, 3);
  const denominator = 47 * radius * iPermissible;

  if (denominator <= 0) {
    return {
      isValid: false,
      errorMessage: 'Знаменатель формулы равен нулю или меньше нуля',
      speed,
      vCubed,
      radius,
      iPermissible,
      iCategoryLabel,
      denominator: 0,
      lengthExact: 0,
      lengthRounded: 0,
      lengthRecommended: 0,
    };
  }

  const lengthExact = vCubed / denominator;
  const lengthRounded = Math.round(lengthExact * 100) / 100;
  // Строительное округление: округление в большую сторону кратно 5 м (но не менее 10 м)
  const lengthRecommended = Math.max(10, Math.ceil(lengthExact / 5) * 5);

  return {
    isValid: true,
    errorMessage: null,
    speed,
    vCubed: Math.round(vCubed * 100) / 100,
    radius,
    iPermissible,
    iCategoryLabel,
    denominator: Math.round(denominator * 100) / 100,
    lengthExact,
    lengthRounded,
    lengthRecommended,
  };
}

/**
 * Расчет по формуле Ж.3: Величина уширения одной полосы движения
 * Delta = L^2 / (2 * R)
 * @param lLength Длина расчетного ТС от переднего бампера до задней оси (м)
 * @param radius Радиус кривой в плане (м)
 * @param vehicleId Идентификатор выбранного ТС
 * @param vehicleName Наименование ТС
 */
export function calculateZh3(
  lLength: number,
  radius: number,
  vehicleId: string = 'truck',
  vehicleName: string = 'Грузовой автомобиль'
): CalculationZh3Result {
  if (isNaN(radius) || radius <= 0) {
    return {
      isValid: false,
      errorMessage: 'Радиус кривой в плане R должен быть положительным числом больше 0',
      vehicleId,
      vehicleName,
      lLength,
      lSquared: 0,
      radius,
      twoR: 0,
      deltaExact: 0,
      deltaRounded: 0,
      deltaRecommended: 0,
    };
  }

  if (isNaN(lLength) || lLength <= 0) {
    return {
      isValid: false,
      errorMessage: 'Длина расчетного автомобиля L должна быть больше 0',
      vehicleId,
      vehicleName,
      lLength,
      lSquared: 0,
      radius,
      twoR: 0,
      deltaExact: 0,
      deltaRounded: 0,
      deltaRecommended: 0,
    };
  }

  const lSquared = lLength * lLength;
  const twoR = 2 * radius;
  const deltaExact = lSquared / twoR;
  const deltaRounded = Math.round(deltaExact * 100) / 100;
  // Строительное округление: с шагом 0.05 м в большую сторону
  const deltaRecommended = Math.ceil(deltaExact * 20) / 20;

  return {
    isValid: true,
    errorMessage: null,
    vehicleId,
    vehicleName,
    lLength,
    lSquared: Math.round(lSquared * 1000) / 1000,
    radius,
    twoR: Math.round(twoR * 100) / 100,
    deltaExact,
    deltaRounded,
    deltaRecommended,
  };
}

/**
 * Расчет минимальной длины участка отгона виража по формуле Ж.4 СП 396.1325800.2018
 * L = ((i_в - i_поп) / I) * B_пч
 */
export function calculateZh4(
  iVirazh: number,
  iPopValue: number,
  iPopSign: 1 | -1,
  iSlopeIncrease: number,
  bCarriageway: number
): import('../types').CalculationZh4Result {
  const iPopSigned = iPopSign * Math.abs(iPopValue);

  if (isNaN(iVirazh) || iVirazh <= 0) {
    return {
      isValid: false,
      errorMessage: 'Поперечный уклон виража i_в должен быть больше 0',
      warningMessage: null,
      iVirazh,
      iPopValue,
      iPopSign,
      iPopSigned,
      numeratorDelta: 0,
      iSlopeIncrease,
      bCarriageway,
      lengthExact: 0,
      lengthRounded: 0,
      lengthRecommended: 0,
      isBelowMinReconstruction: false,
    };
  }

  if (isNaN(iSlopeIncrease) || iSlopeIncrease <= 0) {
    return {
      isValid: false,
      errorMessage: 'Величина нарастания продольного уклона I должна быть больше 0',
      warningMessage: null,
      iVirazh,
      iPopValue,
      iPopSign,
      iPopSigned,
      numeratorDelta: 0,
      iSlopeIncrease,
      bCarriageway,
      lengthExact: 0,
      lengthRounded: 0,
      lengthRecommended: 0,
      isBelowMinReconstruction: false,
    };
  }

  if (isNaN(bCarriageway) || bCarriageway <= 0) {
    return {
      isValid: false,
      errorMessage: 'Расстояние B_пч должно быть больше 0',
      warningMessage: null,
      iVirazh,
      iPopValue,
      iPopSign,
      iPopSigned,
      numeratorDelta: 0,
      iSlopeIncrease,
      bCarriageway,
      lengthExact: 0,
      lengthRounded: 0,
      lengthRecommended: 0,
      isBelowMinReconstruction: false,
    };
  }

  const numeratorDelta = iVirazh - iPopSigned;
  const lengthExact = (numeratorDelta / iSlopeIncrease) * bCarriageway;
  const lengthRounded = Math.round(lengthExact * 100) / 100;
  const isBelowMinReconstruction = lengthRounded < 30.0;
  const lengthRecommended = isBelowMinReconstruction ? 30.0 : Math.ceil(lengthRounded * 2) / 2;

  let warningMessage: string | null = null;
  if (iSlopeIncrease > 20) {
    warningMessage = 'Величина I превышает максимально допустимое значение 20‰ (п. Ж.4).';
  } else if (iSlopeIncrease > 10) {
    warningMessage = 'Величина I превышает 10‰ (допускается только в сложных условиях).';
  }

  return {
    isValid: true,
    errorMessage: null,
    warningMessage,
    iVirazh,
    iPopValue,
    iPopSign,
    iPopSigned,
    numeratorDelta: Math.round(numeratorDelta * 100) / 100,
    iSlopeIncrease,
    bCarriageway,
    lengthExact,
    lengthRounded,
    lengthRecommended,
    isBelowMinReconstruction,
  };
}



