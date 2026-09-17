require("dotenv").config();
import express, { Response } from "express";
const app = express();
import morgan from "morgan";
import { NotFoundHandler, ErrorHandler } from "./src/middleware/errorHandler";
import application from "./src/constants/application";
import router from "./src/routes/index.route";
import cors from "cors";
import logger from "./src/config/logger";
import { Server } from "socket.io";
import { socketFunction } from "./socketEvent";
import path from "path";
import os from 'os';

const hostname = os.networkInterfaces();
console.log(hostname)


const port = process.env.PORT || 3000;

app.use(express.json({ limit: "50mb" }));

app.use(
  express.urlencoded({
    limit: "150mb",
    extended: true,
    parameterLimit: 500000000,
  })
);
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "build")));
app.use(cors());

app.use(morgan("dev"));

// app.use(authenticate);

app.use(application.url.base1, router);

app.get("/", (req, res) => {
  res.send('welcome to my cricket world.');
});

app.use(NotFoundHandler);

app.use(ErrorHandler);

let server = app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
const io = new Server(server);
socketFunction(io);
