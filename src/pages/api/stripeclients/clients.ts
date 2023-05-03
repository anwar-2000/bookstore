import { NextApiRequest, NextApiResponse } from "next";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//console.log(process.env.STRIPE_SECRET_KEY)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
      const customers = await stripe.customers.list();
      const payments = await stripe.charges.list();
      const data = {
        customers: customers.data,
        payments: payments.data,
      };

      res.status(200).json(data);
    } else {
      res.setHeader('Allow', 'GET');
      res.status(405).end('Method Not Allowed');
    }
  }