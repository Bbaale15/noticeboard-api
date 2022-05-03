import express, { Application, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import notices from "./routes/Notice";
import mongoose from "mongoose";
import logger from "./helpers/logger";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

// DB connection
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  autoIndex: false,
  retryWrites: false,
};

mongoose
  .connect(String(process.env.MONGO_DB), options)
  .then((result) => {
    logger.info("Database has connected");
  })
  .catch((error) => {
    logger.error("databse connection failed", error);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

// Routes
app.use("/api/notices", notices);

// Error handling
app.use((req: Request, res: Response, next: NextFunction) => {
  const error: Error = new Error("Not found");
  return res.status(404).json({
    message: error.message,
  });
});

process.on("uncaughtException", (ex: Error) => {
  logger.error(ex.message, ex);
  process.exit(1);
});

process.on("unhandledRejection", (ex: Error) => {
  logger.error(ex.message, ex);
  process.exit(1);
});

const port: string = process.env.PORT || "3330";
app.listen(port, () => logger.info(`Server started on ${port} ...`));
