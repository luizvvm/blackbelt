import { post, reel } from "./fontes";
import type { Turma } from "./tipos";

/**
 * Grade publicada pela academia. Cada turma usa o post mais recente encontrado.
 * Quando um destaque antigo divergia de um post mais novo, valeu o post.
 */
export const turmas: Turma[] = [
  {
    id: "karate-adulto",
    modalidade: "karate",
    nome: "Karatê",
    publico: "adulto",
    blocos: [
      { dias: [1, 3], horas: ["10:00"] },
      { dias: [2, 4], horas: ["06:00", "17:00"] },
      { dias: [1, 3, 5], horas: ["19:00"] },
    ],
    fonte: reel("DechmtrJFqI", "2026-10-13"),
  },
  {
    id: "karate-infantil",
    modalidade: "karate",
    nome: "Karatê Infantil",
    publico: "infantil",
    blocos: [
      { dias: [1, 3, 5], horas: ["18:00"] },
      { dias: [2, 4], horas: ["10:00"] },
    ],
    fonte: reel("DdohsIYxgzS", "2026-09-23"),
  },
  {
    id: "karate-baby",
    modalidade: "karate",
    nome: "Karatê Baby",
    publico: "infantil",
    idade: "3 a 6 anos",
    blocos: [{ dias: [2, 4], horas: ["18:00"] }],
    fonte: reel("DfVJ8M-OTWd", "2026-11-04"),
  },
  {
    id: "jiu-jitsu-adulto",
    modalidade: "jiu-jitsu",
    nome: "Jiu-Jitsu",
    publico: "adulto",
    blocos: [{ dias: [2, 4, 5], horas: ["20:00"] }],
    observacao: "Também temos turmas pela manhã com o instrutor Rene. Chame a gente no WhatsApp para saber o horário.",
    fonte: reel("Dd9eq9HR6hn", "2026-10-01"),
  },
  {
    id: "jiu-jitsu-infantil",
    modalidade: "jiu-jitsu",
    nome: "Jiu-Jitsu Infantil",
    publico: "infantil",
    blocos: [{ dias: [2, 4], horas: ["19:00"] }],
    fonte: reel("DeNMhcQJYal", "2026-10-07"),
  },
  {
    id: "jiu-jitsu-feminino",
    modalidade: "jiu-jitsu",
    nome: "Jiu-Jitsu Feminino",
    publico: "feminino",
    professor: "Raquel Marques",
    blocos: [
      { dias: [2, 4], horas: ["07:00", "18:00"] },
      { dias: [6], horas: ["08:00"] },
    ],
    fonte: reel("DeHOEQxx6dp", "2026-10-05"),
  },
  {
    id: "muay-thai-adulto",
    modalidade: "muay-thai",
    nome: "Muay Thai",
    publico: "adulto",
    blocos: [
      { dias: [1, 3, 5], horas: ["08:00", "16:00", "18:00"] },
      { dias: [2, 4], horas: ["06:00", "11:00", "20:00"] },
    ],
    fonte: reel("DdbgfITx40S", "2026-09-18"),
  },
  {
    id: "muay-thai-infantil",
    modalidade: "muay-thai",
    nome: "Muay Thai Infantil",
    publico: "infantil",
    blocos: [{ dias: [1, 3, 5], horas: ["17:00"] }],
    fonte: reel("Ddt8fQyRcq9", "2026-09-25"),
  },
  {
    id: "boxe",
    modalidade: "boxe",
    nome: "Boxe",
    publico: "adulto",
    blocos: [
      { dias: [1, 3, 5], horas: ["19:00"] },
      { dias: [2, 4], horas: ["07:00"] },
    ],
    fonte: reel("DdeeozsxxYI", "2026-09-19"),
  },
  {
    id: "krav-maga",
    modalidade: "krav-maga",
    nome: "Krav Maga",
    publico: "adulto",
    blocos: [
      { dias: [2, 4], horas: ["19:00"] },
      { dias: [6], horas: ["14:30"] },
    ],
    fonte: reel("DdB3ipIxdfO", "2026-09-08"),
  },
  {
    id: "taekwondo",
    modalidade: "taekwondo",
    nome: "Taekwondo",
    publico: "adulto",
    blocos: [{ dias: [1, 3], horas: ["20:00"] }],
    fonte: post("DTdhHQEEU9o", "2026-01-13"),
  },
];
