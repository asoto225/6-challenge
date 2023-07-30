var searchbtn = document.getElementById('search-btn'); // search button
var searchBar = document.getElementById('searchbar'); // search bar value
var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Tucson&appid=47fbf18e9aa6db4612259cb730822a98&units=imperial'; // api url
var temp = document.querySelector('.temp'); // add temp value
var windSpeed = document.querySelector('.wind-speed'); // add wind speed value
var humidity = document.querySelector('.humidity'); // add humidity value
var city = document.querySelector('.name'); // add city name


document.addEventListener("DOMContentLoaded", function () {
    var currentDate = new Date();
    var options = { month: "long", day: "numeric", year: "numeric" };
    var formattedDate = currentDate.toLocaleDateString(undefined, options);
    var currentWeatherItemsEl = document.getElementsByClassName('weather-items');
    document.getElementById("currentDay").textContent = formattedDate;

});



function getApi(requestUrl) {
    fetch(requestUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)
            var i = data.list[i]
            var tempValue = data.list[0].main.temp;
            var windValue = data.list[0].wind.speed;
            var humidValue = data.list[0].main.humidity;
            var cityName = data.city.name;
            
            var results = [
            temp.innerHTML = tempValue,
            windSpeed.innerHTML = windValue,
            humidity.innerHTML = humidValue,
            city.innerHTML = cityName
            ]

            for(i = 1; i < 6; i++) {
                console.log(i)
                if(i === 5)
                return results
            }

            // temp.innerHTML = tempValue;
            // windSpeed.innerHTML = windValue;
            // humidity.innerHTML = humidValue;
            // city.innerHTML = cityName;

        });
};

getApi(requestUrl);


// searchbtn.addEventListener('click', getApi, {
//     // var inputValue = searchBar.ariaValueMax;
// });