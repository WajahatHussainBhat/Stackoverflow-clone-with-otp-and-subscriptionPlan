import express from "express";
import { subscriptionCheckout , subscriptionPaymentSuccess, updateSubscriptionToDefault} from "../controllers/subscription.js";

const router = express.Router();

router.post("/checkout/:id", subscriptionCheckout)
router.post("/payment-success/:id", subscriptionPaymentSuccess)
router.patch("/update-subscription-to-default", updateSubscriptionToDefault)

export default router;