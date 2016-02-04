/**
 * Evaluates the prize amount and prize group based on chosen numbers and results.
 *
 * @param  {Array} chosenNumbers
 * @param  {Array} winningNumbers
 * @param  {Number} additionalNumber
 * @param  {Number} prizePool
 * @return {Object}
 */
export function evaluateWinnings(chosenNumbers, winningNumbers, additionalNumber, prizePool) {
  const evaluateMatches = (chosenNumbers, winningNumbers, additionalNumber) => {
    let matchCount = 0;

    winningNumbers.map((result) => {
      if (findIndex(chosenNumbers, (chosenNumber) => chosenNumber === result) !== -1) {
        matchCount++;
      }
    });

    const isAdditionalNumberMatched = (findIndex(chosenNumbers, (chosenNumber) => chosenNumber === additionalNumber) !== -1) ? true : false;

    return { isAdditionalNumberMatched, matchCount };
  }

  const {
    isAdditionalNumberMatched,
    matchCount
  } = evaluateMatches(chosenNumbers, winningNumbers, additionalNumber);

  switch (matchCount) {
    case 0:
    case 1:
    case 2:
      return {
        prizeAmount: 0,
        prizeGroup: ''
      };

    case 3:
      return {
        prizeAmount: isAdditionalNumberMatched ? 25 : 10,
        prizeGroup: isAdditionalNumberMatched ? 'Group 6' : 'Group 7'
      };

    case 4:
      return {
        prizeAmount: isAdditionalNumberMatched ? 0.03 * prizePool : 50,
        prizeGroup: isAdditionalNumberMatched ? 'Group 4' : 'Group 5'
      };

    case 5:
      return {
        prizeAmount: isAdditionalNumberMatched ? 0.08 * prizePool : 0.055 * prizePool,
        prizeGroup: isAdditionalNumberMatched ? 'Group 2' : 'Group 3'
      };

    case 6:
      return {
        prizeAmount: 0.38 * prizePool > 1000000 ? 0.38 * prizePool : 1000000,
        prizeGroup: 'Group 1 (Jackpot)'
      };

    default:
      // Do nothing
  }
}

/**
 * Generates draw results.
 *
 * @return {Object}
 */
export function generateDrawResults() {
  let additionalNumber = getRandomInt(1, 49);
  const winningNumbers = getRandomIntSet(6, 1, 49);

  while (findIndex(winningNumbers, (number) => number === additionalNumber) !== -1) {
    additionalNumber = getRandomInt(1, 49);
  }

  return { additionalNumber, winningNumbers };
}
