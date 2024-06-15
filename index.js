const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware

app.use(cors());
app.use(express.json())



// const coffeeCollection = client.db('coffeeBD').collection('coffee');
// app.post('/coffeess',async(req,res)=>{
//  const newCoffee= req.body;
//  const result  = await coffeeCollection.insertOne(newCoffee)
//  console.log(newCoffee)




const uri = "mongodb+srv://coffeDB:<password>@cluster0.phsffqx.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const coffeeCollection = client.db('coffeeDB').collection('coffee');

        app.post('/coffee', async (req, res) => {
            const newCoffee = req.body;
            console.log(newCoffee);
            const result = await coffeeCollection.insertOne(newCoffee);
            res.send(result);
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);







app.get('/', (req, res) => {
    res.send('Coffee server is running')
})

app.listen(port, () => {
    console.log(`Port is Running ${port}`)
})