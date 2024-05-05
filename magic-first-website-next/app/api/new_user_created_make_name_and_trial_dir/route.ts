import * as fs from 'fs';



export async function GET(request: Request) {
 
    const url = new URL(request.url);
    const dirName = url.searchParams.get('user_name') ;
    let newDirPath =  process.cwd()+`/app/${dirName}`
    if(!dirName){
        return Response.json({ success: false, error: "user name not provided" }, { status: 400 });
    }

    console.log(`\n\n if ${newDirPath} exists ==>> ${fs.existsSync(newDirPath)}   \n\n`);
    
    if(!fs.existsSync(newDirPath)){

        //  dir for the user's name 
        let result_from_creating_userName_dir = fs.mkdirSync(newDirPath, { recursive: true })
        if (result_from_creating_userName_dir === undefined){
            return Response.json({ success: false, error: "Failed to create directory", message_for_the_server:"couldn't make user name dir. "  }, { status: 500 });
        }
        //  making the temp dir 
        // checking if temp dir already exists return 200 

        //  if the username dir does not exis then the temp dir will not also exist and so will the things inside it ---soo.. removing this code and pasting it in the else block (top level)
        
        //  IF  temp does not exist create one
        let result_from_creating_temp_dir = fs.mkdirSync(newDirPath+"/temp", { recursive: true })
        if (result_from_creating_temp_dir === undefined){
            return Response.json({ success: false, error: "Failed to create directory", message_for_the_server:"couldn't make temp dir "  }, { status: 500 });
        }
        //  make the file in the dir 

        // ---------------

        //  take this one from the url
        fs.writeFileSync(newDirPath+"/temp/page.tsx","")
        
        // ---------------
        return Response.json({ success: true, message: " create successfully", message_for_the_server:"created dir in the temp successfully "  }, { status: 200 });
 
    } else{


        if(fs.existsSync(newDirPath+"/temp")){
            // if page.tsx not exist create that
                if(!fs.existsSync(newDirPath+"/temp/page.tsx")){
                    fs.writeFileSync(newDirPath+"/temp/page.tsx","")
                    return Response.json({ success: true, message: " create successfully", message_for_the_server:"created dir in the temp successfully "  }, { status: 200 });
                }
            else{
                //  if the file exist 
                return Response.json({ success: true, message: " create successfully", message_for_the_server:"created dir in the temp successfully "  }, { status: 200 });
            }
        }

        //  what if the user dir exist and we nothing is inside it, make account for that
        return Response.json({ success: true, "message":"directory already exists" }, { status: 200 });
    }


  }  
  