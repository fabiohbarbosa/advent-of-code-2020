const readPuzzleFile = require('../file-reader').readPuzzleFile;

const puzzles = readPuzzleFile(__dirname + '/input.txt', input => input, '\n\n');

// part 1
(() => {
  console.log(
    puzzles
      .map(it => it.replace(/\n/g, ''))
      .reduce((prev, it) => {
        const letters = Object.values(it);
        return prev + new Set(letters).size;
      }, 0)
  );
})();

// part 2
(() => {
  console.log(
    puzzles.reduce((prev, it) => {
      const map = new Map();
      const answers = it.split('\n').filter(a => !!a); // filter will remove last break line

      answers.forEach(answer => {
        Object.values(answer).forEach(answerKey => {
          if (map.has(answerKey)) {
            map.set(answerKey, map.get(answerKey) + 1);
          } else {
            map.set(answerKey, 1);
          }
        });
      });

      const total = Array.from(map)
        .filter(([, total]) => total === answers.length)
        .map(([key,]) => key);

      return prev + total.length;
    }, 0)
  );
})();
