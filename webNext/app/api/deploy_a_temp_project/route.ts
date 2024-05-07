import * as fs from 'fs';



export async function GET(request: Request) {
 
    const url = new URL(request.url);
    const user_name = url.searchParams.get('user_name') ;
    const project_name = url.searchParams.get('project_name') ;

    let cwd = process.cwd()

    let temp_dir = cwd+`/app/${user_name}/temp`;
    let temp_file = cwd+`/app/${user_name}/temp/page.tsx`;
    let path_to_the_temp_project =  cwd+`/app/${user_name}/temp`
    const project_dir = cwd+`/app/${user_name}/${project_name}` ;

    console.log(`\n\n ------ cwd ==>> ${fs.readdirSync(cwd)} \n\n temp-dir-->${temp_dir} \n\n path_to_the_temp_project -->> ${path_to_the_temp_project} \n\n project_dir -->> ${project_dir} `);
    

    if(!user_name){
        return Response.json({ success: false, error: "User name not provided" }, { status: 400 });
    }
    if(!project_name){
        return Response.json({ success: false, error: "Project name not provided" }, { status: 400 });
    }
    
    if(fs.existsSync(path_to_the_temp_project)){

        //  dir for the project  under user/  
    if(!fs.existsSync(project_dir)){
        let result_from_creating_project_dir = fs.mkdirSync(project_dir, { recursive: true })
        if (result_from_creating_project_dir === undefined){
            return Response.json({ success: false, error: "Failed to create directory", message_for_the_server:"couldn't make user name dir "  }, { status: 500 });
        }
    }
    else{
        return Response.json({ success: false, error: "project is already created", message_for_the_server:"couldn't make project dir  as it is already created "  }, { status: 500 });
    }

        // reading from the temp dir
        let file_from_temp_file = fs.readFileSync(temp_file)
        // console.log(file_from_temp_file);

        // making the file to write to 
        fs.writeFileSync(project_dir+"/page.tsx",file_from_temp_file)

        
      
        
        // // ---------------
        return Response.json({ success: true, "message":"end" }, { status: 201 });
 
    } else{
        return Response.json({ success: false, "message":"directory does not exist exists" }, { status: 201 });
    }

    

  }  
  