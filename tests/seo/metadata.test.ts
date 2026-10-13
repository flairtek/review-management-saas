import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

describe("SEO Metadata Generation", () => {
  it("generates sitemap with correct public URLs", async () => {
    const sm = await sitemap();
    expect(sm.length).toBeGreaterThan(5);
    expect(sm.some((item) => item.url === "https://reviews.flairtek.com/pricing")).toBe(true);
  });

  it("generates correct robots rules", () => {
    const rb = robots();
    expect(rb.sitemap).toBe("https://reviews.flairtek.com/sitemap.xml");
    const rules = Array.isArray(rb.rules) ? rb.rules : [rb.rules];
    expect(rules[0].allow).toBe("/");
    // Note: Disallow is a string or array of strings.
    // Expecting to include dashboard path.
    const disallow = Array.isArray(rules[0].disallow) ? rules[0].disallow : [rules[0].disallow];
    expect(disallow).toContain("/dashboard/");
  });
});
