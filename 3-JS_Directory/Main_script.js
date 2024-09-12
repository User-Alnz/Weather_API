import {ft_Call_Meteomatics_API} from "./Get_API_data.js";
import {ft_get_date_today} from "./handle_dates.js";
import {ft_get_sunrise, ft_get_sunset, ft_display_weather_for_the_day, ft_temperature_right_now, ft_display_apparent_temperature } from "./daily_weather_data_functions.js";
import {ft_handle_Main_pack_weekly} from "./weekly_weather_data_functions.js";
import {ft_icone_manager} from "./Icone_manager_WMO_interpreter.js";

// Json result from API call is temp store into tab to handle data
var     Hourly_data_collection = [];
var     Daily_data_collection = [];


/* daily_weather_data - selection in DOM */
var     icon_current_weather = document.getElementById("icon_current_weather");
const   display_sunrise =document.getElementById("daily_sunrise");
const   display_sunset = document.getElementById("daily_sunset");
const   display_date_today = document.getElementById("date");
const   display_temp_now = document.getElementById("current_temperature");
const   display_apparent_temperature = document.getElementById("apparent_temperature");
const   daily_temp_collection = document.getElementsByClassName("daily_temp");


/* weekly_weather_data - selection in DOM*/
const   weekly_item_1 = document.getElementsByClassName("weekly_item_1");
const   Main_pack_weekly_collection = document.getElementsByClassName("Main_pack_weekly");


/*This function call API and store data temporary into tabs */
ft_Call_Meteomatics_API(Hourly_data_collection, Daily_data_collection)
    .then(() => { main() })
    .catch(error=> console.error("main function not run | check ft calling API",error));


async function main()
{
  
    try
    {
        /* this function cross data with WMO_Weather_codes & icones form "Images_source" */
        ft_icone_manager(Hourly_data_collection);

        /* All console log tab and json file returned from API call */
        /* Tab is below */
        //console.log(Daily_data_collection);
        console.log(Hourly_data_collection);
         /* Json is below */
        //console.log(daily_temp_collection);
        //console.log(Main_pack_weekly_collection);

        /* daily_weather_data - selection in DOM */
        display_sunrise.innerHTML = ft_get_sunrise(Daily_data_collection);
        display_sunset.innerHTML = ft_get_sunset(Daily_data_collection);
        display_date_today.innerHTML = ft_get_date_today();
        display_apparent_temperature.innerHTML = ft_display_apparent_temperature(Hourly_data_collection);
        display_temp_now.innerHTML = ft_temperature_right_now(Hourly_data_collection);
        ft_display_weather_for_the_day(daily_temp_collection, Hourly_data_collection);

        /* weekly_weather_data - selection in DOM*/
        ft_handle_Main_pack_weekly(weekly_item_1, Main_pack_weekly_collection, Hourly_data_collection);
        

    }
    catch (error)
    {
        console.error("Failed to get data from API. Check function in main.", error);
    } 
    
}

