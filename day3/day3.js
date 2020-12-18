const readPuzzleFile = require('../file-reader').readPuzzleFile;

const setCharAt = (str, index, chr) => {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
};

const buildEntryLine = (line, chunkLength) => {
  const encode = new TextEncoder().encode(line);
  let uint8Array = new Uint8Array(encode);

  for (let i = 0; i < chunkLength; i++) {
    uint8Array = new Uint8Array([
      ...uint8Array,
      ...encode,
    ]);
  }

  return new TextDecoder().decode(uint8Array);
};

const getTreesBySlope = (slope, right) => {
  return slope.filter(((line, index) => {
    const nextLineIndex = index + 1;
    const nextLine = slope[nextLineIndex];

    if (!nextLine) return false;

    const position = right * nextLineIndex;

    let location;
    let count = 0;
    let entryLine;

    while (!location) {
      entryLine = buildEntryLine(nextLine, count++);
      location = entryLine[position];
    }

    if (location !== '#' && location !== '.') {
      throw new Error('Cannot determine the location');
    }

    return location === '#';
  })).length;
};

const puzzles = readPuzzleFile(__dirname + '/input.txt', input => input);

// part 1
(() => {
  console.log(
    getTreesBySlope(puzzles, 3),
  );
})();

// part 2
(() => {
  const slopes = [
    [ 1, 1 ],
    [ 3, 1 ],
    [ 5, 1 ],
    [ 7, 1 ],
    [ 1, 2 ],
  ];

  console.log(
    slopes.reduce((previousValue, [ right, down ]) => {
      const filteredPuzzles = puzzles.filter((p, index) => (index % down) === 0);
      const total = getTreesBySlope(filteredPuzzles, right);
      return total === 0 ? previousValue : previousValue * total;
    }, 1)
  );
})();
