    import {is_night_per_hours} from "./Define_if_is_Night_or_Day.js"; 

    //------------------------------------------------------------
        /* Global Variables  */
    //------------------------------------------------------------

    let     xhr; // XML HTTP Request
    var     path_to_png_directory;
    var     path_to_WMO_Codes;
    var     WMO_json;


    path_to_png_directory = "/Images_source/PNG_icons_256x256";
    path_to_WMO_Codes = "/WMO_Weather_Codes/WMO_Weather_codes_interpretations.json"; 

    //------------------------------------------------------------
        /* Main function  */
    //------------------------------------------------------------

export function main_script_handle_icons_and_descriptions_per_hours(Hourly_data_collection, Daily_data_collection, Main_pack_daily_collection) //Main_pack_daily_collection is a <div> form DOM
{
    ft_retrieve_jsonfile()
    .then((WMO_json)=> {

        ft_display_icons(Hourly_data_collection, Daily_data_collection, Main_pack_daily_collection, WMO_json)

    })
    .catch(error=> console.error("main_script_handle_icons_and_descriptions_per_hours", error));
}

    //------------------------------------------------------------
       /*Below all functions called in main_script_handle_icons_and_descriptions_per_hours */
    //------------------------------------------------------------

async function ft_retrieve_jsonfile()
    {
        return new Promise((resolve, reject) => 
        {    
            xhr = new XMLHttpRequest();
            xhr.open("GET", path_to_WMO_Codes, true );
            xhr.responseType = "json";

            xhr.onload = function get_WMO_json()
            {
                // console.log(this); //console.log obj structure if needed
                if(this.readyState == 4 && this.status == 200 ) 
                {
                    WMO_json = xhr.response;
                    //console.log(WMO_json);
                    resolve(WMO_json);
                }
                else if(this.readyState == 4 && this.status !== 200 )
                {
                    console.error("Error while accesing file. Server status : " + this.status);
                    reject(error);
                }
                else
                {
                    console.error("Error with Request. Impossible to process", this.status, this.statusText);
                    reject(error);
                }
            }
            xhr.send();
        })
    }

function ft_display_icons(Hourly_data_collection, Daily_data_collection, Main_pack_daily_collection, WMO_json)
{
    //Main_pack_daily_collection is a div element repetead 4 times. An containing each time, 2 times <img class = 'daily_icons'> childrens per Main_pack_daily_collection <div>
    var     idx;
    var     each_3hours_in_tab;
    var     Array_length;

    idx = 0;
    Array_length = Main_pack_daily_collection.length;
    each_3hours_in_tab = 1; // /!\ especially start 1 cause we need first WMO_code in a the tab. Just below title row 1. So value for 00:00 AM is at idx 1 not 0 /!\
    

    while(idx < Array_length ) // I only parse Main_pack_daily_collection childrens to acces <img> and apply function ft_provide_iconURL_for_each_3hours to provide it an url.
    {
        Main_pack_daily_collection[idx].getElementsByClassName('daily_icons')[0].src = ft_provide_iconURL_for_each_3hours(WMO_json, Hourly_data_collection, Daily_data_collection, each_3hours_in_tab);
        each_3hours_in_tab += 3; // offset selection in tab to next 3 hours. like from 3 AM to 6 AM.
        Main_pack_daily_collection[idx].getElementsByClassName('daily_icons')[1].src = ft_provide_iconURL_for_each_3hours(WMO_json, Hourly_data_collection, Daily_data_collection, each_3hours_in_tab);
        each_3hours_in_tab += 3;

      idx++;
    }
    
}

function ft_provide_iconURL_for_each_3hours(WMO_json, Hourly_data_collection, Daily_data_collection, each_3hours_in_tab) 
{   
    
    var     idx_WMNO_code;
    var     json_length;
    var     idx;
    var     icon;

    json_length = Object.keys(WMO_json).length;
    idx = 0;

    idx_WMNO_code = Hourly_data_collection[each_3hours_in_tab][15]; 
   

    while(idx < json_length)
    {
        if(idx_WMNO_code == Object.keys(WMO_json)[idx])
        {           
            if(is_night_per_hours(each_3hours_in_tab, Daily_data_collection)) // if true. NB: is_night_per_hours() is a boolean function
            {
                icon = path_to_png_directory + '/' + WMO_json[idx].night.icon;
                    return(icon);
            }
            else
            {
                icon = path_to_png_directory + '/' + WMO_json[idx].day.icon;
                    return(icon);
            }
        }
        idx++;
    }
    
} 