"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ENSO } from "@/components/marca/caminhos";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { marca } from "@/content/marca";

let aberturaJaTocou = false;

/** Arco que acompanha o sentido real da pincelada: nasce no borrão de baixo e termina no rastro seco. */
function arcoDaPincelada() {
  const inicio = (85 * Math.PI) / 180;
  const fim = (440 * Math.PI) / 180;
  const ponto = (a: number) =>
    `${(ENSO.cx + ENSO.raio * Math.cos(a)).toFixed(2)} ${(ENSO.cy + ENSO.raio * Math.sin(a)).toFixed(2)}`;
  return `M${ponto(inicio)}A${ENSO.raio} ${ENSO.raio} 0 1 1 ${ponto(fim)}`;
}

const SAIDA = [0.16, 1, 0.3, 1] as const;
const LINHAS = ["Treine.", "Evolua.", "Supere-se."];

export function Abertura() {
  const reduzir = useReducedMotion();
  const [primeira] = useState(() => !aberturaJaTocou);
  const animar = primeira && !reduzir;

  useEffect(() => {
    aberturaJaTocou = true;
  }, []);

  return (
    <section className="abertura" aria-label="Abertura">
      {primeira && (
        <style>{`@media (prefers-reduced-motion:no-preference){[data-cabecalho]{animation:surgir-cabecalho .6s 2.5s both}}`}</style>
      )}
      <noscript>
        <style>{`.abertura [style]{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      <motion.div
        className="pointer-events-none"
        initial={animar ? { opacity: 0, x: "-8%" } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.05, duration: 0.5, ease: SAIDA }}
      >
        <Image src="/midia/marca/pincel-canto.webp" alt="" width={504} height={525} className="abertura-pincel" />
      </motion.div>

      <div className="abertura-figura" aria-hidden="true">
        <motion.div
          className="abertura-circulo"
          initial={animar ? { scale: 0.3, opacity: 0 } : false}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.8, ease: SAIDA }}
        >
          <Image
            src="/midia/hero/fundo.webp"
            alt=""
            width={1200}
            height={1600}
            sizes="60vw"
            quality={75}
            preload
            className="[filter:grayscale(1)_contrast(1.2)_brightness(.82)]"
          />
          <span className="absolute inset-0 bg-belt mix-blend-multiply" />
        </motion.div>

        <svg className="abertura-enso" viewBox={`0 0 ${ENSO.largura} ${ENSO.altura}`}>
          <defs>
            <mask id="pincelada" maskUnits="userSpaceOnUse" x="0" y="0" width={ENSO.largura} height={ENSO.altura}>
              <motion.path
                d={arcoDaPincelada()}
                fill="none"
                stroke="#fff"
                strokeWidth={104}
                initial={animar ? { pathLength: 0 } : false}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.25, duration: 1.25, ease: [0.6, 0.02, 0.22, 1] }}
              />
            </mask>
          </defs>
          <path d={ENSO.d} fill="currentColor" fillRule="evenodd" mask="url(#pincelada)" />
        </svg>

        <motion.div
          className="abertura-atleta"
          initial={animar ? { opacity: 0, y: "8%", scale: 1.05 } : false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.55, duration: 0.6, ease: SAIDA }}
        >
          <Image
            src="/midia/hero/atleta.webp"
            alt=""
            width={1200}
            height={1600}
            sizes="(max-width: 896px) 106vw, 60vw"
            quality={85}
            preload
            className="h-full w-full"
          />
        </motion.div>
      </div>

      <div className="abertura-conteudo moldura relative z-10 flex flex-col pb-6 md:pb-12">
        <h1 className="cartaz abertura-titulo">
          <span className="sr-only">{marca.lema.texto} Black Belt Center, estúdio de lutas em Barra Mansa.</span>
          <span aria-hidden="true">
            {LINHAS.map((linha, i) => (
              <span key={linha} className="block overflow-hidden pb-[0.02em]">
                <motion.span
                  className="block origin-bottom-left"
                  initial={animar ? { y: "108%", skewY: 5 } : false}
                  animate={{ y: 0, skewY: 0 }}
                  transition={{ delay: 1.8 + i * 0.12, duration: 0.62, ease: SAIDA }}
                >
                  {linha}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <motion.div
          initial={animar ? { opacity: 0, y: 16 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.35, duration: 0.5, ease: SAIDA }}
        >
          <p className="mt-4 leading-snug md:hidden">
            Seis lutas no Centro de Barra Mansa, para adultos, crianças e mulheres.
          </p>
          <p className="texto-corrido mt-5 hidden max-w-[30rem] md:block">
            Karatê, jiu-jitsu, muay thai, boxe, krav maga e taekwondo no Centro de Barra Mansa. Turmas para adultos,
            para crianças a partir de 3 anos e só para mulheres.
          </p>
          <div className="mt-5 flex items-center gap-2.5 md:mt-6 md:gap-3">
            <BotaoWhatsapp className="botao botao-belt max-sm:hidden" />
            <BotaoWhatsapp rotulo="Agendar aula" className="botao botao-belt whitespace-nowrap !px-5 sm:hidden" />
            <Link href="/horarios" className="botao botao-linha whitespace-nowrap text-branco max-sm:!px-5">
              Ver horários
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
