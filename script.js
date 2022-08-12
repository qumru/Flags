const countries = document.getElementById('countries');
const countries_inner = document.getElementById('countries-inner');
const form = document.getElementById('myForm');
const input = document.getElementById('myInput');
const dropdown_list = document.getElementById('dropdown-list');
const dropbtn = document.getElementById('dropbtn');

var arr = [];
fetchCountries();
function fetchCountries() {
    fetch(`https://restcountries.com/v3.1/all`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            arr = data;
            generate(arr);
        });
}

function generate(arr) {
    let html = '';
    for (let i of arr) {
        html += `
            <div id="country">
            <a class="link" href='details.html?countryName=${i.name.common}'>
            <div id="flag"><img id="flag-img" src=${i.flags.png}></div>
            <div id="info">
                <p id="country-name">${i.name.common}</p>
                <p class="country-info1">Popuation:<span class="country-info2"> ${i.population}</span></p>
                <p class="country-info1" id="region-name">Region:<span class="country-info2"> ${i.region}</span></p>
                <p class="country-info1">Capital:<span class="country-info2"> ${i.capital}</span></p>
            </div>
            </a>
        </div> 
        `
    }
    countries_inner.innerHTML = html;
}

//filter by regions
dropdown_list.addEventListener('click', function (event) {
    if (event.target.id == '2') {
        generate(arr.filter(data => data.region === 'Africa'));
        dropbtn.innerText = 'Africa';
    } else if (event.target.id == '3') {
        generate(arr.filter(data => data.region === 'Americas'));
        dropbtn.innerText = 'America';
    } else if (event.target.id == '4') {
        generate(arr.filter(data => data.region === 'Asia'));
        dropbtn.innerText = 'Asia';
    } else if (event.target.id == '5') {
        generate(arr.filter(data => data.region === 'Europe'));
        dropbtn.innerText = 'Europe';
    } else if (event.target.id == '6') {
        generate(arr.filter(data => data.region === 'Oceania'));
        dropbtn.innerText = 'Oceania';
    } else if (event.target.id == '1') {
        generate(arr);
        dropbtn.innerText = 'All';
    }
});

//search by name
form.addEventListener('input', function (event) {
    event.preventDefault();
    const task = input.value;
    fetch(`https://restcountries.com/v3.1/name/${task}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            arr = data;
            generate(arr);
        });
});

//theme
const theme_btn = document.getElementById('theme-button');
const theme_icon = document.getElementById('theme-img');
theme_btn.addEventListener('click', function () {
    if (document.documentElement.dataset.theme === 'dark') {
        document.documentElement.dataset.theme = 'light';
        theme_icon.src = "../homework4/pictures/moon-light.svg";
    }
    else {
        document.documentElement.dataset.theme = 'dark';
        theme_icon.src = "../homework4/pictures/moon-dark.svg";
    }
});

//dropdown
function myFunction() {
    document.getElementById("dropdown-content").classList.toggle("show");
}
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}