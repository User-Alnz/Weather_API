

var     xhr; // XML HTTP Request
var     path_to_directory;
var     file_name_day;
var     image_sprite;

path_to_directory = "/Images_source/PNG_icons_256x256";
file_name_day = "_spritesheet.png"; 


export function ft_icone_manager()
{

    xhr = new XMLHttpRequest();
    xhr.open("GET", path_to_directory, true);
    xhr.send();

    xhr.onreadystatechange = function() 
    {
        // console.log(this); //console.log obj structure 
        if(this.readyState == 4 && this.status == 200 ) 
        {
            // write instruction to get file_name_day
            
            // console.log(this.readyState); //check if 4: request finished and response is ready
        }
        else if(this.readyState == 4 && this.status !== 200 )
        {
            console.log("Error while accesing file");
        }
        else
        {
            
        }

    }



}
