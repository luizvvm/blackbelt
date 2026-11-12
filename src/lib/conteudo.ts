/**
 * Camada única de acesso ao conteúdo.
 * Hoje lê arquivos locais. Para plugar um CMS, troque a implementação destas
 * funções por chamadas à API: as páginas não precisam mudar, pois já usam `await`.
 */
import { atletasSelecao, eventos, galeriaBrasileiro, nutricao } from "@/content/competicao";
import { frasesInfantis, programasInfantis } from "@/content/criancas";
import { turmas } from "@/content/horarios";
import { planosIlustrativos } from "@/content/ilustrativo";
import { modalidades } from "@/content/modalidades";
import mural from "@/content/mural.json";
import type { ItemMural, Modalidade, SlugModalidade, Turma } from "@/content/tipos";

export async function obterModalidades(): Promise<Modalidade[]> {
  return modalidades;
}

export async function obterModalidade(slug: string): Promise<Modalidade | undefined> {
  return modalidades.find((m) => m.slug === slug);
}

export async function obterTurmas(): Promise<Turma[]> {
  return turmas;
}

export async function obterTurmasDe(slug: SlugModalidade): Promise<Turma[]> {
  return turmas.filter((t) => t.modalidade === slug);
}

export async function obterMural(): Promise<ItemMural[]> {
  return mural as ItemMural[];
}

export async function obterCompeticao() {
  return { atletasSelecao, eventos, galeriaBrasileiro, nutricao };
}

export async function obterInfantil() {
  return { programasInfantis, frasesInfantis };
}

export async function obterPlanosIlustrativos() {
  return planosIlustrativos;
}
