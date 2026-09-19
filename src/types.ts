export type SectionType = 'zh1' | 'zh2' | 'zh3' | 'zh4';

export interface CalculationZh4Result {
  isValid: boolean;
  errorMessage: string | null;
  warningMessage: string | null;
  iVirazh: number; // i_в, ‰
  iPopValue: number; // |i_поп|, ‰
  iPopSign: 1 | -1; // -1: в противоположную сторону (двускатный), 1: в сторону виража
  iPopSigned: number; // i_поп со знаком, ‰
  numeratorDelta: number; // i_в - i_поп
  iSlopeIncrease: number; // I, ‰
  bCarriageway: number; // B_пч, м
  lengthExact: number; // L точное, м
  lengthRounded: number; // L округленное, м
  lengthRecommended: number; // L с учетом п. 7.6.17 (мин 30 м при реконструкции)
  isBelowMinReconstruction: boolean;
}

export interface CalculationZh2Result {
  isValid: boolean;
  errorMessage: string | null;
  speed: number;
  vCubed: number;
  radius: number;
  iPermissible: number;
  iCategoryLabel: string;
  denominator: number;
  lengthExact: number;
  lengthRounded: number;
  lengthRecommended: number;
}

export interface TableRow {
  speed: number;
  mu: number;
}

export interface InterpolationStep {
  speed: number;
  mu: number;
  isExact: boolean;
  isOutOfRange: boolean;
  outOfRangeSide?: 'low' | 'high';
  lowerPoint?: TableRow;
  upperPoint?: TableRow;
  latexFormula?: string;
  latexSubstitution?: string;
  explanation: string;
}

export interface CalculationResult {
  isValid: boolean;
  errorMessage: string | null;
  warningMessage: string | null;
  speed: number;
  slopePermille: number; // e.g. 20 for 20 ‰
  slopeFraction: number; // e.g. 0.02
  slopeSign: 1 | -1; // 1: к центру (вираж), -1: от центра
  signedSlopeFraction: number; // e.g. +0.02 or -0.02
  mu: number;
  interpolation: InterpolationStep;
  vSquared: number;
  innerParenthesis: number; // (mu ± i)
  denominator: number; // 127 * (mu ± i)
  radiusExact: number;
  radiusRounded: number; // 2 decimals
  radiusRecommended: number; // Строительное округление
}

export interface VehicleTypeE1 {
  id: string;
  name: string;
  code: string;
  wheelbase: string;
  lengthTotal: number;
  widthTotal: number;
  overhangFront: number;
  overhangRear: number;
  lCalculated: number; // Длина от переднего бампера до задней оси
}

export interface CalculationZh3Result {
  isValid: boolean;
  errorMessage: string | null;
  vehicleId: string;
  vehicleName: string;
  lLength: number;
  lSquared: number;
  radius: number;
  twoR: number;
  deltaExact: number;
  deltaRounded: number;
  deltaRecommended: number;
}

