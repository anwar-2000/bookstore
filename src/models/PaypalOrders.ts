import { Schema, Document , models , model } from "mongoose";

interface BillingAddress {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }

interface PaypalOrder extends Document {
    orderId: string;
    total : number;
    email: string;
    billingAddress: BillingAddress;
    books: {
      titre: string;
      quantite: number;
    }[];
  }



const BillingAddressSchema: Schema<BillingAddress> = new Schema({
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  });

const OrderSchema: Schema<PaypalOrder> = new Schema({
    orderId: String,
    email: String,
    total : Number,
    billingAddress: BillingAddressSchema,
    books: [
      {
        titre: String,
        quantite: Number
      }
    ]
  });


delete models['PaypalOrder'];

const OrderModel = models.OrderModel || model<PaypalOrder>("PaypalOrder", OrderSchema);

export default OrderModel;