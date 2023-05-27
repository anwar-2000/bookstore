import { NextApiRequest, NextApiResponse } from "next";
import paypal from "@paypal/checkout-server-sdk";
import OrderModel from "@/models/PaypalOrders";

import { clientFunction } from "../../lib/payPalClient"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { cart, email, address, postalCode , total } = req.body;
    /**
     * logic for totalpoids --> delivery Process
     */
    const totalValue = cart.reduce((total: number, book: any) => total + book.prix * book.quantite, 0);

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'EUR',
          value: total
        },
        payee: {
          email_address: email
        },
        shipping: {
          address: {
            address_line_1: address,
            postal_code: postalCode,
            country_code : 'FR'
          }
        }
      }]
    });

    let order;
    try {
      order = await clientFunction().execute(request);
    } catch (err) {
      console.error(err);
      return res.status(500);
    }

    // Save the order details, purchased books, email, and billing address to the database
    try {
      const newOrder= {
        orderId: order.result.id,
        total : total,
        email: email,
        billingAddress:  {
            postalCode : postalCode ,
            address : address
        },
        books: cart.map((book: any) => ({
          titre: book.titre,
          quantite: book.quantite
        }))
      };
      const savedOrder = await OrderModel.create(newOrder);
      console.log('Order saved:', savedOrder);
    } catch (error) {
      console.error('Error saving order:', error);
      return res.status(500);
    }

    res.status(201).json({
      orderID: order.result.id
    });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}