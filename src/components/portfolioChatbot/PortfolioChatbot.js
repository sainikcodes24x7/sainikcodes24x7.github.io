import React, { useEffect, useRef, useState } from "react";
import "./PortfolioChatbot.css";
import profilePhoto from "../../assets/images/sainikProfile.JPG";
import { getLocalKnowledgeAnswer } from "./localKnowledgeAnswer";

const suggestions = [
  "Explore Sainik's backend skills and production impact",
  "Get a rough project estimate and architecture direction",
  "Check if Sainik is a good fit for your team",
  "Ask about APIs, microservices, or system design",
  "Send Sainik a direct message",
];

const inquiryTypes = [
  { id: "hire", title: "Hire Sainik", detail: "I have a role or project" },
  {
    id: "collaborate",
    title: "Collaborate",
    detail: "Build something together",
  },
  { id: "hello", title: "Just saying hi", detail: "General inquiry" },
];

async function getAssistantAnswer(question, history) {
  const endpoint = process.env.REACT_APP_CHAT_API_URL;
  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: question,
          history: history.slice(-10),
          assistant: "Sainik.ai",
        }),
      });
      if (response.ok) {
        const data = await response.json();
        if (typeof data.answer === "string" && data.answer.trim())
          return data.answer.trim();
      }
    } catch (error) {
      // Fall back to the private, in-browser portfolio knowledge base.
    }
  }
  const answer = getLocalKnowledgeAnswer(question, history);
  const previousAssistantMessage = history
    .slice()
    .reverse()
    .find((message) => message.role === "assistant");

  if (previousAssistantMessage && previousAssistantMessage.text === answer) {
    return `Your follow-up is more specific: “${question}”. I don't have a separately verified portfolio detail for that exact point, so I won't repeat the broad answer or invent experience. Ask me for the closest documented project, or use the Contact section to confirm this directly with Sainik.`;
  }
  return answer;
}

