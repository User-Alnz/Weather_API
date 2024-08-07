// https://www.meteomatics.com/en/api/getting-started/
// https://www.meteomatics.com/en/api/getting-started/

var     position;
var     latitude;
var     longitude;
let     url;

function ft_GetCurrentLocation(position)
{
// GET current latitude and longitude || Documentation : https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates
    if (!navigator.geolocation){

        console.log("Impossible to get current location - Verrify if you allowed access in your browser options");

    }else{
    
        navigator.geolocation.getCurrentPosition((position) => {

            latitude = position.coords.latitude.toFixed(2);
            longitude = position.coords.longitude.toFixed(2);

            console.log(`latitude is : ${latitude} longitude is : ${longitude}`);
            console.log(position.coords.toJSON());
        })
    }
}


url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
console.log(url); 
console.log(typeof(latitude));



function Call_API() 
{

    fetch(url, {
        method : 'GET',
    })
    .then((response) =>{ 
        if(!response.ok)
        {
            throw new Error('Call is not wroking');
        }
        console.log(response);
    })
    .catch(error=>console.log(error)); 

}

ft_GetCurrentLocation();
Call_API();
console.log("hello");


