import midia from "./midia.json";

type Arquivo = { src: string; w: number; h: number };

const fotos = midia.fotos as Record<string, Arquivo>;
const capas = midia.capas as Record<string, Arquivo>;

/** Foto de carrossel ou cartaz publicada pela academia. */
export function foto(id: string): Arquivo {
  const arquivo = fotos[id];
  if (!arquivo) throw new Error(`Foto não encontrada: ${id}`);
  return arquivo;
}

/** Capa vertical de um reel, pelo código do post. */
export function capa(codigo: string): Arquivo {
  const arquivo = capas[codigo];
  if (!arquivo) throw new Error(`Capa não encontrada: ${codigo}`);
  return arquivo;
}
