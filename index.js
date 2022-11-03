const express= require('express')
const cors= require ('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const orderCollection= client.db('genis-car').collection('orders')

        app.get('/services',async(req,res)=>{
         const query={}
         const cursor= serviceCollection.find(query)
         const services= await cursor.toArray()
         res.send(services)
        })
       
    app.get('/services/:id',async(req,res)=>{
     const id = req.params.id
     const query ={_id:ObjectId(id)}
     const service= await serviceCollection.findOne(query)
     res.send(service)
    })

  app.get('/orders',async(req,res)=>{
    let query={}
    if (req.query.email) {
        query={
            email:req.query.email
        }
    }else{
        query= {}
    }
    const cursor= orderCollection.find(query)
    const result= await cursor.toArray()
    res.send(result)
  })
   

    app.post('/orders',async(req,res)=>{
        const order= req.body;
        const result= await orderCollection.insertOne(order)
        res.send(result)
    })

       app.patch('/orders/:id',async(req,res)=>{
    const id= req.params.id;
    const status= req.body.status
    const fillter={_id:ObjectId(id)}
    const options= {upsert: true}
    const updateDoc = {
        $set:{
         status: status,
        }
    }
    const result= await orderCollection.updateOne(fillter,updateDoc,options)
    res.send(result)
   })

    app.delete('/orders/:id',async(req,res)=>{
        const id= req.params.id
        const query= {_id:ObjectId(id)}
        const result= await orderCollection.deleteOne(query)
        res.send(result)
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