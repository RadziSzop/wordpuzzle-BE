import { Request, Response } from "express";
import { getCombinations } from "../utils/getCombinations";
import { getRandomLetters } from "../utils/getRandomLetters";
import { getCorrectWords } from "../utils/getCorrectWords";
let enJson = require("../shared/wordslists/en.json");
const enWords = new Set<string>(enJson);

export const game = async (req: Request, res: Response) => {
  let correctWords: string[] = [];
  do {
    const letters = getRandomLetters(9);
    const combinations = getCombinations("sampling");
    correctWords = getCorrectWords(enWords, combinations);
  } while (correctWords.length <= 20);
  return res.json({ data: { words: correctWords } });
};
