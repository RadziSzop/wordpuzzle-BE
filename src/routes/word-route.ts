import { Request, Response } from "express";
import { getCombinations } from "../utils/getCombinations";
import { getRandomLetters } from "../utils/getRandomLetters";
import { getCorrectWords } from "../utils/getCorrectWords";
import enJson from "../shared/wordslists/en.json";

const enWords = new Set<string>(enJson);

export const game = async (req: Request, res: Response) => {
  let correctWords: string[] = [];
  let letters: string;
  do {
    letters = getRandomLetters(8);
    const combinations = getCombinations(letters);
    correctWords = getCorrectWords(enWords, combinations);
  } while (correctWords.length <= 20);
  return res.json({
    data: { words: correctWords, letters: letters.split("") },
  });
};
