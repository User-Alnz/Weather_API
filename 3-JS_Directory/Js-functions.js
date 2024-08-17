export function ft_get_date_today ()
{
    const   dayNames_ENG = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ];
    const   monthNames_ENG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const   dayNames_FR = ["Lundi", "Mardi", "Mercredi","Jeudi", "Vendredi", "Samedi", "Dimanche"];
    const   monthNames_FR = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const   hours_DoubleDigits_format = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09","10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];

    let     string;
    var     obj_day;
    
    obj_day = new Date();

    const   day = obj_day.getDay();
    const   date = obj_day.getDate();
    const   month = obj_day.getMonth();
    const   hours = obj_day.getHours();
    let     minutes = obj_day.getMinutes(); // type of is 'number'!

    if (minutes >= 0 && minutes <= 9)
    {
        minutes = minutes.toString(); //transf 'int' to 'str'
        minutes = '0' + minutes;
    }

    string = `${dayNames_ENG[day-1]} ${date} ${monthNames_ENG[month]} ${hours_DoubleDigits_format[hours]}:${minutes}`;
    return (string);
}


export function ft_get_sunrise(Daily_data_collection)
{
    var     idx;
    var     temp_store;
    var     sunrise;

    temp_store = Daily_data_collection[1][2];
    idx = temp_store.length - 5;
    sunrise = 'Sunrise : ';

    while(++idx < temp_store.length)
    {
        sunrise += temp_store[idx]; 
    }
    sunrise += ' AM';    

    return(sunrise);
}

export function ft_get_sunset(Daily_data_collection)
{
    var     idx;
    var     temp_store;
    var     sunset;

    temp_store = Daily_data_collection[1][4];
    idx = temp_store.length - 5;
    sunset = 'Sunset : ';

    while(++idx < temp_store.length)
    {
        sunset += temp_store[idx];
    }
    sunset += ' PM';    

    return(sunset);
}

export function ft_display_weather_for_the_day(var_daily_temp_collection_by_class, Hourly_data_collection)
{
    var     midnight;
    var     three_AM;
    var     six_AM;
    var     nine_AM
    var     midday;
    var     three_PM;
    var     six_PM;
    var     nine_PM;

    midnight =  Hourly_data_collection[1][1] + Hourly_data_collection[1][2];
    var_daily_temp_collection_by_class[0].innerHTML = midnight;

    three_AM =  Hourly_data_collection[4][1] + Hourly_data_collection[4][2];
    var_daily_temp_collection_by_class[1].innerHTML = three_AM;

    six_AM =  Hourly_data_collection[7][1] + Hourly_data_collection[7][2];
    var_daily_temp_collection_by_class[2].innerHTML = six_AM;

    nine_AM =  Hourly_data_collection[10][1] + Hourly_data_collection[10][2];
    var_daily_temp_collection_by_class[3].innerHTML = nine_AM;

    midday =  Hourly_data_collection[13][1] + Hourly_data_collection[13][2];
    var_daily_temp_collection_by_class[4].innerHTML = midday;

    three_PM = Hourly_data_collection[16][1] + Hourly_data_collection[16][2];
    var_daily_temp_collection_by_class[5].innerHTML = three_PM;

    six_PM =  Hourly_data_collection[19][1] + Hourly_data_collection[19][2];
    var_daily_temp_collection_by_class[6].innerHTML = six_PM;

    nine_PM = Hourly_data_collection[22][1] + Hourly_data_collection[22][2];
    var_daily_temp_collection_by_class[7].innerHTML = nine_PM;
}

export function ft_temperature_right_now(Hourly_data_collection)
{
    var     temperature_now;
    var     obj_day;

    temperature_now = '+ '
    obj_day = new Date();
    const   hours = obj_day.getHours();

    temperature_now += Hourly_data_collection[hours+1][1];
    temperature_now += '°C';
    
    return (temperature_now);

}



/*
Light rain gives up to 2–4 mm (0.07–0.15 in) of precipitation;
Moderate rain gives 5–6 mm (0.19–0.23 in);
Rain or strong rain gives up about 15–20 mm (0.59–0.78 in);
Rainfall gives more than 30 mm (1.18 in).

*/ 