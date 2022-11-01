const express= require('express')
const cors= require ('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app= express();
const port= process.env.PORT || 5000;

require('dotenv').config()

app.use(cors())
app.use(express.json())

console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)

// username genusCarDB
// password: hV8DUGVNS0v68qyM



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rge2daw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run (){
    try{
        const serviceCollection= client.db('genis-car').collection('services')
        app.get('/services',async(req,res)=>{
         const query={}
         const cursor= serviceCollection.find(query)
         const services= await cursor.toArray()
         res.send(services)
        })

    }
    finally{

    }
}
run().catch (error=>console.log(error))




app.get('/',(req,res)=>{
    res.send('hello word')
})
app.listen(port,()=>{
 console.log('my server on', port)
})