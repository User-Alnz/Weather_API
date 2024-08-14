// https://www.meteomatics.com/en/api/getting-started/
// https://www.meteomatics.com/en/api/getting-started/

var     latitude;
var     longitude;
let     url_hourly;
let     url_daily;

function ft_transform_JSON_to_Table_Hourly(data, Hourly_data_collection)
{
    let     idx_row = 0;
    // Data collection define below
        Hourly_data_collection[idx_row] = ['time', 'temperature_2m', 'unit', 'wind_direction_10m', 'unit', 'wind_speed_10m', 'unit', 'snowfall', 'unit', 'rain', 'unit','cloud_cover', 'unit'];
        console.log(Hourly_data_collection[idx_row]);
        idx_row++;    
    
    while(++idx_row < data.hourly.time.length)
    {
      if (!Hourly_data_collection[idx_row]) 
      Hourly_data_collection[idx_row] = [];  

      Hourly_data_collection[idx_row].push(data.hourly.time[idx_row]);

      Hourly_data_collection[idx_row].push(data.hourly.temperature_2m[idx_row]);
      Hourly_data_collection[idx_row].push(data.hourly_units.temperature_2m);

      Hourly_data_collection[idx_row].push(data.hourly.wind_direction_10m[idx_row]);
      Hourly_data_collection[idx_row].push(data.hourly_units.wind_direction_10m);

      Hourly_data_collection[idx_row].push(data.hourly.wind_speed_10m[idx_row]);
      Hourly_data_collection[idx_row].push(data.hourly_units.wind_speed_10m);

      Hourly_data_collection[idx_row].push(data.hourly.snowfall[idx_row]);
      Hourly_data_collection[idx_row].push(data.hourly_units.snowfall);

      Hourly_data_collection[idx_row].push(data.hourly.rain[idx_row]);
      Hourly_data_collection[idx_row].push(data.hourly_units.rain);

      Hourly_data_collection[idx_row].push(data.hourly.cloud_cover[idx_row]);
      Hourly_data_collection[idx_row].push(data.hourly_units.cloud_cover);

        console.log(Hourly_data_collection[idx_row]);
    }
    console.log(Hourly_data_collection);
    return(Hourly_data_collection);
} 

export function ft_Call_Meteomatics_API(Hourly_data_collection)
{
    function ft_get_daily_Weather_Data()
    {
        fetch(url_daily, {
            method : 'GET',
        })
        .then((response)=>{
            if(!response.ok)
            {
                throw new Error ('impossible to get daily data ');
            }
            return(response.json());
        })
        .then((data) =>{
            console.log(data);

        })
        .catch(error=>console.log(error));

    }

    function ft_get_hourly_Weather_Data() 
    {
        fetch(url_hourly, {
        method : 'GET',
        })
        .then((response) =>{ 
            if(!response.ok)
                {
                    throw new Error('impossible to get hourly data');
                }
           return (response.json());
        })
        .then ((data) =>{
            console.log(data);
            ft_transform_JSON_to_Table_Hourly(data, Hourly_data_collection);
        })
        .catch(error=>console.log(error));
    }

    function ft_Get_Current_Location()
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
                url_hourly = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,rain,snowfall,cloud_cover,wind_speed_10m,wind_direction_10m&timezone=Europe%2FLondon&models=meteofrance_seamless`;
                url_daily = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&timezone=Europe%2FLondon&models=meteofrance_seamless`;
                //console.log(`latitude is : ${latitude} longitude is : ${longitude}`);
                //console.log(position.coords.toJSON());
                //console.log(url);
                ft_get_hourly_Weather_Data();
                ft_get_daily_Weather_Data();
            })
        }
    }
        ft_Get_Current_Location();
}