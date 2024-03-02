import mongoose from "mongoose";
import User from "../models/auth.js";
import stripePackage from "stripe";
import moment from "moment";
import dotenv from "dotenv";
dotenv.config();

const stripePrivateKey = process.env.STRIPE_PRIVATE_KEY;
const stripe = stripePackage(stripePrivateKey);

const stripeSession = async (plan) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: plan,
          quantity: 1,
        },
      ],
      success_url: "https://stack-overflow-clone-by-wajahat.netlify.app/Success",
      cancel_url: "https://stack-overflow-clone-by-wajahat.netlify.app/Cancel",
    });
    return session;
  } catch (error) {
    return error;
  }
};

const [basic, silver, gold] = [
  "price_1Ola18SEMxzfiVAd8JmUwjZe",
  "price_1OlaHySEMxzfiVAdFudwuTMv",
  "price_1OlaJ1SEMxzfiVAdNsttcmWQ",
];

export const subscriptionCheckout = async (req, res) => {
  const { id: _id } = req.params;
  const { price } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("User unavailable...");
  }

  let planId = null;

  if (price === 0) {
    planId = basic;
  } else if (price === 100) {
    planId = silver;
  } else if (price === 1000) {
    planId = gold;
  }

  try {
    const session = await stripeSession(planId);

    const user = await User.findById(_id);

    user.subscription = {
      planId: planId,
      sessionId: session.id,
    };

    await user.save();

    res.status(200).json({ session: session });
  } catch (error) {
    // If an error occurs, clear the subscription field
    await User.findByIdAndUpdate(
      _id,
      { $unset: { subscription: "" } },
      { new: true }
    );
    res.status(400).json({ message: "Error in subscription", error: error });
  }
};

export const subscriptionPaymentSuccess = async (req, res) => {
  const { id: _id } = req.params;
  const { sessionId } = req.body;

  try {
    // Check if user exists
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Retrieve session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(
      user?.subscription?.sessionId
    );

    // Check if payment was successful
    if (session.payment_status == "paid") {
      const subscriptionId = session.subscription;
      try {
        // Retrieve subscription details from Stripe
        const subscription = await stripe.subscriptions.retrieve(
          subscriptionId
        );

        // Calculate subscription details
        const planId = subscription.plan.id;
        const planType =
          subscription.plan.amount === 10000
            ? "silver"
            : subscription.plan.amount === 100000
            ? "gold"
            : "free";
        const startDate = moment
          .unix(subscription.current_period_start)
          .format("YYYY-MM-DD");
        const endDate = moment
          .unix(subscription.current_period_end)
          .format("YYYY-MM-DD");
        const durationInSeconds =
          subscription.current_period_end - subscription.current_period_start;
        const durationInDays = moment
          .duration(durationInSeconds, "seconds")
          .asDays();

        // Update user's subscription in the database
        user.subscription = {
          userId: _id,
          planId: planId,
          planType: planType,
          startDate: startDate,
          endDate: endDate,
          durationInSeconds: durationInSeconds,
          durationInDays: durationInDays,
        };
        await user.save();
        return res.status(200).json({
          message: "Payment successful",
          subscription: user.subscription,
        });
      } catch (error) {
        // If an error occurs, clear the subscription field
        return res
          .status(500)
          .json({ message: "Error retrieving subscription details" });
      }
    } else {
      // If payment failed, clear the subscription field
      await User.findByIdAndUpdate(
        _id,
        { $unset: { subscription: "" } },
        { new: true }
      );
      return res.status(500).json({ message: "Payment failed" });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res
      .status(400)
      .json({ message: "Error in Subscription Payment", error });
  }
};

export const updateSubscriptionToDefault = async (req, res) => {
  try {
    const users = await User.find({ "subscription.planType": { $ne: "free" } });

    for (const userData of users) {

      const user = new User(userData);
      const { durationInDays } = user.subscription;

      if (durationInDays === 0) {
       
        user.subscription.planType = "free";
        await user.save();
      }
    }
    res.status(200).json({ message: "Successfully updated subscription plans to default settings" });
  } catch (error) {
    console.error("Error updating subscription to default settings:", error);
    return res.status(400).json({ message: "Error updating subscription to default settings", error });
  }
};