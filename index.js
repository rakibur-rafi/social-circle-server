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
connectToMongoDB();


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

