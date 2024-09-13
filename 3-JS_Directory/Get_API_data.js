// https://www.meteomatics.com/en/api/getting-started/
// https://www.meteomatics.com/en/api/getting-started/

var     latitude;
var     longitude;
let     url_hourly;
let     url_daily;

//Main fucnction : 1- get geolocation / 2-give others functions urls for calls / 3-functions within calls populate tabs 'Hourly_data_collection, Daily_data_collection' from json file
export function ft_Call_Meteomatics_API(Hourly_data_collection, Daily_data_collection)
{

    function ft_get_Current_Location()
    {
        // Return promise when both functions below are done. 
        return new Promise((resolve, reject) => 
        {
            
       
            // GET current latitude and longitude || Documentation : https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates
            if (!navigator.geolocation)
            {
                console.log("Impossible to get current location - Verrify if you allowed access in your browser options");
                reject(new Error("Geolocation not supported or access denied"));
            }
            else{
                navigator.geolocation.getCurrentPosition((position) => {

                    latitude = position.coords.latitude.toFixed(2);
                    longitude = position.coords.longitude.toFixed(2);
                    url_hourly = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,wind_speed_10m,wind_direction_10m&timezone=Europe%2FLondon&models=meteofrance_seamless`;
                    url_daily = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&timezone=Europe%2FLondon&models=meteofrance_seamless`;
                    //console.log(`latitude is : ${latitude} longitude is : ${longitude}`);
                    //console.log(position.coords.toJSON());
                    //console.log(url);

                    Promise.all([ft_get_hourly_Weather_Data(),ft_get_daily_Weather_Data()]) //Promise.all wait both call got fullfiled. 
                    .then(()=>resolve()) // security to be sure tabs got both populated. Wait exec of both func before resolve.
                    .catch(reject);
                })
            }
        });

    }

    function ft_get_daily_Weather_Data()
    {
        return fetch(url_daily, // return itself then tab Daily_data fully populated
        {
            method : 'GET',
        })

        .then((response)=>
        {
            if(!response.ok)
            {
                throw new Error ('impossible to get daily data ');
            }
            return(response.json());
        })

        .then((data_daily) =>
        {
            //console.log(data_daily); // Display Json file in console
            ft_transform_JSON_to_Table_Daily(data_daily, Daily_data_collection);
           
        })

        .catch(error=>console.log(error));

    }

    function ft_get_hourly_Weather_Data()
    {
        return fetch(url_hourly, 
        {
            method : 'GET',
        })

        .then((response) =>
        { 
            if(!response.ok)
                {
                    throw new Error('impossible to get hourly data');
                }
           return (response.json());
        })

        .then ((data_hourly) =>
        {
            //console.log(data_hourly); // Display Json file in console
            ft_transform_JSON_to_Table_Hourly(data_hourly, Hourly_data_collection);
        })

        .catch(error=>console.log(error));
    }

    return (ft_get_Current_Location()); // Return promise function got exe by calling itself
}

