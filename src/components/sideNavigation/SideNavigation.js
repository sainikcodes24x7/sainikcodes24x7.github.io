import React, { useEffect, useState } from "react";
import "./SideNavigation.css";

const sections = [
  { id: "greeting", label: "Home", icon: "</>" },
  { id: "about", label: "About", icon: ">_" },
  { id: "skills", label: "Skills", icon: "⌘" },
  { id: "experience", label: "Experience", icon: "⑂" },
  { id: "appreciations", label: "Recognition", icon: "✦" },
  { id: "projects", label: "Projects", icon: "▱" },
  { id: "roadmaps", label: "Roadmaps", icon: "▤" },
  { id: "contact", label: "Contact", icon: "✉" },
];

export default function SideNavigation() {
  const [activeSection, setActiveSection] = useState("greeting");

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean);
    let frameRequested = false;

    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.42;
      const current = elements.find((element) => {
        const bounds = element.getBoundingClientRect();
        return bounds.top <= marker && bounds.bottom > marker;
      });

      if (current) {
        setActiveSection(current.id);
      } else if (window.scrollY < window.innerHeight * 0.25) {
        setActiveSection("greeting");
      } else if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8
      ) {
        setActiveSection(elements[elements.length - 1].id);
      }
      frameRequested = false;
    };

    const requestUpdate = () => {
      if (!frameRequested) {
        window.requestAnimationFrame(updateActiveSection);
        frameRequested = true;
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <nav className="section-navigation" aria-label="Page sections">
      <div className="section-nav-rail">
        {sections.map((section) => (
          <a
            className={activeSection === section.id ? "active" : ""}
            href={`#${section.id}`}
            aria-label={section.label}
            onClick={() => setActiveSection(section.id)}
            key={section.id}
          >
            <i />
            <span>{section.icon}</span>
            <b>&gt; {section.label}</b>
          </a>
        ))}
      </div>
    </nav>
  );
}
