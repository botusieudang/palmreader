export interface NumerologyInput {
  fullName: string;
  birthDate: string; // DD/MM/YYYY
}

export interface BirthChart {
  grid: number[][]; // 3x3 grid with counts
  presentNumbers: number[];
  missingNumbers: number[];
  arrows: Arrow[];
}

export interface Arrow {
  name: string;
  numbers: number[];
  meaning: string;
  type: 'present' | 'missing';
}

export interface Pinnacle {
  period: string;
  ages: string;
  number: number;
  meaning: string;
}

export interface Challenge {
  period: string;
  number: number;
  meaning: string;
}

export interface PersonalYear {
  year: number;
  number: number;
  theme: string;
  description: string;
}

export interface NumerologyResult {
  // Core numbers
  lifePath: number;
  lifePathMaster: number | null; // 11, 22, 33
  expression: number;
  expressionMaster: number | null;
  soulUrge: number;
  soulUrgeMaster: number | null;
  personality: number;
  personalityMaster: number | null;
  birthday: number;

  // Birth chart
  birthChart: BirthChart;

  // Life stages
  pinnacles: Pinnacle[];
  challenges: Challenge[];

  // Current year
  personalYear: PersonalYear;

  // Future years
  personalYears: PersonalYear[];
}
