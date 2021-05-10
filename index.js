const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const appRouter = require('./routers/appRouter')
const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.g1juc.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const app = express();
app.use(bodyParser.json());
app.use(cors());
require('dotenv').config();
app.use('/blog', appRouter)

app.get('/',(req,res)=>{
    res.json({
        message: 'welcome to backend'
    })
})



client.connect(err => {
  const collection = client.db(`${process.env.DB}`).collection("post");
  console.log('database connected');
  app.post('/blog/new', (req, res)=>{
    const body = req.body;
    collection.insertOne(body,(req,res)=>{
    })
  })
  client.close();
});



const port = process.env.PORT;
app.listen(port||4000,()=>{
    console.log(`server is running at port: ${port}`);
})