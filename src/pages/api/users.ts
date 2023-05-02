import {createMongoConnection} from "@/database/conn"
import type { NextApiRequest, NextApiResponse } from 'next'
import {deleteUser, getUsers } from "@/database/Controllers"


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
      getUsers(req,res)
      break;
          //res.status(200).json({method,name:'GET RESPONSE'});break;
      case 'DELETE' :
            deleteUser(req,res);
           // res.status(200).json({method,name:'DELETE RESPONSE'});
            break;
      default :
            res.setHeader('Allow',['GET','DELETE'])
            res.status(405).end(`Method ${method} is not ALLOWED`)
            break;
          }}