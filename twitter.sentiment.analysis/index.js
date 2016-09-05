const execFile = require('child_process').exec;
const fs = require('fs');
const path = require('path');
const q = require('q');

module.exports = function(twd){
  var normalize = function(tweets){
    var rules = [
      {regexp:/'/g, replacement:" ' " },
      {regexp:/"/g,replacement:''},
      {regexp:/\./g,replacement:' . ' },
      {regexp:/<br \/>/gi,replacement:' ' },
      {regexp:/,/g, replacement:' , '},
      {regexp:/\(/g,replacement:' ( '},
      {regexp:/\)/g,replacement:' ) '},
      {regexp:/\!/g,replacement:' \! '},
      {regexp:/\?/g,replacement:' \? '},
      {regexp:/\;/g,replacement:' '},
      {regexp:/\:/g,replacement:' '}
    ];
    return tweets.map(function (line) {
      return rules.reduce((p, c) => {
        return p.replace(c.regexp, c.replacement);
      },line).toLowerCase();
    }).join('\n');
  }
  const cwd = process.cwd();

  const bin = cwd + "/twitter.sentiment.analysis/bin/";
  const data = cwd + "/data/";

  const executable = "fasttext";
  const input = "tweets.test";
  const output = "tweets.test.predict";

  const action = "predict";
  const nn = "SentimentAnalisisEN.bin";

  var predict = function(file){
    var deferred = q.defer();
    let command = bin + executable + " " + action + " " + bin + nn + " " + file;
    execFile(command, [], (error, stdout, stderr) => {
        if(error) deferred.reject(err);
        if(stderr) deferred.reject(stderr);
        if(stdout) deferred.resolve(stdout.split(/\r*\n/));
    });
    return deferred.promise;
  }
  var toFile = function(file, contents){
    var deferred = q.defer();
    fs.writeFile(file, contents, (err) => {
        if(err) deferred.reject(err);
        deferred.resolve(file);
    });
    return deferred.promise;
  }
  return{
    analyze: function(tweets){
      var contents = normalize(tweets);
      return toFile(path.format({dir: twd, base: Date.now() + '.txt'}), contents)
      .then(predict);
    }
  }
}
