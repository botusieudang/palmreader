import type {
  NumerologyInput,
  NumerologyResult,
  BirthChart,
  Arrow,
  Pinnacle,
  Challenge,
  PersonalYear,
} from '../types/numerology';

// Pythagorean number map
const LETTER_VALUES: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
  s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
};

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);

// In Vietnamese numerology, Y is treated as vowel when it's the main vowel sound
function isVowel(char: string, word: string, index: number): boolean {
  if (VOWELS.has(char)) return true;
  if (char === 'y') {
    // Y is vowel if no other vowel in the syllable or it acts as primary vowel
    const otherVowels = word.split('').filter((c, i) => i !== index && VOWELS.has(c));
    return otherVowels.length === 0;
  }
  return false;
}

function removeVietnameseDiacritics(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

function reduceToSingle(num: number, keepMaster = true): number {
  if (keepMaster && (num === 11 || num === 22 || num === 33)) return num;
  while (num > 9) {
    num = String(num).split('').reduce((s, d) => s + parseInt(d), 0);
    if (keepMaster && (num === 11 || num === 22 || num === 33)) return num;
  }
  return num;
}

function sumDigits(num: number): number {
  return String(num).split('').reduce((s, d) => s + parseInt(d), 0);
}

function masterOrReduce(num: number): { base: number; master: number | null } {
  // Check for master number before final reduction
  let current = num;
  while (current > 9) {
    if (current === 11 || current === 22 || current === 33) {
      return { base: reduceToSingle(current, false), master: current };
    }
    current = sumDigits(current);
  }
  return { base: current, master: null };
}

// ---- Core Number Calculations ----

function calcLifePath(day: number, month: number, year: number) {
  const total = sumDigits(day) + sumDigits(month) + sumDigits(year);
  // Keep reducing but check for master numbers
  let current = total;
  while (current > 9) {
    if (current === 11 || current === 22 || current === 33) break;
    current = sumDigits(current);
  }
  const base = current > 9 ? sumDigits(current) : current;
  const master = current > 9 ? current : null;

  // Recalculate properly: reduce each component first, then sum
  const dayReduced = reduceToSingle(sumDigits(day), false);
  const monthReduced = reduceToSingle(sumDigits(month), false);
  const yearReduced = reduceToSingle(sumDigits(year), true);
  const yearFinal = reduceToSingle(yearReduced, false);

  const totalProper = dayReduced + monthReduced + yearFinal;
  let lp = totalProper;
  let lpMaster: number | null = null;
  while (lp > 9) {
    if (lp === 11 || lp === 22 || lp === 33) {
      lpMaster = lp;
      break;
    }
    lp = sumDigits(lp);
  }
  if (lp > 9) lp = reduceToSingle(lp, false);

  return { lifePath: lp, lifePathMaster: lpMaster };
}

function calcNameNumbers(fullName: string) {
  const cleaned = removeVietnameseDiacritics(fullName).toLowerCase();
  const words = cleaned.split(/\s+/).filter(Boolean);

  let vowelSum = 0;
  let consonantSum = 0;
  let totalSum = 0;

  for (const word of words) {
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      const value = LETTER_VALUES[char];
      if (!value) continue;

      totalSum += value;
      if (isVowel(char, word, i)) {
        vowelSum += value;
      } else {
        consonantSum += value;
      }
    }
  }

  const expression = masterOrReduce(totalSum);
  const soulUrge = masterOrReduce(vowelSum);
  const personality = masterOrReduce(consonantSum);

  return {
    expression: expression.base,
    expressionMaster: expression.master,
    soulUrge: soulUrge.base,
    soulUrgeMaster: soulUrge.master,
    personality: personality.base,
    personalityMaster: personality.master,
  };
}

// ---- Birth Chart ----

const ARROW_DEFINITIONS = [
  // Rows
  { numbers: [1, 2, 3], name: 'Mui ten Ke Hoach', meaning: 'Co kha nang lap ke hoach va to chuc tot' },
  { numbers: [4, 5, 6], name: 'Mui ten Y Chi', meaning: 'Quyet tam manh me, kien tri theo duoi muc tieu' },
  { numbers: [7, 8, 9], name: 'Mui ten Hanh Dong', meaning: 'Nang luc hanh dong va thuc thi xuat sac' },
  // Columns
  { numbers: [1, 4, 7], name: 'Mui ten The Chat', meaning: 'Suc khoe the chat tot, nang luong doi dao' },
  { numbers: [2, 5, 8], name: 'Mui ten Cam Xuc', meaning: 'Doi song cam xuc phong phu, noi tam sau sac' },
  { numbers: [3, 6, 9], name: 'Mui ten Tri Tue', meaning: 'Tri tue sac ben, kha nang tu duy logic' },
  // Diagonals
  { numbers: [1, 5, 9], name: 'Mui ten Quyet Tam', meaning: 'Y chi sat da, kien dinh voi muc tieu da chon' },
  { numbers: [3, 5, 7], name: 'Mui ten Tam Linh', meaning: 'Truc giac manh, ket noi tam linh sau sac' },
];

const MISSING_ARROW_DEFINITIONS = [
  { numbers: [1, 2, 3], name: 'Thieu Ke Hoach', meaning: 'Can hoc cach lap ke hoach va to chuc cuoc song' },
  { numbers: [4, 5, 6], name: 'Thieu Y Chi', meaning: 'De bo cuoc, can ren luyen su kien tri' },
  { numbers: [7, 8, 9], name: 'Thieu Hanh Dong', meaning: 'Hay tri hoan, can tap hanh dong ngay' },
  { numbers: [1, 4, 7], name: 'Thieu The Chat', meaning: 'Can chu y suc khoe, tap the duc deu dan' },
  { numbers: [2, 5, 8], name: 'Thieu Cam Xuc', meaning: 'Kho bieu dat cam xuc, can hoc cach mo long' },
  { numbers: [3, 6, 9], name: 'Thieu Tri Tue', meaning: 'Can phat trien tu duy logic va kha nang hoc hoi' },
  { numbers: [1, 5, 9], name: 'Thieu Quyet Tam', meaning: 'Thieu muc dich song, can tim ra dieu minh thuc su muon' },
  { numbers: [3, 5, 7], name: 'Thieu Tam Linh', meaning: 'Thieu ket noi noi tam, can hoc thien dinh' },
];

