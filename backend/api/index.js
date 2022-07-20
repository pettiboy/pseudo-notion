import "dotenv/config";
import express from "express";
import pageRouter from "../routes/page.js";
import mongoose from "mongoose";
import tokenToID from "../middleware/authenticateToken.js";
import cors from "cors";
import bodyParser from "body-parser";

// initialise express server
const server = express();

// cors fix
server.use(cors());

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

// // listen for requests
// server.listen(process.env.PORT || "8001", () => {
//   console.log(`listening to port ${process.env.PORT || "8001"}`);
// });

export default server;
