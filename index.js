'use strict';
const child_process = require("child_process").fork("twitter.trackback/app.js", [], { execArgv: ['--debug=5859'] });
const consumer = require("child_process").fork("twitter.trackback/app.js", [], { execArgv: ['--debug=5860'] });

child_process.on('message', function(response) {
    switch(response.event.type){
        case 'info':
            console.log(response.data.message);
            break;
        default:
            console.log("Unknown event type:" + response.event.type);
    }
});

consumer.on('message', function(response) {
    switch(response.event.type){
        case 'info':
            console.log(response.data.message);
            break;
        case 'message':
            var report = translateTweet(JSON.parse(response.data.message),true,false);
            if (report){
              /*var r = new Report();
              for(var i in report){
                r[i]=report[i];
              }
              r.save(function (err) {
                if (err) console.log(err);
              });*/
              console.log(report);
            }

            break;
        default:
            console.log("Unknown event type:" + response.event.type);
    }
});

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

child_process.send({event:{type:"start"},data:{user:"lremedi"}});
consumer.send({event:{type:"consume"},data:{user:"lremedi"}});
