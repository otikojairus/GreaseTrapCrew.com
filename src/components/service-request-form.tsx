"use client";

import { useEffect, useState } from "react";
import type { ServiceIssueType } from "@/lib/page-intent";

const INCIDENT_STORAGE_KEY = "gtc_incident_id";

type FormProps = {
  pageSlug: string;
  pageUrl?: string;
  pageType?: string;
  primaryKeyword?: string;
  defaultIssueType: ServiceIssueType;
  defaultUrgency: "now" | "today" | "this_week" | "flexible";
  defaultLocation?: string;
};

type SubmitState = "idle" | "loading" | "success" | "error";

export function ServiceRequestForm({
  pageSlug,
  pageUrl,
  pageType,
  primaryKeyword,
  defaultIssueType,
  defaultUrgency,
  defaultLocation = "",
}: FormProps) {
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successReference, setSuccessReference] = useState("");
  const [incidentId, setIncidentId] = useState("");

  useEffect(() => {
    try {
      const existing = window.localStorage.getItem(INCIDENT_STORAGE_KEY);
      if (existing) setIncidentId(existing);
    } catch {
      /* private browsing */
    }
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "loading") return;
    setState("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const body = {
      contactName: data.get("contactName"),
      contactPhone: data.get("contactPhone"),
      contactEmail: data.get("contactEmail") || undefined,
      preferredContact: data.get("preferredContact"),
      location: data.get("location"),
      issueType: data.get("issueType"),
      urgency: data.get("urgency"),
      notes: data.get("notes") || undefined,
      businessName: data.get("businessName") || undefined,
      pageSlug,
      pageUrl: pageUrl || (typeof window !== "undefined" ? window.location.href : undefined),
      pageType,
      primaryKeyword,
      incidentId: incidentId || undefined,
    };

    try {
      const res = await fetch("/api/service-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMessage(typeof json.error === "string" ? json.error : "Submission failed");
        setState("error");
        return;
      }
      const nextId =
        typeof json.incidentId === "string"
          ? json.incidentId
          : typeof json.requestId === "string"
            ? json.requestId
            : incidentId;
      if (nextId) {
        setIncidentId(nextId);
        try {
          window.localStorage.setItem(INCIDENT_STORAGE_KEY, nextId);
        } catch {
          /* ignore */
        }
      }
      if (typeof json.reference === "string") {
        setSuccessReference(json.reference);
      } else if (typeof json.message === "string") {
        setSuccessReference(json.message);
      }
      setState("success");
      form.reset();
    } catch {
      setErrorMessage("Network error — please call if this is urgent.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="gtc-intake-success rounded-xl border border-outline-variant/25 bg-surface-container-lowest p-space-lg">
        <p className="font-headline-sm text-headline-sm text-primary font-semibold">Request received</p>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2">
          {successReference || "Our team will follow up shortly."} You can still call anytime — repeat contacts link to
          the same request when possible.
        </p>
        <button
          type="button"
          className="mt-space-md font-label-lg text-secondary font-semibold hover:underline"
          onClick={() => {
            setSuccessReference("");
            setState("idle");
          }}
        >
          Send another update
        </button>
      </div>
    );
  }

  return (
    <form className="gtc-intake-form grid gap-space-md" onSubmit={onSubmit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
        <label className="flex flex-col gap-1">
          <span className="font-label-md text-label-md text-on-surface">Your name *</span>
          <input
            name="contactName"
            required
            autoComplete="name"
            disabled={state === "loading"}
            className="rounded-lg border border-outline-variant/40 bg-surface px-space-md py-2.5 font-body-md"
            placeholder="Full name"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-label-md text-label-md text-on-surface">Phone *</span>
          <input
            name="contactPhone"
            required
            type="tel"
            autoComplete="tel"
            disabled={state === "loading"}
            className="rounded-lg border border-outline-variant/40 bg-surface px-space-md py-2.5 font-body-md"
            placeholder="Best number to reach you"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
        <label className="flex flex-col gap-1">
          <span className="font-label-md text-label-md text-on-surface">City or site address *</span>
          <input
            name="location"
            required
            defaultValue={defaultLocation}
            autoComplete="address-level2"
            disabled={state === "loading"}
            className="rounded-lg border border-outline-variant/40 bg-surface px-space-md py-2.5 font-body-md"
            placeholder="e.g. Toronto — Main St kitchen"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-label-md text-label-md text-on-surface">Kitchen / business (optional)</span>
          <input
            name="businessName"
            autoComplete="organization"
            disabled={state === "loading"}
            className="rounded-lg border border-outline-variant/40 bg-surface px-space-md py-2.5 font-body-md"
            placeholder="Restaurant, hotel, commissary…"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
        <label className="flex flex-col gap-1">
          <span className="font-label-md text-label-md text-on-surface">Service needed *</span>
          <select
            name="issueType"
            defaultValue={defaultIssueType}
            disabled={state === "loading"}
            className="rounded-lg border border-outline-variant/40 bg-surface px-space-md py-2.5 font-body-md"
          >
            <option value="overflow_emergency">Overflow / backup (urgent)</option>
            <option value="scheduled_cleaning">Scheduled cleaning</option>
            <option value="pumping">Pumping / emptying</option>
            <option value="maintenance">Maintenance / inspection</option>
            <option value="installation_repair">Install, repair, or replace</option>
            <option value="other">Other grease-trap issue</option>
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-label-md text-label-md text-on-surface">How soon? *</span>
          <select
            name="urgency"
            defaultValue={defaultUrgency}
            disabled={state === "loading"}
            className="rounded-lg border border-outline-variant/40 bg-surface px-space-md py-2.5 font-body-md"
          >
            <option value="now">Now — kitchen backing up</option>
            <option value="today">Today</option>
            <option value="this_week">This week</option>
            <option value="flexible">Flexible / planning ahead</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
        <label className="flex flex-col gap-1">
          <span className="font-label-md text-label-md text-on-surface">Preferred follow-up</span>
          <select
            name="preferredContact"
            defaultValue="call"
            disabled={state === "loading"}
            className="rounded-lg border border-outline-variant/40 bg-surface px-space-md py-2.5 font-body-md"
          >
            <option value="call">Phone call</option>
            <option value="text">Text message</option>
            <option value="email">Email</option>
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-label-md text-label-md text-on-surface">Email (optional)</span>
          <input
            name="contactEmail"
            type="email"
            autoComplete="email"
            disabled={state === "loading"}
            className="rounded-lg border border-outline-variant/40 bg-surface px-space-md py-2.5 font-body-md"
            placeholder="For confirmations"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1">
        <span className="font-label-md text-label-md text-on-surface">Brief note (optional)</span>
        <textarea
          name="notes"
          rows={3}
          maxLength={2000}
          disabled={state === "loading"}
          className="rounded-lg border border-outline-variant/40 bg-surface px-space-md py-2.5 font-body-md resize-y"
          placeholder="Symptoms, trap location, access notes — trap size and permits can wait."
        />
      </label>

      {errorMessage ? (
        <p className="font-body-sm text-error" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "loading"}
        className="inline-flex items-center justify-center gap-2 px-space-xl py-3.5 rounded-lg bg-secondary text-white font-label-lg font-semibold hover:opacity-95 disabled:opacity-60"
      >
        {state === "loading" ? "Sending…" : "Request callback"}
      </button>
      <p className="font-body-sm text-body-sm text-on-surface-variant">
        Short form only — no trap dimensions or permit numbers required to get started.
      </p>
    </form>
  );
}