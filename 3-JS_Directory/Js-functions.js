export function ft_Get_date_today ()
{
    const   dayNames_ENG = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ];
    const   monthNames_ENG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const   dayNames_FR = ["Lundi", "Mardi", "Mercredi","Jeudi", "Vendredi", "Samedi", "Dimanche"];
    const   monthNames_FR = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const   hours_DoubleDigits_format = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09","10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];

    let     str;
    var     obj_day = new Date();

    const   day = obj_day.getDay();
    const   date = obj_day.getDate();
    const   month = obj_day.getMonth();
    const   hours = obj_day.getHours();
    const   minutes = obj_day.getMinutes();
    // display obj_day => console.log(obj_day);


    str = `${dayNames_ENG[day-1]} ${date} ${monthNames_ENG[month]} ${hours_DoubleDigits_format[hours]}:${minutes}`;
       
    return (str);
}

export function ft_display_icon_current_weather(var_icon_current_weather)
{
    
    var     day;
    var     night;

  
    




    console.log(day);
    
}