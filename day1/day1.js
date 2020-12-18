const readPuzzleFile = require('../file-reader').readPuzzleFile;

const puzzle = readPuzzleFile(__dirname + '/input.txt', input => parseInt(input, 10));

// part 1
console.log(
  puzzle
    .filter(it => puzzle.find(p1 => (it + p1) === 2020))
    .reduce((previous, current) => current * previous, 1)
);

// part 2
console.log(
  puzzle
    .filter(it => puzzle.find(p1 => puzzle.find(p2 => (it + p1 + p2) === 2020)))
    .reduce((previous, current) => previous * current, 1)
);


