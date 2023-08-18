import { Router } from "express";
import { definition, game } from "./word-route";
export const wordRouter = Router();
wordRouter.get("/", game);
wordRouter.get("/definition/:word", definition);
