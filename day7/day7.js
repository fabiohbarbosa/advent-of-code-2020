const readPuzzleFile = require('../file-reader').readPuzzleFile;

const puzzles = readPuzzleFile(__dirname + '/input.txt', input => input);

console.log(puzzles.filter(p => p.includes('shiny gold')));

// part 1
(() => {
  const bags = Object.keys(
    puzzles.reduce((prev, it) => {

      const line = it.replace("bags", "").replace("bag", "").split("contain");

      const match = /(.*) bags? (.*)[0-9]{1,} shiny gold bag(.*)/.exec(it);
      if (!match) return prev;

      return {
        ...prev,
        [match[1]]: true,
      }
    }, {})
  );
  console.log(bags.length);
})();
