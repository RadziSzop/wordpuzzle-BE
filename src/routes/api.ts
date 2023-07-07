import { Router } from "express";
import { game } from "./word-route";
export const wordRouter = Router();
wordRouter.get("/", game);
