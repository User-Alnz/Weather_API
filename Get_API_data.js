// https://www.meteomatics.com/en/api/getting-started/
// https://www.meteomatics.com/en/api/getting-started/

var     position;
var     latitude;
var     longitude;
let     url;

function ft_transform_JSON_to_Table(data)
{
    var tab =[];
    let idx_row = 0;

        tab[idx_row] = ['time', 'temperature_2m', 'snowflake', 'temperature'];
        console.log(tab[idx_row]);
        idx_row++;    
    
    while(++idx_row < data.hourly.time.length)
    {
      if (!tab[idx_row]) 
        tab[idx_row] = [];  

        tab[idx_row].push(data.hourly.time[idx_row]);
        tab[idx_row].push(data.hourly.temperature_2m[idx_row]);
        tab[idx_row].push(data.hourly.rain[idx_row]);

        tab[idx_row].push(data.hourly.snowfall[idx_row]);
        console.log(tab[idx_row]);
    }
    return (tab);
} 

export function ft_Call_Meteomatics()
{
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
           return (response.json());
        })
        .then ((data) =>{
            console.log(data);
            ft_transform_JSON_to_Table(data);
        })
        .catch(error=>console.log(error));
    }

    function ft_GetCurrentLocation(position)
    {
    // GET current latitude and longitude || Documentation : https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates
        if (!navigator.geolocation)
        {
            console.log("Impossible to get current location - Verrify if you allowed access in your browser options");
        }
        else{
            navigator.geolocation.getCurrentPosition((position) => {

                latitude = position.coords.latitude.toFixed(2);
                longitude = position.coords.longitude.toFixed(2);
                url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain,snowfall,wind_speed_10m,wind_direction_10m&timezone=Europe%2FLondon&models=meteofrance_seamless`;
                //console.log(`latitude is : ${latitude} longitude is : ${longitude}`);
                //console.log(position.coords.toJSON());
                console.log(url);
                ft_Get_Weather_Data();
            })
        }
    }
        ft_GetCurrentLocation();
}