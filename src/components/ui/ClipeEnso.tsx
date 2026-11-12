"use client";

import { useRef, useState } from "react";
import { Enso } from "@/components/marca/Enso";

/** Clipe real do treino que só toca quando a pessoa pede. */
export function ClipeEnso({ src, capa, rotulo, className = "" }: { src: string; capa: string; rotulo: string; className?: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);

  function alternar() {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      void v.play().then(() => setTocando(true)).catch(() => undefined);
    } else {
      v.pause();
      setTocando(false);
    }
  }

  return (
    <button
      type="button"
      onClick={alternar}
      aria-pressed={tocando}
      aria-label={`${tocando ? "Pausar" : "Assistir"} clipe do treino de ${rotulo}`}
      className={`group relative block aspect-square w-full text-branco ${className}`}
    >
      <video
        ref={video}
        src={src}
        poster={capa}
        muted
        loop
        playsInline
        preload="none"
        suppressHydrationWarning
        className="absolute inset-[9%] size-[82%] rounded-full object-cover"
      />
      <Enso className="absolute inset-0 size-full transition-transform duration-500 group-hover:rotate-12" />
      <span
        className={`pilula-dia absolute bottom-[12%] right-[6%] text-[0.98rem] transition-opacity ${tocando ? "opacity-0 group-hover:opacity-100" : ""}`}
      >
        {tocando ? "Pausar" : "Assistir o treino"}
      </span>
    </button>
  );
}
