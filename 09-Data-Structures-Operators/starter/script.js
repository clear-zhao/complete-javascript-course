'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

for (let flight of flights.split('+')) {
  // console.log(flight);
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''} ${type.replaceAll(
    '_',
    ' '
  )} from ${from.slice(0, 3).toUpperCase()} to ${to
    .slice(0, 3)
    .toUpperCase()} ${time.replace(':', 'h')}.padStart(36)`;
  console.log(output);
}

const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours,

  orderDelivery: function ({
    startIndex = 1,
    mainIndex = 1,
    time = '20:00',
    address = 'no',
  }) {
    console.log(
      `Order reciver! ${this.starterMenu[startIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time} `
    );
  },
};

restaurant.orderDelivery({
  time: '22:20',
  address: 'yong hong',
  startIndex: 2,
  mainIndex: 2,
});

restaurant.orderDelivery({
  time: '22:30',
});

// 嵌套解构
let a, b, c;
[a, b, c] = [1, 2, 3];
console.log(a, b, c);

const [x = 1, y = 2, z = 3] = [4, 5];
console.log(x, y, z);

// object distructure
const { name, openingHourss, categories } = restaurant;
console.log(name, openingHourss, categories);

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// mutaing variables
a = 111;
b = 222;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
console.log(a, b);

const {
  fri: { open: o, close: cl },
} = openingHours;
console.log(o, cl);

// ...

// or
console.log(undefined || 0);

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

console.log('---------- challenge 1 ----------');

const [players1, players2] = game.players;
console.log(players1, players2);

const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

const allPlayers = [...players1, ...players2];
console.log(allPlayers);

const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

const printGoals = function (...players) {
  console.log(players);
  console.log(`${players.length} goals`);
};
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

team1 < team2 && console.log('team1 likely to win');
team2 < team1 && console.log('team2 likely to win');

// loop for-of
// for(let item of x){}

// ?.
console.log(game.index?.open);
console.log(restaurant.openingHours?.mon?.open);
console.log(restaurant.orderRisotto?.(0, 1) ?? 'not a methods');

// loop object
// name
const properties = Object.keys(openingHours);
console.log(properties);

// value
const values = Object.values(openingHours);
console.log(values);

// entire object
const entries = Object.entries(openingHours);
console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(`on ${key} we open at ${open} and close at ${close}`);
}

const arr = [1, 2, [3, 4]];
const [aa, bb, [cc, dd]] = arr;
console.log(aa, bb, cc, dd);

// BUG error
// for (const [a, b, [c, d]] of arr) {
//   console.log(a, b, c, d);
// }

// changle 2
for (const [index, playerName] of game.scored.entries()) {
  console.log(`${index}: ${playerName}`);
}

const odds = Object.values(game.odds);
let cunt = 0;
for (const odd of odds) {
  cunt += odd;
}
console.log((cunt /= odds.length));

for (const [key, value] of Object.entries(game.odds)) {
  // console.log(`${key}: ${value}`);
  console.log(
    `Odd of ${key === 'x' ? 'draw' : 'victory ' + game[key]}:${value}`
  );
}

const scores = {};
for (const player of game.scored) {
  scores[player] ? scores[player]++ : (scores[player] = 1);
}
console.log(scores);

// set 自动去重
const arrSet = new Set(['a', 'a', 'b']);
console.log(arrSet);

//map
const rest = new Map();
rest
  .set('open', 11)
  .set('close', 23)
  .set(true, 'we are open :D')
  .set(false, 'we are close :(');

const currentTime = 22;
console.log(
  rest.get(currentTime >= rest.get('open') && currentTime <= rest.get('close'))
);
// has,delete...

// use arry as key
const arrMap = [1, 2];
rest.set(arrMap, 'arr');
console.log(rest);

// error
// console.log(rest.get([1, 2]));
// undefiend,这里的数组和上面的数组虽然写法一致但是本质不同,在内存中不一样
// fixed
console.log(rest.get(arrMap));

//document can be key
rest.set(document.querySelector('h1'), 'heading');
console.log(rest);

// challenge 3
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

const events = new Set([...gameEvents.values()]);
// const events = [...new Set(gameEvents.values())];
console.log(events);

gameEvents.delete(64);
console.log(gameEvents);

console.log('An event happened, on average, every 9 minutes');

for (const [time, event] of gameEvents) {
  console.log(
    `${time <= 45 ? '[FIRST HALF]' : '[SECOND HALF]'}${time}:${event}`
  );
}

// challenge 4
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', () => {
  const text = document.querySelector('textarea').value;
  console.log(text);
  const textArr = text.split('\n');
  console.log(textArr);
  let cnt = 1;
  for (let item of textArr) {
    let itemArr = item.split('_');
    let newItem = itemArr[0];
    for (let i = 1; i < itemArr.length; i++) {
      newItem += itemArr[i][0].toUpperCase() + itemArr[i].slice(1);
    }
    console.log(`${newItem}${'✔'.repeat(cnt)}`);
    cnt++;
  }
});
