"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { Enso } from "@/components/marca/Enso";

export type LinhaChamada = {
  slug: string;
  nome: string;
  horas: string;
  clipe: string;
  capa: string;
};

/** A chamada das modalidades: passar o mouse ou tocar faz o treino ganhar movimento dentro do ensō. */
export function Chamada({ linhas }: { linhas: LinhaChamada[] }) {
  const [ativa, setAtiva] = useState<string | null>(null);
  const [aberta, setAberta] = useState<string | null>(null);
  const videos = useRef<Record<string, HTMLVideoElement | null>>({});
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const suaveX = useSpring(x, { stiffness: 320, damping: 32, mass: 0.6 });
  const suaveY = useSpring(y, { stiffness: 320, damping: 32, mass: 0.6 });

  function ativar(slug: string | null) {
    setAtiva(slug);
    Object.entries(videos.current).forEach(([chave, video]) => {
      if (!video) return;
      if (chave === slug) void video.play().catch(() => undefined);
      else video.pause();
    });
  }

  function mover(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    const metade = (document.querySelector<HTMLElement>(".janela-luta")?.offsetWidth ?? 320) / 2;
    x.set(e.clientX - metade);
    y.set(e.clientY - metade);
  }

  return (
    <section aria-labelledby="titulo-modalidades" className="bg-preto pb-24 pt-20 md:pb-36 md:pt-32">
      <h2 id="titulo-modalidades" className="sr-only">
        Modalidades
      </h2>
      <ul className="moldura" onPointerMove={mover} onPointerLeave={() => ativar(null)}>
        {linhas.map((linha) => {
          const apagada = ativa !== null && ativa !== linha.slug;
          const expandida = aberta === linha.slug;
          return (
            <li key={linha.slug} className="border-t border-branco/20 last:border-b">
              <div
                className="flex items-center justify-between gap-4"
                onPointerEnter={(e) => e.pointerType === "mouse" && ativar(linha.slug)}
              >
                <Link
                  href={`/modalidades/${linha.slug}`}
                  className={`cartaz block pt-[0.08em] text-[clamp(3.25rem,13vw,13rem)] transition-[color,opacity,transform] duration-200 ${
                    ativa === linha.slug ? "translate-x-[1.2vw] text-belt" : apagada ? "opacity-35" : ""
                  }`}
                >
                  {linha.nome}
                </Link>
                <div className="flex shrink-0 items-center gap-3">
                  <p className="hidden max-w-[14rem] text-right text-[0.95rem] leading-snug text-branco/80 lg:block">
                    {linha.horas}
                  </p>
                  <button
                    type="button"
                    onClick={() => setAberta(expandida ? null : linha.slug)}
                    aria-expanded={expandida}
                    aria-label={`${expandida ? "Fechar" : "Ver"} treino de ${linha.nome}`}
                    className="grid size-12 place-items-center rounded-full border border-branco/50 text-2xl font-light leading-none transition-colors hover:bg-branco hover:text-preto [@media(hover:hover)_and_(pointer:fine)]:hidden"
                  >
                    <span aria-hidden="true" className={`transition-transform duration-200 ${expandida ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                </div>
              </div>
              <AnimatePresence initial={false}>
                {expandida && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.3, 0, 0.2, 1] }}
                    className="overflow-hidden [@media(hover:hover)_and_(pointer:fine)]:hidden"
                  >
                    <div className="flex items-center gap-5 pb-6">
                      <video
                        src={linha.clipe}
                        poster={linha.capa}
                        muted
                        loop
                        autoPlay
                        playsInline
                        suppressHydrationWarning
                        aria-hidden="true"
                        className="size-32 shrink-0 rounded-full object-cover xs:size-40"
                      />
                      <div>
                        <p className="leading-snug">{linha.horas}</p>
                        <Link href={`/modalidades/${linha.slug}`} className="link-sublinhado mt-2 inline-block font-normal">
                          Conhecer {linha.nome}
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <motion.div
        className="janela-luta hidden [@media(hover:hover)_and_(pointer:fine)]:block"
        style={{ x: suaveX, y: suaveY }}
        initial={false}
        animate={{ opacity: ativa ? 1 : 0, scale: ativa ? 1 : 0.5, rotate: ativa ? 0 : -24 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        {linhas.map((linha) => (
          <video
            key={linha.slug}
            ref={(el) => {
              videos.current[linha.slug] = el;
            }}
            src={linha.clipe}
            poster={linha.capa}
            muted
            loop
            playsInline
            preload="none"
            suppressHydrationWarning
            className={ativa === linha.slug ? "opacity-100" : "opacity-0"}
          />
        ))}
        <Enso className="absolute inset-0 size-full text-branco" />
      </motion.div>
    </section>
  );
}
