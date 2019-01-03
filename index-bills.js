// process.env.DEBUG = 'sumnums';
const debug = require('debug')('sumnums:index-bills');
// const parseArgv = require('./parseArgv');
const sum = require('./sumnums');
const billsData = require('./config/bills');

{
  // const argv = process.argv.slice(2);
  // const nums = parseArgv(argv);
  debug(billsData.current);
  const nums = billsData.current;
  sum(nums);
  console.log('The sum of %s===%d', nums, sum(nums));
}