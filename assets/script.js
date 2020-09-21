$(document).ready(function () {

var searchHistory = JSON.parse(window.localStorage.getItem("history"))|| [];

    var apikey = "6e4f6ce6e647755b62c7319704cf675f";
   
    $("#search-button").on("click", function () {
        console.log("click");
        var city = $("#city").val().trim();
        console.log(city)
        searchCity(city);



    });

    function searchCity(city) {
        var query = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=imperial`;
        $.ajax({
            type: "GET",
            url: query,
            dataType: "json",
            success: function (data) {
                console.log(data)
                // callback for uv index and 5 day forcas 
                var name = $("<h3>").text(data.name)
                var temp =$("<p>").text("Current Temperature: " + data.main.temp);
                var humidity =$("<p>").text("Current Humidity: " + data.main.humidity);
                var windSpeed =$("<p>").text("Wind Speed: " + data.wind.speed);



                $("#current").append(name, temp,humidity,windSpeed);
                uvIndex(data.coord.lat,data.coord.lon);
                forecast(city);

                

            
            }
        })
    }
function uvIndex(lat,lon){

    var query =`https://api.openweathermap.org/data/2.5/uvi?appid=${apikey}&lat=${lat}&lon=${lon}`;
    $.ajax({
        type: "GET",
        url: query,
        dataType: "json",
        success: function (data) {
            console.log(data)
            // callback for uv index and 5 day forecast
           var uv = $("<p>").text("UV Index: " + data.value);
        $("#current").append(uv);
        
        }
})

    
}
function forecast(city){

    
    var query =`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=imperial`;
    $.ajax({
        type: "GET",
        url: query,
        dataType: "json",
        success: function (data) {
            console.log(data)
            // callback for uv index and 5 day forcast
            var days = data.list.filter((day)=>{
                return day.dt_txt.includes("15:00:00")
            });
           
            days.forEach((day)=>{
                var card = $("<div>").addClass("card col-sm-2");
                var body =$("<div>").addClass("body");
                var date =$("<h5>").text(new Date(day.dt_txt).toLocaleDateString());
                var name = $("<h3>").text(day.name)
                var temp =$("<p>").text("Current Temperature: " + day.main.temp);
                var humidity =$("<p>").text("Current Humidity: " + day.main.humidity);
                var windSpeed =$("<p>").text("Wind Speed: " + day.wind.speed);
                    
                card.append(date,name,temp,humidity,windSpeed);
                body.append(date);
                $("#forecast").append(card)
            });
            


        
        }
    })
   


}

});