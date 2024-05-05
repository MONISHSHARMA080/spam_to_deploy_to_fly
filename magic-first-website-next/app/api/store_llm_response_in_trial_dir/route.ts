import * as fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
// export const dynamic = 'force-dynamic' 

// rewrite 

export async function POST(request: NextRequest) {
 console.log("\n\n\n\n ---------------I am here ----------\n\n\n");
 
    const url = new URL(request.url);
    const user_name = url.searchParams.get('user_name') ;
    // const response_form_llm = url.searchParams.get('response_form_llm') ;
    console.log("\n user_name form the req --> ",user_name,);
    
    let react_component_from_llm =""
    try {
        const body = await request.json();
        const {response_form_llm} = body ;
        react_component_from_llm = response_form_llm
        console.log("react component(response_form_llm) -->",response_form_llm);
        
        console.log("\n\n req json   -----> ", body,  );
    } catch (error) {
        console.log("\n\n req --error form json   -----> ", error);
    }
    
    
    let page_file_in_temp_dir_of_username =  process.cwd()+`/app/${user_name}/temp/page.tsx`
    // console.log(`request object\n\n ${request.body}  ---\n\n ${request.blob()}, request ${String(request)}`);
    // let {react_component_from_llm} =  await request.json();
    // let react_component_from_llm
    // try {
    //     let {react_component_from_llm} = await request.json();
    //     console.log("found", react_component_from_llm);
    // } catch (error) {
    //     console.log("cant do that");
        
    // }
    // const requestData 
    // const react_component_from_llm = .react_component_from_llm;
    // console.log(`\n\n\n response from llm ${react_component_from_llm} `);
    // console.log(`\n\n\n response from llm ${request.json()} `);
    
    
    
    
    // returning error if not provded appropriate stuff 
    if(!fs.existsSync(page_file_in_temp_dir_of_username)){
        
        return NextResponse.json({ success: false, error: "user name dir not foud or exists",response_for_the_server:"make a request to the user name dir to create the user name dir" }, { status: 404 });
    }
    if(!user_name){
        return NextResponse.json({ success: false, error: "user name not provided ",response_for_the_server:"make a request to the user name dir to create the user name dir" }, { status: 400 });
    }
    if(!react_component_from_llm || String(react_component_from_llm).length < 3){
        return NextResponse.json({ success: false, error: "user name not provided ",response_for_the_server:"make a request to the user name dir to create the user name dir" }, { status: 400 });
    }
    
    // writing to the file in the temp dir 
    try {
        console.log("\n\n --- from  the new api ---\n\n");
        
      fs.writeFileSync(page_file_in_temp_dir_of_username,'"use client" \n')
      fs.appendFileSync(page_file_in_temp_dir_of_username,react_component_from_llm)
    } catch (error) {
        return NextResponse.json({ success: false, error: "error in writing to the file  ",response_for_the_server:"encountered a error while writing to the file" }, { status: 302 });
    }
    return NextResponse.json({ success: true, error: "successfull create the file  ",response_for_the_server:"file write successfull" }, { status: 200 });
  }  