"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Enso, Nome } from "@/components/marca/Enso";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { useRetencaoFoco } from "@/lib/useRetencaoFoco";

const LINKS = [
  { href: "/modalidades", rotulo: "Modalidades" },
  { href: "/horarios", rotulo: "Horários" },
  { href: "/criancas", rotulo: "Crianças" },
  { href: "/mulheres", rotulo: "Mulheres" },
  { href: "/competicao", rotulo: "Competição" },
  { href: "/mural", rotulo: "Mural" },
  { href: "/planos", rotulo: "Planos" },
  { href: "/contato", rotulo: "Contato" },
];

function assinarRolagem(aviso: () => void) {
  window.addEventListener("scroll", aviso, { passive: true });
  return () => window.removeEventListener("scroll", aviso);
}

export function Cabecalho() {
  const caminho = usePathname();
  const rolou = useSyncExternalStore(
    assinarRolagem,
    () => window.scrollY > 32,
    () => false,
  );
  const [aberto, setAberto] = useState(false);
  const botaoFechar = useRef<HTMLButtonElement>(null);
  const botaoAbrir = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  useRetencaoFoco(menu, aberto);

  useEffect(() => {
    if (!aberto) return;
    document.body.style.overflow = "hidden";
    botaoFechar.current?.focus();
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberto(false);
    };
    window.addEventListener("keydown", aoTeclar);
    const abrir = botaoAbrir.current;
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", aoTeclar);
      abrir?.focus();
    };
  }, [aberto]);

  return (
    <>
      <header
        data-cabecalho
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${rolou || caminho !== "/" ? "bg-preto" : "bg-transparent"}`}
      >
        <div className="moldura flex h-[4.5rem] items-center justify-between gap-6">
          <Link href="/" aria-label="Black Belt Center, página inicial" className="block shrink-0 text-branco">
            <Nome className="h-11 w-auto" title="Black Belt Center" />
          </Link>
          <nav aria-label="Principal" className="hidden items-center gap-7 xl:flex">
            {LINKS.slice(0, 7).map((link) => {
              const atual = caminho === link.href || caminho.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={atual ? "page" : undefined}
                  className={`text-[0.95rem] font-normal transition-colors hover:text-belt ${atual ? "text-belt" : "text-branco"}`}
                >
                  {link.rotulo}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <BotaoWhatsapp rotulo="Agendar aula" className="botao botao-belt hidden !min-h-11 !px-5 text-[0.95rem] sm:inline-flex" />
            <button
              ref={botaoAbrir}
              type="button"
              onClick={() => setAberto(true)}
              aria-expanded={aberto}
              aria-controls="menu-tela"
              className="botao botao-linha !min-h-11 !px-5 text-[0.95rem] text-branco xl:!hidden"
            >
              Menu
            </button>
            <Link href="/contato" className="botao botao-linha hidden !min-h-11 !px-5 text-[0.95rem] text-branco xl:inline-flex">
              Contato
            </Link>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {aberto && (
          <motion.div
            ref={menu}
            id="menu-tela"
            role="dialog"
            aria-modal="true"
            aria-label="Menu do site"
            className="fixed inset-0 z-[60] overflow-y-auto bg-belt text-branco"
            initial={{ clipPath: "circle(0% at calc(100% - 4rem) 2.25rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 4rem) 2.25rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 4rem) 2.25rem)" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            <Enso className="pointer-events-none absolute -bottom-[12vw] -right-[12vw] w-[80vw] max-w-[50rem] text-faixa" />
            <div className="moldura relative flex min-h-full flex-col pb-8">
              <div className="flex h-[4.5rem] shrink-0 items-center justify-between">
                <Nome className="h-11 w-auto [--logo-belt:var(--color-preto)]" />
                <button
                  ref={botaoFechar}
                  type="button"
                  onClick={() => setAberto(false)}
                  className="botao botao-linha !min-h-11 !px-5 text-[0.95rem]"
                >
                  Fechar
                </button>
              </div>
              <nav aria-label="Menu" className="flex flex-1 flex-col justify-center py-6">
                {LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setAberto(false)}
                    aria-current={caminho === link.href ? "page" : undefined}
                    className="cartaz block w-fit text-[clamp(2.5rem,min(12vw,8.3svh),6rem)] transition-colors hover:text-preto"
                  >
                    {link.rotulo}
                  </Link>
                ))}
              </nav>
              <BotaoWhatsapp className="botao w-full bg-branco text-belt sm:w-fit" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
