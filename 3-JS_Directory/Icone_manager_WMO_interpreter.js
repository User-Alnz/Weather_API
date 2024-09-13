let     xhr; // XML HTTP Request
var     path_to_png_directory;
var     path_to_WMO_Codes;
var     WMO_json;


path_to_png_directory = "/Images_source/PNG_icons_256x256";
path_to_WMO_Codes = "/WMO_Weather_Codes/WMO_Weather_codes_interpretations.json"; 


export async function main_script_handle_icons(Hourly_data_collection)
{
    ft_retrieve_jsonfile()
    .then((WMO_json)=>{
        ft_parse_json_for_iconURL_for_current_hours(Hourly_data_collection, WMO_json);
    })
    
}

//this function get json file from directory
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


async  function ft_parse_json_for_iconURL_for_current_hours(Hourly_data_collection, WMO_json)
{
    var     idx_WMNO_code;
    var     array_length;
    var     idx;
    var     url;

    //console.log(WMO_json); //if json file is needed
    idx_WMNO_code = Hourly_data_collection[1][15]; //for hours right now it returns the WMO code we look for into json file.
    array_length = Object.keys(WMO_json).length; //get length of json file
    idx = 0;

    while (idx < array_length)
    {
        /* if you wanna see how it works in console !
        console.log(Object.keys(WMO_json)[idx]);
        console.log(idx_WMNO_code);
        console.log(typeof(idx_WMNO_code));
        console.log(typeof(Object.keys(WMO_json)[idx]));*/
        if(idx_WMNO_code == Object.keys(WMO_json)[idx]) // if WMO Code from tab is same that idx key parsed in json
        {
            url = path_to_png_directory + '/' + WMO_json[idx].day.icon;
            console.log(url);
            return(url);
        }
       idx++;
    }
}




/*
// this function is only use to retrive png file and return it.
export function ft_icone_manager()
{

    xhr = new XMLHttpRequest();
    xhr.open("GET", path_to_png_directory, true);
    xhr.responseType = 'blob'; //use blob (Binary Large Object) to get img into binary and not txt file. Response will e binary.

    xhr.onload = function() 
    {
        console.log(this); //console.log obj structure 
        if(this.readyState == 4 && this.status == 200 ) 
        {
            //const imgblob = xhr.response; 
            
            // console.log(this.readyState); //check if 4: request finished and response is ready
        }
        else if(this.readyState == 4 && this.status !== 200 )
            console.error("Error while accesing file. Server status : " + this.status);
        
        else
            console.error("Error with Request. Impossible to process", this.status, this.statusText);

    }

    xhr.send(); 

} */
