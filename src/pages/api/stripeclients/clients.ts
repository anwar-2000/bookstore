import { NextApiRequest, NextApiResponse } from "next";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//console.log(process.env.STRIPE_SECRET_KEY)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Allow requests from anywhere (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    if (req.method === 'GET') {
      const customers = await stripe.customers.list();
      const payments = await stripe.charges.list( {limit: 100} );
      const totalRevenue = payments.data.reduce((total :any, payout : any) => total + payout.amount, 0);
      const data = {
        totalRevenue ,
        customers: customers.data,
        payments: payments.data,
      };

      res.status(200).json(data);
    } else {
      res.setHeader('Allow', 'GET');
      res.status(405).end('Method Not Allowed');
    }
  }