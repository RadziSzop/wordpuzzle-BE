import { Request, Response } from "express";
import { getCombinations } from "../utils/getCombinations";
import { getRandomLetters } from "../utils/getRandomLetters";
import { getCorrectWords } from "../utils/getCorrectWords";
import enJson from "../shared/wordslists/en.json";
import axios, { isAxiosError } from "axios";
import { GetDefinitionsRequest } from "../types/requests";

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

export const definition = async (req: Request, res: Response) => {
  try {
    const word = req.params.word;
    const response = await axios.get<GetDefinitionsRequest[]>(
      `https://api.wordnik.com/v4/word.json/${word}/definitions?limit=3&api_key=d3occyxwk02b3bsi4lwhkb8bo4istpnhbai10jc106dmqr5jf`,
      { timeout: 5000 }
    );
    const data = Array.from(
      new Set(
        response.data
          .filter(({ text }) => Boolean(text))
          .map(({ text }) => text.replace(/<[^>]*>/g, ""))
      )
    );
    if (data.length === 0) {
      res.status(404);
      return res.json({
        success: false,
        message: "No definitions found.",
      });
    }
    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 429) {
      res.status(429);
      return res.json({
        success: false,
        message: "Too many requests. Please try again later.",
      });
    }
  }
};
