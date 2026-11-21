"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { SITE, BOOKING_SERVICES, NAIL_OPTIONS, TIME_SLOTS, ServiceId } from "@/lib/config";

type F = { service: ServiceId | ""; name: string; phone: string; date: string; time: string; notes: string;
  history: string; prev: string; treatments: string; desired: string; nails: string[]; };
const empty: F = { service: "", name: "", phone: "", date: "", time: "", notes: "", history: "", prev: "", treatments: "", desired: "", nails: [] };

const todayStr = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); };
const fmtDate = (s: string) => { const [y, m, d] = s.split("-"); return `${d}/${m}/${y}`; };

export function buildMessage(f: F, photos: { hair: string[]; insp: string[] }) {
  const label = BOOKING_SERVICES.find(s => s.id === f.service)?.label ?? "";
  const L: string[] = ["Bonjour Meraki !", "", "Je souhaite demander un rendez-vous.", "",
    `Nom : ${f.name.trim()}`, `Téléphone : ${f.phone.trim()}`, `Prestation : ${label}`,
    `Date souhaitée : ${fmtDate(f.date)}`, `Créneau préféré : ${f.time}`];
  if (f.service === "balayage") {
    L.push("", "— Mon projet cheveux —", `État / historique des cheveux : ${f.history.trim()}`);
    if (f.prev) L.push(`Balayage ou coloration précédents : ${f.prev}`);
    if (f.treatments.trim()) L.push(`Henné, lissage ou autres traitements : ${f.treatments.trim()}`);
    L.push(`Résultat souhaité : ${f.desired.trim()}`);
    if (photos.hair.length) L.push("Photo de mes cheveux actuels : je l'envoie dans ce chat");
    if (photos.insp.length) L.push("Photo d'inspiration : je l'envoie dans ce chat");
  }
  if (f.service === "nails" && f.nails.length) L.push(`Type de prestation ongles : ${f.nails.join(", ")}`);
  if (f.notes.trim()) L.push("", `Informations complémentaires : ${f.notes.trim()}`);
  L.push("", "Merci !");
  return L.join("\n");
}

