var twitter = require('ntwitter');
var util = require('util');
module.exports = function(config){
    //default event handler
    var default_event_handler = function(event_data) {
        util.log(event_data);
    }
    //private
    this.curr_stream="",
    this.stream_endpoint = "",
    this.tt = {},
    this.ondata = default_event_handler,
    this.onend = default_event_handler,
    this.ondestroy = default_event_handler;
    var that = this;
    //constructor
    var init = function(cfg){
        that.tt = new twitter({
            consumer_key: cfg.consumer_key,
            consumer_secret: cfg.consumer_secret,
            access_token_key: config.access_token_key,
            access_token_secret: cfg.access_token_secret
        });
        that.stream_endpoint = cfg.stream_endpoint;
    }(config);
    //public
    return {
        start_stream:function(root,ondata,onend,ondestroy){
            switch (arguments.length){
                case 4:
                    that.ondestroy = ondestroy;
                case 3:
                    that.onend = onend;
                case 2:
                    that.ondata = ondata;
            }

            var stream_handler = function(stream) {
                that.curr_stream = stream;
                stream.on('data', that.ondata);
                stream.on('end',that.onend);
                stream.on('destroy',that.ondestroy);
            };
            var track = { track: [root] };
            that.tt.stream(that.stream_endpoint,track,stream_handler);
        },
        stop_stream:function(){
            that.curr_stream.destroy();
        }
    }
}
