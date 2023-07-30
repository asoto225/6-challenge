// let cityName = document.getElementById('searchbar');
let searchbtn = document.getElementById('search-btn');
let searchBar = document.getElementById('searchbar');


document.addEventListener("DOMContentLoaded", function () {
    var currentDate = new Date();
    var options = { month: "long", day: "numeric", year: "numeric" };
    var formattedDate = currentDate.toLocaleDateString(undefined, options);

    document.getElementById("currentDay").textContent = formattedDate;

});

var response = fetch("https://api.openweathermap.org/data/2.5/forecast?q=Tucson&appid=47fbf18e9aa6db4612259cb730822a98&units=imperial")
    .then(function (response) { return response.json() })
    .then(
        function(data) {

            console.log(data)
            // let weatherData = {
                // temperature: data.main.temp,
                // humidity: list[0].main.humidity,
                // wind: list[0].wind.speed,


        }
           
        
    
        
    );
    



// function getWeatherData(cityName) {
//     let url = "https://api.openweathermap.org/data/2.5/forecast?q=Tucson&appid=47fbf18e9aa6db4612259cb730822a98"
//     return fetch(url)
//     .then (response => response.json())
//     .then (data => {
//         const weatherData = {
//             temp: data[0].main.temp,
//             humidity: data[0].main.humidity,
//             wind: data.wind[0].speed
//         };
//         console.log(weatherData);
    
//     });

// };

// searchbtn.addEventListener('click', () => 
// {
//     var location = searchBar.value;
//     getWeatherData(location)
//     .then(weatherData)
// });
