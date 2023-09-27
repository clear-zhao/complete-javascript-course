'use strict';

// construct function
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const ZYJ = new Person('ZYJ', 2002);
console.log(ZYJ);

Person.prototype.calcAge = function () {
  console.log(2023 - this.birthYear);
};

ZYJ.calcAge();
console.log(Person.prototype);
console.log(Object.getPrototypeOf(ZYJ));

// code challenge 1
console.log('///////////////////');
console.log('first code challenge');
function Car(make, speed) {
  this.make = make;
  this.speed = speed;
}

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed + 'km/h');
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed + 'km/h');
};

const BMW = new Car('BMW', 120);
const Mercedes = new Car('Mercedes', 95);

BMW.accelerate();
Mercedes.accelerate();

BMW.brake();
Mercedes.brake();

// ES6 Class
console.log('///////////////////');
// class expreesion
// const PersonCl = class{}

// class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // 构造函数之外的方法会添加到他的原型上面
  calcAge() {
    console.log(2023 - this.birthYear);
  }
}

const jessica = new PersonCl('Jessica', 1996);
jessica.calcAge();

// code challenge 2
console.log('///////////////////');
console.log('code challenge 2');

// class CarCl {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   get speedUS() {
//     return this.speed / 1.6;
//   }

//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
//   accelerate = function () {
//     this.speed += 10;
//     console.log(this.speed + 'km/h');
//   };

//   brake = function () {
//     this.speed -= 5;
//     console.log(this.speed + 'km/h');
//     return this;
//   };
// }

// const Ford = new CarCl('Ford', 120);
// // Ford.accelerate();
// Ford.brake();
// console.log(Ford.speedUS);
// Ford.speedUS = 20;
// console.log(Ford);

// inherit
console.log('/////////////////////');
const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

Student.prototype.constructor = Student;

const mike = new Student('mike', 2002, 'math');
console.log(Student.prototype.constructor);

console.log(Array);

// code challenge 3
console.log('//////////////');
console.log('code challenge 3');

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.constructor = EV;
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

// console.log(EV);

const Tesla = new EV('Tesla', 0, 100);

// console.log(EV.prototype.constructor);

Tesla.accelerate();
Tesla.accelerate();
Tesla.accelerate();
Tesla.accelerate();
Tesla.chargeBattery(100);

console.log(Car.prototype);
console.log(Object.hasOwn(Car, 'chargeBattery'));

const BYD = new Car('BYD', 100);
console.log(BYD);

// inherit with es6
// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   // Instance methods
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   greet() {
//     console.log(`Hey ${this.fullName}`);
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   }

//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not a full name!`);
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   // Static method
//   static hey() {
//     console.log('Hey there 👋');
//   }
// }

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
  }
}

const NQY = new StudentCl('NQY', 2002, 'math');
NQY.introduce();

// Chaining
// instance.method_1.method_2. ... .method_n;

// code challenge 4
console.log('///////////////////////////');
console.log('code challenge 4');
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
  accelerate = function () {
    this.speed += 10;
    console.log(this.speed + 'km/h');
  };

  brake = function () {
    this.speed -= 5;
    console.log(this.speed + 'km/h');
    return this;
  };
}
class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;

    // 返回this是为了实现方法链
    return this;
  }

  // 父类使用函数声明或者函数定义，子类重写的时候也要用父类的定义方法定义
  accelerate = function () {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  };
}

const rivian = new EVCl('Rivian', 120, 23);
// console.log(Ford);
console.log(Tesla);
console.log(rivian);
// rivian
//   .accelerate()
//   .accelerate()
//   .accelerate()
//   .brake()
//   .chargeBattery(50)
//   .accelerate();
rivian.accelerate();
// console.log(rivian.speedUS);
