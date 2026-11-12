"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ItemMural } from "@/content/tipos";
import { formatarData } from "@/lib/tempo";
import { useRetencaoFoco } from "@/lib/useRetencaoFoco";

const CATEGORIAS = [
  { id: "todos", rotulo: "Tudo" },
  { id: "karate", rotulo: "Karatê" },
  { id: "jiu-jitsu", rotulo: "Jiu-Jitsu" },
  { id: "muay-thai", rotulo: "Muay Thai" },
  { id: "boxe", rotulo: "Boxe" },
  { id: "krav-maga", rotulo: "Krav Maga" },
  { id: "taekwondo", rotulo: "Taekwondo" },
  { id: "criancas", rotulo: "Crianças" },
  { id: "competicao", rotulo: "Competição" },
  { id: "nutricao", rotulo: "Nutrição" },
  { id: "comunidade", rotulo: "Comunidade" },
];

const PROPORCOES = ["aspect-[9/16]", "aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[9/14]"];
const POR_PAGINA = 28;

function proporcao(codigo: string) {
  let soma = 0;
  for (const letra of codigo) soma += letra.charCodeAt(0);
  return PROPORCOES[soma % PROPORCOES.length];
}

export function Mural({ itens }: { itens: ItemMural[] }) {
  const [categoria, setCategoria] = useState("todos");
  const [limite, setLimite] = useState(POR_PAGINA);
  const [aberto, setAberto] = useState<number | null>(null);
  const fechar = useRef<HTMLButtonElement>(null);
  const origem = useRef<HTMLElement | null>(null);

  const filtrados = useMemo(
    () => (categoria === "todos" ? itens : itens.filter((i) => i.categorias.includes(categoria))),
    [categoria, itens],
  );
  const visiveis = filtrados.slice(0, limite);
  const atual = aberto === null ? null : filtrados[aberto];
  const emAberto = aberto !== null;
  const dialogo = useRef<HTMLDivElement>(null);
  useRetencaoFoco(dialogo, emAberto);

  useEffect(() => {
    if (!emAberto) return;
    document.body.style.overflow = "hidden";
    fechar.current?.focus();
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberto(null);
      if (e.key === "ArrowRight") setAberto((a) => (a === null ? a : Math.min(a + 1, filtrados.length - 1)));
      if (e.key === "ArrowLeft") setAberto((a) => (a === null ? a : Math.max(a - 1, 0)));
    };
    window.addEventListener("keydown", aoTeclar);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", aoTeclar);
      origem.current?.focus();
    };
  }, [emAberto, filtrados.length]);

  return (
    <>
      <div className="moldura">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar publicações">
          {CATEGORIAS.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={categoria === c.id}
              onClick={() => {
                setCategoria(c.id);
                setLimite(POR_PAGINA);
              }}
              className={`min-h-11 rounded-full px-5 text-[0.98rem] font-normal transition-colors ${
                categoria === c.id ? "bg-belt text-branco" : "text-branco shadow-[inset_0_0_0_1.5px_rgb(251_251_251/0.35)] hover:bg-branco hover:text-preto"
              }`}
            >
              {c.rotulo}
            </button>
          ))}
        </div>
        <p className="mt-4 text-[0.95rem] text-branco/75" aria-live="polite">
          {filtrados.length} {filtrados.length === 1 ? "publicação" : "publicações"}
        </p>
      </div>

      <ul className="mt-6 columns-2 gap-1.5 px-1.5 md:columns-3 xl:columns-5">
        {visiveis.map((item, i) => (
          <li key={item.codigo} className="mb-1.5 break-inside-avoid">
            <button
              type="button"
              onClick={(e) => {
                origem.current = e.currentTarget;
                setAberto(i);
              }}
              className="group relative block w-full overflow-hidden bg-parede text-left"
              aria-label={`Abrir publicação: ${item.resumo}`}
            >
              <div className={`relative ${proporcao(item.codigo)}`}>
                <Image
                  src={item.capa}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <span className="absolute inset-x-0 bottom-0 translate-y-full bg-belt p-3 text-[0.95rem] leading-snug text-branco transition-transform duration-200 group-hover:translate-y-0 group-focus-visible:translate-y-0">
                {item.resumo}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {limite < filtrados.length && (
        <div className="moldura mt-10 flex justify-center">
          <button type="button" onClick={() => setLimite((l) => l + POR_PAGINA)} className="botao botao-linha text-branco">
            Ver mais publicações
          </button>
        </div>
      )}

      <AnimatePresence>
        {atual && (
          <motion.div
            ref={dialogo}
            role="dialog"
            aria-modal="true"
            aria-label="Publicação do Instagram"
            className="fixed inset-0 z-[70] flex items-stretch justify-center bg-preto/95 md:items-center md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setAberto(null);
            }}
          >
            <motion.div
              className="grid w-full max-w-5xl grid-rows-[minmax(0,1fr)_auto] overflow-y-auto bg-preto md:max-h-[92svh] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:grid-rows-1"
              initial={{ y: 28 }}
              animate={{ y: 0 }}
              exit={{ y: 28 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative min-h-[45svh] bg-parede md:min-h-[80svh]">
                <Image src={atual.capa} alt={atual.resumo} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain" />
              </div>
              <div className="flex flex-col p-5 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-normal">{formatarData(atual.data)}</p>
                  <button ref={fechar} type="button" onClick={() => setAberto(null)} className="botao botao-linha !min-h-11 !px-5 text-[0.95rem] text-branco">
                    Fechar
                  </button>
                </div>
                <p className="mt-5 whitespace-pre-line text-[1.02rem] leading-relaxed md:max-h-[58svh] md:overflow-y-auto md:pr-3">{atual.legenda}</p>
                <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
                  <a href={atual.url} target="_blank" rel="noopener noreferrer" className="botao botao-belt">
                    Ver no Instagram
                  </a>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={aberto === 0}
                      onClick={() => setAberto((a) => (a === null ? a : a - 1))}
                      className="botao botao-linha !min-h-11 !px-4 text-[0.95rem] text-branco disabled:opacity-30"
                    >
                      Anterior
                    </button>
                    <button
                      type="button"
                      disabled={aberto === filtrados.length - 1}
                      onClick={() => setAberto((a) => (a === null ? a : a + 1))}
                      className="botao botao-linha !min-h-11 !px-4 text-[0.95rem] text-branco disabled:opacity-30"
                    >
                      Próxima
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
