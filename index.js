import express from "express";
import 'dotenv/config';
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors())
app.use(express.json())



const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const mongoClient= await connectToMongoDB();

const db= mongoClient.db("social-circle")
const eventsCollection= db.collection("events")
const joinedEventsCollection= db.collection("joinedEvents")

app.get("/", (req, res) => {
  res.send("API is running");
})

app.post("/add-event", async (req, res) => {
    const data= req.body
    const result= await eventsCollection.insertOne(data)
    res.send(result)
})
app.get("/events/:email", async (req, res) => {
    const email= req.params.email
    const result= await eventsCollection.find({email: email}).toArray()
    res.send(result)
})
app.patch("/events/:id", async (req, res) => {
    const id= req.params.id
    const data= req.body
    const result= await eventsCollection.updateOne({_id: new ObjectId(id)}, {$set: data})
    res.send(result)
})
app.delete("/events/:id", async (req, res) => {
    const id= req.params.id
    const result= await eventsCollection.deleteOne({_id: new ObjectId(id)})
    res.send(result)
})

app.get("/events", async (req, res) => {
    const result= await eventsCollection.find({}).toArray()
    res.send(result)
})

app.get("/recent-events", async (req, res) => {
    const result= await eventsCollection.find().limit(6).sort({eventDate: 1}).toArray()
    res.send(result)
})

app.get("/events/:id", async (req, res) => {
    const id= req.params.id
    const result= await eventsCollection.findOne({_id: new ObjectId(id)})
    res.send(result)
})

app.post("/joined-events", async (req, res) => {
    const data= req.body
    const result= await joinedEventsCollection.insertOne(data)
    res.send(result)
})

app.get("/joined-events", async (req, res) => {
    const result= await joinedEventsCollection.find({}).toArray()
    res.send(result)
})

app.get("/joined-events/:email", async (req, res) => {
    const email= req.params.email
    const result= await joinedEventsCollection.find({email: email}).toArray()
    res.send(result)
})
app.get("/joined-events/:id", async (req, res) => {
    const id= req.params.id
    const result= await joinedEventsCollection.find({eventId: id}).toArray()
    res.send(result)
})

app.delete("/joined-events/:email/:id", async (req, res) => {
    const email= req.params.email
    const id= req.params.id
    const result= await joinedEventsCollection.deleteOne({email: email, eventId: id})
    res.send(result)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

