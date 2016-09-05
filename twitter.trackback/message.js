module.exports = {
    process: function (tweet) {
        if (!tweet) return null
        var ret = {};
        ret.id = tweet.id;
        ret.text = tweet.text;
        ret.user = tweet.user;
        ret.place = tweet.place;
        return JSON.stringify(ret);
    }
}
