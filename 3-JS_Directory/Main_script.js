import {ft_Call_Meteomatics_API} from "./Get_API_data.js";
import {ft_Get_date_today } from "./Js-functions.js";

var Hourly_data_collection = [];
var Daily_data_collection = [];


/* daily_weather_data - selection */
var icon_current_weather = document.getElementById("icon_current_weather");
const display_date_today = document.getElementById("date");


ft_Call_Meteomatics_API(Hourly_data_collection, Daily_data_collection)
    .then(() => { main() })
    .catch(error=> console.error("main function not run | check ft calling API",error));


async function main()
{
  
    try
    {
        console.log(Daily_data_collection); 
        display_date_today.innerHTML = ft_Get_date_today();
        
    }
    catch (error)
    {
        console.error("Failed to get data from API", error);
    } 
    
}
