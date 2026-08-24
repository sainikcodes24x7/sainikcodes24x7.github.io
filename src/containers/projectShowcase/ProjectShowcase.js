import React from "react";
import "./ProjectShowcase.css";
import ProjectsData from "../../shared/opensource/projects.json";
import { greeting } from "../../portfolio";

const languageColors = {
  Python: "#3572a5",
  JavaScript: "#f1e05a",
  CSS: "#563d7c",
  HTML: "#e34c26",
  PHP: "#4f5d95",
  Shell: "#89e051",
  "Jupyter Notebook": "#da5b0b",
};

function projectDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function ProjectShowcase() {
  const repositories = ProjectsData.data;
  const pinnedProjects = repositories.slice(0, 4);

  return (
    <section className="project-terminal" id="projects">
      <div className="project-terminal-shell">
        <h2 className="project-terminal-title">
          <span>▱</span> $ ls -la ~/projects
        </h2>

        <div className="project-browser">
          <aside className="repository-panel">
            <header>
              <span>▣</span>
              <b>Repositories</b>
              <i>{repositories.length}</i>
            </header>
            <div className="repository-list">
              {repositories.map((repo) => {
                const primaryLanguage =
                  repo.languages[0] && repo.languages[0].name;
                return (
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={repo.id}
                  >
                    <div>
                      <strong>{repo.name}</strong>
                      <em>{repo.isFork ? "Fork" : "Public"}</em>
                    </div>
                    <p>
                      {primaryLanguage && (
                        <>
                          <i
                            style={{
                              background:
                                languageColors[primaryLanguage] || "#ff5a2f",
                            }}
                          />
                          {primaryLanguage}
                        </>
                      )}
                      <span>Created {projectDate(repo.createdAt)}</span>
                    </p>
                  </a>
                );
              })}
            </div>
            <a
              className="all-repositories"
              href={greeting.githubProfile}
              target="_blank"
              rel="noopener noreferrer"
            >
              View all on GitHub <span>↗</span>
            </a>
          </aside>

          <div className="pinned-projects">
            <h3>
              PINNED PROJECTS <span />
            </h3>
            <div className="pinned-project-grid">
              {pinnedProjects.map((repo) => {
                const primaryLanguage =
                  repo.languages[0] && repo.languages[0].name;
                return (
                  <article className="pinned-project-card" key={repo.id}>
                    <header>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>▣</span>
                        {repo.name}
                      </a>
                      <i>{repo.isFork ? "Fork" : "Public"}</i>
                    </header>
                    <p>{repo.description}</p>
                    <div className="project-tech-tags">
                      {repo.languages.map((language) => (
                        <span key={language.name}>{language.name}</span>
                      ))}
                    </div>
                    <footer>
                      <span>
                        <i
                          style={{
                            background:
                              languageColors[primaryLanguage] || "#ff5a2f",
                          }}
                        />
                        {primaryLanguage}
                      </span>
                      <span>◷ {projectDate(repo.createdAt)}</span>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub ↗
                      </a>
                    </footer>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
