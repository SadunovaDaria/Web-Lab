const http = require("http");
 
http.createServer(async (request, response) => {
    const buffers = [];
 
    for await (const chunk of request) {
        buffers.push(chunk);
    }
 
    const user = JSON.parse(Buffer.concat(buffers).toString());
    console.log("User name:", user.name+"\n", "User email:", user.email+"\n","User site:",user.site+"\n","Message:", user.message);

    response.end("Данные успешно получены");
    
}).listen(8000, ()=>console.log("Сервер запущен по адресу http://localhost:8000"));
