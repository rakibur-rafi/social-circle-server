import express from "express";
import 'dotenv/config';
import cors from "cors";
import { MongoClient } from "mongodb";

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


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

