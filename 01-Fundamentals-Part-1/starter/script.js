const markWeight = 78;
const markHeight = 1.69;
const johnWeight = 92;
const johnHeight = 1.95;

const markMBI = markWeight / markHeight ** 2;
const johnMBI = johnWeight / johnHeight ** 2;

const markHeigherBMI = markMBI > johnMBI;

console.log(markHeigherBMI);

const year = "1991";
console.log(year + 18);
console.log(Number(year) + 18);

console.log(
  "String with \n\
multiple \n\
lines"
);

const money = 0;
if (money) {
  console.log("dont spend it all :)");
} else {
  console.log("you dont have money");
}

const a = true;
const b = false;

console.log(a && b);
console.log(a || b);
console.log(!a);

const DolphinsA = 97;
const DolphinsB = 112;
const DolphinsC = 101;

const KoalasA = 109;
const KoalasB = 95;
const KoalasC = 106;

const avgDolphins = (DolphinsA + DolphinsB + DolphinsC) / 3;
const avgKoalas = (KoalasA + KoalasB + KoalasC) / 3;

if (avgDolphins === avgKoalas) {
  if (avgDolphins >= 100 && avgKoalas >= 100) console.log("draw");
  else console.log("no team wins");
} else if (avgDolphins > avgKoalas) {
  if (avgDolphins >= 100) console.log("Dolphins win !");
  else console.log("no team win");
} else {
  if (avgKoalas >= 100) console.log("Koalas win");
  else console.log("no team win");
}

const age = 18;
age >= 18
  ? console.log("i'd like to drink wine 🍷")
  : console.log("i can only drink water");
const drink = age >= 18 ? "wine" : "drink";
console.log(`I like to drink ${age >= 18 ? "wine" : "water"}`);

const bill = 275;
const tip = bill >= 50 && bill <= 300 ? 0.15 * bill : 0.2 * bill;
console.log(
  `The bill is ${bill},the tip is ${tip},and the total value ${bill + tip}.`
);

console.log("ZKL");
