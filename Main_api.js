// https://www.meteomatics.com/en/api/getting-started/
// https://www.meteomatics.com/en/api/getting-started/

var     position;
var     latitude;
var     longitude;
let     url;

function ft_Get_Weather_Data() 
{
    fetch(url, {
    method : 'GET',
    })
    .then((response) =>{ 
        if(!response.ok)
            {
                throw new Error('Call is not wroking');
            }
        console.log(response.json);
    })
    .catch(error=>console.log(error));
}

function ft_GetCurrentLocation(position)
{

// GET current latitude and longitude || Documentation : https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates
    if (!navigator.geolocation){

        console.log("Impossible to get current location - Verrify if you allowed access in your browser options");

    }
    else{
        navigator.geolocation.getCurrentPosition((position) => {

            latitude = position.coords.latitude.toFixed(2);
            longitude = position.coords.longitude.toFixed(2);
            url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
            //console.log(`latitude is : ${latitude} longitude is : ${longitude}`);
            //console.log(position.coords.toJSON());
            ft_Get_Weather_Data();
        })
    }
}
//console.log(url); 
//console.log(typeof(latitude));
ft_GetCurrentLocation();
