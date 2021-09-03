 const APIKey = "166a433c57516f51dfab1f7edaed8413";
 const today = document.getElementById("currentDay");
 const now = dayjs().format('(M/DD/YYYY)'); 
 const history = document.getElementById("history");
 const container = document.getElementsByClassName("container-fluid");
 const input = document.getElementById("search-value");

 function displayLastResult(){
  
  var weather = "https://api.openweathermap.org/data/2.5/weather?q=" + search_val + "&units=imperial" + "&APPID=" + APIKey;
  var forecast = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + search_val  + "&cnt=5" + "&units=imperial" + "&appid=" + APIKey;

  $.getJSON(weather,function(json){
    $("#city").html(json.name); today.append(now); 
    $("#weather_image").attr("src", "https://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
    $("#temperature").html("Temperature: " + json.main.temp + " °F"); //shift + option + 8 to get degree symbol on a Mac
    $("#humidity").html("Humidity: " + json.main.humidity + "%");
    $("#wind").html("Wind Speed: " + json.wind.speed + " MPH");
    
    var lon = json.coord.lon;       var lat = json.coord.lat;
    var uv = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=daily,hourly,minutely&appid=" + APIKey;
    $.getJSON(uv, function(json){
      $("#uv").text("UV Index: ");    $("#uvNum").text(json.current.uvi); $("#uvNum").css("background-color","red");
      $("#uvNum").css("color","#fff"); $("#uvNum").css("padding","7px 20px"); $("#uvNum").css("border-radius","10%");
      if (json.alerts !== undefined){
        $("#alerts").text(json.alerts[0].description);
      }    
    })  
  }); //End of getting the current weather info for city

  $.getJSON(forecast,function(json){
    
    var h3 = document.querySelector('h3');
    h3.textContent = "5-day forecast:";

    for (var i = 1; i <= 5; i++){ // display date for the next 5 days
      var date = document.querySelector("#date");
      var p3 = document.createElement("p");
      var targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + i);
      date.appendChild(p3);
      p3.textContent = targetDate;
      p3.setAttribute("class", "col");
    } 
    for (var i = 0; i < 5; i++){ // weather icon
      var icon = document.querySelector("#icon");
      var img = document.createElement("img");
      var p0 = document.createElement("p");
      p0.appendChild(img);
      icon.appendChild(p0);
      img.setAttribute("src", "https://openweathermap.org/img/w/" + json.list[i].weather[0].icon + ".png"); 
      p0.setAttribute("class", "col");
    } 
    for (var i = 0; i < 5; i++){ // 5 day forecast for temperature in °F
      var forecast = document.querySelector("#forecast");
      var p = document.createElement("p");
      forecast.appendChild(p);
      p.textContent = json.list[i].temp.day + " °F";
      p.setAttribute("class", "col"); 
    }  
    for (var i = 0; i < 5; i++){ //5 day forecast for humidity
      var p2 = document.createElement("p");
      forecast2.appendChild(p2);
      p2.textContent = json.list[i].humidity + " %";
      p2.setAttribute("class", "col");      
    }     
  }); //End of function to get 5 day forecast
}
var localStor = JSON.parse(localStorage.getItem("allCities")); 
if (localStor !== null){
  var lastSearched = localStor.length-1;
  var search_val = localStor[lastSearched];
  window.onload=function() {
        displayLastResult();
  }
}
$( document ).ready(function() { //function to display response output from API when user searches for a city
    $("#search-button").click(function (){
        var search_val = $(this).prev().val();
        var weather = "https://api.openweathermap.org/data/2.5/weather?q=" + search_val + "&units=imperial" + "&APPID=" + APIKey;
        var forecast = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + search_val  + "&cnt=5" + "&units=imperial" + "&appid=" + APIKey;
       //Need to add 404 error
        $.getJSON(weather,function(json){
        $("#city").html(json.name); today.append(now); 
        $("#weather_image").attr("src", "https://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
        $("#temperature").html("Temperature: " + json.main.temp + " °F"); //shift + option + 8 to get degree symbol on a Mac
        $("#humidity").html("Humidity: " + json.main.humidity + "%");
        $("#wind").html("Wind Speed: " + json.wind.speed + " MPH");
        
        var lon = json.coord.lon;       var lat = json.coord.lat;
        var uv = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=daily,hourly,minutely&appid=" + APIKey;
        $.getJSON(uv, function(json){
          $("#uv").text("UV Index: ");    $("#uvNum").text(json.current.uvi); $("#uvNum").css("background-color","red");
          $("#uvNum").css("color","#fff"); $("#uvNum").css("padding","7px 20px"); $("#uvNum").css("border-radius","10%");
          if (json.alerts !== undefined){
            $("#alerts").text(json.alerts[0].description);  
          }    
        })   
        var cityList = JSON.parse(localStorage.getItem("allCities"));
        if(cityList == null){   
          cityList = []; 
        }
        var city = json.name;           
        if (cityList.indexOf(city) == -1){ // translation: if entered value is NOT in array (i.e to avoid appending duplicate values)
          cityList.push(city); //push the current city you entered to the cityList array

          //create the list with a value and id matching the city you last searched for
          var button = document.createElement("button");  
          button.style.border = "none";   button.style.margin = "1px"; button.style.padding = "15px 0";
          button.textContent = city;

          //add <li> to unordered list whose id is "history"
          history.prepend(button);
        }             
        localStorage.setItem("allCities", JSON.stringify(cityList)); //save new city list    
        if(cityList.length < 2){location.reload();}                
    }); //End of getting the current weather info for city

      //  console.log(weather);
      //  console.log(forecast); 

    $.getJSON(forecast,function(json){
      
        var h3 = document.querySelector('h3');
        h3.textContent = "5-day forecast:";

        for (var i = 1; i <= 5; i++){ // display date for the next 5 days
          var date = document.querySelector("#date");
          var p3 = document.createElement("p");
          var targetDate = new Date();
          targetDate.setDate(targetDate.getDate() + i);
          date.appendChild(p3);
          p3.textContent = targetDate;
          p3.setAttribute("class", "col");
        } 
        for (var i = 0; i < 5; i++){ // weather icon
          var icon = document.querySelector("#icon");
          var img = document.createElement("img");
          var p0 = document.createElement("p");
          p0.appendChild(img);
          icon.appendChild(p0);
          img.setAttribute("src", "https://openweathermap.org/img/w/" + json.list[i].weather[0].icon + ".png"); 
          p0.setAttribute("class", "col");
        } 
        for (var i = 0; i < 5; i++){ // 5 day forecast for temperature in °F
          var forecast = document.querySelector("#forecast");
          var p = document.createElement("p");
          forecast.appendChild(p);
          p.textContent = json.list[i].temp.day + " °F";
          p.setAttribute("class", "col"); 
        }  
        for (var i = 0; i < 5; i++){ //5 day forecast for humidity
          var p2 = document.createElement("p");
          forecast2.appendChild(p2);
          p2.textContent = json.list[i].humidity + " %";
          p2.setAttribute("class", "col");      
        }  
        input.value = "";   //clear previous search in <input> once response is complete      
      });   //End of function to get 5 day forecast
    })  //End of addEventListener "click"
  }); // End of document ready
function clear (){
    $("#city").html(""); today.textContent = ""; 
    $("#weather_image").attr("src", "");
    $("#temperature").html(""); 
    $("#humidity").html("");
    $("#wind").html("");
    $("#uv").html("");
    $("#alerts").html("");
    var h3 = document.querySelector('h3');
    h3.textContent= "";
    date.textContent = "";
    icon.textContent = "";
    forecast.textContent = "";
    forecast2.textContent ="";
  }
input.addEventListener("click", function(){
    document.getElementById("search-button").onclick = function(){ //clear previous results before outputting new ones
    clear(); }  
  })    
var listingCity = JSON.parse(localStorage.getItem("allCities"));
if (listingCity !== null){ //Otherwise an error message would appear if there is nothing in the array yet.
for (var i = 0; i < listingCity.length; i++){   //To make sure all the history lists appears upon page refresh
        var button = document.createElement("button");
        button.textContent = listingCity[i];
        button.style.border = "none";   button.style.margin = "1px"; button.style.padding = "15px 0";
        history.prepend(button);
      } 
    }
$( document ).ready(function() {
    $('.history').on("click", function(e){   //Clicking on the city lists appended from localStorage
        clear();
        var search_val = e.target.textContent;
        var weather = "https://api.openweathermap.org/data/2.5/weather?q=" + search_val + "&units=imperial" + "&APPID=" + APIKey;
        var forecast = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + search_val  + "&cnt=5" + "&units=imperial" + "&appid=" + APIKey;

        $.getJSON(weather,function(json){
          $("#city").html(json.name); today.append(now); 
          $("#weather_image").attr("src", "https://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
          $("#temperature").html("Temperature: " + json.main.temp + " °F"); //shift + option + 8 to get degree symbol on a Mac
          $("#humidity").html("Humidity: " + json.main.humidity + "%");
          $("#wind").html("Wind Speed: " + json.wind.speed + " MPH");

          var lon = json.coord.lon;       var lat = json.coord.lat;
          var uv = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=daily,hourly,minutely&appid=" + APIKey;
          $.getJSON(uv, function(json){
            $("#uv").text("UV Index: ");    $("#uvNum").text(json.current.uvi); $("#uvNum").css("background-color","red");
            $("#uvNum").css("color","#fff"); $("#uvNum").css("padding","7px 20px"); $("#uvNum").css("border-radius","10%");
            if (json.alerts !== undefined){
              $("#alerts").text(json.alerts[0].description);
            }    
          })          
        }); //End of getting the current weather info for city

        $.getJSON(forecast,function(json){
          
          var h3 = document.querySelector('h3');
          h3.textContent = "5-day forecast:";

          for (var i = 1; i <= 5; i++){ // display date for the next 5 days
            var date = document.querySelector("#date");
            var p3 = document.createElement("p");
            var targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + i);
            date.appendChild(p3);
            p3.textContent = targetDate;
            p3.setAttribute("class", "col");
          } 
          for (var i = 0; i < 5; i++){ // weather icon
            var icon = document.querySelector("#icon");
            var img = document.createElement("img");
            var p0 = document.createElement("p");
            p0.appendChild(img);
            icon.appendChild(p0);
            img.setAttribute("src", "https://openweathermap.org/img/w/" + json.list[i].weather[0].icon + ".png"); 
            p0.setAttribute("class", "col");
          } 
          for (var i = 0; i < 5; i++){ // 5 day forecast for temperature in °F
            var forecast = document.querySelector("#forecast");
            var p = document.createElement("p");
            forecast.appendChild(p);
            p.textContent = json.list[i].temp.day + " °F";
            p.setAttribute("class", "col"); 
          }  
          for (var i = 0; i < 5; i++){ //5 day forecast for humidity
            var p2 = document.createElement("p");
            forecast2.appendChild(p2);
            p2.textContent = json.list[i].humidity + " %";
            p2.setAttribute("class", "col");      
          }  
        }); //End of function to get 5 day forecast
    })  //End of addEventListener "click"
  }); // End of document ready 