/** Origem de uma informação publicada. Toda informação real do site aponta para uma destas. */
export type Fonte = {
  origem: "post" | "reel" | "destaque" | "bio" | "linktree";
  /** Data da publicação de origem, em AAAA-MM-DD. */
  data: string;
  codigo?: string;
  url?: string;
};

/** 1 = segunda ... 6 = sábado. A grade publicada não tem aulas no domingo. */
export type DiaSemana = 1 | 2 | 3 | 4 | 5 | 6;

export type Publico = "adulto" | "infantil" | "feminino";

export type SlugModalidade =
  | "karate"
  | "jiu-jitsu"
  | "muay-thai"
  | "boxe"
  | "krav-maga"
  | "taekwondo";

export type BlocoHorario = { dias: DiaSemana[]; horas: string[] };

export type Turma = {
  id: string;
  modalidade: SlugModalidade;
  nome: string;
  publico: Publico;
  idade?: string;
  professor?: string;
  blocos: BlocoHorario[];
  observacao?: string;
  fonte: Fonte;
};

export type Ponto = { titulo: string; texto: string; fonte: Fonte };

export type Modalidade = {
  slug: SlugModalidade;
  nome: string;
  frase: string;
  fraseFonte: Fonte;
  resumo: string;
  resumoFonte: Fonte;
  aviso?: { texto: string; fonte: Fonte };
  destaque?: { texto: string; fonte: Fonte };
  pontos: Ponto[];
  equipe?: { texto: string; fonte: Fonte };
  ensina?: { nome: string; papel: string; fonte: Fonte }[];
  recorte: string;
  recorteLargura: number;
  recorteAltura: number;
  foto: string;
  fotoAlt: string;
  clipe: string;
  clipeCapa: string;
};

export type ItemMural = {
  codigo: string;
  url: string;
  data: string;
  resumo: string;
  legenda: string;
  categorias: string[];
  capa: string;
  w: number;
  h: number;
};

export type Evento = {
  id: string;
  titulo: string;
  local?: string;
  quando: string;
  texto: string;
  fonte: Fonte;
  foto?: { src: string; alt: string; w: number; h: number };
};
