var BufferHelper = require('bufferhelper');
var http = require("http");
var fs = require("fs");
exports.list = function(req1, res1){
    http.get("http://antiserver.kuwo.cn/anti.s?format=aac&type=convert_url&rid="+encodeURI(req1.query.rid), function(res) {
        res.on("data",function(url){
            res1.end(url.toString('utf-8'));
            http.get(url.toString('utf-8'),function(res2){
                var bufferHelper = new BufferHelper();
                res2.on("data",function(data){
                    bufferHelper.concat(data);
                }).on("end",function(){
                    var result = bufferHelper.toBuffer();
                        fs.writeFile("music/"+req1.query.name+".aac",result,function(err){
                        if(err){console.log("error when saving");}
                        console.log(result.length);
                    });
                    }).on("error",function(e){
                        console.log(e);
                    });
            }).on("error",function(e){
                    console.log("error");
            });
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
};
