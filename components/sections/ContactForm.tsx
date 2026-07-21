"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

const fieldBase =
  "w-full rounded-xl border border-line bg-bg-raise px-4 py-3 text-sm text-fg placeholder:text-faint transition-colors focus:border-acid focus:outline-none";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("success");
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full min-h-[320px] flex-col items-start justify-center rounded-2xl border border-acid/30 bg-bg-raise p-8">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-acid/15 text-acid">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-semibold text-fg">
          Message sent.
        </h3>
        <p className="mt-2 max-w-sm text-muted">
          Thanks for reaching out — it landed in my inbox and I&apos;ll get back
          to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-acid underline-offset-4 hover:underline"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-line bg-bg/40 p-5 backdrop-blur-sm sm:p-6"
      noValidate
    >
      {/* honeypot — visually hidden, ignored by humans */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="label mb-2 block !text-[0.6rem]">
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Doe"
            className={fieldBase}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="label mb-2 block !text-[0.6rem]">
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder="jane@company.com"
            className={fieldBase}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="cf-subject" className="label mb-2 block !text-[0.6rem]">
          Subject <span className="text-faint normal-case tracking-normal">(optional)</span>
        </label>
        <input
          id="cf-subject"
          name="subject"
          type="text"
          autoComplete="off"
          placeholder="A role, a project, a collaboration…"
          className={fieldBase}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="cf-message" className="label mb-2 block !text-[0.6rem]">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={4}
          placeholder="Tell me what you're building or what you have in mind."
          className={`${fieldBase} resize-none`}
        />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-lg border border-rose/30 bg-rose/10 px-3 py-2.5 text-sm text-rose"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="mt-0.5 shrink-0">
            <path d="M12 8v5M12 16h.01M12 3l9 16H3l9-16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        data-cursor="Send"
        className="group mt-5 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-acid px-6 text-sm font-semibold text-bg transition-opacity disabled:opacity-70 sm:w-auto"
      >
        {status === "sending" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-bg/30 border-t-bg" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="transition-transform group-hover:translate-x-0.5">
              <path d="M2 8h12M14 8l-4-4M14 8l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
