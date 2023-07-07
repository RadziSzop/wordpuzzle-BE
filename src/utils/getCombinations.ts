export const getCombinations = (letters: string) => {
  const output = new Set<string>();
  const permSub = (s: string, pre: string) => {
    output.add(pre);
    for (let i = 0; i < s.length; i++) {
      permSub(s.substring(0, i) + s.substring(i + 1), pre + s.charAt(i));
    }
  };
  permSub(letters, "");
  output.delete("");
  return output;
};
