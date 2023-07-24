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
