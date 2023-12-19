const http = require("http");

const server = http.createServer(function(request, response){
response.end("Hello METANIT.COM!");
});
server.listen(8000); 