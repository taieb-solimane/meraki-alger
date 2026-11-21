/** ====== CONFIGURATION CENTRALE ======
 * Changez le numéro ici (format international, sans + ni espaces). */
export const SITE = {
  name: "Meraki Alger",
  tagline: "Beauté & Bien-Être",
  whatsappNumber: "213551863548",
  phoneDisplay: "+213 551 86 35 48",
  instagram: "https://www.instagram.com/merakimaisondebeaute/",
  location: "Hydra, Alger",
};

export type ServiceId = "balayage" | "hair" | "nails" | "skin" | "body" | "bridal";

export const BOOKING_SERVICES: { id: ServiceId; label: string }[] = [
  { id: "balayage", label: "Balayage & Coloration" },
  { id: "hair", label: "Coiffure" },
  { id: "nails", label: "Ongles" },
  { id: "skin", label: "Soins du visage" },
  { id: "body", label: "Soins du corps" },
  { id: "bridal", label: "Maquillage de mariée" },
];

export const CATEGORIES: { id: ServiceId; n: string; en: string; title: string; desc: string; items: string[]; img: string }[] = [
  { id: "hair", n: "01", en: "Hair", title: "Cheveux", img: "hair",
    desc: "Du balayage lumineux au coiffage soigné, chaque geste est pensé pour révéler la nature de votre chevelure.",
    items: ["Balayage", "Coloration", "Soins capillaires", "Coiffage"] },
  { id: "nails", n: "02", en: "Nails", title: "Ongles", img: "nails",
    desc: "Une main experte pour des ongles impeccables, du soin essentiel à la création la plus délicate.",
    items: ["Soin des ongles", "Gel sur ongles naturels", "Extensions", "Nail art", "French manucure"] },
  { id: "skin", n: "03", en: "Skin", title: "Visage", img: "skin",
    desc: "Des soins du visage attentifs, pour une peau apaisée et un teint qui respire.",
    items: ["Soins de la peau", "Soins beauté"] },
  { id: "body", n: "04", en: "Body", title: "Corps", img: "body",
    desc: "Une parenthèse de détente, loin du rythme du quotidien, pour prendre soin de soi en profondeur.",
    items: ["Soins du corps", "Détente & bien-être"] },
  { id: "bridal", n: "05", en: "Bridal", title: "Maquillage de mariée", img: "bridal",
    desc: "Un maquillage pensé pour vous ressembler, le jour où tous les regards se posent sur vous.",
    items: ["Maquillage de mariée", "Maquillage"] },
];

export const NAIL_OPTIONS = ["Soin des ongles", "Gel sur ongles naturels", "Extensions", "Nail art / décoration", "Autre"];
export const TIME_SLOTS = ["Matin", "Midi / début d'après-midi", "Fin d'après-midi", "Je suis flexible"];
