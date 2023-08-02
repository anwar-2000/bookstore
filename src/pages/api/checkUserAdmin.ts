import { createMongoConnection } from "@/database/conn";
import { checkUserAdmin } from "@/database/Controllers";
import type { NextApiRequest, NextApiResponse } from "next";


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
    case "POST":
      try {
        await checkUserAdmin(req, res);
      } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Invalid request" });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} is not ALLOWED`);
      break;
  }
}