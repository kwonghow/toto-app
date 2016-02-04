import findIndex from 'lodash/array/findIndex';

/**
 * Get a random integer between `min` and `max`.
 *
 * @param  {Number} min
 * @param  {Number} max
 * @return {Number}
 */
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Get a set of random integers between `min` and `max` with no repetitions.
 *
 * @param  {Number} count
 * @param  {Number} min
 * @param  {Number} max
 * @return {Array}
 */
export function getRandomIntSet(count, min, max) {
  let results = [];

  while (results.length < count) {
    const randomInt = getRandomInt(min, max);
    if (findIndex(results, (result) => result === randomInt) !== -1) {
      continue;
    }

    results = results.concat(randomInt);
  }

  return results.sort((a, b) => a - b);
}

/**
 * Checks if a given number is part of chosen numbers.
 *
 * @param  {Array} chosenNumbers
 * @param  {Number} result
 * @return {Boolean}
 */
function isChosen(chosenNumbers, result) {
  return findIndex(chosenNumbers, (chosenNumber) => chosenNumber === result) !== -1;
}