function calcBirthChart(dateStr: string): BirthChart {
  const digits = dateStr.replace(/\D/g, '').split('').map(Number).filter(d => d > 0);

  // Count occurrences
  const counts: Record<number, number> = {};
  for (let i = 1; i <= 9; i++) counts[i] = 0;
  for (const d of digits) {
    if (d >= 1 && d <= 9) counts[d]++;
  }

  const presentNumbers = Object.entries(counts).filter(([_, c]) => c > 0).map(([n]) => parseInt(n));
  const missingNumbers = Object.entries(counts).filter(([_, c]) => c === 0).map(([n]) => parseInt(n));

  // Grid: Lo Shu arrangement
  // Row 0: 3, 6, 9
  // Row 1: 2, 5, 8
  // Row 2: 1, 4, 7
  const grid = [
    [counts[3], counts[6], counts[9]],
    [counts[2], counts[5], counts[8]],
    [counts[1], counts[4], counts[7]],
  ];

  // Check arrows
  const arrows: Arrow[] = [];
  const presentSet = new Set(presentNumbers);

  for (const def of ARROW_DEFINITIONS) {
    if (def.numbers.every(n => presentSet.has(n))) {
      arrows.push({ ...def, type: 'present' });
    }
  }

  for (const def of MISSING_ARROW_DEFINITIONS) {
    if (def.numbers.every(n => !presentSet.has(n))) {
      arrows.push({ ...def, type: 'missing' });
    }
  }

  return { grid, presentNumbers, missingNumbers, arrows };
}

// ---- Pinnacles & Challenges ----

function calcPinnacles(day: number, month: number, year: number, lifePath: number): Pinnacle[] {
  const dayR = reduceToSingle(day, false);
  const monthR = reduceToSingle(month, false);
  const yearR = reduceToSingle(sumDigits(year), false);

  const firstEnd = 36 - lifePath;

  const p1 = reduceToSingle(monthR + dayR, true);
  const p2 = reduceToSingle(dayR + yearR, true);
  const p3 = reduceToSingle(p1 + p2, true);
  const p4 = reduceToSingle(monthR + yearR, true);

  return [
    { period: 'Dinh cao 1', ages: `0 - ${firstEnd}`, number: p1, meaning: '' },
    { period: 'Dinh cao 2', ages: `${firstEnd + 1} - ${firstEnd + 9}`, number: p2, meaning: '' },
    { period: 'Dinh cao 3', ages: `${firstEnd + 10} - ${firstEnd + 18}`, number: p3, meaning: '' },
    { period: 'Dinh cao 4', ages: `${firstEnd + 19}+`, number: p4, meaning: '' },
  ];
}

function calcChallenges(day: number, month: number, year: number): Challenge[] {
  const dayR = reduceToSingle(day, false);
  const monthR = reduceToSingle(month, false);
  const yearR = reduceToSingle(sumDigits(year), false);

  const c1 = Math.abs(monthR - dayR);
  const c2 = Math.abs(dayR - yearR);
  const c3 = Math.abs(c1 - c2);
  const c4 = Math.abs(monthR - yearR);

  return [
    { period: 'Thu thach 1', number: c1, meaning: '' },
    { period: 'Thu thach 2', number: c2, meaning: '' },
    { period: 'Thu thach 3', number: c3, meaning: '' },
    { period: 'Thu thach 4', number: c4, meaning: '' },
  ];
}

// ---- Personal Year ----

function calcPersonalYear(day: number, month: number, year: number): PersonalYear {
  const dayR = reduceToSingle(day, false);
  const monthR = reduceToSingle(month, false);
  const yearR = reduceToSingle(sumDigits(year), false);
  const py = reduceToSingle(dayR + monthR + yearR, false);

  return { year, number: py, theme: '', description: '' };
}

function calcPersonalYears(day: number, month: number, startYear: number, count: number): PersonalYear[] {
  const years: PersonalYear[] = [];
  for (let i = 0; i < count; i++) {
    years.push(calcPersonalYear(day, month, startYear + i));
  }
  return years;
}

// ---- Main Calculator ----

export function calculateNumerology(input: NumerologyInput): NumerologyResult {
  const [dayStr, monthStr, yearStr] = input.birthDate.split('/');
  const day = parseInt(dayStr);
  const month = parseInt(monthStr);
  const year = parseInt(yearStr);

  const { lifePath, lifePathMaster } = calcLifePath(day, month, year);
  const nameNumbers = calcNameNumbers(input.fullName);
  const birthday = reduceToSingle(day, true);
  const birthChart = calcBirthChart(input.birthDate);

  const currentYear = new Date().getFullYear();
  const pinnacles = calcPinnacles(day, month, year, lifePath);
  const challenges = calcChallenges(day, month, year);
  const personalYear = calcPersonalYear(day, month, currentYear);
  const personalYears = calcPersonalYears(day, month, currentYear, 9);

  return {
    lifePath,
    lifePathMaster,
    ...nameNumbers,
    birthday,
    birthChart,
    pinnacles,
    challenges,
    personalYear,
    personalYears,
  };
}
