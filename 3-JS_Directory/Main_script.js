import {ft_Call_Meteomatics_API} from "./Get_API_data.js";
import {ft_Get_date_today, ft_display_icon_current_weather} from "./Js-functions.js";

var Hourly_data_collection = [];
var Daily_data_collection = [];

/* daily_weather_data = Selection */
var icon_current_weather = document.getElementById("icon_current_weather");
const display_date_today = document.getElementById("date");


display_date_today.innerHTML = ft_Get_date_today();

ft_display_icon_current_weather();
console.log("Hourly_data_collection");
console.log(Hourly_data_collection);
console.log("Daily_data_collection");
console.log(Daily_data_collection);
console.log("Daily_data_collection -> sunset");
//console.log(Daily_data_collection[0][2]);


ft_Call_Meteomatics_API(Hourly_data_collection, Daily_data_collection);



