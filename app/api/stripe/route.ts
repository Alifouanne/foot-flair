import prisma from "@/lib/db";
import { redis } from "@/lib/radis";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_SECRET_WEBHOOK as string
    );
  } catch (error: unknown) {
    return new Response("Webhook Error", { status: 400 });
  }
  switch (event.type) {
    case "checkout.session.completed": {
      const seassion = event.data.object;
      await prisma.order.create({
        data: {
          amount: seassion.amount_total as number,
          status: seassion.status as string,
          userId: seassion.metadata?.userId,
        },
      });
      await redis.del(`cart-${seassion.metadata?.userId}`);
      break;
    }
    default: {
      console.log("unhandled event");
    }
  }
  return new Response(null, { status: 200 });
}
