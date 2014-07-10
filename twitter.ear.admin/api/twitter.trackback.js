var express = require('express');
var router = express.Router();
var twitter_trackback = require('../services/twitter.trackback.js')();
router.get('/:user/:operation', function(req, res) {
    var user = req.params.user;
    switch(req.params.operation) {
    case 'start':
        twitter_trackback.start(user);
        break;
    case 'stop':
        twitter_trackback.stop(user);
        break;
    case 'refresh':
        twitter_trackback.refresh(user);
        break;
    }
    res.end(req.params.operation);
});

module.exports = router;