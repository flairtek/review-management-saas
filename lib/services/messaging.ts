export interface SendRequestPayload {
  recipientName: string;
  recipientContact: string;
  channel: "email" | "whatsapp";
  trackingCode: string;
  businessName: string;
}

export async function sendReviewRequestMessage(payload: SendRequestPayload): Promise<boolean> {
  // Mock dispatcher for email/whatsapp
  console.log(`[Messaging Service] Sending ${payload.channel} review request to ${payload.recipientName} (${payload.recipientContact}) for ${payload.businessName}`);
  console.log(`Tracking Link: https://reviews.flairtek.com/r/${payload.trackingCode}`);
  return true;
}
