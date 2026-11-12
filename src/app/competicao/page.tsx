import type { Metadata } from "next";
import Image from "next/image";
import { Foto } from "@/components/ui/Foto";
import { foto } from "@/content/midia";
import { obterCompeticao } from "@/lib/conteudo";

export const metadata: Metadata = {
  title: "Competição",
  description: "Atletas formados na Black Belt na Seleção Brasileira de Karatê JKA, Campeonato Brasileiro 2026, exames de faixa e eventos.",
};

export default async function Competicao() {
  const { atletasSelecao, eventos, galeriaBrasileiro, nutricao } = await obterCompeticao();
  const principal = foto("brasileiro-3");

  return (
    <div className="bg-preto">
      <section className="relative overflow-clip pt-[4.5rem]">
        <div className="moldura grid items-start gap-8 pt-10 md:pt-16 lg:grid-cols-12">
          <div className="pb-8 lg:col-span-7 lg:pb-16">
            <h1 className="cartaz text-[clamp(3.75rem,8.5vw,8.25rem)]">{atletasSelecao.frase.texto}</h1>
            <p className="texto-corrido mt-8">{atletasSelecao.texto}</p>
            <ul className="mt-6 flex flex-wrap gap-2 text-[1.05rem]">
              {atletasSelecao.nomes.map((n) => (
                <li key={n} className="pilula-dia">
                  {n}
                </li>
              ))}
            </ul>
          </div>
          <div className="cantoneiras mb-14 lg:col-span-5 lg:mb-20">
            <Image
              src={principal.src}
              alt="Atleta de karatê em base de combate no Campeonato Brasileiro de 2026"
              width={principal.w}
              height={principal.h}
              sizes="(max-width: 1024px) 100vw, 38vw"
              preload
              className="aspect-[4/5] w-full object-cover object-[center_40%]"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="titulo-galeria" className="pb-20">
        <h2 id="titulo-galeria" className="moldura text-[1.05rem] font-normal">
          Campeonato Brasileiro de Karatê 2026, em Belém do Pará
        </h2>
        <ul className="mt-5 flex snap-x gap-2 overflow-x-auto px-[max(1.25rem,calc((100vw-92rem)/2+4vw))] pb-4 [scrollbar-width:thin]">
          {galeriaBrasileiro.map((g, i) => (
            <li key={g.src} className={`shrink-0 snap-start ${i % 3 === 1 ? "w-[78vw] sm:w-[30rem]" : "w-[62vw] sm:w-[23rem]"}`}>
              <Foto src={g.src} alt={g.alt} sizes="(max-width: 640px) 78vw, 30rem" className={i % 3 === 1 ? "aspect-[4/5]" : "aspect-[3/4]"} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="titulo-linha" className="bg-tatame py-20 text-preto md:py-28">
        <div className="moldura">
          <h2 id="titulo-linha" className="cartaz text-[clamp(3.5rem,8vw,7.75rem)]">
            O último ano no tatame
          </h2>
          <ol className="mt-12">
            {eventos.map((e) => (
              <li key={e.id} className="grid gap-6 border-t border-preto/25 py-8 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-3">
                  <p className="font-medium">{e.quando}</p>
                  {e.local && <p>{e.local}</p>}
                </div>
                <div className={e.foto ? "md:col-span-5" : "md:col-span-9"}>
                  <h3 className="cartaz text-[clamp(2rem,3.4vw,3.25rem)]">{e.titulo}</h3>
                  <p className="mt-3 max-w-prose">{e.texto}</p>
                  <a href={e.fonte.url} target="_blank" rel="noopener noreferrer" className="link-sublinhado mt-3 inline-block text-[0.95rem] text-faixa">
                    Ver no Instagram
                  </a>
                </div>
                {e.foto && (
                  <div className="md:col-span-4">
                    <Image src={e.foto.src} alt={e.foto.alt} width={e.foto.w} height={e.foto.h} sizes="(max-width: 768px) 100vw, 30vw" className="w-full" />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="moldura">
          <p className="texto-corrido">{nutricao.texto}</p>
        </div>
      </section>
    </div>
  );
}
