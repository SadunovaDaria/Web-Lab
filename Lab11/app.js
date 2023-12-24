const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;
      
const app = express();
app.use(express.static("public"));  
app.use(express.json());        
    
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");
   
(async () => {
     try {
        await mongoClient.connect();
        app.locals.collection = mongoClient.db("usersdb").collection("users");
        app.listen(3000);
        console.log("Сервер ожидает подключения...");
    }catch(err) {
        return console.log(err);
    } 
})();
   
app.get("/api/users", async(req, res) => {
           
    const collection = req.app.locals.collection;
    try{
        const users = await collection.find({}).toArray();
        res.send(users);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }  
});
app.get("/api/users/:id", async(req, res) => {
           
    const collection = req.app.locals.collection;
    try{
        const id = new objectId(req.params.id);
        const user = await collection.findOne({_id: id});
        if(user) res.send(user);
        else res.sendStatus(404);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});
      
app.post("/api/users", async(req, res)=> {
          
    if(!req.body) return res.sendStatus(400);
          
    const userName = req.body.name;
    const userPhone = req.body.phone;
    const user = {name: userName, phone: userPhone};
          
    const collection = req.app.locals.collection;
       
    try{
        await collection.insertOne(user);
        res.send(user);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});
       
app.delete("/api/users/:id", async(req, res)=>{
           
    const collection = req.app.locals.collection;
    try{
        const id = new objectId(req.params.id);
        const user = await collection.findOneAndDelete({_id: id});
        if(user) res.send(user);
        else res.sendStatus(404);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});
      
app.put("/api/users", async(req, res)=>{
           
    if(!req.body) return res.sendStatus(400);
    const userName = req.body.name;
    const userPhone = req.body.phone;
          
    const collection = req.app.locals.collection;
    try{
        const id = new objectId(req.body.id);
        const user = await collection.findOneAndUpdate({_id: id}, { $set: {phone: userPhone, name: userName}},
         {returnDocument: "after" });
        if(user) res.send(user);
        else res.sendStatus(404);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});
    

process.on("SIGINT", async() => {
       
    await mongoClient.close();
    console.log("Приложение завершило работу");
    process.exit();
});