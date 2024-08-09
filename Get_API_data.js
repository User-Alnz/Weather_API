// https://www.meteomatics.com/en/api/getting-started/
// https://www.meteomatics.com/en/api/getting-started/

var     latitude;
var     longitude;
let     url;

function ft_transform_JSON_to_Table(data, Data_collection)
{
    let     idx_row = 0;
    // Data collection define below
        tab[idx_row] = ['time', 'temperature_2m', 'unit', 'wind_direction_10m', 'unit', 'wind_speed_10m', 'unit', 'snowfall', 'unit', 'rain', 'unit','cloud_cover', 'unit'];
        console.log(tab[idx_row]);
        idx_row++;    
    
    while(++idx_row < data.hourly.time.length)
    {
      if (!Data_collection[idx_row]) 
        Data_collection[idx_row] = [];  

        Data_collection[idx_row].push(data.hourly.time[idx_row]);

        Data_collection[idx_row].push(data.hourly.temperature_2m[idx_row]);
        Data_collection[idx_row].push(data.hourly_units.temperature_2m);

        Data_collection[idx_row].push(data.hourly.wind_direction_10m[idx_row]);
        Data_collection[idx_row].push(data.hourly_units.wind_direction_10m);

        Data_collection[idx_row].push(data.hourly.wind_speed_10m[idx_row]);
        Data_collection[idx_row].push(data.hourly_units.wind_speed_10m);

        Data_collection[idx_row].push(data.hourly.snowfall[idx_row]);
        Data_collection[idx_row].push(data.hourly_units.snowfall);

        Data_collection[idx_row].push(data.hourly.rain[idx_row]);
        Data_collection[idx_row].push(data.hourly_units.rain);

        Data_collection[idx_row].push(data.hourly.cloud_cover[idx_row]);
        Data_collection[idx_row].push(data.hourly_units.cloud_cover);

        console.log(Data_collection[idx_row]);
    }
    console.log(Data_collection);
    return(Data_collection);
} 

export function ft_Call_Meteomatics(Data_collection)
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
            ft_transform_JSON_to_Table(data, Data_collection);
        })
        .catch(error=>console.log(error));
    }

    function ft_GetCurrentLocation()
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
                url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,rain,snowfall,cloud_cover,wind_speed_10m,wind_direction_10m&timezone=Europe%2FLondon&models=meteofrance_seamless`;
                //console.log(`latitude is : ${latitude} longitude is : ${longitude}`);
                //console.log(position.coords.toJSON());
                //console.log(url);
                ft_Get_Weather_Data();
            })
        }
    }
        ft_GetCurrentLocation();
        
    return(Data_collection);
}