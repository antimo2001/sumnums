//jshint node:true
//jshint esnext:true
const assert = require('assert');
const debug = require('debug')('sumnums:index-bills-avg');
const bills = require('./config/bills');
const sumnums = require('./sumnums');

//Define stringify with my own default values
function stringify(...args) {
  const [value, replacer=null, spaces=1] = args;
  return JSON.stringify(value, replacer, spaces);
};

//Define the minimum total bills for that month
const minimumTotal = 4;
const MIN_INTERNET_BILL = 35;

//Find only the month's that have the minimum-total of bills
let filterby = Object.keys(bills).filter(b => {
  return bills[b].length >= minimumTotal && b !== 'current';
});

debug('filterby===%j',filterby);

//Find the average sum for each bill-period
let monthlyreport = filterby.map(month => {
  const [internetbill, ...otherbills] = bills[month];
  debug(`bills[${month}]===${otherbills}`);

  //Assert that internet bill is the first in array of bills
  assert(internetbill >= MIN_INTERNET_BILL, `failed at asserting that ${internetbill} >= ${MIN_INTERNET_BILL}`);

  //Subtract internet bill since i pay that with credit cards and i sum all credit cards already
  const sum = sumnums(otherbills);

  return {
    'yyyy-mm': month,
    'amounts': JSON.stringify(otherbills),
    'total': sum,
    // 'average': sum/(minimumTotal-1)
  };
});

console.log(`Show averages monthlyreport: ${stringify(monthlyreport)}`);

let yearReport = new Map();
yearReport.set('amounts', monthlyreport.map(m => m.total));
yearReport.set('months', monthlyreport.length);
yearReport.set('total', sumnums(yearReport.get('amounts')));
yearReport.set('average', yearReport.get('total')/monthlyreport.length);

//Make a string-version of the yearReport
const jsonYearReport = [...yearReport].map(p => {
  const [a, ] = p;
  let obj = {};
  obj[a] = yearReport.get(a);
  return obj;
}).reduce((c, n) => {
  //Extend and reduce to one object
  return Object.assign(c, n);
}, {});

console.log(`yearReport===${stringify(jsonYearReport)}`);
console.log(`====================================
  Summary: Year-to-date,
  over ${yearReport.get('months')} months
  you spent $${yearReport.get('total')}
  averaging $${yearReport.get('average')} per month
`);