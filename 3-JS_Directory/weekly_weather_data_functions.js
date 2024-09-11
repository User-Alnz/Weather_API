export function ft_handle_Main_pack_weekly(weekly_item_1, Main_pack_weekly_collection, Hourly_data_collection)
{   
    var     idx;
    var     nb_days_in_week;
    var     hourly_array_start;
    var     hourly_array_stop;
    var     off_set_array_to_nxt_24h;
    
    idx = 0;
    nb_days_in_week = 7;
    hourly_array_start = 1;
    hourly_array_stop = 24;
    off_set_array_to_nxt_24h = 24;

    while(idx < nb_days_in_week)
    {   
        Main_pack_weekly_collection[idx].getElementsByClassName('day')[0].innerHTML = display_day(idx);
       
        Main_pack_weekly_collection[idx].getElementsByClassName('day_date')[0].innerHTML = display_date(idx);
        Main_pack_weekly_collection[idx].getElementsByClassName('max_temp')[0].innerHTML = `max <strong> +${find_max_value(hourly_array_start, hourly_array_stop, Hourly_data_collection)}°</strong> `;
        Main_pack_weekly_collection[idx].getElementsByClassName('min_temp')[0].innerHTML = `min <strong> +${find_min_value(hourly_array_start, hourly_array_stop, Hourly_data_collection)}°</strong> `;
        hourly_array_start += off_set_array_to_nxt_24h;
        hourly_array_stop += off_set_array_to_nxt_24h;
        idx++;
    }

}
    // Below all function called into ft_handle_Main_pack_weekly 
    function    display_day(idx)
    {
        const   dayNames_ENG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
        var     obj_day;
        var     str;

        obj_day = new Date();
        const   day = obj_day.getDay();

        if(day+idx > 6) // when end of tab is 6. And idx will keep going futher therefor we need to offset idx and reset it to beginnig in code below
            str=`${dayNames_ENG[(day+idx)%6 -1]}`; // there is 6 possibilities in a row so modulo of 6 will reset result possibilities to one for idx which are gonna be calculated next to 6. then -1 because getDay() got to 0 to 6 max LOL !
        else 
            str = `${dayNames_ENG[day + idx]}`;

        return(str);
    }

    function    display_date(idx)
    {   
        const   monthNames_ENG = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var     obj_day;
        var     str;

        obj_day = new Date();
        const   date = obj_day.getDate();;
        const   month = obj_day.getMonth();

        str =`${date+idx} ${monthNames_ENG[month]}`;

        return(str);
    }

    function    find_max_value(var_or_int_fromArray, var_or_int_toArray, Hourly_data_collection)
    {   
        var     idx;
        var     max;
        var     int_value_pointed_in_tab;

        idx = var_or_int_fromArray; // on day is going from idx 0 to 24. So for next day add +24. 
        max = parseFloat(Hourly_data_collection[idx][1]);
        
        while(idx++ < var_or_int_toArray)
        {   
            int_value_pointed_in_tab = parseFloat(Hourly_data_collection[idx][1]); //transf str to float numb
            if (max < int_value_pointed_in_tab)
                max = int_value_pointed_in_tab;
        }
        
        return(max);
    }

    function    find_min_value(var_or_int_fromArray, var_or_int_toArray, Hourly_data_collection)
    {
        var     idx;
        var     min;
        var     int_value_pointed_in_tab;

        idx = var_or_int_fromArray;
        min = parseFloat(Hourly_data_collection[idx][1]);
        
        while(idx++ < var_or_int_toArray )
        {
            int_value_pointed_in_tab = parseFloat(Hourly_data_collection[idx][1]);

            if(min > int_value_pointed_in_tab)
                min = int_value_pointed_in_tab;
        }
        
        return(min);
    }


