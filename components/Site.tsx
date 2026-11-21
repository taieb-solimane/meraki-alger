"use client";
import { useCallback, useEffect, useState } from "react";
import Photo from "./Photo";
import Booking from "./Booking";
import { SITE, CATEGORIES, ServiceId } from "@/lib/config";

const NAV = [["Accueil", "#accueil"], ["Nos prestations", "#prestations"], ["Notre univers", "#univers"], ["Contact", "#contact"]];
const TRUST = [
  ["Un espace privé", "Un salon exclusivement dédié aux femmes, pour vous accueillir dans la discrétion et le confort."],
  ["Stérilisation à l'autoclave", "Un engagement d'hygiène concret : les instruments sont stérilisés à l'autoclave."],
  ["Une attention personnalisée", "Chaque venue commence par l'écoute de vos envies, de votre histoire et de votre style."],
  ["Un savoir-faire professionnel", "Cheveux, ongles, peau, corps et maquillage : des prestations réalisées avec exigence."],
];

export default function Site() {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<ServiceId | "">("");
  const [menu, setMenu] = useState(false);
  const [solid, setSolid] = useState(false);

  const book = useCallback((s: ServiceId | "" = "") => { setMenu(false); setPreset(s); setOpen(true); }, []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on(); window.addEventListener("scroll", on, { passive: true });
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
    document.querySelectorAll(".rv").forEach(el => io.observe(el));
    return () => { window.removeEventListener("scroll", on); io.disconnect(); };
  }, []);
  useEffect(() => { document.body.style.overflow = menu ? "hidden" : ""; }, [menu]);

  return (
    <>
      <a className="skip" href="#main">Aller au contenu</a>
      <header className={`nav ${solid || menu ? "solid" : ""}`}>
        <a href="#accueil" className="logo" aria-label="Meraki Alger, accueil">Meraki<sup>Alger</sup></a>
        <nav className="links" aria-label="Navigation principale">{NAV.map(([l, h]) => <a key={h} href={h}>{l}</a>)}</nav>
        <button className="btn dark sm cta-d" onClick={() => book()}>Prendre rendez-vous</button>
        <button className={`burger ${menu ? "on" : ""}`} aria-label={menu ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={menu} onClick={() => setMenu(!menu)}><i /><i /></button>
      </header>
      <div className={`drawer ${menu ? "open" : ""}`} aria-hidden={!menu}>
        {NAV.map(([l, h], i) => <a key={h} href={h} onClick={() => setMenu(false)} style={{ transitionDelay: `${i * 60}ms` }}>{l}</a>)}
        <button className="btn dark" onClick={() => book()}>Prendre rendez-vous</button>
        <p>{SITE.location} · {SITE.phoneDisplay}</p>
      </div>

      <main id="main">
        <section id="accueil" className="hero">
          <div className="hero-txt">
            <p className="eyebrow rv">Salon privé · Femmes uniquement · Hydra</p>
            <h1 className="rv">La beauté, dans toute sa <em>singularité.</em></h1>
            <p className="lead rv">Un espace privé dédié à la beauté, au bien-être et à l&apos;art de prendre soin de soi.</p>
            <div className="btns rv">
              <button className="btn dark" onClick={() => book()}>Prendre rendez-vous</button>
              <a className="btn line" href="#prestations">Découvrir nos prestations</a>
            </div>
          </div>
          <div className="hero-img">
            <Photo name="hero" alt="Balayage blond lumineux" className="arch" pos="50% 25%" />
            <div className="badge"><span>Blonde &amp; Balayage</span><b>Spécialiste</b></div>
          </div>
        </section>

        <div className="strip" aria-hidden><span>Cheveux</span><i>✦</i><span>Ongles</span><i>✦</i><span>Visage</span><i>✦</i><span>Corps</span><i>✦</i><span>Mariée</span></div>

        <section id="univers" className="about">
          <div className="about-img">
            <Photo name="universe" alt="L'univers Meraki" className="a1 rv" />
          </div>
          <div className="about-txt">
            <p className="eyebrow rv">Notre univers</p>
            <h2 className="rv">Meraki : faire les choses avec <em>âme</em>, créativité et amour.</h2>
            <p className="rv">Bienvenue chez Meraki, un salon privé exclusivement dédié aux femmes, où chaque détail est pensé pour vous offrir un moment de beauté et de bien-être.</p>
            <p className="rv">Ici, on prend le temps de vous écouter. Votre venue est un rendez-vous personnel, dans un cadre calme, chaleureux et soigneusement entretenu, avec des instruments stérilisés à l&apos;autoclave.</p>
            <a className="tlink rv" href="#contact">Échanger avec nous →</a>
          </div>
        </section>

        <section id="prestations" className="services">
          <div className="sec-head">
            <p className="eyebrow rv">Nos prestations</p>
            <h2 className="rv">Cinq univers, <em>une même exigence.</em></h2>
          </div>
          {CATEGORIES.map((c, i) => (
            <article key={c.id} className="svc">
              <div className="svc-txt rv">
                <span className="num">{c.n}<small>{c.en}</small></span>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <ul>{c.items.map(it => <li key={it}>{it}</li>)}</ul>
                <button className="tlink" onClick={() => book(c.id)}>Demander ce service →</button>
              </div>
            </article>
          ))}
        </section>

        <section className="balayage" id="balayage">
          <div className="b-txt">
            <p className="eyebrow rv">Signature</p>
            <h2 className="rv">Le blond, <em>sur mesure.</em></h2>
            <p className="rv">Chaque chevelure est unique. Chez Meraki, votre projet de balayage commence par une première évaluation personnalisée afin de mieux comprendre vos envies et l&apos;historique de vos cheveux.</p>
            <ol className="rv">
              <li><b>Vous nous racontez</b> l&apos;histoire de vos cheveux et le résultat rêvé.</li>
              <li><b>Vous joignez vos photos</b> dans WhatsApp pour nous aider à mieux vous conseiller.</li>
              <li><b>Nous revenons vers vous</b> pour la suite de votre projet.</li>
            </ol>
            <button className="btn light rv" onClick={() => book("balayage")}>Demander un pré-diagnostic</button>
          </div>
        </section>

        <section className="trust">
          <div className="sec-head"><p className="eyebrow rv">Hygiène &amp; expertise</p><h2 className="rv">Prendre soin de vous, <em>en toute sérénité.</em></h2></div>
          <div className="trust-grid">{TRUST.map(([t, d]) => <div key={t} className="rv"><h3>{t}</h3><p>{d}</p></div>)}</div>
        </section>

        <section id="contact" className="contact">
          <div>
            <p className="eyebrow rv">Contact</p>
            <h2 className="rv">Réservez votre <em>moment</em> Meraki.</h2>
            <p className="rv">Les rendez-vous se prennent par WhatsApp ou par téléphone. Préparez votre demande en quelques instants, nous la recevrons directement.</p>
            <button className="btn dark rv" onClick={() => book()}>Prendre rendez-vous</button>
          </div>
          <ul className="coords rv">
            <li><span>Adresse</span><a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">{SITE.location} <small>Google Maps ↗</small></a></li>
            <li><span>Téléphone</span><a href={`tel:+${SITE.whatsappNumber}`}>{SITE.phoneDisplay}</a></li>
            <li><span>WhatsApp</span><a href={`https://wa.me/${SITE.whatsappNumber}`} target="_blank" rel="noopener noreferrer">Écrire sur WhatsApp</a></li>
            <li><span>Instagram</span><a href={SITE.instagram} target="_blank" rel="noopener noreferrer">@merakimaisondebeaute</a></li>
          </ul>
        </section>
      </main>

      <footer className="foot">
        <a className="logo" href="#accueil" aria-label="Retourner en haut">Meraki<sup>Alger</sup></a>
        <p>
          {SITE.tagline} ·{" "}
          <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">{SITE.location} · Ouvrir Maps ↗</a>
          {" "}· Salon privé pour femmes
        </p>
        <p className="small">© {new Date().getFullYear()} Meraki Alger. Tous droits réservés.</p>
      </footer>

      <button className="fab" onClick={() => book()} aria-label="Prendre rendez-vous">Prendre rendez-vous</button>
      <Booking open={open} preset={preset} onClose={close} />
    </>
  );
}
