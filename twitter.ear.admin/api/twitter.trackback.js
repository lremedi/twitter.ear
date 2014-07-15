var express = require('express');
var router = express.Router();
var twitter_trackback = require('../services/twitter.trackback.js');

module.exports = function(trackbacks){
    router.get('/:user/:operation', function(req, res) {
        var user = req.params.user;
        trackbacks[user] = trackbacks[user] ||  (new twitter_trackback(user));
        switch(req.params.operation) {
            case 'start':
                trackbacks[user].start();
                break;
            case 'stop':
                trackbacks[user].stop();
                break;
            case 'refresh':
                trackbacks[user].refresh();
                break;
        }
        res.end(req.params.operation);
    });
    return router;
}