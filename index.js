import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import cors from "cors";
import playersRouter from "./routes/players.route.js";
import userRouter from "./routes/user.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGO_URI);
await client.connect();
console.log("MongoDB is Connected..!");

export { client };

async function startServer() {
  try {
    await client.connect();
    console.log("MongoDB is Connected..!");

    app.use(express.json());
    app.use(cors());
    app.use('/players', playersRouter);
    app.use('/users', userRouter);

    app.get("/", function (req, res) {
      res.send("Hello world");
    });

    app.listen(PORT, () => console.log(`The Server started in Port: ${PORT} ✨✨`));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

startServer();
