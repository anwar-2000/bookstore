import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//console.log(process.env.STRIPE_SECRET_KEY)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 // console.log("BODY" , req.body)
  if (req.method === 'POST') {
   // console.log(req.body.cart);
    try {
      // Create Checkout Sessions from body params.
      const lineItems = req.body.map((item: any) => {
        return {
          price_data: {
            currency: 'eur',
            product_data: {
              name: item.titre,
              images:[item.image],
            },
            unit_amount: item.prix * 100,
          },
          quantity: item.quantite,
        };
      });
      console.log(JSON.stringify(lineItems, null, 2));
      const params : Stripe.Checkout.SessionCreateParams = {
        submit_type : 'pay',
        mode : 'payment',
        payment_method_types : ['card'],
        billing_address_collection : 'required',
        shipping_options : [
            {shipping_rate : 'shr_1MteMYHz6XdTAx5rztRIxoPl'} , //free shipping - 0 €
            {shipping_rate : 'shr_1MteODHz6XdTAx5roOigV92M'} //fast shupping 20 €
        ],
        line_items: lineItems,
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      }
      const session : Stripe.Checkout.Session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    }catch (err) {
      const error = err as Error;
      res.status(500).json(error.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}