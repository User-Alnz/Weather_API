let     xhr; // XML HTTP Request
var     path_to_png_directory;
var     path_to_WMO_Codes;
var     WMO_json;


path_to_png_directory = "/Images_source/PNG_icons_256x256";
path_to_WMO_Codes = "/WMO_Weather_Codes/WMO_Weather_codes_interpretations.json"; 


export async function main_script_handle_icons(Hourly_data_collection, icon_current_weather)
{
    ft_retrieve_jsonfile()
    .then((WMO_json)=>{
        return ft_parse_json_for_iconURL_for_current_hours(Hourly_data_collection, WMO_json);
    })
    .then((url)=> {
        console.log(url);
        ft_give_url_to_node_DOM(url, icon_current_weather);
    })
}

// this function get json file from directory
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

//this function cross WMO_code json with tab to find right image to return url in order to access it 
async  function ft_parse_json_for_iconURL_for_current_hours(Hourly_data_collection, WMO_json)
{
    var     idx_WMNO_code;
    var     array_length;
    var     idx;
    var     url;

    //console.log(WMO_json); //if json file is needed
    idx_WMNO_code = Hourly_data_collection[1][15]; //for hour right now it returns the WMO code we look for into json file.
    array_length = Object.keys(WMO_json).length; //get length of json file
    idx = 0;

    return new Promise((resolve, reject) => {

        while (idx < array_length)
        {
            if(idx_WMNO_code == Object.keys(WMO_json)[idx]) // if WMO Code from tab is same than idx key parsed in json
            {
                url = path_to_png_directory + '/' + WMO_json[idx].day.icon;
                //console.log(url); // if need to check url.
                resolve(url);
            }
        idx++;
        }
        
        reject(error);
    })
}




async function ft_give_url_to_node_DOM(url, icon_current_weather)
{
    icon_current_weather.src =  url;
    return(icon_current_weather.src);
} 