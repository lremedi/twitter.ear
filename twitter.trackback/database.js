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
        var url = util.format('mongodb://%s:%s@%s:%s/%s', cfg.username, cfg.password, cfg.url, cfg.port, cfg.database);
        that.db = mongo.db(url, {
            auto_reconnect : true,
            safe           : true
        });
        that.db.bind(cfg.patterns);
        that.db.bind(cfg.configs);
        that.db.bind(cfg.tweets);
    }(config);
    var save = function(colletion, doc){
      var deferred = q.defer();
      that.db[colletion].insert(doc,function(err,doc){
          if(err) deferred.reject(err);
          deferred.resolve(doc);
      });
      return deferred.promise;
    }
    var update = function(colletion, query, doc){
      var deferred = q.defer();
      that.db[colletion].update(query, {$set: doc }, function(err,doc){
          if(err) deferred.reject(err);
          deferred.resolve(doc);
      });
      return deferred.promise;
    }
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
        },
        save_tweet : function(tweet){
          return save(config.tweets,tweet);
        },
        update_tweet : function(query,tweet){
          return update(config.tweets,query,tweet);
        }
    }
}
