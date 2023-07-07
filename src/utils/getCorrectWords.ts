export const getCorrectWords = (
  words: Set<string>,
  combinations: Set<string>
) => {
  const correctWords: string[] = [];
  words.forEach((word: string) => {
    if (combinations.has(word)) {
      correctWords.unshift(word);
    }
  });
  return correctWords;
};
