import type { Fonte } from "./tipos";

/** Monta a referência de um post do Instagram guardando a data de publicação. */
export function post(codigo: string, data: string): Fonte {
  return { origem: "post", codigo, data, url: `https://www.instagram.com/p/${codigo}/` };
}

export function reel(codigo: string, data: string): Fonte {
  return { origem: "reel", codigo, data, url: `https://www.instagram.com/reel/${codigo}/` };
}

export const BIO: Fonte = {
  origem: "bio",
  data: "2026-11-09",
  url: "https://www.instagram.com/blackbelt_center/",
};

export const LINKTREE: Fonte = {
  origem: "linktree",
  data: "2026-11-09",
  url: "https://linktr.ee/blackbeltc",
};
