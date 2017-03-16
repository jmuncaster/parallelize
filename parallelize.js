#!/usr/bin/env node
var readline = require('readline');
var async = require('async');
const exec = require('child_process').exec;

var q = async.queue((line, callback) => {
  console.log(`queued: ${line}`) 
  exec(line, (error, stdout, stderr) => {callback(error, line);});
}, 10);

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(line){
  q.push(line, (err, result) => {
    if (err) {
      console.error("error: ${result}");
      return;
    }
    console.log(`done: ${result}`);
  });
});

