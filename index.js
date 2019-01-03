//jshint node:true
//jshint esnext:true
// process.env.DEBUG = 'sumnums:*';

let parseArgv = require('./parseArgv');
let sum = require('./sumnums');

{
  // let argv = process.argv.slice(2);
  let [a, b, ...argv] = process.argv;
  let nums = parseArgv(argv);
  console.log('The sum of %s===%d', nums, sum(nums));
}