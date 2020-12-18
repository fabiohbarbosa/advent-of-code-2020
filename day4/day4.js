const readPuzzleFile = require('../file-reader').readPuzzleFile;

const extractPassportData = (regex, data) => {
  const match = regex.exec(data);

  if (match && match.length === 2) {
    return match[1];
  }

  return null;
};

const puzzles = readPuzzleFile(__dirname + '/input.txt', input => {
  const rawData = input.split('\n').flatMap(i => i.split(' '));

  return rawData.reduce((previous, data) => {
    const byr = extractPassportData(/byr:#?(.*)/, data);
    const iyr = extractPassportData(/iyr:#?(.*)/, data);
    const eyr = extractPassportData(/eyr:#?(.*)/, data);
    const hgt = extractPassportData(/hgt:#?(.*)/, data);
    const hcl = extractPassportData(/hcl:(.*)/, data);
    const ecl = extractPassportData(/ecl:#?(.*)/, data);
    const pid = extractPassportData(/pid:#?(.*)/, data);
    const cid = extractPassportData(/cid:#?(.*)/, data);

    return {
      ...previous,
      byr: byr || previous.byr,
      iyr: iyr || previous.iyr,
      eyr: eyr || previous.eyr,
      hgt: hgt || previous.hgt,
      hcl: hcl || previous.hcl,
      ecl: ecl || previous.ecl,
      pid: pid || previous.pid,
      cid: cid || previous.cid,
    }
  }, {});
}, '\n\n');

// part 1
(() => {
  console.log(
    puzzles.filter(p => p.byr && p.iyr && p.eyr && p.hgt && p.hcl && p.ecl && p.pid).length
  );
})();

const validateByr = (byr) => {
  const number = parseInt(byr, 10);

  if (!number) {
    return false;
  }

  return number >= 1920 && number <= 2002;
};

const validateIyr = (iyr) => {
  const number = parseInt(iyr, 10);

  if (!number) {
    return false;
  }

  return number >= 2010 && number <= 2020;
};

const validateEyr = (eyr) => {
  const number = parseInt(eyr, 10);

  if (!number) {
    return false;
  }

  return number >= 2020 && number <= 2030;
};

const validateHgt = (hgt) => {
  const match = /([0-9]+)(cm|in)/.exec(hgt);
  if (!match || match.length !== 3) {
    return false;
  }

  if (match[2] === 'cm') {
    return match[1] >= 150 && match[1] <= 193;
  } else {
    return match[1] >= 59 && match[1] <= 76;
  }
};

const validateHcl = (hcl) => {
  return /#(([0-9]|[a-f]){6})/.test(hcl);
};

const validateEcl = (ecl) => {
  const colors = [ 'amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth' ];
  return colors.includes(ecl);
};

const validatePid = (pid) => {
  return /^([0-9]){9}$/.test(pid);
};


// part 2
(() => {
  console.log(
    puzzles
      .filter(p => p.byr && p.iyr && p.eyr && p.hgt && p.hcl && p.ecl && p.pid)
      .filter(({ byr, iyr, eyr, hgt, hcl, ecl, pid }) => {
        const hasByrValid = validateByr(byr);
        const hasIyrValid = validateIyr(iyr);
        const hasEyrValid = validateEyr(eyr);
        const hasHgtValid = validateHgt(hgt);
        const hasHclValid = validateHcl(hcl);
        const hasEclValid = validateEcl(ecl);
        const hasPidValid = validatePid(pid);

        return hasByrValid && hasIyrValid && hasEyrValid && hasHgtValid && hasHclValid && hasEclValid && hasPidValid;
      }).length
  );
})();


