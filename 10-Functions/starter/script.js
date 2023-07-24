'use strict';

const greet = greeting => name => console.log(`${greeting}! ${name}`);
greet('h1')('zkl');

const beijindaxing = {
  airline: 'BeiJinDaXing',
  iataCode: 'BJDX',
  planes: 300,
  buPlane: function () {
    this.planes++;
    console.log(this.planes);
  },
};

// document.querySelector('.buy').addEventListener('click', beijindaxing.buPlane); // result = NaN,因为this默认指向调用它的元素，在这里是document.querySelector('.buy'),它里面没有plans属性，所有使用bind自定义属性，使用bind是因为bind返回一个函数，而这里需要一个函数作为参数。
document
  .querySelector('.buy')
  .addEventListener('click', beijindaxing.buPlane.bind(beijindaxing));

// challenge 1
const poll = {
  answer: [0, 0, 0, 0],
  // answer: new String('0,0,0,0'),
  // answer: new Array(4).fill(0),
  registerNewAnswer: function () {
    const choice = Number(
      prompt(
        'What is your favourite programming language? \n0:JavaScript\n1:Python\n2:Rust\n3:C++\n(Write option number)'
      )
    );
    if (typeof choice === 'number' && choice >= 0 && choice <= 3)
      this.answer[choice]++;
    else alert('wrong input !');
    // console.log(typeof this.answer);
    this.displayResult();
    this.displayResult('string');
  },
  displayResult(type = 'array') {
    if (type === 'array') console.log(this.answer);
    else console.log(`Poll results are ${this.answer.join(',')}`);
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResult.call({ answer: [5, 2, 3] }, 'string');
poll.displayResult.call({ answer: [5, 2, 3] });
poll.displayResult.call({ answer: [1, 5, 3, 9, 6, 1] }, 'string');

// IIFE
(function () {
  console.log('这个方程只执行一次！');
})();
(() => console.log('run once only'))();

// challenge 2
(function () {
  const header = document.querySelector('h1');
  document.querySelector('body').addEventListener('click', () => {
    header.style.color = 'blue';
  });
})();
