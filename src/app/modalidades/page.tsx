import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PilulasLinha } from "@/components/horarios/Pilulas";
import { obterModalidades, obterTurmas } from "@/lib/conteudo";

export const metadata: Metadata = {
  title: "Modalidades",
  description: "Karatê, jiu-jitsu, muay thai, boxe, krav maga e taekwondo na Black Belt Center, em Barra Mansa.",
};

/* Tamanho do nome para ocupar a largura da página, como nos cartazes */
const TAMANHO: Record<string, string> = {
  karate: "text-[29vw]",
  "jiu-jitsu": "text-[23.2vw]",
  "muay-thai": "text-[23.4vw]",
  boxe: "text-[31vw]",
  "krav-maga": "text-[21.8vw]",
  taekwondo: "text-[20.6vw]",
};

export default async function Modalidades() {
  const [modalidades, turmas] = await Promise.all([obterModalidades(), obterTurmas()]);

  return (
    <div className="pt-[4.5rem]">
      <h1 className="sr-only">Modalidades da Black Belt Center</h1>
      {modalidades.map((m, i) => {
        const invertido = i % 2 === 1;
        const turma = turmas.find((t) => t.modalidade === m.slug && t.publico === "adulto")!;
        return (
          <article key={m.slug} className={`relative overflow-clip ${invertido ? "bg-parede" : "bg-preto"}`}>
            <h2 className={`cartaz whitespace-nowrap px-[2.4vw] pt-[6vw] text-center !leading-[0.92] ${TAMANHO[m.slug]}`}>
              <Link href={`/modalidades/${m.slug}`} className="transition-colors hover:text-belt">
                {m.nome}
              </Link>
            </h2>
            <div className="moldura relative grid items-end lg:grid-cols-12">
              <div className={`relative z-20 order-2 py-10 lg:col-span-5 lg:pb-20 lg:pt-14 ${invertido ? "lg:order-2 lg:col-start-8" : "lg:order-1"}`}>
                <p className="cartaz text-[clamp(2.25rem,4vw,3.75rem)]">{m.frase}</p>
                <p className="mt-5 max-w-md">{m.resumo}</p>
                <div className="mt-6">
                  <PilulasLinha turma={turma} />
                </div>
                <Link href={`/modalidades/${m.slug}`} className="botao botao-belt mt-8">
                  Conhecer {m.nome}
                </Link>
              </div>
              <div
                className={`relative z-10 order-1 -mt-[3vw] flex justify-center lg:col-span-6 lg:-mt-[17vw] ${invertido ? "lg:order-1 lg:col-start-1" : "lg:order-2 lg:col-start-7"}`}
              >
                <Image
                  src={m.recorte}
                  alt={`Equipe de ${m.nome} da Black Belt`}
                  width={m.recorteLargura}
                  height={m.recorteAltura}
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="max-h-[42rem] w-auto"
                />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
