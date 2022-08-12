const main_content = document.getElementById('main-content');
const country = document.getElementById('country');

const theme_btn = document.getElementById('theme-button');
const theme_icon = document.getElementById('theme-img');
theme_btn.addEventListener('click', function () {
  if (document.documentElement.dataset.theme === 'dark') {
    document.documentElement.dataset.theme = 'light';
    theme_icon.src = "/moon-light.svg";
  }
  else {
    document.documentElement.dataset.theme = 'dark';
    theme_icon.src = "/moon-dark.svg";
  }
});


const url = new URL(location.href);
const params = url.searchParams;
let countryName;
if (params.has('countryName')) {
  countryName = params.get('countryName');
}
let arr = [];
fetch(`https://restcountries.com/v3.1/name/${countryName}`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    arr.push(data)
    let html = '';
    const currencies = Object.values(arr[0][0].currencies).map(o => o.name).join(',');
    const languages = Object.values(arr[0][0].languages).join(',');
    html += `
  <div class="country-flag">
    <img class="country-img" src=${arr[0][0].flags.png}>
  </div>
  <div id="main-info">
    <h3 class="country-name">${arr[0][0].name.common}</h3>
    <div class="main-info-inner">
      <div class="firstSection">
        <p class="country-info1">Native Name:<span class="country-info2"> ${arr[0][0].name.official}</span> </p>
        <p class="country-info1">Population:<span class="country-info2"> ${arr[0][0].population}</span></p>
        <p class="country-info1">Region:<span class="country-info2"> ${arr[0][0].region}</span></p>
        <p class="country-info1">Sub Region:<span class="country-info2"> ${arr[0][0].subregion}</span></p>
        <p class="country-info1">Capital:<span class="country-info2"> ${arr[0][0].capital}</span></p>
      </div>
      <div class="secondSection">
     <p class="country-info1">Top Level Domain:<span class="country-info2"> ${arr[0][0].tld}</span></p>
     <p class="country-info1">Currencies:<span class="country-info2"> ${currencies}</span></p>
     <p class="country-info1">Languages:<span class="country-info2"> ${languages}</span></p>
      </div>
    </div>
    <div class="border-countries">
      <p class="border">Border Countries</p>
      <span class="border-country">${arr[0][0].borders}</span>
    </div>
  </div>
`
    console.log(data);
    main_content.innerHTML = html;
  });