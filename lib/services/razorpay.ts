import crypto from "crypto";

export function verifyRazorpaySignature(body: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");
  return expectedSignature === signature;
}

export async function createRazorpaySubscription(planId: string, customerEmail: string) {
  const keyId = process.env.RAZORPAY_KEY_ID || "rzp_test_dummy";
  const keySecret = process.env.RAZORPAY_KEY_SECRET || "secret_dummy";

  if (keyId.includes("dummy") || !process.env.RAZORPAY_KEY_ID) {
    return {
      subscriptionId: `sub_mock_${Date.now()}`,
      shortUrl: `https://rzp.io/i/mockcheckout?plan=${planId}`,
    };
  }

  const response = await fetch("https://api.razorpay.com/v1/subscriptions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
    },
    body: JSON.stringify({
      plan_id: planId,
      customer_notify: 1,
      total_count: 12,
      notes: { email: customerEmail },
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.description || "Failed to create Razorpay subscription");
  }

  return {
    subscriptionId: data.id,
    shortUrl: data.short_url,
  };
}
