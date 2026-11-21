"use client";
import { useState } from "react";

/** Affiche /public/images/<name>.jpg. Si le fichier est absent, un fond tonal élégant s'affiche à la place. */
export default function Photo({ name, alt, className = "", pos = "center" }: { name: string; alt: string; className?: string; pos?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`photo ${className}`}>
      {failed ? <div className="ph" role="img" aria-label={alt}><span>{alt}</span></div> : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`/images/${name}.jpg`} alt={alt} loading="lazy" decoding="async" style={{ objectPosition: pos }} onError={() => setFailed(true)} />
      )}
    </div>
  );
}
