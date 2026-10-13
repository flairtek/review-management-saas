import { AIProvider, GenerationRequest, GenerationResponse, SentimentAnalysisResult } from "../types";

export class MockAIProvider implements AIProvider {
  name = "mock";

  async generateReply(req: GenerationRequest): Promise<GenerationResponse> {
    const greeting = req.authorName ? `Hello ${req.authorName}, ` : "Hello, ";
    let reply = `${greeting}Thank you for your ${req.rating}-star review of ${req.businessName}! We truly appreciate your feedback.`;

    if (req.rating <= 2) {
      reply = `${greeting}We are truly sorry to hear about your experience at ${req.businessName}. Please contact us directly so we can make this right.`;
    }

    return {
      replyText: reply,
      model: "mock-v1",
      promptTokens: 40,
      completionTokens: 25,
    };
  }

  async analyzeSentiment(text: string, rating: number): Promise<SentimentAnalysisResult> {
    const isNegative = rating <= 2 || text.toLowerCase().includes("terrible") || text.toLowerCase().includes("worst");
    const riskDetected = text.toLowerCase().includes("lawyer") || text.toLowerCase().includes("sue");

    return {
      sentiment: isNegative ? "negative" : rating >= 4 ? "positive" : "neutral",
      riskDetected,
      riskReasons: riskDetected ? ["Legal action mentioned"] : [],
    };
  }
}