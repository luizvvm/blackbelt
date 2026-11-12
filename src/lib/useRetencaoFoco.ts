import { type RefObject, useEffect } from "react";

const FOCAVEIS = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/** Mantém o Tab dentro de um diálogo aberto. */
export function useRetencaoFoco(container: RefObject<HTMLElement | null>, ativo: boolean) {
  useEffect(() => {
    if (!ativo) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !container.current) return;
      const itens = [...container.current.querySelectorAll<HTMLElement>(FOCAVEIS)].filter((el) => el.offsetParent !== null);
      if (!itens.length) return;
      const primeiro = itens[0];
      const ultimo = itens[itens.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [ativo, container]);
}
