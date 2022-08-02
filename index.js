const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.30lxo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const todoCollection = client.db("to-do-list").collection("todos");

        app.get('/todo', async (req, res) => {
            const todo = await todoCollection.find().toArray();
            res.send(todo)
        })

        app.post('/todo', async (req, res) => {
            const body = req.body;
            const todo = await todoCollection.insertOne(body);
            res.send(todo)
        })

        app.patch('/todo/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const time = req.body.time;
            const updateDoc = {
                $set: {
                    isCompleted: true,
                    completedTime: time,
                }
            }
            const updatedTodo = await todoCollection.updateOne(filter, updateDoc);
            res.send(updatedTodo)
        })
        app.patch('/todo/update/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const body = req.body.todo;
            const updateDoc = {
                $set: { ...body }
            }
            const updatedTodo = await todoCollection.updateOne(filter, updateDoc);
            res.send(updatedTodo)
        })

        app.delete('/todo/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await todoCollection.deleteOne(filter);
            res.send(result)
        })
    }
    catch (error) {
        console.error(error);
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("Hello from ASSERT's TODOS!")
})

app.listen(port, () => {
    console.log(`Asserts todos is listening on port ${port}`)
})