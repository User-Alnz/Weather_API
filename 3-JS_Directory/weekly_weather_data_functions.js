
export function find_max_value(var_or_int_fromArray, var_or_int_toArray, Hourly_data_collection)
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

export function find_min_value(var_or_int_fromArray, var_or_int_toArray, Hourly_data_collection)
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
    min += '°C';
    return(min);
}

