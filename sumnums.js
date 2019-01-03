//jshint node:true
//jshint esnext:true
const debug = require('debug')('sumnums:sumnums');
// const util = require('util');

const sumnums = function(nums){
  // const nums = parseArgv(argv);
  debug('before: nums===',nums);
  return nums.reduce((c,n) => {
    c = parseFloat(c) || 0;
    n = parseFloat(n) || 0;
    return c + n;
  }, 0);
};

module.exports = sumnums;