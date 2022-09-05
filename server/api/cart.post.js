import Stripe from 'stripe';

export default defineEventHandler(async (event) => {
  const stripeSecret = useRuntimeConfig().stripeSecret;
  const body = await useBody(event);
  const ids = body.product.map((product) => product.sys.id);
 
  const stripe = new Stripe( stripeSecret );
  const products = await stripe.products.list({
    ids: ids,
  });

  const lineItems = products.data.map((product) => ({
    price: product.default_price,
    quantity: body.product.find((p) => product.id === p.sys.id).count
  }));


  const session = await stripe.checkout.sessions.create({
    success_url: 'http://localhost:3000/checkout/success',
    cancel_url: 'http://localhost:3000/checkout/cancelled',
    line_items: lineItems,
    mode: 'payment',
  });
  return session;
});
