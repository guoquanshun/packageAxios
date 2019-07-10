var http = require('http');
var url = require('url');
http.createServer(function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "")
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    var pathname = url.parse(req.url).pathname;
    if(pathname === '/apione') {
        setTimeout(function() {
            res.end('{"status": 0, "msg": "Sucess", "data":{"goods": {"name": "Nike", "title": "Just do it"}}}');
        }, 2000)
    }else if(pathname === '/apitwo') {
        res.end('{"status": 0, "msg": "Sucess", "data":{"goods": {"name": "Adidas", "title": "666666666"}}}');
    }
}).listen(3000)