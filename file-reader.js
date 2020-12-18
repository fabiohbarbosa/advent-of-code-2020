const fs = require('fs');

module.exports.readPuzzleFile = (input, parser, separator = '\n') => {
    const buffer = fs.readFileSync(input, 'utf8');
    return buffer
        .split(separator)
        .filter(data => !!data)  // remove last empty entry
        .map(parser);
};
