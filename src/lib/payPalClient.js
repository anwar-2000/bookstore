import { core } from '@paypal/checkout-server-sdk';

function environment() {
  let clientId = process.env.PAYPAL_CLIENT_ID;
  let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  //console.log("PAYPAL CREDENTIALS",clientId,clientSecret)

  return new core.SandboxEnvironment(
    clientId, clientSecret
  );
}

 function client() {
  return new core.PayPalHttpClient(environment());
}

export const clientFunction = client;
