import { describe, it, expect } from "vitest";
import { verifyRazorpaySignature } from "@/lib/services/razorpay";
import crypto from "crypto";

describe("Razorpay Service", () => {
  it("verifies webhook signature correctly", () => {
    const secret = "my_secret_webhook_key";
    const body = JSON.stringify({ event: "subscription.charged" });
    const signature = crypto.createHmac("sha256", secret).update(body).digest("hex");

    const isValid = verifyRazorpaySignature(body, signature, secret);
    expect(isValid).toBe(true);

    const isInvalid = verifyRazorpaySignature(body, "wrong_signature", secret);
    expect(isInvalid).toBe(false);
  });
});
