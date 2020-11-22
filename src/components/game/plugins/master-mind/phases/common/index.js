import { getPlayerNumber } from '@/lib/get-player-number';

const LETTERS = [
  '',
  'ABCDEFGH',
  'IJKLMNOP',
  'QRSTUVYX'
];

const COMBINATIONS = [
  '',
  'DBFA',
  'KNMI',
  'XTRU',
];


const countOk = (currentCombination, realCombination) =>
  currentCombination.split('')
    .map((x, idx) => realCombination[idx] === x)
    .filter(r => r === true).length;

const countMid = (currentCombination, realCombination) =>
  currentCombination.split('')
    .map((x, idx) => (realCombination[idx] !== x) && (realCombination.indexOf(x)>=0))
    .filter(r => r === true).length;

const countKo = (currentCombination, realCombination) =>
  currentCombination.split('')
    .map(x => realCombination.indexOf(x) === -1)
    .filter(r => r === true).length;

const timesOk = (theTry) => {
  if (!theTry) return 0;
  const playerNumber = getPlayerNumber() || 3;
  return countOk(theTry, COMBINATIONS[playerNumber]);
};

const timesMid = (theTry) => {
  if (!theTry) return 0;
  const playerNumber = getPlayerNumber() || 3;
  return countMid(theTry, COMBINATIONS[playerNumber]);
};

const timesKo = (theTry) => {
  if (!theTry) return 0;
  const playerNumber = getPlayerNumber() || 3;
  return countKo(theTry, COMBINATIONS[playerNumber]);
};

export { LETTERS, COMBINATIONS, timesOk, timesMid, timesKo };
