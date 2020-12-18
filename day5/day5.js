const readPuzzleFile = require('../file-reader').readPuzzleFile;

const extractPassportData = (regex, data) => {
  const match = regex.exec(data);

  if (match && match.length === 2) {
    return match[1];
  }

  return null;
};

const puzzles = readPuzzleFile(__dirname + '/input.txt', input => input);

const isFront = (char) => {
  return char === 'F';
};

const getRowsRange = (char, [ min, max ]) => {
  const delta = ((max - min) / 2) + min;

  return isFront(char) ? [ min, Math.trunc(delta) ] : [ Math.ceil(delta), max ];
};

const isLeft = (char) => {
  return char === 'L';
};

const getSeats = (char, [ min, max ]) => {
  const delta = ((max - min) / 2) + min;

  return isLeft(char) ? [ min, Math.trunc(delta) ] : [ Math.ceil(delta), max ];
};

// part 1
(() => {
  const seatIds = puzzles.map(it => {
    const [
      // rows
      firstChar,
      secondChar,
      thirdChar,
      fourthChar,
      fifthChar,
      sixthChar,
      seventhChar,
      // columns
      octaveChar,
      ninthChar,
      tenthChar,
    ] = it;

    // top range value
    let rows = getRowsRange(firstChar, [ 0, 127 ]);
    rows = getRowsRange(secondChar, rows);
    rows = getRowsRange(thirdChar, rows);
    rows = getRowsRange(fourthChar, rows);
    rows = getRowsRange(fifthChar, rows);
    const [ rowMin, rowMax ] = getRowsRange(sixthChar, rows);

    const row = isFront(seventhChar) ? rowMin : rowMax;

    const columns = getSeats(octaveChar, [ 0, 7 ]);
    const [ colMin, colMax ] = getSeats(ninthChar, columns);

    const column = isLeft(tenthChar) ? colMin : colMax;

    return row * 8 + column;
  }).sort((a, b) => a - b);

  console.log(Math.max.apply(null, seatIds));

  // part 2
  const outOfOrder = [];

  seatIds.forEach((id, index) => {
    if (seatIds[index +1] && ((seatIds[index + 1] - id) !== 1)) {
      outOfOrder.push(id + 1);
    }
  });

  console.log(outOfOrder);

})();
