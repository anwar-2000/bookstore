import { createMongoConnection } from "@/database/conn";
import type { NextApiRequest, NextApiResponse } from "next";

import {
  getBook
} from "@/database/Controllers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    // createMongoConnection().catch(()=>res.status(405).json({error : 'Error in the connection'}))
   try {
    await createMongoConnection();
  } catch (err) {
    res.status(500).json({ error: "Error in the connection" });
    return;
  }

  const { method } = req;

  switch (method) {
    case "GET":
      getBook(req, res);
      break;
    default :
      res.setHeader('Allow',['GET','POST','PUT','DELETE'])
      res.status(405).end(`Method ${method} is not ALLOWED`)
      break;
    }}
