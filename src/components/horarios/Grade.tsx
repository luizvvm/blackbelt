"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import type { DiaSemana, Publico, SlugModalidade, Turma } from "@/content/tipos";
import { DIAS_CURTOS, NOMES_DIAS, aulasDoDia, formatarHora, momentoEm } from "@/lib/tempo";

function assinarMinuto(aviso: () => void) {
  const id = window.setInterval(aviso, 30000);
  return () => window.clearInterval(id);
}
const minutoAtual = () => Math.floor(Date.now() / 60000);

const DIAS: DiaSemana[] = [1, 2, 3, 4, 5, 6];

const PUBLICOS: { id: Publico | "todos"; rotulo: string }[] = [
  { id: "todos", rotulo: "Todas as turmas" },
  { id: "adulto", rotulo: "Adulto" },
  { id: "infantil", rotulo: "Infantil" },
  { id: "feminino", rotulo: "Feminino" },
];

const ESTILO_TURMA: Record<Publico, string> = {
  adulto: "bg-branco text-preto",
  infantil: "bg-tatame/20 text-branco shadow-[inset_0_0_0_1.5px_var(--color-tatame)]",
  feminino: "bg-belt text-branco",
};

function Filtro({
  ativo,
  onClick,
  children,
}: {
  ativo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ativo}
      className={`min-h-11 rounded-full px-5 text-[0.98rem] font-normal transition-colors ${
        ativo ? "bg-belt text-branco" : "text-branco shadow-[inset_0_0_0_1.5px_rgb(251_251_251/0.35)] hover:bg-branco hover:text-preto"
      }`}
    >
      {children}
    </button>
  );
}

