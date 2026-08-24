import React, { useEffect, useState } from "react";
import "./Roadmaps.css";
import dsaRoadmapPdf from "../../assets/documents/DSA_RoadmapFAANG.pdf";

const roadmaps = [
  {
    title: "Data Structures & Algorithms",
    description:
      "A structured 12-week path through core data structures, reusable problem-solving patterns, graph algorithms, dynamic programming, and interview preparation.",
    file: dsaRoadmapPdf,
    downloadName: "DSA_RoadmapFAANG.pdf",
    duration: "12 WEEK PATH",
    tags: ["DSA", "ALGORITHMS", "INTERVIEWS"],
    visual: "dsa",
  },
  {
    title: "Backend Development",
    description:
      "Progress from HTTP and API fundamentals to databases, authentication, reliable services, event-driven systems, containers, CI/CD, and cloud deployment.",
    comingSoon: true,
    duration: "PROJECT BASED",
    tags: ["APIs", "DATABASES", "DEVOPS"],
    visual: "backend",
  },
  {
    title: "System Design & LLD",
    description:
      "Master low-level design, distributed-system building blocks, architecture tradeoffs, capacity planning, failure handling, and the system-design interview framework.",
    comingSoon: true,
    duration: "ADVANCED PATH",
    tags: ["SYSTEM DESIGN", "LLD", "SCALABILITY"],
    visual: "system",
  },
];

function RoadmapVisual({ type }) {
  if (type === "dsa") {
    return (
      <div className="roadmap-visual dsa-visual">
        <i />
        <i />
        <i />
        <i />
        <span />
        <span />
        <span />
      </div>
    );
  }
  if (type === "backend") {
    return (
      <div className="roadmap-visual backend-visual">
        <code>api_gateway → services</code>
        <b>auth ✓</b>
        <b>database ✓</b>
        <b>deploy ✓</b>
      </div>
    );
  }
  return (
    <div className="roadmap-visual system-visual">
      <i>CLIENT</i>
      <span>↔</span>
      <i>GATEWAY</i>
      <span>↔</span>
      <i>SERVICES</i>
      <b>↓</b>
      <i>DATA LAYER</i>
    </div>
  );
}

export default function Roadmaps() {
  const [comingSoonRoadmap, setComingSoonRoadmap] = useState("");

  useEffect(() => {
    if (!comingSoonRoadmap) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setComingSoonRoadmap("");
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [comingSoonRoadmap]);

  return (
    <section className="roadmap-terminal" id="roadmaps">
      <div className="roadmap-shell">
        <h2 className="roadmap-heading">
          <span>▤</span> $ ls -la ~/roadmaps
        </h2>

        <div className="roadmap-grid">
          {roadmaps.map((roadmap) => (
            <article className="roadmap-card" key={roadmap.title}>
              <div className="roadmap-cover">
                <span className="roadmap-pinned">⌖ PINNED</span>
                <RoadmapVisual type={roadmap.visual} />
              </div>
              <div className="roadmap-card-body">
                <div className="roadmap-meta">
                  <span>▣ DOWNLOADABLE</span>
                  <span>◷ {roadmap.duration}</span>
                </div>
                <h3>{roadmap.title}</h3>
                <p>{roadmap.description}</p>
                <div className="roadmap-tags">
                  {roadmap.tags.map((tag) => (
                    <span key={tag}>◇ {tag}</span>
                  ))}
                </div>
                {roadmap.comingSoon ? (
                  <button
                    className="roadmap-download"
                    type="button"
                    onClick={() => setComingSoonRoadmap(roadmap.title)}
                  >
                    <span>⇩</span> Download roadmap
                  </button>
                ) : (
                  <a
                    className="roadmap-download"
                    href={roadmap.file}
                    download={roadmap.downloadName}
                  >
                    <span>⇩</span> Download roadmap
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {comingSoonRoadmap && (
        <div
          className="roadmap-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setComingSoonRoadmap("");
          }}
        >
          <section
            className="roadmap-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="roadmap-modal-title"
          >
            <button
              className="roadmap-modal-close"
              type="button"
              onClick={() => setComingSoonRoadmap("")}
              aria-label="Close coming soon message"
            >
              ×
            </button>
            <span className="roadmap-modal-icon" aria-hidden="true">
              ⌛
            </span>
            <small>{"// roadmap_status"}</small>
            <h3 id="roadmap-modal-title">{comingSoonRoadmap}</h3>
            <p>Coming soon. Stay tuned!</p>
            <button type="button" onClick={() => setComingSoonRoadmap("")}>
              Got it
            </button>
          </section>
        </div>
      )}
    </section>
  );
}
