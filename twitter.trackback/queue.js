var util = require("util");
var rabbitmq = require("amqplib");

module.exports = function(config){
    //private
    var amqp = {};
    var that = this;
    //constructor
    var init = function(cfg){
        that.amqp = rabbitmq.connect(util.format(cfg.url,cfg.user,cfg.password));
    }(config);

    //public
    return {
        enqueue:function(queue, message){
            that.amqp.then(function(conn){
                var ok = conn.createChannel();
                ok = ok.then(function(ch) {
                    ch.assertQueue(queue);
                    ch.sendToQueue(queue, new Buffer(message));
                });
            }).then(null, console.warn);
        }
    }
}