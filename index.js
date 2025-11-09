const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hlyuouh.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', (req, res)=>{
    res.send("easy bill server running");
})

async function run(){
    try{
        await client.connect();

        const db = client.db("billManagement");
        const billCollection = db.collection("bills");

        // get bills
        app.get('/bills', async(req, res) =>{
            const cursor = billCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

       

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, ()=>{
    console.log(`easy bill server running on port: ${port} `)
})