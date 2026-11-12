import type { DiaSemana, Turma } from "@/content/tipos";

export const NOMES_DIAS: Record<DiaSemana, string> = {
  1: "Segunda",
  2: "Terça",
  3: "Quarta",
  4: "Quinta",
  5: "Sexta",
  6: "Sábado",
};

export const DIAS_CURTOS: Record<DiaSemana, string> = {
  1: "Seg",
  2: "Ter",
  3: "Qua",
  4: "Qui",
  5: "Sex",
  6: "Sáb",
};

export type Momento = { dia: number; minutos: number; hora: string; minuto: string };

/** Hora atual em Barra Mansa, independente do fuso de quem acessa. */
export function momentoEm(instante: number): Momento {
  const partes = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(instante));
  const valor = (t: string) => partes.find((p) => p.type === t)?.value ?? "";
  const semana = valor("weekday").replace(".", "").toLowerCase().slice(0, 3);
  const dia = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"].indexOf(semana);
  const hora = valor("hour").padStart(2, "0");
  const minuto = valor("minute").padStart(2, "0");
  return { dia, minutos: Number(hora) * 60 + Number(minuto), hora, minuto };
}

export function formatarHora(hora: string): string {
  const [h, m] = hora.split(":");
  const numero = String(Number(h));
  return m === "00" ? `${numero}h` : `${numero}h${m}`;
}

function paraMinutos(hora: string): number {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}

export type Aula = { turma: Turma; dia: DiaSemana; hora: string };

export function aulasDoDia(turmas: Turma[], dia: number): Aula[] {
  const lista: Aula[] = [];
  for (const turma of turmas) {
    for (const bloco of turma.blocos) {
      if (!bloco.dias.includes(dia as DiaSemana)) continue;
      for (const hora of bloco.horas) lista.push({ turma, dia: dia as DiaSemana, hora });
    }
  }
  return lista.sort((a, b) => paraMinutos(a.hora) - paraMinutos(b.hora) || a.turma.nome.localeCompare(b.turma.nome));
}

export type Proximas = { deslocamento: number; dia: number; aulas: Aula[] };

/** Procura as próximas aulas a partir de agora, avançando até encontrar um dia com aulas. */
export function proximasAulas(turmas: Turma[], agora: Momento, limite = 4): Proximas {
  for (let deslocamento = 0; deslocamento < 7; deslocamento++) {
    const dia = (agora.dia + deslocamento) % 7;
    const aulas = aulasDoDia(turmas, dia).filter(
      (a) => deslocamento > 0 || paraMinutos(a.hora) > agora.minutos,
    );
    if (aulas.length) {
      const primeira = aulas[0].hora;
      const mesmoBloco = aulas.filter((a) => paraMinutos(a.hora) <= paraMinutos(primeira) + 60);
      return { deslocamento, dia, aulas: mesmoBloco.slice(0, limite) };
    }
  }
  return { deslocamento: 0, dia: agora.dia, aulas: [] };
}

/** "Seg, qua e sex" a partir de uma lista de dias. */
export function listarDias(dias: DiaSemana[]): string {
  const nomes = dias.map((d) => DIAS_CURTOS[d]);
  if (nomes.length === 1) return nomes[0];
  return `${nomes.slice(0, -1).join(", ")} e ${nomes[nomes.length - 1].toLowerCase()}`;
}

export function listarHoras(horas: string[]): string {
  const nomes = horas.map(formatarHora);
  if (nomes.length === 1) return nomes[0];
  return `${nomes.slice(0, -1).join(", ")} e ${nomes[nomes.length - 1]}`;
}

export function formatarData(iso: string): string {
  const [a, m, d] = iso.split("-");
  return `${d}/${m}/${a}`;
}
