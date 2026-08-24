import knowledge from "../../data/sainikKnowledge.json";

const technicalPatterns = {
  estimate: /project.*(estimate|cost|timeline|budget)|how (long|much).*(build|project|app)/,
  fintech: /bank|fintech|payment platform|ledger|real money/,
  architecture: /system design|architecture|microservice|modular monolith|scalab|load balanc/,
  product: /app|platform|website|startup|idea|build|mvp/,
};

function normalize(value) {
  return value.toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, " ").trim();
}

function scoreAnswer(prompt, entry) {
  return entry.keywords.reduce((score, keyword) => {
    const normalizedKeyword = normalize(keyword);
    if (!prompt.includes(normalizedKeyword)) return score;
    return (
      score +
      normalizedKeyword.split(" ").length * 2 +
      normalizedKeyword.length / 20
    );
  }, 0);
}

function findVerifiedAnswer(prompt) {
  return knowledge.offlineAnswers
    .map((entry) => ({ entry, score: scoreAnswer(prompt, entry) }))
    .filter((candidate) => candidate.score > 0)
    .sort((first, second) => second.score - first.score)[0];
}

function technicalAnswer(prompt, context) {
  if (technicalPatterns.estimate.test(prompt)) {
    return "To estimate it honestly, share the user types, three must-have workflows, target platforms, external integrations, expected early traffic, and desired launch date. I can then separate the MVP from later phases and identify the main architecture, timeline, and cost drivers.";
  }

  if (technicalPatterns.fintech.test(context)) {
    return "For a banking or fintech product, start by separating identity/KYC, accounts, an immutable double-entry ledger, payments, notifications, and audit concerns. A modular monolith is usually the safer MVP unless independent teams or scaling constraints already justify services. Is this a learning prototype or a regulated product handling real money?";
  }

  if (technicalPatterns.architecture.test(prompt)) {
    return "Start with workload, consistency, failure, and team constraints before selecting an architecture. Define service boundaries, API contracts, data ownership, idempotency, caching, asynchronous work, observability, and rollback paths; prefer a modular monolith until independent deployment or scaling provides a clear benefit. What scale and failure requirement is driving the design?";
  }

  if (technicalPatterns.product.test(prompt)) {
    return "Start by defining the primary user, the problem they solve today, and the three workflows the first release cannot ship without. That gives us an MVP boundary before choosing databases, services, queues, or cloud infrastructure. Who is the primary user?";
  }

  return null;
}

export function getLocalKnowledgeAnswer(question, history = []) {
  const prompt = normalize(question);
  const recentContext = history
    .filter((message) => message.role === "user")
    .slice(-3)
    .map((message) => normalize(message.text))
    .join(" ");
  const context = `${recentContext} ${prompt}`.trim();
  const verifiedMatch = findVerifiedAnswer(prompt);

  if (verifiedMatch) return verifiedMatch.entry.answer;

  const generalTechnicalAnswer = technicalAnswer(prompt, context);
  if (generalTechnicalAnswer) return generalTechnicalAnswer;

  if (/hello|hey|\bhi\b|who are you/.test(prompt)) {
    return "Hey! I'm Sainik.ai—Sainik Khaddar's portfolio assistant. I can explain his verified backend experience and product impact, or help you think through an API, system-design, or project question.";
  }

  return "I don't have a verified profile fact for that exact question yet, so I won't guess. Ask about Sainik's .NET backend work, Azure integrations, commerce impact, PwC experience, education, availability, or describe a technical project you would like to design.";
}

export { knowledge as sainikKnowledge };
