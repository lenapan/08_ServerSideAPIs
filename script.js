 const APIKey = "166a433c57516f51dfab1f7edaed8413";
 const today = document.getElementById("currentDay");
 const now = dayjs().format('(M/DD/YYYY)'); 
  
    $( document ).ready(function() {
  
      $("#search-button").click(function(){  
        
          var search_val = $(this).prev().val();
         
          if ($(this).prev().attr("id") == "search-value") {
              var weather = "https://api.openweathermap.org/data/2.5/weather?q=" + search_val + "&units=imperial" + "&APPID=" + APIKey;
              var forecast = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + search_val  + "&cnt=5" + "&units=imperial" + "&appid=" + APIKey;
          } 
          $.getJSON(weather,function(json){
              $("#city").html(json.name); today.append(now);
              $("#weather_image").attr("src", "https://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
              $("#temperature").html("Temperature: " + json.main.temp + " °F"); //shift + option + 8 to get degree symbol on a Mac
              $("#humidity").html("Humidity: " + json.main.humidity + "%");
              $("#wind").html("Wind Speed: " + json.wind.speed + " MPH");
          });
          console.log(weather);
          console.log(forecast); 

          $.getJSON(forecast,function(json){
            
            var h3 = document.querySelector('h3');
            h3.textContent = "5-day forecast:";
            h3.style.margin = "10% 0 0 0";

              for (var i = 1; i < 6; i++){ // display date for the next 5 days
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
          });
      })
    });