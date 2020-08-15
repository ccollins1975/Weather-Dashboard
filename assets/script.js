$(document).ready(function () {



    var apikey = "6e4f6ce6e647755b62c7319704cf675f";
    // api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
    // units=metric
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
                // callback for uv index and 5 day forcast
                uvindex(lat,lon);
                forcast(city);

            
            }
        })
    }
function uvindex(lat,lon){
    // ajax call for uv index
}
function forcast(city){
    // ajax call 5 day forcast

    
}

});