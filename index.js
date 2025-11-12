const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

app.get('/', (req, res) => {
    res.send("easy bill server running");
})

async function run() {
    try {
        await client.connect();

        const db = client.db("billManagement");
        const billCollection = db.collection("bills");
        const myBillCollection = db.collection("myBill");

        // get bills
        app.get('/bills', async (req, res) => {
            const cursor = billCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // category bills

        app.get('/category-bills', async (req, res) => {
            const query = { category: { $in: ["Electricity", "Gas", "Water", "Internet"] } };
            const cursor = billCollection.find(query).limit(4);
            const result = await cursor.toArray();
            res.send(result);
        });


        // recent bills
        app.get('/recent-bills', async (req, res) => {
            const cursor = billCollection.find().sort({ date: -1 }).limit(6);
            const result = await cursor.toArray();
            res.send(result);
        })

        // get specifid bills using id
        app.get('/bills/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await billCollection.findOne(query);
            res.send(result);
        })

        // search by category
        app.get('/search', async (req, res) => {
            const search = req.query.search;
            const query = { category: { $regex: search, $options: "i" } };
            const cursor = billCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        // post
        app.post('/my-bill', async (req, res) => {
            const newBill = req.body;
            const result = await myBillCollection.insertOne(newBill);
            res.send(result);
        })

        // find my bills using email

        app.get('/my-bills', async (req, res) => {
            const email = req.query.email;
            const query = {};

            if (email) {
                query.email = email;
            }

            const cursor = myBillCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        // get specific bills

        app.get('/my-bills/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await myBillCollection.findOne(query);
            res.send(result);
        });


        // UPDATE BILL USING PATCH
        app.patch('/my-bills/:id', async (req, res) => {
            const id = req.params.id;
            const updateBill = req.body;
            const query = { _id: new ObjectId(id) };
            const update = {
                $set: {
                    userName: updateBill.userName,
                    email: updateBill.email,
                    amount: updateBill.amount,
                    address: updateBill.address,
                    phone: updateBill.phone,
                    date: updateBill.date,
                }
            }
            const option = {};
            const result = await myBillCollection.updateOne(query, update, option);
            res.send(result);
        })


        // delete bills
        app.delete('/my-bills/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await myBillCollection.deleteOne(query);
            res.send(result);
        })


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`easy bill server running on port: ${port} `)
})