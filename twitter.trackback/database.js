var util = require("util");
var mongo = require('mongoskin');
var q = require('q');

module.exports = function(config){
    //private
    var db = {};
    var patterns = {};
    var configs = {};
    var that = this;
    //constructor
    var init = function (cfg){
        var url = util.format('mongodb://%s:%s@%s/%s', cfg.username, cfg.password, cfg.url, cfg.database);
        that.db = mongo.db(url, { native_parser: true });
        that.db.bind(cfg.patterns);
        that.db.bind(cfg.configs);
    }(config);

    //public
    return {
        get_config:function(user){
            var deferred = q.defer();
            that.db.configs.findOne({user:user},function(err,doc){
                    if(err) deferred.reject(err);
                    deferred.resolve(doc);
                });
            return deferred.promise;
        },
        get_pattern:function(user){
            var deferred = q.defer();
            that.db.patterns.findOne({user:user},function(err,doc){
                    if(err) deferred.reject(err);
                    deferred.resolve(doc);
                });
            return deferred.promise;
        }
    }
}