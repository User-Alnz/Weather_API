var     xhr; // XML HTTP Request
var     path_to_png_directory;
var     path_to_WMO_Codes;
var     WMO_json;

/*var idx_WMNO_code; 
idx_WMNO_code = Hourly_data_collection[1][15]; //for hours right now it returns the WMO code we look for into json file */

path_to_png_directory = "/Images_source/PNG_icons_256x256";
path_to_WMO_Codes = "/WMO_Weather_Codes/WMO_Weather_codes_interpretations.json"; 

//this function get json file to store it to WMO_json so that we can handle it for several purpose
export function ft_retrieve_jsonfile()
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
            return(WMO_json);
        }
        else if(this.readyState == 4 && this.status !== 200 )
            console.error("Error while accesing file. Server status : " + this.status);

        else
            console.error("Error with Request. Impossible to process", this.status, this.statusText);
    }
    xhr.send();
}

export function ft_parse_json_for_iconURL_for_current_hours(Hourly_data_collection)
{
    var idx_WMNO_code; 
    idx_WMNO_code = Hourly_data_collection[1][15]; //for hours right now it returns the WMO code we look for into json file.

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
