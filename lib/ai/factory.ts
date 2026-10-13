import { AIProvider } from "./types";
import { MockAIProvider } from "./providers/mock";

export function getAIProvider(overrideProvider?: string): AIProvider {
  const provider = overrideProvider || process.env.AI_PROVIDER || "mock";
  switch (provider.toLowerCase()) {
    case "mock":
    default:
      return new MockAIProvider();
  }
}