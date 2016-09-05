var util = require("util");
var rabbitmq = require("amqplib");

module.exports = function(config){
    //private
    var amqp = {} , channel;
    var that = this;
    //constructor
    var init = function(cfg){
        that.amqp = rabbitmq.connect(util.format(cfg.url,cfg.user,cfg.password));
    }(config);

    //public
    return {
        enqueue: function(queue, message){
            that.amqp.then(function(conn){
                var ok = that.channel = that.channel || conn.createChannel();
                ok = ok.then(function(ch) {
                    ch.assertQueue(queue);
                    ch.sendToQueue(queue, new Buffer(message));
                });
            }).then(null, console.warn);
        },
        consume: function (queue, process) {
          that.amqp.then(function (conn) {
              var ok = that.channel = that.channel || conn.createChannel();
              ok = ok.then(function (ch) {
                  ch.assertQueue(queue);
                  ch.consume(queue, function (msg) {
                      if (msg !== null) {
                          process(msg.content.toString());
                          ch.ack(msg);
                      }
                  });
              });
          }).then(null, console.warn);
        }
    }
}
