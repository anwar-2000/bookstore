import { createMongoConnection } from "@/database/conn";
import Livre from "@/models/Livres";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//console.log(process.env.STRIPE_SECRET_KEY)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try{
        await createMongoConnection();
    }catch(err){
        console.log(err)
    }


  if (req.method === 'POST') {
    try {
      const { cart, total , isChecked } = req.body;

      
      const priceToPay = total * 100;


      console.log(total , priceToPay , isChecked)
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
              unit_amount: isChecked &&  total !== 'undefined'
              ? item.prix * 100
              : !isChecked &&  total === 'undefined'
                ? (item.poids * item.quantite + item.prix) * 100
                : !isChecked &&  total !== 'undefined'
                  ? total * 100
                  : 0,
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
              unit_amount: priceToPay - (item.prix * 100),
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
        line_items: lineItems,
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
        phone_number_collection: { enabled: true }
      };

      const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params);

      // After successful payment, delete the products from the database
      if (session.payment_status === 'paid') {
        for (const item of cart) {
          const book = await Livre.findById(item._id);
          console.log('TRYING TO DELETE THE BOOK : ',book)
      
          if (book.quantite === 1) {
             await Livre.findByIdAndUpdate(item._id, { vendu: true });
          } else {
            await Livre.findByIdAndUpdate(
              item._id,
              { $inc: { quantite: -1 } }
            );
          }
        }
      }
      
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




