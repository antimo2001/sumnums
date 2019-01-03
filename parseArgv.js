//jshint node:true
//jshint esnext:true
const debug = require('debug')('sumnums:parseArgv');
const util = require('util');

const parseArgv1 = function(argv){
  let combined = argv.reduce((c,n) => {
    return `${c} ${n}`;
  });
  debug('combined===%s', combined);
  let rx = /[,\s]+/g;
  let split = combined.split(rx);
  debug('split==%j', split);
  return split;
};

const parseArgv = function(argv){
  let stringified = JSON.stringify(argv);
  debug('stringified===%s', stringified);
  let rx = /[-+]?\d+\.?\d*/g;
  let matches = stringified.match(rx);
  debug('matches==%j', matches);
  return matches;
};

module.exports = parseArgv;