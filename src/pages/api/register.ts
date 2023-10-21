import { createMongoConnection } from "@/database/conn";
import { addUser } from "@/database/Controllers";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    // Allow requests from anywhere (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
   try {
    await createMongoConnection();
  } catch (err) {
    res.status(500).json({ error: "Error in the connection" });
    return;
  }

  const { method } = req;

  switch (method) {
    case "POST": 
          addUser(req,res);
        break;
    default :
      res.setHeader('Allow',['GET','POST','PUT','DELETE'])
      res.status(405).end(`Method ${method} is not ALLOWED`)
      break;
    }}
