"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import type { DiaSemana, Turma } from "@/content/tipos";
import { NOMES_DIAS, formatarHora, momentoEm, proximasAulas } from "@/lib/tempo";

function assinarMinuto(aviso: () => void) {
  const id = window.setInterval(aviso, 15000);
  return () => window.clearInterval(id);
}

const minutoAtual = () => Math.floor(Date.now() / 60000);

/* Segmentos: a,b,c,d,e,f,g */
const MAPA: Record<string, string> = {
  "0": "abcdef",
  "1": "bc",
  "2": "abged",
  "3": "abgcd",
  "4": "fgbc",
  "5": "afgcd",
  "6": "afgedc",
  "7": "abc",
  "8": "abcdefg",
  "9": "abcdfg",
  "-": "g",
};

const SEGMENTOS: Record<string, string> = {
  a: "2,1 3,0 15,0 16,1 15,2 3,2",
  b: "16.2,1.3 17.2,2.3 17.2,13.2 16.2,14.2 15.2,13.2 15.2,2.3",
  c: "16.2,15.8 17.2,16.8 17.2,27.7 16.2,28.7 15.2,27.7 15.2,16.8",
  d: "2,29 3,28 15,28 16,29 15,30 3,30",
  e: "1,15.8 2,16.8 2,27.7 1,28.7 0,27.7 0,16.8",
  f: "1,1.3 2,2.3 2,13.2 1,14.2 0,13.2 0,2.3",
  g: "2,15 3,14 15,14 16,15 15,16 3,16",
};

function Digito({ valor, className = "h-full w-auto" }: { valor: string; className?: string }) {
  const ligados = MAPA[valor] ?? "";
  return (
    <svg viewBox="0 0 17.2 30" className={className} aria-hidden="true">
      {Object.entries(SEGMENTOS).map(([nome, pontos]) => (
        <polygon key={nome} points={pontos} fill={ligados.includes(nome) ? "var(--color-led)" : "rgb(255 42 42 / 0.08)"} />
      ))}
    </svg>
  );
}

function DoisPontos({ className = "h-full w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 5 30" className={className} aria-hidden="true">
      <rect x="0.5" y="8.5" width="4" height="4" fill="var(--color-led)" />
      <rect x="0.5" y="17.5" width="4" height="4" fill="var(--color-led)" />
    </svg>
  );
}

/** Estado compartilhado pelo placar e pelo relógio compacto. */
function usePainel(turmas: Turma[]) {
  const minuto = useSyncExternalStore(assinarMinuto, minutoAtual, () => null);
  const momento = minuto === null ? null : momentoEm(minuto * 60000);
  const proximas = momento ? proximasAulas(turmas, momento) : null;
  const digitos = momento ? `${momento.hora}${momento.minuto}` : "----";
  const rotulo = momento ? `${momento.hora} horas e ${momento.minuto} minutos em Barra Mansa` : "Carregando horário";

  let quando = "Próximas aulas";
  if (proximas && proximas.aulas.length) {
    if (proximas.deslocamento === 0) quando = "Próximas aulas hoje";
    else if (proximas.deslocamento === 1) quando = "Amanhã no tatame";
    else quando = `${NOMES_DIAS[proximas.dia as DiaSemana]} no tatame`;
  }

  return { proximas, digitos, rotulo, quando };
}

/** O relógio vermelho que fica na parede do dojo, em tamanho de placar. */
export function Placar({ turmas }: { turmas: Turma[] }) {
  const { proximas, digitos, rotulo, quando } = usePainel(turmas);

  return (
    <div className="grid items-center gap-x-[6vw] gap-y-12 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
      <div>
        <p className="text-[1.05rem] text-branco/80">Agora em Barra Mansa</p>
        <div
          role="timer"
          aria-label={rotulo}
          className="mt-4 grid grid-cols-[1fr_1fr_0.26fr_1fr_1fr] items-center gap-x-[2.6%] [filter:drop-shadow(0_0_1.4vw_rgb(255_42_42/0.5))]"
        >
          <Digito valor={digitos[0]} className="h-auto w-full" />
          <Digito valor={digitos[1]} className="h-auto w-full" />
          <DoisPontos className="h-auto w-full" />
          <Digito valor={digitos[2]} className="h-auto w-full" />
          <Digito valor={digitos[3]} className="h-auto w-full" />
        </div>
      </div>

      <div>
        <h2 className="cartaz text-[clamp(2.25rem,3.6vw,3.5rem)]">{quando}</h2>
        <ul className="mt-3">
          {proximas?.aulas.map((aula) => {
            const hora = aula.hora.replace(":", "");
            return (
              <li key={`${aula.turma.id}-${aula.hora}`} className="flex items-center gap-5 border-t border-branco/20 py-3">
                <span
                  role="img"
                  aria-label={formatarHora(aula.hora)}
                  className="flex h-8 shrink-0 items-center gap-[3px] [filter:drop-shadow(0_0_5px_rgb(255_42_42/0.55))]"
                >
                  <Digito valor={hora[0]} />
                  <Digito valor={hora[1]} />
                  <DoisPontos />
                  <Digito valor={hora[2]} />
                  <Digito valor={hora[3]} />
                </span>
                <Link
                  href={`/modalidades/${aula.turma.modalidade}`}
                  className="cartaz min-w-0 text-[clamp(1.6rem,2.3vw,2.1rem)] transition-colors hover:text-belt"
                >
                  {aula.turma.nome}
                </Link>
              </li>
            );
          })}
          {proximas === null &&
            [0, 1, 2].map((i) => <li key={i} className="h-14 border-t border-branco/20" />)}
        </ul>
        <Link href="/horarios" className="botao botao-linha mt-6 text-branco">
          Ver grade completa
        </Link>
      </div>
    </div>
  );
}

/** Versão menor, usada nas páginas de horários e contato. */
export function Relogio({ turmas }: { turmas: Turma[] }) {
  const { proximas, digitos, rotulo, quando } = usePainel(turmas);

  return (
    <div>
      <div>
        <p className="mb-3 text-[0.95rem] text-branco/80">Agora em Barra Mansa</p>
        <div
          role="timer"
          aria-label={rotulo}
          className="inline-flex h-[clamp(4.25rem,10vw,7.5rem)] items-center gap-[0.35em] py-[clamp(0.75rem,1.6vw,1.25rem)] text-[clamp(1rem,2vw,1.5rem)] [filter:drop-shadow(0_0_10px_rgb(255_42_42/0.45))]"
        >
          <Digito valor={digitos[0]} />
          <Digito valor={digitos[1]} />
          <DoisPontos />
          <Digito valor={digitos[2]} />
          <Digito valor={digitos[3]} />
        </div>
      </div>

      <div className="mt-6">
        <p className="font-medium">{quando}</p>
        <ul className="mt-4 flex flex-col gap-3">
          {proximas?.aulas.map((aula) => (
            <li key={`${aula.turma.id}-${aula.hora}`} className="flex flex-wrap items-center gap-2.5">
              <span className="pilula-hora min-w-[4.5rem] text-[1.05rem]">{formatarHora(aula.hora)}</span>
              <Link href={`/modalidades/${aula.turma.modalidade}`} className="link-sublinhado text-[1.15rem] font-normal">
                {aula.turma.nome}
              </Link>
            </li>
          ))}
          {proximas === null &&
            [0, 1, 2].map((i) => <li key={i} className="h-8 w-56 max-w-full rounded-full bg-branco/10" />)}
        </ul>
      </div>
    </div>
  );
}
