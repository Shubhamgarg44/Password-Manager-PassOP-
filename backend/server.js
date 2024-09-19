const express = require('express')
const app = express()
const port = 3000
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const cors = require('cors')

const { MongoClient } = require('mongodb');
dotenv.config()
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
client.connect();
const dbName = 'PassOP';

app.use(cors())
app.use(bodyparser.json())


// get all the passowrd
app.get('/', async (req, res) => {
const db = client.db(dbName);
const collection = db.collection('password');
const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

//save a password
app.post('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('password');
    const findResult = await collection.insertOne(password)
      res.send({success: true, result: findResult})
    })

// delete a password by id
app.delete('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('password');
    const findResult = await collection.deleteOne(password)
      res.send({success: true, result: findResult})
    })



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})