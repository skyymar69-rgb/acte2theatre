"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      nom: String(fd.get("nom") ?? ""),
      email: String(fd.get("email") ?? ""),
      telephone: String(fd.get("telephone") ?? ""),
      sujet: String(fd.get("sujet") ?? ""),
      message: String(fd.get("message") ?? ""),
      consentement: fd.get("consentement") === "on",
      website: String(fd.get("website") ?? ""), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data?.error ?? "Une erreur est survenue.");
        setStatus("error");
        return;
      }
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setErrorMsg(
        "Impossible d'envoyer le message. Vérifiez votre connexion et réessayez."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-xl border border-or-500/30 bg-or-500/5 p-6"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2
            className="w-6 h-6 text-or-600 dark:text-or-400 flex-shrink-0"
            aria-hidden="true"
          />
          <div>
            <p className="font-display text-lg font-semibold mb-1">
              Message envoyé. Merci&nbsp;!
            </p>
            <p className="text-sm text-ink-muted">
              Nous revenons vers vous dans les plus brefs délais.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-4 text-sm text-rouge-600 dark:text-or-400 hover:underline"
            >
              Envoyer un autre message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 max-w-2xl"
      aria-describedby="form-help"
    >
      <p id="form-help" className="text-sm text-ink-muted">
        Les champs marqués d&apos;un astérisque (*) sont obligatoires.
      </p>

      {/* Honeypot — invisible mais accessible aux lecteurs d'écran (les bots remplissent tout) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "auto",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label htmlFor="website-honeypot">
          Site web (ne pas remplir)
          <input
            type="text"
            id="website-honeypot"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Nom complet" name="nom" required autoComplete="name" />
        <Field
          label="Adresse email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field
          label="Téléphone"
          name="telephone"
          type="tel"
          autoComplete="tel"
          hint="(facultatif)"
        />
        <Field label="Sujet" name="sujet" hint="(facultatif)" />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium mb-1.5"
        >
          Message <span className="text-rouge-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          minLength={10}
          maxLength={5000}
          className="w-full rounded-lg border border-divider/30 bg-surface px-3 py-2.5 text-ink focus:border-or-500 focus:ring-2 focus:ring-or-500/30 transition"
        />
        <p className="text-xs text-ink-muted mt-1">
          Entre 10 et 5&nbsp;000 caractères.
        </p>
      </div>

      <label className="flex items-start gap-3 text-sm cursor-pointer">
        <input
          type="checkbox"
          name="consentement"
          required
          className="mt-1 accent-or-500"
        />
        <span>
          <span className="text-rouge-600">*</span> J&apos;accepte que mes
          données (nom, email, téléphone, message) soient traitées par
          Acte&nbsp;2 Théâtre dans l&apos;unique but de répondre à ma demande,
          conformément à la{" "}
          <Link
            href="/confidentialite"
            target="_blank"
            className="text-rouge-600 dark:text-or-400 underline underline-offset-2"
          >
            politique de confidentialité
          </Link>
          . Je peux exercer mes droits RGPD à tout moment auprès du gérant.
        </span>
      </label>

      {status === "error" && errorMsg && (
        <div
          role="alert"
          className="rounded-lg border border-rouge-500/40 bg-rouge-500/5 p-3 text-sm flex items-start gap-2"
        >
          <AlertCircle
            className="w-4 h-4 mt-0.5 text-rouge-600 flex-shrink-0"
            aria-hidden="true"
          />
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="w-4 h-4" aria-hidden="true" />
        )}
        {status === "sending" ? "Envoi en cours…" : "Envoyer le message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  hint?: string;
}) {
  const id = `field-${name}`;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1.5">
        {label}
        {required && <span className="text-rouge-600"> *</span>}
        {hint && <span className="text-xs text-ink-muted ml-1">{hint}</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-divider/30 bg-surface px-3 py-2.5 text-ink focus:border-or-500 focus:ring-2 focus:ring-or-500/30 transition"
      />
    </div>
  );
}
