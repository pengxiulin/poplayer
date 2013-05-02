var fs = require("fs");
exports.list = function(req, res){
    fs.read("music")
    res.end("OK");
};
