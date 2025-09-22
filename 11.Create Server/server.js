const http = require("node:http");
const server = http.createServer(function(req, res){

    if(req.url === "/getSecretData" ){
        res.end("Response from getSecretData");
    }    
    res.end("Response from server");
});

server.listen(1000);