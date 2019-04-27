const debug = require('debug')('median');

/** Calculate the median number given the array of numbers */
const median = (numbers) => {
  /** Map and sort to avoid sorting the original array */
  const sorted = numbers.map(n => n).sort();
  let mid = sorted.length / 2;
  // debug(`mid==${mid}`);

  const medians = sorted.filter((n, i) => {
    if (sorted.length % 2 !== 0) {
      return mid - 1 < i && i < mid;
    } else {
      return mid - 1 === i || i === mid;
    }
  });
  // debug(`medians==${medians}`);
  return medians;
}

{
  //small test
  const debugging = process.env.DEBUG !== undefined;
  if (debugging) {
    // let arr = [3, 5, 4];
    // let arr = [3, 5, 4, 2, 1];
    // let arr = [3, 5, 4, 2, 1, 0, 7]; //should be 3
    let arr = [3, 5, 4, 2, 1, 0, 7, 6]; //should be 3,4
    const mdn = median(arr);
    debug(`the median of this set (${arr}) is this: ${mdn}`);
  }
}

module.exports = median;