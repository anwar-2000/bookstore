
import { deleteActualite, editActualite, getActualite, postActualite } from "@/database/ActualiteControllers";
import {createMongoConnection} from "@/database/conn"
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

   // createMongoConnection().catch(()=>res.status(405).json({error : 'Error in the connection'}))
   try {
    await createMongoConnection();
  } catch (err) {
    res.status(500).json({ error: "Error in the connection" });
    return;
  }
    const {method} = req

    switch(method){
      case 'GET' : 
      getActualite(req,res)
      break;
          //res.status(200).json({method,name:'GET RESPONSE'});break;
      case 'POST' :
        postActualite(req,res)
       // res.status(200).json({method,name:'POST RESPONSE'});
        break;
      case 'PUT' :
         editActualite(req,res)
         // res.status(200).json({method,name:'PUT RESPONSE'});
         break;
      case 'DELETE' :
            deleteActualite(req,res);
           // res.status(200).json({method,name:'DELETE RESPONSE'});
            break;
      default :
            res.setHeader('Allow',['GET','POST','PUT','DELETE'])
            res.status(405).end(`Method ${method} is not ALLOWED`)
            break;
}}