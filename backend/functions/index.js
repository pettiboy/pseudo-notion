import "dotenv/config";

import functions from "firebase-functions";
import express from "express";
import pageRouter from "./src/routes/page.js";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import tokenToID from "./src/middleware/authenticateToken.js";

// initialise express server
const server = express();

server.get("/test", (req, res) => {
  res.send({});
});

// solves undefined problem in POST requests
server.use(express.json());

//fix cors
server.use(cors());

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// middleware
server.use(tokenToID);

// database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }); // connect to the database
const db = mongoose.connection; // store connection
db.on("error", (error) => console.error(error)); // error handling
db.once("open", () => console.log("connected to db")); // log success message on successful connection

// routers
// map routes starting with '/page' to the router in 'routes/page.js'
server.use("/page", pageRouter);

export const api = functions.region("asia-south1").https.onRequest(server);
