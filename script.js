const APIKey = "166a433c57516f51dfab1f7edaed8413";

const today = document.getElementById("currentDay");
const now = dayjs().format('(M/DD/YYYY)'); 

const container = document.getElementsByClassName("container-fluid");
const input = document.getElementById("search-value");

const city = document.querySelector('#city')
const img = document.querySelector('#weather_image')
const temp = document.querySelector('#temperature')
const humid = document.querySelector('#humidity')
const wind = document.querySelector('#wind')

const fiveDay = document.querySelector('h3');

function renderToday(json){

    city.innerHTML = `${json.name}`; today.innerHTML = now
    img.src = `https://openweathermap.org/img/w/${json.weather[0].icon}.png`
    temp.innerHTML = `Temperature: ${json.main.temp}°F`
    humid.innerHTML = `Humidity: ${json.main.humidity}%`
    wind.innerHTML = `Wind Speed: ${json.wind.speed} MPH`

    let lon = json.coord.lon;   let lat = json.coord.lat;
    let uv = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily,hourly,minutely&appid=${APIKey}`
    fetch(uv)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
              let uvID = document.querySelector('#uv') 
              let uvNum = document.querySelector('#uvNum')
              let alerts = document.querySelector('#alerts')

              uvID.textContent = "UV Index:"           
              uvNum.textContent = json.current.uvi
              uvNum.className = "u-index"

              if (json.alerts !== undefined){
                alerts.textContent = json.alerts[0].description
              }
        })
}
function renderForecast(json){

    fiveDay.textContent = "5-day forecast:";

    for (let i = 1; i <= 5; i++){ // display date for the next 5 days
        let date = document.querySelector("#date");
        let five = document.createElement("p");

        let targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + i);
        let dd = targetDate.getDate();
        let mm = targetDate.getMonth() + 1; // 0 is January, so we must add 1
        let yyyy = targetDate.getFullYear();
        let dateString = mm + "/" + dd + "/" + yyyy;

        date.appendChild(five);
        five.textContent = dateString;
        five.setAttribute("class", "col c c1");   
    } 
    for (let i = 0; i < 5; i++){ // weather icon
        let icon = document.querySelector("#icon");
        let img = document.createElement("img");
        let w = document.createElement("p");
        w.appendChild(img);
        icon.appendChild(w);
        img.setAttribute("src", "https://openweathermap.org/img/w/" + json.list[i].weather[0].icon + ".png"); 
        w.setAttribute("class", "col c");   
    } 
    for (let i = 0; i < 5; i++){ // 5 day forecast for temperature in °F
        let forecast = document.querySelector("#forecast");
        let temp = document.createElement("p");
        forecast.appendChild(temp);
        temp.textContent = json.list[i].temp.day + " °F";
        temp.setAttribute("class", "col c");   
    }  
    for (let i = 0; i < 5; i++){ //5 day forecast for humidity
        let hu = document.createElement("p");
        forecast2.appendChild(hu);
        hu.textContent = json.list[i].humidity + " %";
        hu.setAttribute("class", "col c c2");     
    }     
}
function displayLastResult(){
    const weather = "https://api.openweathermap.org/data/2.5/weather?q=" + input.value + "&units=imperial" + "&APPID=" + APIKey;
    const forecast = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + input.value  + "&cnt=5" + "&units=imperial" + "&appid=" + APIKey;
    
    fetch(weather)  //Today's weather
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            renderToday(json)

            let cityList = JSON.parse(localStorage.getItem("allCities"));
            if(cityList == null){   
                cityList = []; 
                }
            let city = json.name;           
            if (cityList.indexOf(city) == -1){ // translation: if entered value is NOT in array (i.e to avoid appending duplicate values)
            cityList.push(city); //push the current city you entered to the cityList array

            //create a list with a value and id matching the city you last searched for
            let hBtn = document.createElement("button");  
            hBtn.setAttribute("class", "btn-city")
            hBtn.textContent = city;

            //add <li> to unordered list whose id is "history"
            history.prepend(hBtn);
                }             
            localStorage.setItem("allCities", JSON.stringify(cityList)); //save new city list    
        })

    fetch(forecast) //Five day forecast
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            renderForecast(json)
        })
}

const button = document.querySelector('#search-button')
button.addEventListener('click', displayLastResult)

function checkForEnter(event){
    if(event.key === "Enter"){
        clear()
        displayLastResult()
    }
}
input.onkeyup = checkForEnter

function clear(){ 
    city.innerHTML = "";    today.textContent = ""; 
    img.innerHTML = "";
    temp.innerHTML = "";
    humid.innerHTML = "";
    wind.innerHTML = "";
    uv.innerHTML = "";
    alerts.innerHTML = "";

    fiveDay.textContent= "";
    date.textContent = "";
    icon.textContent = "";
    forecast.textContent = ""; //Temp
    forecast2.textContent =""; //Humidity
}
input.addEventListener("click", function(){
    input.value = ""
    button.addEventListener('click', clear) //clear previous results before outputting new ones  
}) 

//If page refreshes, load the last searched city
let localStor = JSON.parse(localStorage.getItem("allCities")); 
if (localStor !== null){
  let lastSearched = localStor.length-1;
  input.value = localStor[lastSearched];
  window.addEventListener('load', displayLastResult)
}
//Retrieve items from localStorage and render them under history list
const history = document.querySelector(".history");
let listingCity = JSON.parse(localStorage.getItem("allCities"));

if (listingCity !== null){ //Otherwise an error message would appear if there is nothing in the array yet.
    for (var i = 0; i < listingCity.length; i++){   //To make sure all the history lists appears upon page refresh
            let hBtn = document.createElement("button");
            hBtn.textContent = listingCity[i];
            hBtn.setAttribute("class", "btn-city")
            history.prepend(hBtn);
        } 
}
history.addEventListener("click", function(list){
    clear()
    input.value = list.target.textContent;
    displayLastResult()
})