import express from "express";
import 'dotenv/config';
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();

const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

