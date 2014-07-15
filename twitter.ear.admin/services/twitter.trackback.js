var fork = require("child_process").fork;

function trackback(user){
    this.user = user;
    this.process = fork("../twitter.trackback/app.js");

    var that = this;
    var send = function(message){
        that.process.send(message);
    };

    this.start = function(){
        send({event:{type:"start"},data:{user:that.user}});
    }

    this.stop = function(){
        send({event:{type:"stop"},data:{user:that.user}});
    }
    this.refresh = function(){
        send({event:{type:"refresh"},data:{user:that.user}});
    }
}

module.exports = trackback;