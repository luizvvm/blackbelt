import type { Turma } from "@/content/tipos";
import { DIAS_CURTOS, NOMES_DIAS, formatarHora, formatarData } from "@/lib/tempo";

/** O bloco de horário dos cartazes da academia: pílula vermelha com os dias, pílula branca com as horas. */
export function PilulasCartaz({ turma, comNome = false }: { turma: Turma; comNome?: boolean }) {
  return (
    <div className="w-full max-w-[26rem]">
      {comNome && <h3 className="mb-3 text-[1.15rem] font-medium">{turma.nome}</h3>}
      <ul className="flex flex-col gap-3">
        {turma.blocos.map((bloco) => (
          <li key={`${bloco.dias.join()}-${bloco.horas.join()}`} className="flex flex-col items-center gap-1">
            <span className="pilula-dia w-full text-[clamp(1rem,1.4vw,1.25rem)] uppercase">
              {bloco.dias.map((d) => NOMES_DIAS[d]).join(" | ")}
            </span>
            <span className="pilula-hora min-w-[55%] text-[clamp(1.05rem,1.5vw,1.35rem)]">
              {bloco.horas.map((h) => formatarHora(h).toUpperCase()).join(" | ")}
            </span>
          </li>
        ))}
      </ul>
      {turma.observacao && <p className="mt-3 text-[0.95rem] leading-snug opacity-80">{turma.observacao}</p>}
    </div>
  );
}

export function PilulasLinha({ turma, escuro = false }: { turma: Turma; escuro?: boolean }) {
  return (
    <ul className="flex flex-col gap-2">
      {turma.blocos.map((bloco) => (
        <li key={`${bloco.dias.join()}-${bloco.horas.join()}`} className="flex flex-wrap items-center gap-2">
          <span className="pilula-dia text-[0.98rem]">{bloco.dias.map((d) => DIAS_CURTOS[d]).join(" ")}</span>
          <span className={`pilula-hora text-[0.98rem] ${escuro ? "!bg-preto !text-branco" : ""}`}>
            {bloco.horas.map(formatarHora).join("  ")}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function NotaFonte({ turma, className = "" }: { turma: Turma; className?: string }) {
  return (
    <p className={`text-[0.9rem] opacity-75 ${className}`}>Atualizado em {formatarData(turma.fonte.data)}</p>
  );
}
