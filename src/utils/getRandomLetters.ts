export const getRandomLetters = (count: number) => {
  const possibleLetters = "qazwsxcderfvbgtyhnmjuiklop";
  const letters: string[] = [];
  for (let i = 0; i < count; i++) {
    letters.push(
      possibleLetters[Math.floor(Math.random() * possibleLetters.length)]
    );
  }
  return letters.join("");
};
