import { NextApiRequest, NextApiResponse } from "next";

import { createMongoConnection } from "@/database/conn";
import { addViewToBook, getBookViews } from "@/database/Controllers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Allow requests from anywhere (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
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
        getBookViews(req, res);
      break;
    case "POST":
        addViewToBook(req,res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} is not ALLOWED`);
      break;
  }
}
