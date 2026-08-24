import React from "react";
import "./Appreciations.css";

const recognitions = [
  {
    id: "01",
    type: "WRITTEN CLIENT RECOGNITION",
    source: "DGM Product · Satya Retail",
    title: "Revenue-impacting product delivery",
    description:
      "Recognized for shipping the referral program, carousel “View All,” and floating-cart experiences—features the product owner cited as directly valuable to the business.",
    metrics: [
      "22% lift in net-new signups",
      "₹1.4 Cr+ incremental GMV",
      "18% lower acquisition cost",
    ],
    technologies: ["Referral & Loyalty", "ASP.NET Core", ".NET 8", "React"],
    icon: "★",
  },
  {
    id: "02",
    type: "TEAM LEAD APPRECIATION",
    source: "Pharmaceutical Client",
    title: "Enterprise-scale contract automation",
    description:
      "Appreciated for automating an event-driven contract-lifecycle platform managing ₹4,500 Cr in annual procurement through resilient enterprise integrations.",
    metrics: [
      "₹4,500 Cr annual procurement",
      "~7 days → under 2 hours",
      "~92% fewer posting errors",
    ],
    technologies: ["Azure Functions", "Service Bus", ".NET 8", "SAP & Icertis"],
    icon: "↯",
  },
  {
    id: "03",
    type: "EXECUTIVE LEADERSHIP APPRECIATION",
    source: "Executive Director & Director",
    title: "Urgent midnight production recovery",
    description:
      "Led the team that eliminated checkout payment failures through PayU integration and an idempotent order-to-payment state machine that resolved duplicate-cart race conditions.",
    metrics: [
      "91% → 97.5% payment success",
      "~₹10 L/month recovered",
      "Production incident resolved",
    ],
    technologies: ["PayU", "SHA512", "SURL / FURL", "Idempotency"],
    icon: "✓",
  },
];

export default function Appreciations() {
  return (
    <section className="appreciations-section" id="appreciations">
      <div className="appreciations-shell">
        <header className="appreciations-heading">
          <div>
            <span>✦</span>
            <h2>$ cat recognition.log</h2>
          </div>
          <p>
            Leadership recognition backed by measurable product and operational
            impact.
          </p>
        </header>

        <div className="recognition-grid">
          {recognitions.map((recognition) => (
            <article className="recognition-card" key={recognition.id}>
              <header>
                <span>ACK_{recognition.id}</span>
                <b>VERIFIED IMPACT</b>
              </header>
              <div className="recognition-body">
                <div className="recognition-source">
                  <i>{recognition.icon}</i>
                  <span>
                    <small>{recognition.type}</small>
                    <b>{recognition.source}</b>
                  </span>
                </div>
                <h3>{recognition.title}</h3>
                <p>{recognition.description}</p>
                <div className="recognition-metrics">
                  {recognition.metrics.map((metric) => (
                    <strong key={metric}>↗ {metric}</strong>
                  ))}
                </div>
                <div className="recognition-tech">
                  {recognition.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </div>
              <footer>
                <span>STATUS: ACKNOWLEDGED</span>
                <b>impact.confirmed ✓</b>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
