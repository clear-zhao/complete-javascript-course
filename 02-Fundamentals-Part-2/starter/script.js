"use strict"; // must be in first line
function logger(message) {
  console.log(message);
}

const age = function caclAge(birthdya) {
  return 2023 - birthdya;
};

const age2 = age(1991);
logger(age2);

// arrow function
const caclAge2 = (birthYear) => 2023 - birthYear;
const age3 = caclAge2(1991);
logger(age3);

const retired = (birthYear, firstName) => {
  const age = 2023 - birthYear;
  return `${firstName} has ${65 - age} year before he/she retired`;
};
logger(retired(1991, "mike"));

const calcAverage = (num1, num2, num3) => {
  return (num1 + num2 + num3) / 3;
};
const checkWinner = (scoreA, scoreB) => {
  if (scoreA > scoreB * 2) {
    return `Koalas win (${scoreA} vs. ${scoreB})`;
  } else if (scoreB > scoreA * 2) {
    return `Dolphins win (${scoreA} vs. ${scoreB})`;
  } else {
    return `no team wins ...`;
  }
};

const DolphinsD = 44;
const DolphinsB = 23;
const DolphinsC = 71;

const KoalasA = 65;
const KoalasB = 54;
const KoalasC = 49;

const avgKoalas = calcAverage(KoalasA, KoalasB, KoalasC);
const avgDolhins = calcAverage(DolphinsD, DolphinsB, DolphinsC);
const winner = checkWinner(avgKoalas, avgDolhins);

logger(winner);


