// Remember, we're gonna use strict mode in all scripts now!
'use strict';

const temp = [17, 21, 23];
const printForecast = function (arr) {
  const len = arr.length;
  let str = '... ';
  for (let i = 1; i <= len; i++) {
    str += `${arr[i - 1]}℃ in ${i} day... `;
  }
  console.log(str);
};
printForecast(temp);