export default function PortfolioChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [composerOpen, setComposerOpen] = useState(false);
  const [composerStep, setComposerStep] = useState(1);
  const [composerError, setComposerError] = useState("");
  const [contactDraft, setContactDraft] = useState({
    name: "",
    email: "",
    type: "",
    message: "",
  });
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text:
        "Hey! I'm Sainik — well, his AI twin. Ask me anything about his work, or pick a topic below.",
    },
  ]);
  const conversationEnd = useRef(null);
  const inputRef = useRef(null);
  const composerInputRef = useRef(null);

  useEffect(() => {
    if (open) {
      conversationEnd.current &&
        conversationEnd.current.scrollIntoView({ behavior: "smooth" });
      window.setTimeout(() => {
        if (composerOpen)
          composerInputRef.current && composerInputRef.current.focus();
        else inputRef.current && inputRef.current.focus();
      }, 120);
    }
  }, [open, messages, typing, composerOpen, composerStep]);

  const startDirectMessage = () => {
    setComposerOpen(true);
    setComposerStep(1);
    setComposerError("");
  };

  const cancelDirectMessage = () => {
    setComposerOpen(false);
    setComposerStep(1);
    setComposerError("");
  };

  const updateDraft = (field, value) => {
    setContactDraft((current) => ({ ...current, [field]: value }));
    setComposerError("");
  };

  const advanceComposer = (event) => {
    event.preventDefault();
    if (composerStep === 1 && contactDraft.name.trim().length < 2) {
      setComposerError("Please enter your full name.");
      return;
    }
    if (
      composerStep === 2 &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactDraft.email.trim())
    ) {
      setComposerError(
        "Enter a valid email address, for example you@company.com."
      );
      return;
    }
    setComposerStep((current) => Math.min(current + 1, 4));
  };

  const selectInquiryType = (type) => {
    updateDraft("type", type);
    setComposerStep(4);
  };

  const sendDirectMessage = (event) => {
    event.preventDefault();
    if (contactDraft.message.trim().length < 10) {
      setComposerError("Please add a little more detail before sending.");
      return;
    }
    const selectedType = inquiryTypes.find(
      (type) => type.id === contactDraft.type
    );
    const subject = `${
      selectedType ? selectedType.title : "Portfolio inquiry"
    } from ${contactDraft.name.trim()}`;
    const body = [
      `Name: ${contactDraft.name.trim()}`,
      `Email: ${contactDraft.email.trim()}`,
      `Inquiry: ${selectedType ? selectedType.title : "General inquiry"}`,
      "",
      contactDraft.message.trim(),
    ].join("\n");
    window.location.href = `mailto:sainikwarror132@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setMessages((current) => [
      ...current,
      {
        role: "assistant",
        text: `Thanks, ${contactDraft.name.trim()}. Your email application is opening with the message ready to send to Sainik.`,
      },
    ]);
    setComposerOpen(false);
    setComposerStep(1);
    setContactDraft({ name: "", email: "", type: "", message: "" });
  };

  const submitQuestion = async (question) => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || typing) return;
    setMessages((current) => [
      ...current,
      { role: "user", text: cleanQuestion },
    ]);
    setInput("");
    setTyping(true);
    const minimumDelay = new Promise((resolve) =>
      window.setTimeout(resolve, 420)
    );
    const answerPromise = getAssistantAnswer(cleanQuestion, messages);
    const [, answer] = await Promise.all([minimumDelay, answerPromise]);
    setMessages((current) => [...current, { role: "assistant", text: answer }]);
    setTyping(false);
  };

  const resetChat = () => {
    setMessages([
      {
        role: "assistant",
        text: "Chat reset. What would you like to know about Sainik?",
      },
    ]);
    setTyping(false);
    setComposerOpen(false);
    setComposerStep(1);
    setComposerError("");
  };

  return (
    <>
      <button
        className={`chat-launcher${open ? " is-open" : ""}`}
        onClick={() => setOpen((current) => !current)}
        aria-label={
          open ? "Close portfolio assistant" : "Open portfolio assistant"
        }
      >
        <img src={profilePhoto} alt="" />
        <i />
        <span>Ask Sainik.ai</span>
      </button>

      {open && (
        <section
          className="chat-window"
          role="dialog"
          aria-modal="false"
          aria-label="Sainik portfolio assistant"
        >
          <header className="chat-header">
            <div className="chat-identity">
              <img src={profilePhoto} alt="Sainik" />
              <i />
              <span>
                <b>&gt; Sainik.ai</b>
                <small>{"// Open to Work"}</small>
              </span>
            </div>
            <div className="chat-controls">
              <button onClick={resetChat} aria-label="Reset conversation">
                ↻
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
              >
                ×
              </button>
            </div>
          </header>

          <div className="chat-conversation">
            {messages.map((message, index) => (
              <div
                className={`chat-message ${message.role}`}
                key={`${message.role}-${index}`}
              >
                {message.role === "assistant" && (
                  <img src={profilePhoto} alt="" />
                )}
                <p>{message.text}</p>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="chat-suggestions">
                {suggestions.map((suggestion) => (
                  <button
                    onClick={() =>
                      suggestion === "Send Sainik a direct message"
                        ? startDirectMessage()
                        : submitQuestion(suggestion)
                    }
                    key={suggestion}
                  >
                    &gt; {suggestion}
                  </button>
                ))}
              </div>
            )}

            {typing && (
              <div className="chat-message assistant">
                <img src={profilePhoto} alt="" />
                <p className="typing-dots">
                  <i />
                  <i />
                  <i />
                </p>
              </div>
            )}

            {composerOpen && (
              <form
                className="direct-message-flow"
                onSubmit={
                  composerStep === 4 ? sendDirectMessage : advanceComposer
                }
                noValidate
              >
                <header>
                  <span>{"// message"}</span>
                  <button
                    type="button"
                    onClick={cancelDirectMessage}
                    aria-label="Cancel direct message"
                  >
                    ×
                  </button>
                </header>
                <div className="direct-message-card">
                  <div className="direct-message-progress">
                    <b>MESSAGE SAINIK</b>
                    <span>{composerStep} / 4</span>
                  </div>
                  <i className="direct-message-progress-bar">
                    <span style={{ width: `${composerStep * 25}%` }} />
                  </i>

                  {composerStep === 1 && (
                    <label>
                      What&apos;s your name?
                      <input
                        ref={composerInputRef}
                        type="text"
                        value={contactDraft.name}
                        onChange={(event) =>
                          updateDraft("name", event.target.value)
                        }
                        placeholder="Your full name"
                        autoComplete="name"
                      />
                    </label>
                  )}
                  {composerStep === 2 && (
                    <label>
                      What&apos;s your email?
                      <input
                        ref={composerInputRef}
                        type="email"
                        value={contactDraft.email}
                        onChange={(event) =>
                          updateDraft("email", event.target.value)
                        }
                        placeholder="you@company.com"
                        autoComplete="email"
                        required
                      />
                    </label>
                  )}
                  {composerStep === 3 && (
                    <fieldset>
                      <legend>What&apos;s this about?</legend>
                      {inquiryTypes.map((type) => (
                        <button
                          type="button"
                          className={
                            contactDraft.type === type.id ? "selected" : ""
                          }
                          onClick={() => selectInquiryType(type.id)}
                          key={type.id}
                        >
                          <b>{type.title}</b>
                          <small>{type.detail}</small>
                        </button>
                      ))}
                    </fieldset>
                  )}
                  {composerStep === 4 && (
                    <label>
                      Your message for Sainik:
                      <textarea
                        ref={composerInputRef}
                        value={contactDraft.message}
                        onChange={(event) =>
                          updateDraft("message", event.target.value)
                        }
                        placeholder="Tell Sainik about your project, role, or idea..."
                      />
                    </label>
                  )}

                  {composerError && (
                    <p className="direct-message-error">! {composerError}</p>
                  )}
                  <div className="direct-message-actions">
                    <button type="button" onClick={cancelDirectMessage}>
                      Cancel
                    </button>
                    {composerStep !== 3 && (
                      <button type="submit">
                        {composerStep === 4 ? "Send Message  ◇" : "Next  →"}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            )}
            <div ref={conversationEnd} />
          </div>

          {!composerOpen && (
            <button
              className="direct-message-trigger"
              type="button"
              onClick={startDirectMessage}
            >
              <span>Message Sainik directly</span>
              <b>→</b>
            </button>
          )}
          {!composerOpen && (
            <form
              className="chat-input-form"
              onSubmit={(event) => {
                event.preventDefault();
                submitQuestion(input);
              }}
            >
              <span>&gt;</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type a message..."
                aria-label="Message Sainik portfolio assistant"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="Send message"
              >
                ↵
              </button>
            </form>
          )}
          <footer>
            {"/* Portfolio assistant · verified résumé knowledge */"}
          </footer>
        </section>
      )}
    </>
  );
}