export default function Booking({ open, preset, onClose }: { open: boolean; preset: ServiceId | ""; onClose: () => void }) {
  const [f, setF] = useState<F>(empty);
  const [err, setErr] = useState<Record<string, string>>({});
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [sending, setSending] = useState(false);
  const [hair, setHair] = useState<string[]>([]);
  const [insp, setInsp] = useState<string[]>([]);
  const [msg, setMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    setF({ ...empty, service: preset }); setErr({}); setHair([]); setInsp([]); setSending(false); setCopied(false);
    setStep(preset ? 2 : 1);
    document.body.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    setTimeout(() => box.current?.focus(), 50);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", k); };
  }, [open, preset, onClose]);

  const set = <K extends keyof F>(k: K, v: F[K]) => { setF(p => ({ ...p, [k]: v })); setErr(p => ({ ...p, [k]: "" })); };
  const waUrl = useMemo(() => `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(msg)}`, [msg]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (f.name.trim().length < 3 || !f.name.trim().includes(" ")) e.name = "Veuillez indiquer votre prénom et votre nom.";
    if (!/^\+?[\d\s().-]{8,}$/.test(f.phone.trim())) e.phone = "Veuillez saisir un numéro de téléphone valide.";
    if (!f.date) e.date = "Veuillez choisir une date."; else if (f.date < todayStr()) e.date = "Cette date est passée.";
    if (!f.time) e.time = "Veuillez choisir un créneau.";
    if (f.service === "balayage") {
      if (!f.history.trim()) e.history = "Décrivez brièvement l'état de vos cheveux.";
      if (!f.desired.trim()) e.desired = "Décrivez le résultat que vous souhaitez.";
    }
    if (f.service === "nails" && !f.nails.length) e.nails = "Sélectionnez au moins une prestation.";
    setErr(e); return e;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { document.getElementById("f-" + Object.keys(e)[0])?.focus(); return; }
    setSending(true);
    const m = buildMessage(f, { hair, insp });
    setMsg(m);
    window.open(`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(m)}`, "_blank", "noopener");
    setTimeout(() => { setSending(false); setStep(3); }, 600);
  };

  const copy = async () => { try { await navigator.clipboard.writeText(msg); setCopied(true); } catch { /* ignore */ } };
  const Err = ({ k }: { k: string }) => err[k] ? <p className="err" role="alert">{err[k]}</p> : null;

  if (!open) return null;
  return (
    <div className="bk" role="dialog" aria-modal="true" aria-labelledby="bk-title">
      <div className="bk-scrim" onClick={onClose} />
      <div className="bk-panel" ref={box} tabIndex={-1}>
        <header className="bk-head">
          <div><p className="eyebrow">Demande de rendez-vous</p><h2 id="bk-title">{step === 1 ? "Quelle prestation vous attire ?" : step === 2 ? "Parlez-nous de votre venue" : "Votre message est prêt"}</h2></div>
          <button className="x" onClick={onClose} aria-label="Fermer">×</button>
        </header>
        <div className="steps" aria-hidden>{[1, 2, 3].map(i => <i key={i} className={step >= i ? "on" : ""} />)}</div>

        {step === 1 && (
          <div className="bk-body"><div className="chips">
            {BOOKING_SERVICES.map(s => <button key={s.id} className="chip" onClick={() => { set("service", s.id); setStep(2); }}>{s.label}<span>→</span></button>)}
          </div></div>
        )}

        {step === 2 && (
          <form className="bk-body" onSubmit={submit} noValidate>
            <div className="field"><label htmlFor="f-service">Prestation</label>
              <select id="f-service" value={f.service} onChange={e => set("service", e.target.value as ServiceId)}>
                {BOOKING_SERVICES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select></div>
            <div className="field"><label htmlFor="f-name">Prénom et nom</label>
              <input id="f-name" autoComplete="name" value={f.name} onChange={e => set("name", e.target.value)} aria-invalid={!!err.name} /><Err k="name" /></div>
            <div className="field"><label htmlFor="f-phone">Téléphone</label>
              <input id="f-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+213 …" value={f.phone} onChange={e => set("phone", e.target.value)} aria-invalid={!!err.phone} /><Err k="phone" /></div>
            <div className="row2">
              <div className="field"><label htmlFor="f-date">Date souhaitée</label>
                <input id="f-date" type="date" min={todayStr()} value={f.date} onChange={e => set("date", e.target.value)} aria-invalid={!!err.date} /><Err k="date" /></div>
              <div className="field"><label htmlFor="f-time">Créneau préféré</label>
                <select id="f-time" value={f.time} onChange={e => set("time", e.target.value)} aria-invalid={!!err.time}>
                  <option value="">Choisir…</option>{TIME_SLOTS.map(t => <option key={t}>{t}</option>)}</select><Err k="time" /></div>
            </div>

            {f.service === "balayage" && (
              <fieldset className="cond"><legend>Votre projet cheveux</legend>
                <div className="field"><label htmlFor="f-history">État actuel / historique de vos cheveux</label>
                  <textarea id="f-history" rows={2} value={f.history} onChange={e => set("history", e.target.value)} aria-invalid={!!err.history} /><Err k="history" /></div>
                <div className="field"><label htmlFor="f-prev">Balayage ou coloration déjà réalisés ?</label>
                  <select id="f-prev" value={f.prev} onChange={e => set("prev", e.target.value)}><option value="">Non précisé</option><option>Oui</option><option>Non</option></select></div>
                <div className="field"><label htmlFor="f-treatments">Henné, lissage ou autres traitements <em>(optionnel)</em></label>
                  <input id="f-treatments" value={f.treatments} onChange={e => set("treatments", e.target.value)} /></div>
                <div className="field"><label htmlFor="f-desired">Résultat souhaité</label>
                  <textarea id="f-desired" rows={2} value={f.desired} onChange={e => set("desired", e.target.value)} aria-invalid={!!err.desired} /><Err k="desired" /></div>
                <div className="row2">
                  <div className="field"><label htmlFor="f-hair">Photo de vos cheveux actuels</label>
                    <input id="f-hair" type="file" accept="image/*" onChange={e => setHair(Array.from(e.target.files ?? []).map(x => x.name))} /></div>
                  <div className="field"><label htmlFor="f-insp">Photo d&apos;inspiration</label>
                    <input id="f-insp" type="file" accept="image/*" onChange={e => setInsp(Array.from(e.target.files ?? []).map(x => x.name))} /></div>
                </div>
                <p className="hint">Ces photos ne peuvent pas être jointes automatiquement : vous les ajouterez vous-même dans WhatsApp, avant d&apos;envoyer le message.</p>
              </fieldset>
            )}

            {f.service === "nails" && (
              <fieldset className="cond"><legend>Type de prestation</legend>
                <div className="checks">{NAIL_OPTIONS.map(o => (
                  <label key={o} className={f.nails.includes(o) ? "on" : ""}><input id={o === NAIL_OPTIONS[0] ? "f-nails" : undefined} type="checkbox" checked={f.nails.includes(o)}
                    onChange={() => set("nails", f.nails.includes(o) ? f.nails.filter(x => x !== o) : [...f.nails, o])} />{o}</label>))}</div>
                <Err k="nails" />
              </fieldset>
            )}

            <div className="field"><label htmlFor="f-notes">Informations complémentaires <em>(optionnel)</em></label>
              <textarea id="f-notes" rows={2} value={f.notes} onChange={e => set("notes", e.target.value)} /></div>

            <div className="actions">
              <button type="button" className="btn ghost" onClick={() => setStep(1)}>Retour</button>
              <button type="submit" className="btn wa" disabled={sending}>{sending ? "Préparation du message…" : "Envoyer via WhatsApp"}</button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="bk-body done">
            {f.service === "balayage" && (
              <div className="remind"><strong>N&apos;oubliez pas vos photos.</strong> Dans WhatsApp, appuyez sur le trombone (ou « + ») et joignez
                {hair.length ? ` « ${hair[0]} »` : " la photo de vos cheveux actuels"}{insp.length ? ` ainsi que « ${insp[0]} »` : " et votre photo d'inspiration"} avant d&apos;envoyer.</div>
            )}
            <p>WhatsApp s&apos;est ouvert avec votre demande. Relisez-la puis appuyez sur envoyer. Si rien ne s&apos;est ouvert, utilisez le bouton ci-dessous.</p>
            <pre className="preview">{msg}</pre>
            <div className="actions col">
              <a className="btn wa" href={waUrl} target="_blank" rel="noopener noreferrer">Ouvrir WhatsApp</a>
              <button className="btn ghost" onClick={copy}>{copied ? "Message copié ✓" : "Copier le message"}</button>
              <button className="btn ghost" onClick={() => setStep(2)}>Modifier ma demande</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
