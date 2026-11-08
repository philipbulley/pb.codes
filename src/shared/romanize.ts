const numerals = [
  ['M', 1000],
  ['CM', 900],
  ['D', 500],
  ['CD', 400],
  ['C', 100],
  ['XC', 90],
  ['L', 50],
  ['XL', 40],
  ['X', 10],
  ['IX', 9],
  ['V', 5],
  ['IV', 4],
  ['I', 1],
] as const;

/** Converts a positive integer to Roman numerals, e.g. 2026 -> MMXXVI */
const romanize = (num: number) => {
  let remaining = num;

  return numerals
    .map(([numeral, value]) => {
      const count = Math.floor(remaining / value);
      remaining %= value;
      return numeral.repeat(count);
    })
    .join('');
};

export default romanize;
