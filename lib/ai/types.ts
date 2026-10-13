export type ReviewTone = "Professional" | "Friendly" | "Warm/Empathetic" | "Concise" | "Formal" | "Custom";

export interface GenerationRequest {
  reviewText: string;
  rating: number;
  authorName?: string;
  businessName: string;
  businessType?: string;
  tone: ReviewTone;
  customInstructions?: string;
}

export interface GenerationResponse {
  replyText: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
}

export interface SentimentAnalysisResult {
  sentiment: "positive" | "neutral" | "negative";
  riskDetected: boolean;
  riskReasons: string[];
}

export interface AIProvider {
  name: string;
  generateReply(req: GenerationRequest): Promise<GenerationResponse>;
  analyzeSentiment(text: string, rating: number): Promise<SentimentAnalysisResult>;
}