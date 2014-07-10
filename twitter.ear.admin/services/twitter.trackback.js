var fork = require("child_process").fork;
var trackback = fork("../twitter.trackback/app.js");
module.exports = function(){
    var send = function(message){
        trackback.send(message);
    };
    return {
        start:function(user){
            send({event:{type:"start"},data:{user:user}});
        },
        stop:function(user){
            send({event:{type:"stop"},data:{user:user}});
        },
        refresh:function(user){
            send({event:{type:"refresh"},data:{user:user}});
        }
    }
}