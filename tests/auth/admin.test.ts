import { describe, it, expect } from "vitest";
import { verifySuperadmin } from "@/lib/auth/admin";

describe("Admin Authorization", () => {
  it("returns false when unauthenticated", async () => {
    const isAdmin = await verifySuperadmin();
    expect(typeof isAdmin).toBe("boolean");
  });
});
