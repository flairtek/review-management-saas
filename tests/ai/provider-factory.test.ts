import { describe, it, expect } from "vitest";
import { getAIProvider } from "@/lib/ai/factory";

describe("AI Provider Factory", () => {
  it("resolves the mock provider by default when no key is set", async () => {
    const provider = getAIProvider("mock");
    expect(provider.name).toBe("mock");
    const res = await provider.generateReply({
      reviewText: "Great food and service!",
      rating: 5,
      businessName: "Bistro 42",
      tone: "Friendly"
    });
    expect(res.replyText).toBeDefined();
    expect(res.replyText.length).toBeGreaterThan(10);
  });
});
