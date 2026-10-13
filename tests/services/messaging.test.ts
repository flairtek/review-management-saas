import { describe, it, expect } from "vitest";
import { generateReviewQRCodeUrl } from "@/lib/services/qr";
import { sendReviewRequestMessage } from "@/lib/services/messaging";

describe("Messaging & QR Services", () => {
  it("generates correct QR code URL", () => {
    const url = generateReviewQRCodeUrl("ChIJ12345");
    expect(url).toContain("api.qrserver.com");
    expect(url).toContain("writereview");
  });

  it("sends review request successfully", async () => {
    const res = await sendReviewRequestMessage({
      recipientName: "John Doe",
      recipientContact: "john@example.com",
      channel: "email",
      trackingCode: "abc123xyz",
      businessName: "Bistro 42",
    });
    expect(res).toBe(true);
  });
});