export function Grade({
  turmas,
  modalidades,
}: {
  turmas: Turma[];
  modalidades: { slug: SlugModalidade; nome: string }[];
}) {
  const [modalidade, setModalidade] = useState<SlugModalidade | "todas">("todas");
  const [publico, setPublico] = useState<Publico | "todos">("todos");
  const [diaEscolhido, setDiaEscolhido] = useState<DiaSemana | null>(null);
  const minuto = useSyncExternalStore(assinarMinuto, minutoAtual, () => null);
  const momento = minuto === null ? null : momentoEm(minuto * 60000);
  const hoje = momento && momento.dia >= 1 ? (momento.dia as DiaSemana) : null;
  const diaAtivo = diaEscolhido ?? hoje ?? 1;

  const visivel = useMemo(
    () => (t: Turma) => (modalidade === "todas" || t.modalidade === modalidade) && (publico === "todos" || t.publico === publico),
    [modalidade, publico],
  );

  const porDia = useMemo(() => {
    const mapa = new Map<DiaSemana, ReturnType<typeof aulasDoDia>>();
    for (const dia of DIAS) mapa.set(dia, aulasDoDia(turmas, dia));
    return mapa;
  }, [turmas]);

  const horas = useMemo(
    () => [...new Set(DIAS.flatMap((d) => (porDia.get(d) ?? []).map((a) => a.hora)))].sort(),
    [porDia],
  );

  const totalVisivel = turmas.filter(visivel).length;
  const aulasDoDiaAtivo = (porDia.get(diaAtivo) ?? []).filter((a) => visivel(a.turma));

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por modalidade">
          <Filtro ativo={modalidade === "todas"} onClick={() => setModalidade("todas")}>
            Todas as lutas
          </Filtro>
          {modalidades.map((m) => (
            <Filtro key={m.slug} ativo={modalidade === m.slug} onClick={() => setModalidade(m.slug)}>
              {m.nome}
            </Filtro>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por turma">
          {PUBLICOS.map((p) => (
            <Filtro key={p.id} ativo={publico === p.id} onClick={() => setPublico(p.id)}>
              {p.rotulo}
            </Filtro>
          ))}
        </div>
      </div>

      {totalVisivel === 0 && (
        <p className="mt-8 rounded-sm bg-parede p-5">
          Nenhuma turma combina com esses filtros. Escolha outra luta ou veja todas as turmas.{" "}
          <button
            type="button"
            className="link-sublinhado font-normal"
            onClick={() => {
              setModalidade("todas");
              setPublico("todos");
            }}
          >
            Limpar filtros
          </button>
        </p>
      )}

      {/* Celular: um dia por vez */}
      <div className="mt-8 lg:hidden">
        <div className="grid grid-cols-6 gap-1" role="tablist" aria-label="Dia da semana">
          {DIAS.map((d) => (
            <button
              key={d}
              type="button"
              role="tab"
              aria-selected={diaAtivo === d}
              onClick={() => setDiaEscolhido(d)}
              className={`cartaz min-h-12 rounded-sm text-[1.25rem] transition-colors ${
                diaAtivo === d ? "bg-belt text-branco" : "bg-parede text-branco"
              }`}
            >
              {DIAS_CURTOS[d]}
            </button>
          ))}
        </div>
        <h2 className="mt-6 font-medium">
          {NOMES_DIAS[diaAtivo]}
          {hoje === diaAtivo && <span className="ml-2 font-light text-branco/75">hoje</span>}
        </h2>
        {aulasDoDiaAtivo.length === 0 && (
          <p className="mt-3 text-branco/80">Sem turmas com esses filtros neste dia.</p>
        )}
        <ul className="mt-2">
          {aulasDoDiaAtivo.map((a) => (
            <li key={`${a.turma.id}-${a.hora}`} className="flex items-center gap-4 border-b border-branco/15 py-3">
              <span className="cartaz w-[4.5rem] shrink-0 text-[1.9rem]">{formatarHora(a.hora)}</span>
              <Link href={`/modalidades/${a.turma.modalidade}`} className="min-w-0 flex-1 font-normal leading-snug">
                {a.turma.nome}
                {a.turma.idade && <span className="block text-[0.92rem] font-light text-branco/75">{a.turma.idade}</span>}
              </Link>
              <span className={`shrink-0 rounded-full px-3 py-1 text-[0.82rem] font-normal capitalize ${ESTILO_TURMA[a.turma.publico]}`}>
                {a.turma.publico}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tela grande: a semana inteira */}
      <div className="mt-10 hidden lg:block">
        <table className="w-full table-fixed border-separate border-spacing-1">
          <caption className="sr-only">Grade semanal de aulas da Black Belt Center</caption>
          <thead>
            <tr>
              <th scope="col" className="w-[5.5rem] text-left font-normal">
                <span className="sr-only">Horário</span>
              </th>
              {DIAS.map((d) => (
                <th
                  key={d}
                  scope="col"
                  className={`cartaz rounded-sm py-3 text-[1.5rem] ${hoje === d ? "bg-belt" : "bg-parede"}`}
                >
                  {NOMES_DIAS[d]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {horas.map((hora) => (
              <tr key={hora}>
                <th scope="row" className="cartaz pr-3 text-left text-[1.9rem] align-top">
                  {formatarHora(hora)}
                </th>
                {DIAS.map((d) => {
                  const aulas = (porDia.get(d) ?? []).filter((a) => a.hora === hora);
                  return (
                    <td key={d} className={`h-14 align-top ${hoje === d ? "bg-belt/10" : ""}`}>
                      <ul className="flex flex-col gap-1">
                        {aulas.map((a) => {
                          const mostra = visivel(a.turma);
                          return (
                            <li key={a.turma.id}>
                              <Link
                                href={`/modalidades/${a.turma.modalidade}`}
                                tabIndex={mostra ? undefined : -1}
                                aria-hidden={mostra ? undefined : true}
                                className={`block rounded-sm px-2.5 py-1.5 text-[0.92rem] font-normal leading-tight transition-opacity ${ESTILO_TURMA[a.turma.publico]} ${
                                  mostra ? "hover:opacity-80" : "pointer-events-none opacity-[0.12]"
                                }`}
                              >
                                {a.turma.nome}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <ul className="mt-5 flex flex-wrap gap-5 text-[0.95rem]">
          {(["adulto", "infantil", "feminino"] as Publico[]).map((p) => (
            <li key={p} className="flex items-center gap-2 capitalize">
              <span className={`size-4 rounded-sm ${ESTILO_TURMA[p]}`} aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
