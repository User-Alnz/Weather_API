import {ft_Call_Meteomatics_API} from "./Get_API_data.js";
import {ft_get_date_today, ft_get_sunrise, ft_get_sunset, ft_display_weather_for_the_day, ft_temperature_right_now } from "./Js-functions.js";

var     Hourly_data_collection = [];
var     Daily_data_collection = [];


/* daily_weather_data - selection */
var     icon_current_weather = document.getElementById("icon_current_weather");
const   display_sunrise =document.getElementById("daily_sunrise");
const   display_sunset = document.getElementById("daily_sunset");
const   display_date_today = document.getElementById("date");
const   display_temp_now = document.getElementById("current_temperature");
const   daily_temp_collection = document.getElementsByClassName("daily_temp");


ft_Call_Meteomatics_API(Hourly_data_collection, Daily_data_collection)
    .then(() => { main() })
    .catch(error=> console.error("main function not run | check ft calling API",error));


async function main()
{
  
    try
    {

        console.log(Daily_data_collection);
        console.log(Hourly_data_collection);
        console.log(daily_temp_collection);
        display_sunrise.innerHTML = ft_get_sunrise(Daily_data_collection);
        display_sunset.innerHTML = ft_get_sunset(Daily_data_collection);
        display_date_today.innerHTML = ft_get_date_today();
        display_temp_now.innerHTML = ft_temperature_right_now(Hourly_data_collection);

        ft_display_weather_for_the_day(daily_temp_collection, Hourly_data_collection);

    }
    catch (error)
    {
        console.error("Failed to get data from API. Check function in main.", error);
    } 
    
}
