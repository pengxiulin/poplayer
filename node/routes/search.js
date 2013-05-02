var BufferHelper = require('bufferhelper');
exports.list = function(req1, res1){
    var content = "key="+encodeURI(req1.query.key);
    res1.contentType("application/json");
    var options = {
        hostname: 'player.kuwo.cn',
        port: 80,
        path: '/webmusic/webmusic2011/search.jsp',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Content-Length':content.length
        },
        method: 'POST'
    };

    var req = require("http").request(options, function(res) {
        var bufferHelper = new BufferHelper();
        res.on('data', function (chunk) {
            bufferHelper.concat(chunk);
        });
        res.on("end",function(){
            var html = bufferHelper.toBuffer().toString().substr(7);
            res1.send(html);
            res1.end();
        })
    });
    req.write(content);

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    req.end();
};