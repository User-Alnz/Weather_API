    //------------------------------------------------------------
        /* Main function  */

        //Is a boolean function used in Icone_manager_WMO_interpreter_for_hours.js only.
    //------------------------------------------------------------

    export function is_night_per_hours(each_3hours_in_tab, Daily_data_collection)
    {
        //each_3hours_in_tab go from 00 Am to max 21 PM. per slice of 3h. 
        var     sunrise;
        var     sunset;

        sunrise = parseInt(Daily_data_collection[1][2].slice(11, 13)) //slice string to get only hours and convert into int. 
        sunset = parseInt(Daily_data_collection[1][4].slice(11, 13))

       if (sunrise > each_3hours_in_tab )
            return (true);

            else if (sunset < each_3hours_in_tab)
                return (true);

                    else 
                        return (false);
    }