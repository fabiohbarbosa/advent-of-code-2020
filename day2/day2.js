const readPuzzleFile = require('../file-reader').readPuzzleFile;

const puzzle = readPuzzleFile(__dirname + '/input.txt', input => {
  const columns = input.split(' ');

  const [ firstPolicy, secondPolicy ] = columns[0].split('-');
  const letter = columns[1].replace(':', '');
  const password = columns[2];

  return {
    firstPolicy: parseInt(firstPolicy, 10),
    secondPolicy: parseInt(secondPolicy, 10),
    letter,
    password,
  };
});

// part 1
console.log(
  puzzle.filter(it => {
    const { firstPolicy: min, secondPolicy: max, letter, password } = it;
    const totalLettersInPassword = Object.values(password).filter(p => p === letter).length;
    return totalLettersInPassword >= min && totalLettersInPassword <= max;
  }).length
);

// part 2
console.log(
  puzzle.filter(it => {
    const { firstPolicy, secondPolicy, letter, password } = it;
    const passwordChars = Object.values(password);

    const hasFirstChar = passwordChars[firstPolicy - 1] === letter;
    const hasSecondChar = passwordChars[secondPolicy - 1] === letter;

    return (hasFirstChar && !hasSecondChar) || (hasSecondChar && !hasFirstChar);
  }).length
);
