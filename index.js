const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');


require('dotenv').config();
const app = express();
const port = process.env.PORT||5000;

// middleware
app.use(cors());
app.use(express.json());


// make connection with mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rj3brpj.mongodb.net/?retryWrites=true&w=majority`;
// make connection with mongodb 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        await client.connect();
        // console.log('connected');
        const portfolioCollection = client.db('portfolio').collection('portfolio-card');


        app.get('/portfolio', async (req, res) => {
            const cursor = portfolioCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        })

        app.post('/portfolio', async (req, res) => {
            const {portfolio} = req.body;
            
            const result = await portfolioCollection.insertOne(portfolio);
            res.json(result);
        })
        
    }
    finally{

    }

}
run().catch(console.dir);

console.log(uri);


// database connection
app.get('/', (req, res) => {
  res.send('Server is running');
})

app.listen(port, () => {
  console.log(`server is listening  ${port}`)
})