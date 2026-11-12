import { BIO, LINKTREE, post, reel } from "./fontes";

/**
 * Dados institucionais encontrados no perfil, no Linktree e nos posts.
 * Links de contato: somente os que o próprio negócio publica.
 */
export const marca = {
  nome: "Black Belt Center",
  categoria: "Estúdio de Lutas",
  fonte: BIO,
  lema: { texto: "Treine. Evolua. Supere-se.", fonte: reel("DdeeozsxxYI", "2026-09-19") },
  chamada: { texto: "Agende sua aula experimental", fonte: BIO },
  instagram: {
    usuario: "@blackbelt_center",
    url: "https://www.instagram.com/blackbelt_center/",
  },
  whatsapp: {
    numero: "5524999699921",
    exibicao: "(24) 99969-9921",
    fonte: LINKTREE,
  },
  avaliacao: {
    url: "https://g.page/r/CRQ6LJBc7uQ7EBM/review",
    fonte: LINKTREE,
  },
  email: {
    endereco: "blackbeltcenter.bm@gmail.com",
    fonte: reel("DU-u1CdES1b", "2026-02-20"),
  },
  endereco: {
    linha: "R. São Sebastião, 161",
    bairro: "Centro",
    cidade: "Barra Mansa",
    uf: "RJ",
    completo: "R. São Sebastião, 161, Centro, Barra Mansa, RJ",
    lat: -22.5457674,
    lng: -44.1729313,
    mapa: "https://www.google.com/maps/search/?api=1&query=-22.5457674%2C-44.1729313",
    mapaEmbed: "https://www.google.com/maps?q=-22.5457674,-44.1729313&z=17&output=embed",
    fonte: LINKTREE,
  },
  totalpass: {
    categoria: "TP3",
    vigencia: "2026-06-15",
    texto: "Fazemos parte da categoria TP3 do TotalPass desde 15 de junho de 2026.",
    fonte: post("DYaPytWRsx6", "2026-05-16"),
  },
} as const;

export function linkWhatsapp(mensagem: string): string {
  return `https://wa.me/${marca.whatsapp.numero}?text=${encodeURIComponent(mensagem)}`;
}

export const MENSAGEM_PADRAO =
  "Olá! Vim pelo site e quero agendar uma aula experimental na Black Belt Center.";
