var searchbtn = document.getElementById('search-btn'); // search button
var searchBar = document.getElementById('searchbar'); // search bar value
var requestUrl; // api url
var temp = document.querySelector('.temp'); // add temp value
var windSpeed = document.querySelector('.wind-speed'); // add wind speed value
var humidity = document.querySelector('.humidity'); // add humidity value
var city = document.querySelector('.name'); // add city name
var searchForm = document.querySelector('#searchForm');
var forecastContainer = document.querySelector('#forecastContainer');

// Add timezone plugins to day.js
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

document.addEventListener("DOMContentLoaded", function () {
    var currentDate = new Date();
    var options = { month: "long", day: "numeric", year: "numeric" };
    var formattedDate = currentDate.toLocaleDateString(undefined, options);
    var currentWeatherItemsEl = document.getElementsByClassName('weather-items');
    document.getElementById("currentDay").textContent = formattedDate;

});



function getApi(search) {
    requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=47fbf18e9aa6db4612259cb730822a98&units=imperial`
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

            renderCards(data)

            for (i = 1; i < 6; i++) {
                console.log(i)
                if (i === 5)
                    return results
            }

        });
};
function renderForecastCards(forecast) {
    console.log(forecast)
    var iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
    var iconDescription = forecast.weather[0].description;
    var tempF = forecast.main.temp;
    var humidity = forecast.main.humidity;
    var windMph = forecast.wind.speed;

    var creatDiv = document.createElement('div');
    var cards = document.createElement('div');
    var cardMain = document.createElement('div');
    var cardTitle = document.createElement('h5');
    var weatherIcon = document.createElement('img');
    var tempRe = document.createElement('p');
    var windRe = document.createElement('p');
    var humidityRe = document.createElement('p');

    creatDiv.append(cards);
    cards.append(cardMain);
    cardMain.append(cardTitle, weatherIcon, tempRe, windRe, humidityRe);
    cardTitle.textContent = dayjs(forecast.dt_txt).format('M/D/YYYY');
    weatherIcon.setAttribute('src', iconUrl);
    weatherIcon.setAttribute('alt', iconDescription);
    forecastContainer.append(creatDiv);
    tempRe.innerText = 'Temperature: ';
    windRe.innerText = 'Wind Speed: ';
    humidityRe.innerText = 'Humidity: ';
    tempRe.append(tempF);
    windRe.append(windMph);
    humidityRe.append(humidity);

}

// Function to display 5 day forecast.
function renderForecast(dailyForecast) {
    // Create unix timestamps for start and end of 5 day forecast
    var startDt = dayjs().add(1, 'day').startOf('day').unix();
    var endDt = dayjs().add(6, 'day').startOf('day').unix();

    var headingCol = document.createElement('div');
    var heading = document.createElement('h4');

    headingCol.setAttribute('class', 'col-12');
    heading.textContent = '5-Day Forecast:';
    headingCol.append(heading);

    forecastContainer.innerHTML = '';
    forecastContainer.append(headingCol);

    for (var i = 0; i < dailyForecast.length; i++) {

        // First filters through all of the data and returns only data that falls between one day after the current data and up to 5 days later.
        if (dailyForecast[i].dt >= startDt && dailyForecast[i].dt < endDt) {

            // Then filters through the data and returns only data captured at noon for each day.
            if (dailyForecast[i].dt_txt.slice(11, 13) == "12") {
                renderForecastCards(dailyForecast[i]);
            }
        }
    }
}

function renderCards(data) {
    renderForecast(data.list)
}

function handleSearch(event) {
    event.preventDefault();
    var search = searchBar.value.trim();
    console.log(search)
    localStorage.setItem('city', search)
    getApi(search)
}

searchForm.addEventListener('submit', handleSearch);