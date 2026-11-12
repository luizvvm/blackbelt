import { foto } from "./midia";
import { post, reel } from "./fontes";
import type { Evento } from "./tipos";

export const atletasSelecao = {
  frase: { texto: "Do tatame da Blackbelt para a Seleção Brasileira.", fonte: post("DdbdvDkuQNJ", "2026-09-18") },
  texto:
    "Sophia Duque e Pedro Guilherme se formaram no nosso tatame e hoje fazem parte da Seleção Brasileira de Karatê JKA, com os olhos voltados para o Campeonato Mundial JKA 2027, no Japão.",
  nomes: ["Sophia Duque", "Pedro Guilherme"],
  fonte: post("DdbdvDkuQNJ", "2026-09-18"),
};

const fotoEvento = (id: string, alt: string) => {
  const arquivo = foto(id);
  return { src: arquivo.src, w: arquivo.w, h: arquivo.h, alt };
};

/** Linha do tempo com fatos publicados, do mais recente para o mais antigo. */
export const eventos: Evento[] = [
  {
    id: "copa-dos-campeoes",
    titulo: "Copa dos Campeões",
    local: "Barueri, SP",
    quando: "Setembro de 2026",
    texto: "Dois atletas formados aqui disputaram a competição como integrantes da Seleção Brasileira de Karatê JKA.",
    fonte: post("DdbdvDkuQNJ", "2026-09-18"),
    foto: fotoEvento("cartaz-copa", "Cartaz da Copa dos Campeões com Sophia Duque e Pedro Guilherme, da Seleção Brasileira JKA"),
  },
  {
    id: "conexao-interior",
    titulo: "Conexão Interior Vale do Café",
    local: "Barra Mansa, RJ",
    quando: "Agosto de 2026",
    texto: "Nossa equipe de karatê levou um aulão especial para as ruas de Barra Mansa na 2ª edição do evento.",
    fonte: reel("DcPNGDARdK8", "2026-08-19"),
  },
  {
    id: "aula-pestana",
    titulo: "Aula técnica com Sensei Roberto Pestana",
    local: "Nosso dojo",
    quando: "Agosto de 2026",
    texto: "Recebemos o 6º Dan JKA e presidente da JKA Rio em uma aula para nossos atletas graduados. Um dos pontos trabalhados foi o Gyaku Zuki e a rotação do quadril.",
    fonte: reel("Db_tEndRikz", "2026-08-13"),
  },
  {
    id: "treinamento-dojo",
    titulo: "Treinamento no nosso dojo",
    local: "Barra Mansa, RJ",
    quando: "Julho de 2026",
    texto: "Treinamento realizado a convite do Sensei Walace de Freitas.",
    fonte: post("DatPHOlmEb_", "2026-07-12"),
    foto: fotoEvento("seminario-4", "Grupo de karatecas de quimono branco reunido diante do logo da Black Belt, no dojo"),
  },
  {
    id: "exame-jka",
    titulo: "Exame de Faixa JKA",
    local: "Nossa sede, em Barra Mansa",
    quando: "11 de julho de 2026",
    texto: "Com a presença do Sensei Roberto Pestana Jr., 6º Dan JKA, e do Sensei Walace de Freitas, 3º Dan JKA.",
    fonte: post("DZnUYkYxNrz", "2026-06-15"),
    foto: fotoEvento("cartaz-exame", "Cartaz do Exame de Faixa JKA com os senseis Roberto Pestana Jr. e Walace de Freitas"),
  },
  {
    id: "brasileiro-2026",
    titulo: "Campeonato Brasileiro de Karatê 2026",
    local: "Belém, PA",
    quando: "Abril de 2026",
    texto: "Nossos atletas representaram com garra: pódio, medalhas e novas classificações.",
    fonte: post("DXr5PDBEabn", "2026-04-28"),
    foto: fotoEvento("podio-5", "Duas atletas da Black Belt com medalhas segurando a bandeira da equipe no Campeonato Brasileiro"),
  },
  {
    id: "faixas-2025",
    titulo: "Entrega de faixas e exames de graduação",
    local: "Barra Mansa, RJ",
    quando: "Dezembro de 2025",
    texto: "Karatê, Muay Thai e Jiu-Jitsu fecharam o ano com exames e entrega de faixas no dia 19 de dezembro.",
    fonte: post("DSalR69ES3c", "2025-12-18"),
  },
];

export const galeriaBrasileiro = [
  { ...foto("brasileiro-1"), alt: "Duas atletas trocam golpes no tatame verde e amarelo do Campeonato Brasileiro" },
  { ...foto("brasileiro-7"), alt: "Atleta da Black Belt de faixa marrom levanta o punho em posição de kata" },
  { ...foto("brasileiro-4"), alt: "Atleta de faixa preta em base durante a luta" },
  { ...foto("brasileiro-6"), alt: "Atleta da Black Belt de faixa preta com as mãos na cintura, olhando para o lado" },
  { ...foto("podio-4"), alt: "Pódio do Campeonato Brasileiro com o primeiro lugar ao centro" },
  { ...foto("brasileiro-8"), alt: "Atleta de faixa marrom em guarda diante do painel do campeonato" },
  { ...foto("brasileiro-10"), alt: "Atleta de faixa marrom de perfil em posição de ataque" },
  { ...foto("brasileiro-5"), alt: "Atletas da equipe concentradas, vistas de perto" },
  { ...foto("brasileiro-11"), alt: "Atletas sentados à beira do tatame acompanhando a competição" },
  { ...foto("podio-8"), alt: "Atleta com medalha segurando uma bandeira no pódio do campeonato" },
];

export const nutricao = {
  texto: "Treino de competição também se constrói fora do tatame: nossa nutricionista parceira, Bianca Alves, orienta os atletas sobre alimentação.",
  fonte: reel("DUYLWt3EWVx", "2026-02-05"),
};
