const express = require ('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json())
app.set('port',3000)
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    next();
})

let db;
MongoClient.connect('mongodb+srv://andre1105:andre123@cluster0.t0hyzng.mongodb.net', (err, client) => {    db = client.db('cw2')})

app.get('/',(req,res,next)=>{
    res.send('Select a Collection, e.g., /collection/messages')
})

app.param('collectionName', (req,res,next,collectionName)=>{
    req.collection= db.collection(collectionName);
    return next();
})

app.get('/collection/:collectionName',(req,res,next)=>{
    req.collection.find({}).toArray((e,results) => {
        if (e) return next(e)
        res.send(results)
    })
})
app.post('/collection/:collectionName', (req, res, next) => 
{  req.collection.insertOne(req.body, (e, results) =>
     {if (e) return next(e)    
        res.send(results.ops)})
    })





app.listen(3000,()=>{
console.log("Express server is running")
})