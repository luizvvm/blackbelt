import Image from "next/image";
import Link from "next/link";
import { Abertura } from "@/components/home/Abertura";
import { Chamada, type LinhaChamada } from "@/components/home/Chamada";
import { Placar } from "@/components/home/Relogio";
import { Enso } from "@/components/marca/Enso";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { Foto } from "@/components/ui/Foto";
import { marca } from "@/content/marca";
import { foto } from "@/content/midia";
import { obterCompeticao, obterModalidades, obterTurmas } from "@/lib/conteudo";
import { listarDias, listarHoras } from "@/lib/tempo";

export default async function Inicio() {
  const [modalidades, turmas, competicao] = await Promise.all([obterModalidades(), obterTurmas(), obterCompeticao()]);

  const linhas: LinhaChamada[] = modalidades.map((m) => {
    const adulta = turmas.filter((t) => t.modalidade === m.slug && t.publico === "adulto");
    const horas = [...new Set(adulta.flatMap((t) => t.blocos.flatMap((b) => b.horas)))].sort();
    return { slug: m.slug, nome: m.nome, horas: `Turmas às ${listarHoras(horas)}`, clipe: m.clipe, capa: m.clipeCapa };
  });

  const baby = turmas.find((t) => t.id === "karate-baby")!;
  const feminino = turmas.find((t) => t.id === "jiu-jitsu-feminino")!;
  const fotoEquipe = foto("equipe-tatame");
  const fotoBaby = foto("karate-baby-bambole");

  return (
    <>
      <Abertura />
      <Chamada linhas={linhas} />

      {/* O relógio vermelho da parede do dojo, em tamanho de placar */}
      <section aria-label="Próximas aulas" className="bg-preto pb-24 md:pb-32">
        <div className="moldura">
          <Placar turmas={turmas} />
        </div>
      </section>

      {/* Crianças: o tatame branco e a foto em altura total */}
      <section aria-labelledby="titulo-criancas" className="bg-tatame text-preto lg:grid lg:grid-cols-[minmax(0,1fr)_42vw]">
        <div className="vao-esquerdo vao-direito flex flex-col justify-center py-20 lg:py-24">
          <h2 id="titulo-criancas" className="cartaz text-[clamp(3.5rem,9.2vw,9.25rem)]">
            Grandes campeões começam pequenos.
          </h2>
          <p className="texto-corrido mt-6">
            No Karatê Baby, crianças de 3 a 6 anos desenvolvem coordenação motora, equilíbrio, concentração e
            socialização, tudo de forma lúdica e divertida.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-2.5 text-[1.05rem]">
            <span className="pilula-dia">{listarDias(baby.blocos[0].dias)}</span>
            <span className="pilula-hora !bg-preto !text-branco">{listarHoras(baby.blocos[0].horas)}</span>
          </div>
          <Link href="/criancas" className="botao botao-belt mt-9 w-fit">
            Ver turmas infantis
          </Link>
        </div>
        <div className="relative aspect-[4/5] lg:aspect-auto">
          <Image
            src={fotoBaby.src}
            alt="Professora de karatê orienta aluno pequeno sobre bambolês coloridos, diante do logo da Black Belt"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            quality={85}
            className="object-cover object-[center_14%]"
          />
        </div>
      </section>

      {/* Jiu-jitsu feminino: o vermelho do logo em tela cheia */}
      <section aria-labelledby="titulo-mulheres" className="relative overflow-clip bg-faixa">
        <div className="moldura grid items-end gap-4 pt-20 md:pt-24 lg:grid-cols-12">
          <div className="pb-8 lg:col-span-6 lg:pb-24">
            <h2 id="titulo-mulheres" className="cartaz text-[clamp(3.75rem,9.6vw,9.5rem)]">
              Jiu-Jitsu só para mulheres.
            </h2>
            <p className="texto-corrido mt-6">
              Um ambiente pensado para você treinar com segurança, confiança e evoluir no seu ritmo. Mesmo que nunca
              tenha treinado antes.
            </p>
            <ul className="mt-7 flex flex-col gap-2.5 text-[1.05rem]">
              {feminino.blocos.map((b) => (
                <li key={b.dias.join()} className="flex flex-wrap items-center gap-2.5">
                  <span className="min-w-[8.5rem] rounded-full bg-preto px-5 py-2 text-center font-medium leading-none">
                    {listarDias(b.dias)}
                  </span>
                  <span className="pilula-hora">{listarHoras(b.horas)}</span>
                </li>
              ))}
            </ul>
            <Link href="/mulheres" className="botao mt-9 bg-branco font-medium text-faixa transition-colors hover:bg-preto hover:text-branco">
              Conhecer as aulas
            </Link>
          </div>
          <div className="lg:col-span-6">
            <Image
              src="/midia/recortes/feminino-tatame.webp"
              alt="Instrutora Raquel Marques sorrindo ao lado de duas alunas em posição de jiu-jitsu no tatame"
              width={684}
              height={1027}
              sizes="(max-width: 1024px) 92vw, 44vw"
              quality={85}
              className="mx-auto w-full max-w-[42rem]"
            />
          </div>
        </div>
      </section>

      {/* Competição */}
      <section aria-labelledby="titulo-competicao" className="bg-preto py-20 md:py-32">
        <div className="moldura grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5 lg:pt-16">
            <h2 id="titulo-competicao" className="cartaz text-[clamp(3.25rem,7vw,7rem)]">
              {competicao.atletasSelecao.frase.texto}
            </h2>
            <p className="texto-corrido mt-7">{competicao.atletasSelecao.texto}</p>
            <Link href="/competicao" className="botao botao-linha mt-9 text-branco">
              Ver resultados e eventos
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-3 lg:col-span-7">
            <div className="cantoneiras col-span-3">
              <Foto
                src={foto("brasileiro-1").src}
                alt="Duas atletas trocam golpes no tatame verde e amarelo do Campeonato Brasileiro de Karatê 2026"
                sizes="(max-width: 1024px) 60vw, 36vw"
                className="aspect-[3/4]"
              />
            </div>
            <div className="col-span-2 flex flex-col gap-3 pt-14">
              <Foto
                src={foto("podio-5").src}
                alt="Duas atletas com medalhas segurando a bandeira da Black Belt no campeonato"
                sizes="(max-width: 1024px) 40vw, 24vw"
                posicao="center 70%"
                className="aspect-[4/5]"
              />
              <Foto
                src={foto("brasileiro-5").src}
                alt="Atletas da equipe concentradas, vistas de perto"
                sizes="(max-width: 1024px) 40vw, 24vw"
                className="aspect-square"
              />
            </div>
          </div>
        </div>
      </section>

      {/* A equipe inteira diante do logo */}
      <section aria-labelledby="titulo-equipe" className="relative bg-preto">
        <Image
          src={fotoEquipe.src}
          alt="Alunos de boxe e muay thai de luvas posam juntos diante da parede com o logo da Black Belt"
          width={fotoEquipe.w}
          height={fotoEquipe.h}
          sizes="100vw"
          quality={85}
          className="h-auto w-full lg:max-h-[118svh] lg:object-cover lg:object-[center_40%]"
        />
        <div className="pb-4 pt-8 lg:absolute lg:inset-x-0 lg:bottom-0 lg:bg-gradient-to-t lg:from-preto lg:via-preto/55 lg:to-transparent lg:pb-6 lg:pt-44">
          <div className="moldura">
            <h2 id="titulo-equipe" className="cartaz text-[clamp(3.25rem,8.3vw,7.7rem)]">
              Uma equipe, um propósito.
            </h2>
          </div>
        </div>
      </section>

      {/* Fechamento */}
      <section aria-labelledby="titulo-comecar" className="relative overflow-clip bg-preto py-24 md:py-40">
        <Enso className="pointer-events-none absolute -right-[10vw] top-1/2 w-[min(70vw,46rem)] -translate-y-1/2 text-parede" />
        <div className="moldura relative">
          <h2 id="titulo-comecar" className="cartaz max-w-[13ch] text-[clamp(3.5rem,9.4vw,9rem)]">
            Não importa se você nunca treinou antes.
          </h2>
          <p className="texto-corrido mt-7">
            {marca.endereco.linha}, {marca.endereco.bairro}, {marca.endereco.cidade}. {marca.totalpass.texto}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <BotaoWhatsapp />
            <a href={marca.endereco.mapa} target="_blank" rel="noopener noreferrer" className="botao botao-linha text-branco">
              Como chegar
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
