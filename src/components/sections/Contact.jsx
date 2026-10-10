import { useState } from "react";
import { ArrowUpRight, Check, Copy, FileDown, Loader2, Phone, Send } from "lucide-react";
import { CONTACT, PROFILE, FORM_ENDPOINT } from "../../data/meta";
import { useUI } from "../../context/UIContext";
import { navigateTo } from "../../lib/actions";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";
import { GithubIcon, LinkedinIcon } from "../common/BrandIcons";

const FORM_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMPTY = { name: "", email: "", company: "", message: "", botcheck: "" };

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Please add your name.";
  if (!v.email.trim()) e.email = "An email lets me reply.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "That email doesn't look quite right.";
  if (v.message.trim().length < 20) e.message = "A sentence or two (20+ characters) helps me respond properly.";
  return e;
}

function Field({ id, label, optional, error, children }) {
  return (
    <div className={`field${error ? " has-error" : ""}`}>
      <label htmlFor={id}>
        {label} {optional && <span className="field__opt">optional</span>}
      </label>
      {children}
      <p className="field__err" id={`${id}-err`} role={error ? "alert" : undefined}>
        {error || ""}
      </p>
    </div>
  );
}

export default function Contact({ level = 2 }) {
  const { copyEmail, openResume, toast } = useUI();
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | handoff | error
  const errors = validate(values);
  const show = (k) => (touched[k] ? errors[k] : undefined);

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));
  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }));

  const mailtoHref = () => {
    const subject = `Hello from ${values.name || "your portfolio"}${values.company ? ` (${values.company})` : ""}`;
    return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${values.message}\n\n${values.name}\n${values.email}`)}`;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errors).length) {
      const first = ["name", "email", "message"].find((k) => errors[k]);
      document.getElementById(`cf-${first}`)?.focus();
      return;
    }
    if (values.botcheck) return;

    if (!FORM_KEY) {
      navigateTo(mailtoHref());
      setStatus("handoff");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: FORM_KEY,
          subject: `Portfolio enquiry from ${values.name}`,
          from_name: values.name,
          name: values.name,
          email: values.email,
          company: values.company,
          message: values.message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) throw new Error(data.message || "Request failed");
      setStatus("success");
      setValues(EMPTY);
      setTouched({});
      toast("Message sent", { detail: "Thanks, I'll be in touch soon." });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section section--contact" aria-labelledby="contact-title">
      <div className="wrap">
        <SectionHeader level={level} title="Open to" accent="opportunities." id="contact-title" lede={PROFILE.seeking} />

        <div className="contact">
          <Reveal className="contact__direct">
            <span className="eyebrow">Write directly</span>
            <a className="contact__email" href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
            <div className="contact__row">
              <button className="btn btn--ghost btn--sm" onClick={copyEmail}>
                <Copy size={13} aria-hidden="true" /> Copy email
              </button>
              <button className="btn btn--ghost btn--sm" onClick={openResume}>
                <FileDown size={13} aria-hidden="true" /> Résumé
              </button>
            </div>

            <ul className="contact__links">
              <li>
                <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
                  <LinkedinIcon size={15} />
                  <span>LinkedIn</span>
                  <span className="contact__handle">{CONTACT.linkedinHandle}</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">
                  <GithubIcon size={15} />
                  <span>GitHub</span>
                  <span className="contact__handle">{CONTACT.githubHandle}</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href={CONTACT.phoneHref}>
                  <Phone size={15} aria-hidden="true" />
                  <span>Phone</span>
                  <span className="contact__handle">{CONTACT.phone}</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`}>
                  <span className="contact__glyph" aria-hidden="true">@</span>
                  <span>Email</span>
                  <span className="contact__handle">Drop me a line anytime</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </li>
            </ul>
            <p className="contact__where">
              Based in {PROFILE.location} · available to start now
            </p>
          </Reveal>

          <Reveal as="form" className="form" onSubmit={onSubmit} noValidate delay={100} aria-describedby="form-note">
            {status === "success" ? (
              <div className="form__done" role="status">
                <span className="form__done-ic"><Check size={18} /></span>
                <h3>Thank you, message received.</h3>
                <p>I read every message personally and will get back to you soon.</p>
                <button type="button" className="btn btn--ghost btn--sm" onClick={() => setStatus("idle")}>Send another</button>
              </div>
            ) : (
              <>
                <div className="form__grid">
                  <Field id="cf-name" label="Name" error={show("name")}>
                    <input id="cf-name" name="name" autoComplete="name" value={values.name} onChange={set("name")} onBlur={blur("name")} aria-invalid={!!show("name")} aria-describedby="cf-name-err" />
                  </Field>
                  <Field id="cf-email" label="Email" error={show("email")}>
                    <input id="cf-email" name="email" type="email" autoComplete="email" value={values.email} onChange={set("email")} onBlur={blur("email")} aria-invalid={!!show("email")} aria-describedby="cf-email-err" />
                  </Field>
                </div>
                <Field id="cf-company" label="Company / role" optional>
                  <input id="cf-company" name="company" autoComplete="organization" value={values.company} onChange={set("company")} />
                </Field>
                <Field id="cf-message" label="What can I help with?" error={show("message")}>
                  <textarea id="cf-message" name="message" rows={5} value={values.message} onChange={set("message")} onBlur={blur("message")} aria-invalid={!!show("message")} aria-describedby="cf-message-err" />
                </Field>
                <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" checked={!!values.botcheck} onChange={(e) => setValues((v) => ({ ...v, botcheck: e.target.checked ? "1" : "" }))} aria-hidden="true" />

                <div className="form__foot">
                  <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
                    {status === "sending" ? <Loader2 size={14} className="spin" aria-hidden="true" /> : <Send size={14} aria-hidden="true" />}
                    {status === "sending" ? "Sending…" : "Send message"}
                  </button>
                  <p className="form__note" id="form-note" aria-live="polite">
                    {status === "error" && (
                      <>Couldn't send just now. <a href={mailtoHref()}>Email me instead</a>.</>
                    )}
                    {status === "handoff" && <>Your email app should have opened with the message ready to send.</>}
                    {(status === "idle" || status === "sending") && (FORM_KEY ? "Goes straight to my inbox." : "Opens your email app with this message pre-filled.")}
                  </p>
                </div>
              </>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
