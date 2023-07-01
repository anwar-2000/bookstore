import {createMongoConnection} from "@/database/conn"
import type { NextApiRequest, NextApiResponse } from 'next'
import { getDons , addDon, deleteDon } from "@/database/Controllers"


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
        getDons(req,res)
      break;
          //res.status(200).json({method,name:'GET RESPONSE'});break;
      case 'POST' :
        addDon(req,res)
       // res.status(200).json({method,name:'POST RESPONSE'});
        break;
      case 'DELETE':
        deleteDon(req,res)
        break;
      default :
            res.setHeader('Allow',['GET','POST','DELETE'])
            res.status(405).end(`Method ${method} is not ALLOWED`)
            break;
          }}