import {
  getLocalKnowledgeAnswer,
  sainikKnowledge,
} from "./localKnowledgeAnswer";

describe("Sainik.ai local knowledge fallback", () => {
  test("uses the canonical referral metric", () => {
    expect(
      getLocalKnowledgeAnswer("What impact did the referral program have?")
    ).toContain("22% lift");
    expect(
      getLocalKnowledgeAnswer("What impact did the referral program have?")
    ).not.toContain("42%");
  });

  test("answers a specific Service Bus question with specific evidence", () => {
    const answer = getLocalKnowledgeAnswer("Have you used Azure Service Bus?");
    expect(answer).toContain(
      "nine HTTP, Timer, and Azure Service Bus-triggered Functions"
    );
    expect(answer).toContain("under two hours");
  });

  test("does not reuse the broad Azure answer for payments", () => {
    const serviceBusAnswer = getLocalKnowledgeAnswer(
      "Have you used Azure Service Bus?"
    );
    const paymentAnswer = getLocalKnowledgeAnswer(
      "Tell me about PayU payments"
    );
    expect(paymentAnswer).toContain("91% to 97.5%");
    expect(paymentAnswer).not.toEqual(serviceBusAnswer);
  });

  test("answers general architecture questions separately from profile claims", () => {
    const answer = getLocalKnowledgeAnswer(
      "Should I use microservices for my new product?"
    );
    expect(answer).toContain("modular monolith");
    expect(answer).toContain("What scale");
  });

  test("records the résumé discrepancy and exclusion decision", () => {
    const decision = sainikKnowledge.dataQuality.canonicalDecisions.find(
      (item) => item.field === "referralSignupLift"
    );
    expect(decision.value).toBe("22%");
    expect(sainikKnowledge.dataQuality.excludedClaims.length).toBeGreaterThan(
      0
    );
  });
});
