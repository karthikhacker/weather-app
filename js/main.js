$(document).ready(function(){
 //get geolocation
 if(navigator.geolocation){
   navigator.geolocation.getCurrentPosition(function(position){
     var lat = position.coords.latitude;
     var lon = position.coords.longitude;
     $.ajax({
       url: 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=56be3a5bd88bcdf39ebc95b6079461f7',
       success: function(data){
          var city = data.name;
          var country = data.sys.country;
          var temp = data.main.temp;
          //convert kavin to cel
          var cel = Math.round(temp - 273);
          //convert kavin to faren
          var faren = Math.round((temp - 273)*(9/5) + 32);
          var desc = data.weather[0].description;
          var humidity = data.main.humidity;
          var windSpeed = data.wind.speed;
          var icon = data.weather[0].icon;
          $("#city").text(city + ",");
          $(".country").prepend(country);
          $("#temp").html(faren + " &#8457");
          $("#desc").text(desc);
          $("#temp").addClass('btn btn-primary');
          $("#humidity-text").html(humidity + "&#37;");
          $("#humidity").prepend("<img src='images/wet.png' />");
          $("#windSpeed").html(windSpeed + "km/h");
          $("#wind-img").prepend("<img src='images/wind.png' />");
          //change icon as per the climate condition.
          var src = "http://openweathermap.org/img/w/" + icon + ".png";
          $("#climate-icon").html('<img src="' +src+ '"/>');
          //switch between faren to cel
          var tempData = true;
          $("#temp").click(function(){
              if(tempData === false){
                $("#temp").html(faren + " &#8457");
                tempData = true;
              }else{
                $("#temp").html(cel + " &#8451");
                tempData = false;
              }
          });
          console.log(faren);
       }
     })
   });
 }else{
    console.log("Geolocation not supported !");
 }
});
