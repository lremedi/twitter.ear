module.exports={
    classify:function(t, c){
        var ret = [];
        if (c){
            for(var i = c.length-1; i >= 0; i--){
                var re = new RegExp(c[i].keywords.join("|"),"gi");
                var res = t.match(re);
                if(res && res.length){
                    ret.push({key:c[i].chord,value:res.length});
                }
            }
        }
        return ret;
    },
    prioritize: function (t, c, defaultq){
        if (defaultq) return defaultq;
        var qs = this.classify(t,c);
        qs.sort(this.sorter);
        if(qs&&qs.length){
            return qs[0].key;
        }
    },
    sorter:function(a,b){
        return a.val - b.val;
    }
}
