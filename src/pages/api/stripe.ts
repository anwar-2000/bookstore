import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//console.log(process.env.STRIPE_SECRET_KEY)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { cart, total , isChecked } = req.body;
      const priceToPay = total * 100;
     // console.log('Cart:', cart); 



      

      let lineItems = [];

      if(cart.length === 1) {
         lineItems = cart.map((item: any) => {
          return {
            price_data: {
              currency: 'eur',
              product_data: {
                name: item.titre,
                images: [item.image],
              },
              unit_amount: isChecked ? item.prix * 100 : (item.poids * item.quantite + item.prix) * 100,
            },
            quantity: item.quantite,
          };
        });
      }
     
      if(cart.length > 1){
       lineItems = cart.map((item: any) => {
          return {
            price_data: {
              currency: 'eur',
              product_data: {
                name: item.titre,
                images: [item.image],
              },
              unit_amount: priceToPay,
            },
            quantity: item.quantite,
          };
        });
      }


      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'required',
        shipping_options : [
          {shipping_rate : 'shr_1N4PcvHz6XdTAx5rqKiTltEv'}  //free shipping - 0 €
           ],
        line_items: lineItems,
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };

      const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      const error = err as Error;
      res.status(500).json(error.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}