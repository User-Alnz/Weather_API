import {ft_Call_Meteomatics_API} from "./Get_API_data.js";
import {ft_get_date_today} from "./handle_dates.js";
import {ft_get_sunrise, ft_get_sunset, ft_display_weather_for_the_day, ft_temperature_right_now, ft_display_apparent_temperature } from "./daily_weather_data_functions.js";
import { find_min_value, find_max_value} from "./weekly_weather_data_functions.js";

var     Hourly_data_collection = [];
var     Daily_data_collection = [];


/* daily_weather_data - selectio in DOM */
var     icon_current_weather = document.getElementById("icon_current_weather");
const   display_sunrise =document.getElementById("daily_sunrise");
const   display_sunset = document.getElementById("daily_sunset");
const   display_date_today = document.getElementById("date");
const   display_temp_now = document.getElementById("current_temperature");
const   display_apparent_temperature = document.getElementById("apparent_temperature");
const   daily_temp_collection = document.getElementsByClassName("daily_temp");


/* weekly_weather_data - selection in DOM*/
const   min_temp_collection = document.getElementsByClassName("min_temp");
const   max_temp_collection = document.getElementsByClassName("max_temp");


/*This function call API and store data temporary into tabs */
ft_Call_Meteomatics_API(Hourly_data_collection, Daily_data_collection)
    .then(() => { main() })
    .catch(error=> console.error("main function not run | check ft calling API",error));


async function main()
{
  
    try
    {

        //console.log(Daily_data_collection);
        console.log(Hourly_data_collection);
        //console.log(daily_temp_collection);

        /* daily_weather_data - selection in DOM */
        display_sunrise.innerHTML = ft_get_sunrise(Daily_data_collection);
        display_sunset.innerHTML = ft_get_sunset(Daily_data_collection);
        display_date_today.innerHTML = ft_get_date_today();
        display_apparent_temperature.innerHTML = ft_display_apparent_temperature(Hourly_data_collection);
        display_temp_now.innerHTML = ft_temperature_right_now(Hourly_data_collection);
        ft_display_weather_for_the_day(daily_temp_collection, Hourly_data_collection);

        /* weekly_weather_data - selection in DOM*/
        var hourly_array_start = 1;
        var hourly_array_stop = 24;
        var off_set = 24;

        min_temp_collection[0].innerHTML = find_min_value (hourly_array_start, hourly_array_stop, Hourly_data_collection);
        max_temp_collection[0].innerHTML = find_max_value(hourly_array_start, hourly_array_stop, Hourly_data_collection);
        hourly_array_start += off_set;
        hourly_array_stop += off_set;

        min_temp_collection[1].innerHTML = find_min_value (hourly_array_start, hourly_array_stop, Hourly_data_collection);
        max_temp_collection[1].innerHTML = find_max_value(hourly_array_start, hourly_array_stop, Hourly_data_collection);
        hourly_array_start += off_set;
        hourly_array_stop += off_set;

        min_temp_collection[2].innerHTML = find_min_value (hourly_array_start, hourly_array_stop, Hourly_data_collection);
        max_temp_collection[2].innerHTML = find_max_value(hourly_array_start, hourly_array_stop, Hourly_data_collection);
        hourly_array_start += off_set;
        hourly_array_stop += off_set;
        

    }
    catch (error)
    {
        console.error("Failed to get data from API. Check function in main.", error);
    } 
    
}

