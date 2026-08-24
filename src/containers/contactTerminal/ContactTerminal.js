import React, { useState } from "react";
import "./ContactTerminal.css";

const contact = {
  role: "software_engineer_(full-stack)",
  phone: "+91 8697108716",
  email: "sainikwarror132@gmail.com",
  github: "@sainikcodes24x7",
  linkedin: "@sainik-khaddar-2295a31b6",
  instagram: "@sainikkhaddar_",
  location: "Kolkata, India",
};

export default function ContactTerminal() {
  const [status, setStatus] = useState("SEND MESSAGE");

  const sendMessage = (event) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const subject = values.get("subject");
    const body = [
      `Name: ${values.get("name")}`,
      `Email: ${values.get("email")}`,
      "",
      values.get("message"),
    ].join("\n");

    setStatus("OPENING MAIL CLIENT...");
    window.location.href = `mailto:${
      contact.email
    }?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.setTimeout(() => setStatus("SEND MESSAGE"), 1600);
  };

  return (
    <section className="contact-terminal" id="contact">
      <div className="contact-terminal-shell">
        <article className="contact-json-window">
          <header>
            <div>
              <i />
              <i />
              <i />
            </div>
            <span>&lt;/&gt; contact_info.json</span>
          </header>
          <div className="contact-code">
            <ol>
              <li>
                <b className="json-brace">&#123;</b>
              </li>
              <li>
                <b>&quot;status&quot;</b>: <span>&quot;open_to_work&quot;</span>
                ,
              </li>
              <li>
                <b>&quot;role&quot;</b>: <span>&quot;{contact.role}&quot;</span>
                ,
              </li>
              <li>
                <b>&quot;phone&quot;</b>:{" "}
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>
                  &quot;{contact.phone}&quot;
                </a>
                ,
              </li>
              <li>
                <b>&quot;email&quot;</b>:{" "}
                <a href={`mailto:${contact.email}`}>
                  &quot;{contact.email}&quot;
                </a>
                ,
              </li>
              <li>
                <b>&quot;socials&quot;</b>: <i className="json-brace">&#123;</i>
              </li>
              <li>
                &nbsp;&nbsp;<b>&quot;github&quot;</b>:{" "}
                <a
                  href="https://github.com/sainikcodes24x7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  &quot;{contact.github}&quot;
                </a>
                ,
              </li>
              <li>
                &nbsp;&nbsp;<b>&quot;linkedin&quot;</b>:{" "}
                <a
                  href="https://www.linkedin.com/in/sainik-khaddar-2295a31b6/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  &quot;{contact.linkedin}&quot;
                </a>
                ,
              </li>
              <li>
                &nbsp;&nbsp;<b>&quot;instagram&quot;</b>:{" "}
                <a
                  href="https://www.instagram.com/sainikkhaddar_/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  &quot;{contact.instagram}&quot;
                </a>
              </li>
              <li>
                <i className="json-brace">&#125;</i>,
              </li>
              <li>
                <b>&quot;location&quot;</b>:{" "}
                <a
                  href="https://maps.google.com/?q=Kolkata,India"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  &quot;{contact.location}&quot;
                </a>
              </li>
              <li>
                <b className="json-brace">&#125;</b>
              </li>
              <li>&nbsp;</li>
              <li>
                <em>{"// Waiting for connection..."}</em>
              </li>
              <li>
                <span className="terminal-cursor">_</span>
              </li>
            </ol>
          </div>
        </article>

        <article className="message-editor">
          <header>
            <span>
              <b>TS</b> sendMessage.ts
            </span>
            <i>×</i>
          </header>
          <form onSubmit={sendMessage}>
            <div className="mail-compose-heading">
              <span>✉</span> mail.compose <i>secure channel</i>
            </div>
            <div className="mail-routing">
              <span>
                to: <b>{contact.email}</b>
              </span>
              <span>
                response: <b>within 24h</b>
              </span>
            </div>
            <div className="contact-form-grid">
              <label>
                NAME
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  required
                />
              </label>
              <label>
                EMAIL
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </label>
            </div>
            <label>
              SUBJECT
              <input
                name="subject"
                type="text"
                placeholder="Project inquiry / Collaboration"
                required
              />
            </label>
            <label>
              MESSAGE
              <textarea
                name="message"
                placeholder="Tell me about your project, timeline, and goals..."
                required
              />
            </label>
            <p>{"// Opens your email application. No form data is stored."}</p>
            <button type="submit">
              <span>▶</span>
              {status}
            </button>
          </form>
        </article>
      </div>
    </section>
  );
}
