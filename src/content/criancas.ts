import { reel } from "./fontes";

/** Turmas infantis, com as palavras das publicações da academia. */
export const programasInfantis = [
  {
    id: "karate-baby",
    nome: "Karatê Baby",
    texto: "Estimula a coordenação motora, o equilíbrio, a concentração e a socialização, tudo de forma lúdica e divertida.",
    recorte: "/midia/recortes/karate-baby.webp",
    recorteLargura: 947,
    recorteAltura: 931,
    alt: "Professora de Karatê Baby com duas medalhas no pescoço",
    fonte: reel("DfVJ8M-OTWd", "2026-11-04"),
  },
  {
    id: "karate-infantil",
    nome: "Karatê Infantil",
    texto: "Concentração, coordenação, disciplina, respeito e autoconfiança, de forma dinâmica e divertida.",
    recorte: "/midia/recortes/karate-infantil.webp",
    recorteLargura: 1050,
    recorteAltura: 921,
    alt: "Sensei de karatê com duas alunas em posição de golpe",
    fonte: reel("DdohsIYxgzS", "2026-09-23"),
  },
  {
    id: "jiu-jitsu-infantil",
    nome: "Jiu-Jitsu Infantil",
    texto: "Disciplina, concentração, respeito, confiança e autocontrole, de forma divertida e saudável.",
    recorte: "/midia/recortes/jiu-jitsu-infantil-turma.webp",
    recorteLargura: 593,
    recorteAltura: 633,
    alt: "Professor de jiu-jitsu de quimono preto ensinando uma técnica para crianças de quimono azul e branco",
    fonte: reel("DeNMhcQJYal", "2026-10-07"),
  },
  {
    id: "muay-thai-infantil",
    nome: "Muay Thai Infantil",
    texto: "Concentração, confiança e respeito, sempre com acompanhamento e metodologia pensada para os pequenos.",
    recorte: "/midia/recortes/muay-thai-infantil.webp",
    recorteLargura: 1050,
    recorteAltura: 814,
    alt: "Professora de Muay Thai com manoplas e aluna de luvas rosa",
    fonte: reel("Ddt8fQyRcq9", "2026-09-25"),
  },
] as const;

export const frasesInfantis = {
  titulo: { texto: "Grandes campeões começam pequenos.", fonte: reel("DUtvXECEbhT", "2026-02-13") },
  provocacao: {
    texto: "Enquanto uns estão “farmando aura”, outros estão construindo disciplina, respeito e confiança.",
    fonte: reel("DbwQdh0RtvA", "2026-08-07"),
  },
  valores: {
    texto: "Aqui, a gente não ensina só karatê. A gente ajuda seu filho a se tornar uma criança mais segura, focada e respeitosa.",
    fonte: reel("DZ5t4fsx9-8", "2026-06-22"),
  },
};
