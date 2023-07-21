import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { CustomError } from "./src/shared/errors";
import { StatusCodes } from "http-status-codes";
import { wordRouter } from "./src/routes/api";

const dotenvConfig = dotenv.config();
const port = process.env.PORT || 4000;
const app = express();

// Middleware

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes

app.use("/", wordRouter);

// Error handler

app.use(
  (err: Error | CustomError, _: Request, res: Response, next: NextFunction) => {
    console.log(err);
    const status =
      err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST;
    return res.status(status).json({
      error: err instanceof CustomError ? err.message : "Server error",
    });
  }
);

app.listen(port, () => {
  console.log(`Server started successfully on port: ${port}!`);
});
