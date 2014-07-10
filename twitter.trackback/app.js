var util = require('util');
var config = require('./config.js');
var database = require('./database.js')(config.db);
var twitter = require('./twitter.js')(config.twitter);
var queue = require('./queue.js')(config.queue);
var p = require('./prioritizer.js');
var m = require('./message.js');


var manual_stop = false;
var auto_start = true;
var chords = [];
var message = {};
var root = "";

var ondata = function (tweet) {
    var q = p.prioritize(tweet.text, chords, root);
    if (q) {
        var str_tweet = m.process(tweet);
        queue.enqueue(q, str_tweet);
    }
}

var onend = function(event_data) {
    if (!manual_stop && auto_start){
        util.log("============================AUTO STARTING================================");
        start(message.data.user);
    }
    if(manual_stop){
        util.log("============================MANUALLY STOPPED================================");
    }
}

var stream = function(pattern){
    load_keywords(pattern);
    twitter.start_stream(pattern.root,ondata,onend);
}

process.on('message', function(m){
    message = m;
    switch(m.event.type){
        case 'start':
            start(m.data.user);
            break;
        case 'stop':
            stop(m.data.user);
            break;
        case 'refresh':
            refresh(m.data.user);
            break;
    }

});

var load_keywords = function(pattern){
    chords = pattern.chords;
    root = pattern.root;
    util.log("====================NOW LISTENING TO: " + root);
}

var start = function(user){
    util.log("============================STARTING================================");
    manual_stop = false;
    database.get_pattern(user)
    .then(stream);
};

var stop = function(user){
    util.log("============================STOPING================================");
    manual_stop = true;
    twitter.stop_stream();
}

var refresh = function(user){
    util.log("============================REFRESHING================================");
    database.get_pattern(user).then(load_keywords);
}