// This function transfrom json object into a tab
function ft_transform_JSON_to_Table_Daily(data_daily, Daily_data_collection)
{
    let     idx_row;
    let     idx_jsonFile;

    idx_row = 0 ;
    idx_jsonFile = 0;

    Daily_data_collection[idx_row] = ['time', 'unit', 'sunrise', 'unit',  'sunset', 'unit', 'precipitation sum', 'unit', 'shower_sum', 'unit', 'snowfall_sum', 'unit', 'wind direction', 'unit', 'wind guts', 'unit', 'wind speed', 'unit'];

    while(idx_jsonFile < data_daily.daily.time.length)
    {
        idx_row++;

        if(!Daily_data_collection[idx_row])
            Daily_data_collection [idx_row] = [];
        
        Daily_data_collection[idx_row].push(data_daily.daily.time[idx_jsonFile]);
        Daily_data_collection[idx_row].push(data_daily.daily_units.time);

        Daily_data_collection[idx_row].push(data_daily.daily.sunrise[idx_jsonFile]);
        Daily_data_collection[idx_row].push(data_daily.daily_units.sunrise);

        Daily_data_collection[idx_row].push(data_daily.daily.sunset[idx_jsonFile]);
        Daily_data_collection[idx_row].push(data_daily.daily_units.sunset);

        Daily_data_collection[idx_row].push(data_daily.daily.precipitation_sum[idx_jsonFile]);
        Daily_data_collection[idx_row].push(data_daily.daily_units.precipitation_sum);

        Daily_data_collection[idx_row].push(data_daily.daily.showers_sum[idx_jsonFile]);
        Daily_data_collection[idx_row].push(data_daily.daily_units.showers_sum);

        Daily_data_collection[idx_row].push(data_daily.daily.snowfall_sum[idx_jsonFile]);
        Daily_data_collection[idx_row].push(data_daily.daily_units.snowfall_sum);

        Daily_data_collection[idx_row].push(data_daily.daily.wind_direction_10m_dominant[idx_jsonFile]);
        Daily_data_collection[idx_row].push(data_daily.daily_units.wind_direction_10m_dominant);

        Daily_data_collection[idx_row].push(data_daily.daily.wind_gusts_10m_max[idx_jsonFile]);
        Daily_data_collection[idx_row].push(data_daily.daily_units.wind_gusts_10m_max);

        Daily_data_collection[idx_row].push(data_daily.daily.wind_speed_10m_max[idx_jsonFile]);
        Daily_data_collection[idx_row].push(data_daily.daily_units.wind_speed_10m_max);

        idx_jsonFile++;
        
    }
    //console.log(Daily_data_collection);
    return (Daily_data_collection);
}


// This function transfrom json object into a tab
function ft_transform_JSON_to_Table_Hourly(data_hourly, Hourly_data_collection)
{
    let     idx_row;
    let     idx_jsonFile;

    idx_row = 0;
    idx_jsonFile = 0;
    
    Hourly_data_collection[idx_row] = ['time', 'temperature_2m', 'unit', 'apparent_temperature', 'unit', 'wind_direction_10m', 'unit', 'wind_speed_10m', 'unit', 'snowfall', 'unit', 'rain', 'unit','cloud_cover', 'unit', 'WMO_codes'];
       
    while(idx_jsonFile < data_hourly.hourly.time.length)
    {
        idx_row++;

        if (!Hourly_data_collection[idx_row]) 
        Hourly_data_collection[idx_row] = [];  

        Hourly_data_collection[idx_row].push(data_hourly.hourly.time[idx_jsonFile]);
        
        Hourly_data_collection[idx_row].push(data_hourly.hourly.temperature_2m[idx_jsonFile]);
        Hourly_data_collection[idx_row].push(data_hourly.hourly_units.temperature_2m);

        Hourly_data_collection[idx_row].push(data_hourly.hourly.apparent_temperature[idx_jsonFile]);
        Hourly_data_collection[idx_row].push(data_hourly.hourly_units.apparent_temperature);

        Hourly_data_collection[idx_row].push(data_hourly.hourly.wind_direction_10m[idx_jsonFile]);
        Hourly_data_collection[idx_row].push(data_hourly.hourly_units.wind_direction_10m);

        Hourly_data_collection[idx_row].push(data_hourly.hourly.wind_speed_10m[idx_jsonFile]);
        Hourly_data_collection[idx_row].push(data_hourly.hourly_units.wind_speed_10m);

        Hourly_data_collection[idx_row].push(data_hourly.hourly.snowfall[idx_jsonFile]);
        Hourly_data_collection[idx_row].push(data_hourly.hourly_units.snowfall);

        Hourly_data_collection[idx_row].push(data_hourly.hourly.rain[idx_jsonFile]);
        Hourly_data_collection[idx_row].push(data_hourly.hourly_units.rain);

        Hourly_data_collection[idx_row].push(data_hourly.hourly.cloud_cover[idx_jsonFile]);
        Hourly_data_collection[idx_row].push(data_hourly.hourly_units.cloud_cover);

        Hourly_data_collection[idx_row].push(data_hourly.hourly.weather_code[idx_jsonFile]);

        idx_jsonFile++;
    }
    //console.log(Hourly_data_collection);
    return(Hourly_data_collection);
} 
