//Get all necessary elements from the DOM
const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windoutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');
app.style.backgroundImage = "url('https://images.unsplash.com/photo-1616249807402-9dae436108cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')"


//Default city when the page Lodas
let cityInput = "London";
//Add click event to each city in the panel
cities.forEach((city) => {
  city.addEventListener('click', (e) => {
    //Change from default city to the clicked one
    cityInput = e.target.innerHTML;
    /* Function that fetches and displays
    all the data from the weather API
    (ive will write it soon) */
    fetchWeatherData();
    //Fade out the app (simple animation)
    app.style.opacity = "0";
  });
})

//Add submit event to the form
form.addEventListener('submit', (e) => {
  e.preventDefault()
  /*If the input field (search bar)
  is empty, throw an alert*/
  if (search.value.length == 0) {
    alert('Please type in a city name');
  } else {
    /*Change from default city to the
    one written in the input field*/
    cityInput = search.value;
    /*Function that fetches and displays
    all the data from the weather API
    (We will write it soon)*/
    fetchWeatherData();
    // Remove all text from the input field
    search.value = "";
    // Fade out the app (simple animation)
    app.style.opacity = "";
  }
  e.preventDefault()
});

/*Monday, Tuesday, Friday...) from a date (12 03 2021)
We will use this function Later*/
function dayOfTheWeek(day, month, year) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};


function fetchWeatherData() {
  const key = "270f9ec4355cc964dc4afa470f06935b"
  fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${key}&q=${cityInput}`)
    .then(response => response.json())
    .then(data => {
      const date = new Date(data.dt * 1000); // Convert UNIX timestamp to local date
      const iconSrc = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`; // Get weather icon URL
      // console.log(`Date: ${date}`);
      // console.log(`Icon URL: ${icon}`);
      // console.log(`Cloudiness: ${data.clouds.all}%`);
      // console.log(`Humidity: ${data.main.humidity}%`);
      // console.log(`Wind Speed: ${data.wind.speed} m/s`);
      // console.log(`Temperature: ${data.main.temp} °C`);
      // console.log(data);

      let temperature = data.main.temp
      if (temperature > 100) { // Assume temperature is returned in Kelvin if it's above 100°C
        temperature -= 273.15; // Convert temperature from Kelvin to Celsius
      }
      nameOutput.innerHTML = cityInput
      icon.src = iconSrc
      conditionOutput.innerHTML = data.weather[0].main
      dateOutput.innerHTML = date.toLocaleDateString()

      temp.innerHTML = temperature.toFixed(2) + "&#176;";



      cloudOutput.innerHTML = data.clouds.all + "%";
      humidityOutput.innerHTML = data.main.humidity + "%";
      windoutput.innerHTML = data.wind.speed + "km/h";
      let timeOfDay = "day";
      const code = 0
      const isDay = date.getTime() > data.sys.sunrise * 1000 && date.getTime() < data.sys.sunset * 1000;
      if (!isDay) {
        timeOfDay = "night";
      }


    //   if (code == 1000) {
    //     app.style.backgroundImage =
    //       `url(./images/${timeOfDay}/clear.jpg)`;
    //     btn.style.background = "#e5ba92";
    //     if (timeOfDay == "night") {
    //       btn.style.background = "#181e27";
    //     }
    //   }
    //   //Same thing for cloudy weather
    //   else if (
    //     code == 1003 ||
    //     code == 1006 ||
    //     code == 1009 ||
    //     code == 1030 ||
    //     code == 1069 ||
    //     code == 1087 ||
    //     code == 1135 ||
    //     code == 1273 ||
    //     code == 1276 ||
    //     code == 1279 ||
    //     code == 1282
    //   ) {

    //     app.style.backgroundImage =
    //       `url(./images/${timeOfDay}/cloudy.jpg)`;
    //     btn.style.background = "#fa6d1b";
    //     if (timeOfDay == "night") {
    //       btn.style.background = "#181e27";
    //     }
    //     //And rain
    //   } else if (
    //     code == 1063 ||
    //     code == 1869 ||
    //     code == 1072 ||
    //     code == 1158 ||
    //     code == 1153 ||
    //     code == 1182 ||
    //     code == 1183 ||
    //     code == 1186 ||
    //     code == 1189 ||
    //     code == 1192 ||
    //     code == 1195 ||
    //     code == 1204 ||
    //     code == 1207 ||
    //     code == 1240 ||
    //     code == 1243 ||
    //     code == 1246 ||
    //     code == 1249 ||
    //     code == 1252
    //   ) {
    //     app.style.backgroundImage =
    //       `url(./images/s{timeOfDay}/rainy.jpg)`;
    //     btn.style.background = "#647d75";
    //     if (timeOfDay == "night") {
    //       btn.style.background = "#325c80";
    //     }
    //     //And finnaly... Snow
    //   } else {
    //     app.style.backgroundImage =
    //       `url(-/images/${timeOfDay}/snowy.jpg)`;
    //     btn.style.background = "#4d72aa";
    //     if (timeOfDay == "night") {
    //       btn.style.background = "#1b1b1b";
    //     }
    //   }
    //   //Fade in the page once all is done
      app.style.opacity = "1";
    }).catch((e) => {
      console.log(e)
      alert('City not found, please try again');
      app.style.opacity = "1";
    });

}
fetchWeatherData();

app.style.opacity = "1";
