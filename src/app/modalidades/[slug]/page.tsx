import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NotaFonte, PilulasCartaz, PilulasLinha } from "@/components/horarios/Pilulas";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { ClipeEnso } from "@/components/ui/ClipeEnso";
import { Foto } from "@/components/ui/Foto";
import { marca } from "@/content/marca";
import { obterModalidade, obterModalidades, obterMural, obterTurmasDe } from "@/lib/conteudo";
import { formatarData } from "@/lib/tempo";

export async function generateStaticParams() {
  const modalidades = await obterModalidades();
  return modalidades.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/modalidades/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const modalidade = await obterModalidade(slug);
  if (!modalidade) return {};
  return { title: modalidade.nome, description: `${modalidade.frase} ${modalidade.resumo}` };
}

const TAMANHO: Record<string, string> = {
  karate: "text-[29vw]",
  "jiu-jitsu": "text-[23.2vw]",
  "muay-thai": "text-[23.4vw]",
  boxe: "text-[31vw]",
  "krav-maga": "text-[21.8vw]",
  taekwondo: "text-[20.6vw]",
};

export default async function PaginaModalidade({ params }: PageProps<"/modalidades/[slug]">) {
  const { slug } = await params;
  const modalidade = await obterModalidade(slug);
  if (!modalidade) notFound();
  const [turmas, mural] = await Promise.all([obterTurmasDe(modalidade.slug), obterMural()]);
  const recentes = mural.filter((p) => p.categorias.includes(modalidade.slug)).slice(0, 6);
  const faixa = modalidade.destaque ?? modalidade.aviso;
  const adulta = turmas.find((t) => t.publico === "adulto")!;
  const outras = turmas.filter((t) => t.id !== adulta.id);
  const mensagem = `Olá! Vim pelo site e quero agendar uma aula experimental de ${modalidade.nome} na Black Belt Center.`;

  return (
    <>
      <section className="relative overflow-clip bg-preto pt-[4.5rem]">
        <h1 className={`cartaz whitespace-nowrap px-[2.4vw] pt-[6vw] text-center !leading-[0.92] ${TAMANHO[modalidade.slug]}`}>
          {modalidade.nome}
        </h1>
        <div className="moldura relative grid items-end lg:grid-cols-12">
          <div className="relative z-20 order-2 pb-10 pt-8 lg:order-1 lg:col-span-4 lg:pb-16 lg:pr-6">
            <p className="cartaz text-[clamp(2.5rem,4.2vw,4rem)]">{modalidade.frase}</p>
            <p className="mt-5">{modalidade.resumo}</p>
            <BotaoWhatsapp rotulo={`Agendar aula de ${modalidade.nome}`} mensagem={mensagem} className="botao botao-belt mt-7" />
          </div>
          <div className="relative z-10 order-1 -mt-[4vw] flex justify-center lg:order-2 lg:col-span-4 lg:-mt-[15vw]">
            <Image
              src={modalidade.recorte}
              alt={`Equipe de ${modalidade.nome} da Black Belt`}
              width={modalidade.recorteLargura}
              height={modalidade.recorteAltura}
              sizes="(max-width: 768px) 92vw, 42vw"
              preload
              className="max-h-[42rem] w-auto lg:max-w-[108%]"
            />
          </div>
          <div className="relative z-20 order-3 pb-14 lg:col-span-4 lg:pb-16 lg:pl-[8%]">
            <span className="pilula-dia font-serif text-[1.1rem] font-normal">Horários</span>
            <div className="mt-4">
              <PilulasCartaz turma={adulta} />
              <NotaFonte turma={adulta} className="mt-3" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-tatame py-20 text-preto md:py-28">
        <div className="moldura grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="cartaz text-[clamp(3rem,6.6vw,6.25rem)]">No tatame</h2>
            <dl className="mt-10">
              {modalidade.pontos.map((p) => (
                <div key={p.titulo} className="grid gap-x-8 gap-y-1 border-t border-preto/25 py-5 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
                  <dt className="font-medium">{p.titulo}</dt>
                  <dd>
                    {p.texto}{" "}
                    <a href={p.fonte.url} target="_blank" rel="noopener noreferrer" className="link-sublinhado whitespace-nowrap text-[0.9rem] text-faixa">
                      Ver técnica
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-5">
            <div className="mx-auto max-w-md">
              <ClipeEnso src={modalidade.clipe} capa={modalidade.clipeCapa} rotulo={modalidade.nome} className="!text-preto" />
            </div>
            {modalidade.ensina && (
              <div className="mt-8">
                <h2 className="font-medium">Quem ensina</h2>
                <ul className="mt-2">
                  {modalidade.ensina.map((p) => (
                    <li key={p.nome}>
                      {p.nome}, {p.papel}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {modalidade.equipe && <p className="mt-5">{modalidade.equipe.texto}</p>}
            {outras.length > 0 && (
              <div className="mt-8 flex flex-col gap-6">
                {outras.map((t) => (
                  <div key={t.id}>
                    <h2 className="mb-2 font-medium">
                      <Link href={t.publico === "feminino" ? "/mulheres" : "/criancas"} className="link-sublinhado">
                        {t.nome}
                      </Link>
                      {t.idade && <span className="font-light">, {t.idade}</span>}
                    </h2>
                    <PilulasLinha turma={t} escuro />
                    <NotaFonte turma={t} className="mt-2" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {faixa && (
        <section className="bg-faixa py-16 md:py-24">
          <div className="moldura">
            <p className="cartaz max-w-[22ch] text-[clamp(2.25rem,5vw,4.75rem)]">{faixa.texto}</p>
            <a href={faixa.fonte.url} target="_blank" rel="noopener noreferrer" className="link-sublinhado mt-6 inline-block hover:!text-preto">
              Ver no Instagram
            </a>
          </div>
        </section>
      )}

      {recentes.length > 0 && (
        <section className="bg-preto py-20 md:py-28">
          <div className="moldura">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="cartaz text-[clamp(3rem,6.6vw,6.25rem)]">Direto do treino</h2>
              <Link href="/mural" className="link-sublinhado">
                Ver mural completo
              </Link>
            </div>
          </div>
          <ul className="mt-10 flex snap-x gap-3 overflow-x-auto px-[max(1.25rem,calc((100vw-92rem)/2+4vw))] pb-4 [scrollbar-width:thin]">
            {recentes.map((p) => (
              <li key={p.codigo} className="w-[62vw] shrink-0 snap-start sm:w-[19rem]">
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="group block">
                  <Foto
                    src={p.capa}
                    alt={p.resumo}
                    sizes="(max-width: 640px) 62vw, 19rem"
                    className="aspect-[9/16] transition-opacity group-hover:opacity-75"
                  />
                  <p className="mt-3 text-[0.98rem] leading-snug">{p.resumo}</p>
                  <p className="mt-1 text-[0.9rem] text-branco/70">{formatarData(p.data)}</p>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="bg-belt py-16 md:py-24">
        <div className="moldura flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="cartaz max-w-[14ch] text-[clamp(3rem,7vw,6.75rem)]">Comece pela aula experimental.</h2>
          <div>
            <p className="mb-4">
              {marca.endereco.linha}, {marca.endereco.bairro}, {marca.endereco.cidade}
            </p>
            <BotaoWhatsapp
              rotulo={`Agendar aula de ${modalidade.nome}`}
              mensagem={mensagem}
              className="botao bg-branco font-medium text-belt transition-colors hover:bg-preto hover:text-branco"
            />
          </div>
        </div>
      </section>
    </>
  );
}
