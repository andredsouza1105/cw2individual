const express = require ('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.use(express.json())
app.set('port',3000)
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    next();
})

let db;
MongoClient.connect('mongodb+srv://andre1105:andre123@cluster0.t0hyzng.mongodb.net', (err, client) => {    db = client.db('cw2individual')})
