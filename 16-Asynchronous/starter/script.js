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
