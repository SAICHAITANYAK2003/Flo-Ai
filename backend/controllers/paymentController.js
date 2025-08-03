import Stripe from "stripe";
import paymentsModel from "../models/Payments.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//Initialize payment gateway
export const stripePayment = async (req, res) => {
  try {
    const userId = req.userId;
    const { planId, planAmount } = req.body;

    if (planId.toLowerCase() !== "premium") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid plan selected" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      metadata: {
        clerkId: userId,
        planId,
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `AI Nest ${planId} Plan`,
            },
            unit_amount: planAmount * 100,
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5173/payment-status?status=success",
      cancel_url: "http://localhost:5173/payment-status?status=cancel",
    });

    res.json({ success: true, id: session.id });
  } catch (error) {
    console.log("❌ Error in Stripe Payments:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Stripe webhooks for payment status

export const stripePaymentStatus = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endPointSecret);
    console.log(event);
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      await paymentsModel.findOneAndUpdate(
        {
          clerkId: session.metadata.clerkId,
        },
        {
          $set: { plan: session.metadata.planId, isPaid: true },
          $inc: { creditBalance: 10 },
        },
        { upsert: true, new: true }
      );
    } catch (error) {
      console.error("MongoDB Error:", error.message);
    }
  }

  return res.status(200).json({ received: true });
};
