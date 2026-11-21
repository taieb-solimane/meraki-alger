# Meraki Alger — site vitrine + demande de rendez-vous WhatsApp

Next.js 14 (App Router) · TypeScript · CSS pur · aucune dépendance superflue · aucun backend.

## Lancer en local
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # test de production
```

## Changer le numéro WhatsApp
Un seul endroit : `lib/config.ts` → `SITE.whatsappNumber` (format international sans « + », ex. `213551863548`).

## Photographies
Déposez vos images dans `public/images/` (JPG, ~1600 px de large, < 400 Ko) avec ces noms exacts :
`hero, about-1, about-2, hair, nails, skin, body, bridal, balayage`.
Tant qu'un fichier est absent, un fond tonal élégant s'affiche (rien n'est cassé).
Idéalement, utilisez de vraies photos du salon (Instagram, avec l'accord de la propriétaire) ou des images libres (Unsplash/Pexels).

## Déployer sur Vercel
1. Poussez le dossier sur GitHub.
2. Sur vercel.com → *Add New Project* → importez le dépôt (Next.js détecté automatiquement).
3. *Deploy*. Aucune variable d'environnement requise.

## Notes
- Les photos téléversées dans le formulaire ne peuvent pas être jointes à un lien WhatsApp : le client est invité à les ajouter manuellement avant d'envoyer.
- Aucune adresse précise, aucun prix, aucun horaire n'ont été inventés : à compléter par le salon (`components/Site.tsx`, section Contact).
