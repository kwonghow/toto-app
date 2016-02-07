import findIndex from 'lodash/array/findIndex';

import config from 'config';
import { getRandomInt, getRandomIntSet } from 'helpers/NumberHelper';

/**
 * Evaluates the number of matches based on chosen set vs winning set +
 * additional number.
 *
 * @param  {Array} chosenNumbers
 * @param  {Array} winningNumbers
 * @param  {Number} additionalNumber
 * @return {Object}
 */
function evaluateMatches(chosenNumbers, winningNumbers, additionalNumber) {
    let matchCount = 0;

    winningNumbers.map((result) => {
      if (findIndex(chosenNumbers, (chosenNumber) => chosenNumber === result) !== -1) {
        matchCount++;
      }
    });

    const isAdditionalNumberMatched =
      (findIndex(chosenNumbers, (chosenNumber) => chosenNumber === additionalNumber) !== -1) ?
        true :
        false;

    return { isAdditionalNumberMatched, matchCount };
}

/**
 * Evaluates the prize amount.
 *
 * Based on official Prize Structure from Singapore Pools:
 * http://www.singaporepools.com.sg/en/toto/htp/Pages/ps.aspx
 *
 * @TODO: Write helper function to determine number of matching combinations
 *        instead of hard-coding.
 *
 * @param  {Number}  matchCount
 * @param  {Boolean} isAdditionalNumberMatched
 * @param  {Number}  system
 * @return {Number}
 */
function evaluatePrizeAmount(matchCount, isAdditionalNumberMatched, system) {
  if (matchCount < 3) {
    return 0;
  }

  const { prizePool, winningShares } = config.default;

  const pot = {
    1: 0.38 * prizePool,
    2: 0.8 * prizePool,
    3: 0.055 * prizePool,
    4: 0.03 * prizePool
  };

  const potPerShare = {
    1: Math.round(pot[1] / winningShares[1]),
    2: Math.round(pot[2] / winningShares[2]),
    3: Math.round(pot[3] / winningShares[3]),
    4: Math.round(pot[4] / winningShares[4])
  };

  switch (matchCount) {

    case 3:
      switch (system) {

        case 7:
          return isAdditionalNumberMatched ? 85 : 40;

        case 8:
          return isAdditionalNumberMatched ? 190 : 100;

        case 9:
          return isAdditionalNumberMatched ? 350 : 200;

        case 10:
          return isAdditionalNumberMatched ? 575 : 350;

        case 11:
          return isAdditionalNumberMatched ? 875 : 560;

        case 12:
          return isAdditionalNumberMatched ? 1260 : 840;

        default:
          return 0;
      }

    case 4:
      switch (system) {

        case 7:
          return isAdditionalNumberMatched ?
            2 * potPerShare[4] + 150 :
            190;

        case 8:
          return isAdditionalNumberMatched ?
            3 * potPerShare[4] + 490 :
            460;

        case 9:
          return isAdditionalNumberMatched ?
            4 * potPerShare[4] + 1060 :
            900;

        case 10:
          return isAdditionalNumberMatched ?
            5 * potPerShare[4] + 1900 :
            1550;

        case 11:
          return isAdditionalNumberMatched ?
            6 * potPerShare[4] + 3050 :
            2450;

        case 12:
          return isAdditionalNumberMatched ?
            7 * potPerShare[4] + 4550 :
            3640;

        default:
          return 0;
      }

    case 5:
      switch (system) {

        case 7:
          return isAdditionalNumberMatched ?
            1 * potPerShare[2] + 1 * potPerShare[3] + 5 * potPerShare[4] :
            2 * potPerShare[3] + 250;

        case 8:
          return isAdditionalNumberMatched ?
            1 * potPerShare[2] + 2 * potPerShare[3] + 10 * potPerShare[4] + 500:
            3 * potPerShare[3] + 850;

        case 9:
          return isAdditionalNumberMatched ?
            1 * potPerShare[2] + 3 * potPerShare[3] + 15 * potPerShare[4] + 1600:
            4 * potPerShare[3] + 1900;

        case 10:
          return isAdditionalNumberMatched ?
            1 * potPerShare[2] + 4 * potPerShare[3] + 20 * potPerShare[4] + 3400:
            5 * potPerShare[3] + 3500;

        case 11:
          return isAdditionalNumberMatched ?
            1 * potPerShare[2] + 5 * potPerShare[3] + 25 * potPerShare[4] + 6000:
            6 * potPerShare[3] + 5750;

        case 12:
          return isAdditionalNumberMatched ?
            1 * potPerShare[2] + 6 * potPerShare[3] + 30 * potPerShare[4] + 9500:
            7 * potPerShare[3] + 8750;

        default:
          return 0;
      }

    case 6:
          switch (system) {

        case 7:
          return isAdditionalNumberMatched ?
            1 * potPerShare[1] + 6 * potPerShare[2] :
            1 * potPerShare[1] + 6 * potPerShare[3];

        case 8:
          return isAdditionalNumberMatched ?
            1 * potPerShare[1] + 6 * potPerShare[2] + 6 * potPerShare[3] + 15 * potPerShare[4]:
            1 * potPerShare[1] + 12 * potPerShare[3] + 750;

        case 9:
          return isAdditionalNumberMatched ?
            1 * potPerShare[1] + 6 * potPerShare[2] + 12 * potPerShare[3] + 30 * potPerShare[4] + 1250:
            1 * potPerShare[1] + 18 * potPerShare[3] + 2450;

        case 10:
          return isAdditionalNumberMatched ?
            1 * potPerShare[1] + 6 * potPerShare[2] + 18 * potPerShare[3] + 45 * potPerShare[4] + 3950:
            1 * potPerShare[1] + 24 * potPerShare[3] + 5300;

        case 11:
          return isAdditionalNumberMatched ?
            1 * potPerShare[1] + 6 * potPerShare[2] + 24 * potPerShare[3] + 60 * potPerShare[4] + 8300:
            1 * potPerShare[1] + 30 * potPerShare[3] + 9500;

        case 12:
          return isAdditionalNumberMatched ?
            1 * potPerShare[1] + 6 * potPerShare[2] + 30 * potPerShare[3] + 75 * potPerShare[4] + 14500:
            1 * potPerShare[1] + 36 * potPerShare[3] + 15250;

        default:
          return 0;
      }

    default:
      // Do nothing
  }
}

/**
 * Evaluates the prize amount based on chosen numbers and results.
 *
 * @param  {Array} chosenNumbers
 * @param  {Array} winningNumbers
 * @param  {Number} additionalNumber
 * @param  {Number} system
 * @return {Number}
 */
export function evaluateWinnings(chosenNumbers, winningNumbers, additionalNumber, system) {
  const {
    isAdditionalNumberMatched,
    matchCount
  } = evaluateMatches(chosenNumbers, winningNumbers, additionalNumber);

  return evaluatePrizeAmount(matchCount, isAdditionalNumberMatched, system);
}

/**
 * Generates draw results.
 *
 * @return {Object}
 */
export function generateDrawResults() {
  const { totoRange, winningNumbersLength } = config.default;
  const { max, min } = totoRange;

  let additionalNumber = getRandomInt(min, max);
  const winningNumbers = getRandomIntSet(winningNumbersLength, min, max);

  while (findIndex(winningNumbers, (number) => number === additionalNumber) !== -1) {
    additionalNumber = getRandomInt(min, max);
  }

  return { additionalNumber, winningNumbers };
}
