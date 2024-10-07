const reverseWord = (str) => {
  const letters = str.slice(0, -1);
  const number = str.slice(-1);

  const reverse = letters.split("").reverse().join("");

  return reverse + number;
};

const pickLongest = (str) => {
  const words = str.split(" ");

  let longest;
  let temp = 0;

  for (const word of words) {
    if (word.length > temp) {
      longest = word;
      temp = word.length;
    }
  }

  return longest;
};

const occurence = (input, query) => {
  const result = [];

  for (let i = 0; i < query.length; i++) {
    let count = 0;

    for (let j = 0; j < input.length; j++) {
      if (query[i] === input[j]) {
        count++;
      }
    }

    result.push(count);
  }

  return result;
};

const diagonalMatrix = (mat) => {
  let sum1 = 0;
  let sum2 = 0;
  const n = mat.length;

  for (let i = 0; i < n; i++) {
    sum1 += mat[i][i];
    sum2 += mat[i][n - i - 1];
  }

  return sum1 - sum2;
};

console.log(reverseWord("EIGEN1"));
console.log(pickLongest("Saya sangat senang mengerjakan soal algoritma"));
console.log(occurence(["xc", "dz", "bbb", "dz"], ["bbb", "ac", "dz"]));
console.log(
  diagonalMatrix([
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9],
  ])
);
