'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
const displayMovements = function (movements, type = false) {
  containerMovements.innerHTML = '';

  let movs = movements;
  if (type) movs = movements.slice().sort((a, b) => a - b);

  movs.forEach(function (mov, i) {
    const type = mov >= 0 ? 'deposit' : 'withdrawal';
    const html = `
          <div class="movements__row">
            <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
            <div class="movements__value">${mov}€</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((sum, mov) => sum + mov, 0);
  labelSumIn.textContent = `${income}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((sum, mov) => sum + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposits => (deposits * acc.interestRate) / 100)
    .filter(inte => inte > 1)
    .reduce((acc, inte) => acc + inte, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);
console.log(accounts);

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDisplaySummary(acc);
  calcDisplayBalance(acc);
};

// login
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // clear
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    inputLoginUsername.blur();

    // UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const transferName = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  const transferAmount = Number(inputTransferAmount.value);
  // console.log(transferName, transferAmount);

  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    transferAmount > 0 &&
    transferAmount <= currentAccount.balance &&
    transferName?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-transferAmount);
    transferName.movements.push(transferAmount);
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    accounts.splice(index, 1);

    containerApp.style.opacity = 0;

    inputCloseUsername.value = inputClosePin.value = '';
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);

    updateUI(currentAccount);

    inputLoanAmount.value = '';
  }
});

let sorted = true;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
// LECTURES
console.log('------lectures------');
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// foreach set
console.log('------forEach on set------');
const demoSet = new Set([1, 2, 3, 4, 5]);
demoSet.forEach(function (value, key, set) {
  console.log(value + ':' + key);
});
// foreach map
console.log('------forEach on map------');
currencies.forEach(function (value, key, map) {
  console.log(key + ':' + value);
});

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// foreach
// console.log(movements.entries());
console.log('------forEach------');
movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
});
/////////////////////////////////////////////////

let arr = [1, 2, 3, 4, 5, 6];

// slice
console.log('------slice------');
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice());
console.log([...arr]);

//splice
console.log('------splice------');
arr.splice(1, 2);
console.log(arr);

// challenge 1
console.log('------challenge 1------');
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice(1, -2);
  const dogs = [...dogsJuliaCorrected, ...dogsKate];
  dogs.forEach(function (dog, i, arr) {
    console.log(
      `Dog number ${i + 1} is ${
        dog >= 3 ? 'an adult, and is ' + dog + ' years old' : 'still a puppy 🐶'
      }`
    );
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

// challenge 2
console.log('------challenge 2------');
const calcAverageHumanAge = function (ages) {
  const humanAge = ages
    .map(function (age) {
      if (age <= 2) return 2 * age;
      else return 16 + age * 4;
    })
    .filter(age => age >= 18);

  const arr =
    humanAge.reduce(function (age, cur) {
      return age + cur;
    }, 0) / humanAge.length;
  return arr;
};
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// challenge 3
const newCalcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + 4 * age))
    .filter(age => age >= 18)
    .reduce((age, cur, i, arr) => age + cur / arr.length, 0);

console.log(newCalcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(newCalcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

//fill
console.log('------fill------');
const arrFill = new Array(7);
arrFill.fill(1, 2, 4); // 从下标2,4用1不全，但不包括下标4
console.log(arrFill);
// from
console.log('------from------');
const arrFrom = Array.from({ length: 5 }, (arr, i) => i + 1);
console.log(arrFrom);

// challenge 4
console.log('------challenge 4------');
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(dog => {
  dog.recomm = Math.trunc(dog.weight ** 0.75 * 28);
});
console.log(dogs);

const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
if (sarahDog.curFood <= sarahDog.recomm * 0.9) console.log('eat too little');
else if (sarahDog.curFood >= sarahDog.recomm * 1.1) console.log('eat too much');
else console.log('eat just OKAY');

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recomm)
  .flatMap(dog => dog.owners);
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recomm)
  .flatMap(dog => dog.owners);
console.log(`${ownersEatTooMuch}'s dog eat too much`);
console.log(`${ownersEatTooLittle}'s dog eat too little`);

if (dogs.find(dog => dog.curFood === dog.recomm)) console.log(true);
else console.log(false);

if (
  dogs.some(
    dog => dog.curFood >= dog.recomm * 0.9 && dog.curFood <= dog.recomm * 1.1
  )
)
  console.log(true);
else console.log(false);

const eatOK = dogs.filter(
  dog => dog.curFood >= dog.recomm * 0.9 && dog.curFood <= dog.recomm * 1.1
);
console.log(eatOK);

const dogSort = dogs.slice().sort((a, b) => a.recomm - b.recomm);
console.log(dogSort);

console.log('------------');
