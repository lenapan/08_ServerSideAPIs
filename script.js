 const APIKey = "166a433c57516f51dfab1f7edaed8413";
 const today = document.getElementById("currentDay");
 const now = dayjs().format('(M/DD/YYYY)'); 
 const history = document.getElementById("history");
 const container = document.getElementsByClassName("container-fluid");
 const input = document.getElementById("search-value");

  $( document ).ready(function() {
    $("#search-button").click(function (){    
        var search_val = $(this).prev().val();

        if ($(this).prev().attr("id") == "search-value") {
            var weather = "https://api.openweathermap.org/data/2.5/weather?q=" + search_val + "&units=imperial" + "&APPID=" + APIKey;
            var forecast = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + search_val  + "&cnt=5" + "&units=imperial" + "&appid=" + APIKey;
        } //Need to add 404 error
        $.getJSON(weather,function(json){
            $("#city").html(json.name); today.append(now); 
            $("#weather_image").attr("src", "https://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
            $("#temperature").html("Temperature: " + json.main.temp + " °F"); //shift + option + 8 to get degree symbol on a Mac
            $("#humidity").html("Humidity: " + json.main.humidity + "%");
            $("#wind").html("Wind Speed: " + json.wind.speed + " MPH");
        
            var cityList = JSON.parse(localStorage.getItem("allCities"));
            if(cityList == null){   
              cityList = []; 
            }
            var city = json.name;           
            if (cityList.indexOf(city) == -1){ // to ensure a duplicate value does not get recorded in the 'cityList' array
              cityList.push(city); //push the current city you entered to the cityList array

              //create the list with a value and id matching the city you last searched for
              var li = document.createElement("li");
              li.setAttribute("id", city);
              li.textContent = city;

              //add <li> to unordered list whose id is "history"
              history.prepend(li);
            }          
            localStorage.setItem("allCities", JSON.stringify(cityList)); //save new city list                     
        }); //End of getting the current weather info for city

          //  console.log(weather);
          //  console.log(forecast); 

        $.getJSON(forecast,function(json){
          
          var h3 = document.querySelector('h3');
          h3.textContent = "5-day forecast:";
          h3.style.margin = "10% 0 0 0";

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

        }); //End of function to get 5 day forecast
    })  //End of addEventListener "click"
  }); // End of document ready

  input.addEventListener("click", function(){
    document.getElementById("search-button").onclick = function(){ //clear previous results before outputting new ones
      $("#city").html(""); today.textContent = ""; 
      $("#weather_image").attr("src", "");
      $("#temperature").html(""); 
      $("#humidity").html("");
      $("#wind").html("");
      var h3 = document.querySelector('h3');
      h3.textContent= "";
      date.textContent = "";
      icon.textContent = "";
      forecast.textContent = "";
      forecast2.textContent ="";
    }  
  })    
  var listingCity = JSON.parse(localStorage.getItem("allCities"));
  for (var i = 0; i < listingCity.length; i++){
        var li = document.createElement("li");
        li.textContent = listingCity[i];
        history.prepend(li);
      } 