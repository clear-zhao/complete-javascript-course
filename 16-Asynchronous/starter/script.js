'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// old AJAX function

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     const [language] = Object.values(data.languages);
//     const [currencie] = Object.getOwnPropertyNames(data.currencies);
//     console.log(currencie);

//     const html = `
//         <article class="country">
//           <img class="country__img" src="${data.flags.svg}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name.common}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)} people</p>
//             <p class="country__row"><span>🗣️</span>${language}</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[currencie].symbol
//             }</p>
//           </div>
//         </article>`;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };
// getCountryData('china');
// getCountryData('japan');

// fetch and promise
const getJSON = function (url, errorMessage = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMessage} ${response.status}`);
    return response.json();
  });
};

const renderErr = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const renderCountry = function (data, classsName = '') {
  const [language] = Object.values(data.languages);
  const [currencie] = Object.getOwnPropertyNames(data.currencies);
  const html = `
        <article class="country ${classsName}">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${language}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[currencie].symbol
            }</p>
          </div>
        </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const getCountryData = function (country) {
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    'country was not found'
  )
    .then(data => {
      renderCountry(data[0]);
      if (!data[0].borders) throw new Error('no neighbour found');
      const neighbour = data[0].borders[0];

      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'country was not found'
      );
    })
    .then(data => {
      renderCountry(data[0], 'neighbour');
    })
    .catch(err => {
      console.log(`${err} 💥💥💥`);
      renderErr(
        `ops! something went worng,${err.message},please try again later.`
      );
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  // getCountryData('australia');
  // getCountryData('asdasdadad');
  getCountryData('china');
});

// code challenge 1

const BDApiKey =
  'http://api.map.baidu.com/geocoder/v2/?ak=eH1LUe5X9Px9Vl6ST4koYuSGUXEYM1Wp&callback=renderReverse&location=39.983424,116.322987&output=json&pois=0';
const Geoapify =
  'https://api.geoapify.com/v1/geocode/reverse?lat=51.21709661403662&lon=6.7782883744862374&apiKey=29b46cf17bde40cca6efd1ce594c3aba';
const whereAmI = function (lat, lng) {
  console.log('///////////////////////////');
  console.log('code challenge 1');
  // 百度地图api有跨域问题

  // 使用其他api
  fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=29b46cf17bde40cca6efd1ce594c3aba`
  )
    .then(response => {
      if (!response.ok)
        throw new Error(`there is something wrong in API, ${response.status}`);
      return response.json();
    })
    .then(data => {
      const country = data.features[0].properties.country;
      const city = data.features[0].properties.city;
      console.log(`you are in city:${city},country:${country}`);

      return fetch(`https://restcountries.com/v3.1/name/${country}`);
    })
    .then(response => {
      if (!response.ok) throw new Error(`no such country, ${response.status}`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥💥💥`))
    .finally(() => (countriesContainer.style.opacity = 1));
};
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

//////////////////////////////////////////////
// code challenge 2

// promise
// const log1 = function () {
//   // console.log('1');
//   return 1;
// };

// const log2 = function () {
//   // console.log(2);
//   return 2;
// };

// const myPromise = new Promise(function (resovle, reject) {
//   const number = Math.random();
//   if (number > 0.2) resovle(log1);
//   else reject(log2);
//   console.log('still execute');
// });

// console.log('myPromise', myPromise);

// myPromise.then(
//   val => console.log(val),
//   val => console.log(val)
// );

// promise 2
// const log1 = function () {
//   // console.log('1');
//   return 1;
// };

// const log2 = function () {
//   // console.log(2);
//   return 2;
// };

// const myPromise = function () {
//   return new Promise(function (resovle, reject) {
//     const number = Math.random();
//     if (number > 0.2) resovle(log1);
//     else reject(log2);
//     // console.log('still execute');
//   });
// };
// // console.log('myPromise', myPromise);
// const returnValue = myPromise();
// console.log(returnValue);

// returnValue.then(
//   val => console.log(val),
//   val => console.log(val)
// );

const img = document.querySelector('.images');

const wait = function (seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, seconds * 1000);
  });
};
const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const newImg = document.createElement('img');
    newImg.src = imgPath;

    newImg.addEventListener('load', function () {
      // img.insertAdjacentElement('beforeend', newImg);
      img.append(newImg);
      resolve(newImg);
    });

    newImg.addEventListener('error', function () {
      // throw new Error('img load wrong !');
      reject('load error');
    });
  });
};

// let currentImg;
// createImage('./img/img-1.jpg')
//   .then(newImg => {
//     currentImg = newImg;
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('./img/img-2.jpg');
//   })
//   .then(newImg => {
//     currentImg = newImg;
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(error =>
//     console.log(
//       `therre is something wrong with loading image ! ${error.message}`
//     )
//   );

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

/////////////////////////////////////////////////
// async,await
//try catch

// const myAsync = async function (country) {
//   const myFetch = await fetch(`https://restcountries.com/v3.1/name/${country}`);
//   console.log(myFetch);
// };
// myAsync('usa');

// const myAnotherAsync = function (country) {
//   console.log(fetch(`https://restcountries.com/v3.1/name/${country}`));
// };
// myAnotherAsync('china');

//////////////////////////////////////////////
// code challenge 3

// part 1
let currentImgAsync;
const createImageAsync = async function (imgPath1, imgPath2) {
  try {
    currentImgAsync = await createImage(imgPath1);

    await wait(2);
    currentImgAsync.style.display = 'none';
    await wait(2);
    currentImgAsync = await createImage(imgPath2);
    await wait(2);
    currentImgAsync.style.display = 'none';
  } catch (err) {
    console.error(`${err.message} 💥`);
  }
};
// createImageAsync('img/img-1.jpg', 'img/img-2.jpg');

// part 2
const loadAll = async function (imgArr) {
  // let a = [];
  try {
    // 由于async函数只返回promise，所以获取确切值可以用以下方法，但是没什么必要
    // const imgs = imgArr.map(async img => {
    //   const b = await createImage(img);
    //   a.push(b);
    //   // console.log(a);
    // }); // return three promises
    // console.log(a);

    const imgs = imgArr.map(async img => await createImage(img));
    // async函数返回promise
    const imgsEl = await Promise.all(imgs);
    // console.log(imgsEl); // promises 里面的值组成的数组
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(`${err.message}  💥`);
  }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
