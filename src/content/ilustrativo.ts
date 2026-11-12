/**
 * ARQUIVO ÚNICO DE DADOS FICTÍCIOS.
 *
 * Nenhum valor de mensalidade foi encontrado no perfil até 09/11/2026.
 * Tudo aqui é exemplo de layout e aparece no site marcado como "ilustrativo".
 * Substitua pelos valores reais da academia antes de publicar.
 */
export type PlanoIlustrativo = {
  id: string;
  nome: string;
  para: string;
  valor: string;
  periodo: string;
  inclui: string[];
};

export const planosIlustrativos: PlanoIlustrativo[] = [
  {
    id: "uma-modalidade",
    nome: "Uma luta",
    para: "Para quem vai começar por uma modalidade",
    valor: "R$ 000",
    periodo: "por mês",
    inclui: ["Uma modalidade", "Todas as turmas dela na semana"],
  },
  {
    id: "duas-modalidades",
    nome: "Duas lutas",
    para: "Para combinar em pé e no chão",
    valor: "R$ 000",
    periodo: "por mês",
    inclui: ["Duas modalidades", "Todas as turmas delas na semana"],
  },
  {
    id: "livre",
    nome: "Livre",
    para: "Para treinar o que quiser",
    valor: "R$ 000",
    periodo: "por mês",
    inclui: ["Todas as modalidades adultas", "Todas as turmas da semana"],
  },
  {
    id: "criancas",
    nome: "Crianças",
    para: "Para turmas infantis",
    valor: "R$ 000",
    periodo: "por mês",
    inclui: ["Uma modalidade infantil", "Turmas da faixa etária"],
  },
];
