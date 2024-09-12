

var     xhr; // XML HTTP Request
var     path_to_directory;
var     file_name_day;
var     image_sprite_url;

path_to_directory = "/Images_source/PNG_icons_256x256";
file_name_day = "_spritesheet.png";
file_name_night = 


export function ft_icone_manager()
{

    xhr = new XMLHttpRequest();
    xhr.open("GET", path_to_directory, true);
    xhr.responseType = 'blob'; //use blob (Binary Large Object) to get img into binary and not txt file. Response will e binary.

    xhr.onload = function() 
    {
        // console.log(this); //console.log obj structure 
        if(this.readyState == 4 && this.status == 200 ) 
        {
            //const imgblob = xhr.response; 
            return (image_sprite_url);
            // console.log(this.readyState); //check if 4: request finished and response is ready
        }
        else if(this.readyState == 4 && this.status !== 200 )
            console.error("Error while accesing file. Server status : " + this.status);
        
        else
            console.error("Error with Request. Impossible to process", this.status, this.statusText);

    }

    xhr.send(); 

}
