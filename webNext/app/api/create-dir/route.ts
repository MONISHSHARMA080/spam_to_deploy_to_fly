import { NextApiRequest, NextApiResponse } from 'next';
import * as fs from 'fs';
import * as path from 'path';

export async function GET(request: Request) {
 
 
  const referer = request.headers.get('referer');

  // Check if the referer header is present and matches the Django app's URL
  // if (referer && referer === 'https://social-network-monish.onrender.com') {
  //   // Request is from the Django app
  //   return Response.json({status : "200",message: 'Request is from Django app' })
  // } else {
    // Request is not from the Django app or referer header is missing
    // return Response.json({status : "403",message: 'Request is not  from Django app' })


  try { 
    
    // Get the current working directory
    const cwd = process.cwd()+"/app";
    console.log("\n\n-----+++------");
    console.log(cwd+"/api");
    console.log("--------+++---\n\n",fs.readdirSync(cwd));
    
    const url = new URL(request.url);
    const dirName = url.searchParams.get('dir_name') || 'default_dir_name';
    const fileName = 'page.tsx';
    const fileContent = fs.readFileSync(cwd+"/page.tsx");
    console.log(`\n\ndirname ${dirName} .... fileName-> ${fileName}  ...\n\n`);
    
    
    // Construct the path for the new directory
    const dirPath = path.join(cwd,  dirName);
    console.log("Dir-path",dirPath);
    

    // Create the new directory
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Construct the path for the new file
    const filePath = path.join(dirPath, fileName);

    // Create the new file and write its content
    fs.writeFileSync(filePath, fileContent);

    return Response.json({ success: true,message:"Created successfully" });
  } catch (error:any) {
    console.error('Error creating directory or file:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}  
// }
