export interface SafetyEvaluation {
  safeForAutoReply: boolean;
  flags: string[];
}

export function buildUserPrompt(reviewText: string, rating: number, authorName?: string): string {
  return `Please compose an authentic reply to the following customer review:
Customer Name: ${authorName || "Valued Customer"}
Rating: ${rating} out of 5 stars

<review_content>
${reviewText}
</review_content>`;
}

export function evaluateSafetyGuardrails(reviewText: string, rating: number): SafetyEvaluation {
  const flags: string[] = [];
  const text = reviewText.toLowerCase();

  if (rating <= 2) {
    flags.push("low_rating");
  }

  if (text.includes("sue") || text.includes("lawyer") || text.includes("legal") || text.includes("court")) {
    flags.push("legal_threat");
  }

  if (text.includes("food poison") || text.includes("hospital") || text.includes("injury") || text.includes("police")) {
    flags.push("severe_incident");
  }

  return {
    safeForAutoReply: flags.length === 0,
    flags,
  };
}