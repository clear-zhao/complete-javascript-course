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

// array
const friends = ["a", "b", "c"];
logger(friends);
const years = new Array(1991, 1992, 2002, 2020, 2023);
logger(years);
logger(friends[0]);
logger(friends.length);

// cant do
// friends = ["d", "e"];

const firstName = "g";
const jonas = [firstName, "f", 2023 - 1991, friends];
logger(jonas);

// methods
friends.push("d");
logger(friends);
friends.unshift("0");
logger(friends);
friends.pop();
logger(friends);
friends.shift();
logger(friends);
logger(friends.indexOf("a"));
logger(friends.indexOf("e"));

logger(friends.includes("a"));
logger(friends.includes("e"));

const bills = [125, 555, 44];
const tip = [];
const total = [];

const calcTip = (bill) => {
  if (bill >= 50 && bill <= 300) return bill * 0.15;
  else return bill * 0.2;
};

tip.push(calcTip(bills[0]));
tip.push(calcTip(bills[1]));
tip.push(calcTip(bills[2]));

total.push(bills[0] + tip[0]);
total.push(bills[1] + tip[1]);
total.push(bills[2] + tip[2]);

logger(total);

// object
const school = {
  address: "non",
  schoolName: "lzjtu",
  age: 2023 - 1958,
  calaScore: function (score) {
    return score >= 90 ? "A" : "B";
  },
  getAddress: function () {
    logger(this);
    return this.address;
  },
};

logger(school.address);
logger(school["address"]);

// const choice = prompt('choice');
// logger(choice);

// add
school.phone = 18888888;
logger(school);

// function
logger(school.calaScore(89));
logger(school["calaScore"](90));

// this
logger(school.getAddress());

const mark = {
  firstName: "Mark",
  lastName: "Miller",
  weight: 78,
  height: 1.69,
  calaBMI: function () {
    return this.weight / this.height ** 2;
  },
};
const john = {
  firstName: "john",
  lastName: "Smith",
  weight: 92,
  height: 1.95,

  calaBMI: function () {
    return this.weight / this.height ** 2;
  },
};

logger(
  `${
    mark.calaBMI() > john.calaBMI()
      ? mark.firstName + mark.lastName
      : john.firstName + john.lastName
  } (${
    mark.calaBMI() > john.calaBMI() ? mark.calaBMI() : john.calaBMI()
  }) higher than ${
    mark.calaBMI() < john.calaBMI()
      ? mark.firstName + mark.lastName
      : john.firstName + john.lastName
  } (${mark.calaBMI() < john.calaBMI() ? mark.calaBMI() : john.calaBMI()})`
);

// loop
for (let rep = 1; rep <= 10; rep++) {
  logger(rep);
}

for (let i = 0; i < friends.length; i++) {
  logger(friends[i]);
}

const billss = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

for (let i = 0; i < billss.length; i++) {
  totals.push(calcTip(billss[i]) + billss[i]);
}

const calcAverages = function (arr) {
  if (typeof arr !== "object") return false;
  let cunt = 0;
  for (let i = 0; i < arr.length; i++) {
    cunt += arr[i];
  }
  return cunt / arr.length;
};

logger(calcAverages(totals));
