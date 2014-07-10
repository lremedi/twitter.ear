var util = require("util");
var monk = require("monk");
var q = require('q');

module.exports = function(config){
    //private
    var db = {};
    var patterns = {};
    var configs = {};
    var that = this;
    //constructor
    var init = function(cfg){
        that.db = monk(cfg.url+cfg.database);
        that.patterns = that.db.get(cfg.patterns);
        that.configs = that.db.get(cfg.configs);
    }(config);

    //public
    return {
        get_config:function(user){
            var deferred = q.defer();
            that.configs.findOne({user:user},function(err,doc){
                    if(err) deferred.reject(err);
                    deferred.resolve(doc);
                });
            return deferred.promise;
        },
        get_pattern:function(user){
            var deferred = q.defer();
            that.patterns.findOne({user:user},function(err,doc){
                    if(err) deferred.reject(err);
                    deferred.resolve(doc);
                });
            return deferred.promise;
        }
    }
}