import type { Metadata } from "next";
import Image from "next/image";
import { NotaFonte, PilulasCartaz } from "@/components/horarios/Pilulas";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { Foto } from "@/components/ui/Foto";
import { capa } from "@/content/midia";
import { obterTurmas } from "@/lib/conteudo";

export const metadata: Metadata = {
  title: "Jiu-Jitsu Feminino",
  description: "Aulas exclusivas de Jiu-Jitsu para mulheres na Black Belt Center, em Barra Mansa, com a instrutora Raquel Marques.",
};

const MENSAGEM = "Olá! Vim pelo site e quero agendar uma aula experimental de Jiu-Jitsu Feminino na Black Belt Center.";

export default async function Mulheres() {
  const turmas = await obterTurmas();
  const turma = turmas.find((t) => t.id === "jiu-jitsu-feminino")!;

  return (
    <div className="bg-faixa">
      <section className="relative overflow-clip pt-[4.5rem]">
        <div className="moldura grid items-end lg:grid-cols-12">
          <div className="pb-8 pt-10 md:pt-16 lg:col-span-6 lg:pb-20">
            <p className="text-[1.05rem] font-normal">Aulas exclusivamente femininas</p>
            <h1 className="cartaz mt-3 text-[clamp(4rem,9.8vw,9.75rem)]">Jiu-Jitsu para mulheres</h1>
            <p className="texto-corrido mt-7">
              Um espaço para mulheres treinarem, aprenderem e evoluírem, desenvolvendo técnica, confiança, condicionamento
              e, acima de tudo, descobrindo a própria força.
            </p>
            <BotaoWhatsapp
              rotulo="Agendar minha aula"
              mensagem={MENSAGEM}
              className="botao mt-8 bg-branco font-medium text-faixa transition-colors hover:bg-preto hover:text-branco"
            />
          </div>
          <div className="flex justify-center lg:col-span-6">
            <Image
              src="/midia/recortes/feminino-tatame.webp"
              alt="Instrutora Raquel Marques sorrindo ao lado de duas alunas em posição de jiu-jitsu no tatame"
              width={684}
              height={1027}
              sizes="(max-width: 768px) 90vw, 42vw"
              quality={85}
              preload
              className="w-full max-w-[42rem]"
            />
          </div>
        </div>
      </section>

      <section className="bg-preto py-20 md:py-28">
        <div className="moldura grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="pilula-dia font-serif text-[1.1rem] font-normal">Horários</span>
            <div className="mt-5">
              <PilulasCartaz turma={turma} />
              <NotaFonte turma={turma} className="mt-3" />
            </div>
            <p className="mt-8 font-normal">Instrutora Raquel Marques</p>
            <p className="mt-1 max-w-md">
              Não importa se você nunca treinou antes. Aqui você será acolhida, aprenderá técnicas de defesa pessoal, ganhará
              condicionamento físico e fará parte de uma comunidade que incentiva o crescimento de cada aluna.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 lg:col-span-7">
            <Foto
              src={capa("Demz7FURP_3").src}
              alt="Instrutora Raquel com os professores da equipe Pagels diante do logo da Black Belt"
              sizes="(max-width: 1024px) 50vw, 30vw"
              className="aspect-[3/4]"
            />
            <Foto
              src={capa("DemLYjpEehz").src}
              alt="Alunas sentadas no tatame durante o aulão de Outubro Rosa"
              sizes="(max-width: 1024px) 50vw, 30vw"
              className="mt-12 aspect-[3/4]"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="moldura">
          <p className="cartaz max-w-[20ch] text-[clamp(2.25rem,6.4vw,6rem)]">
            Em outubro, nosso aulão feminino reuniu jiu-jitsu, palestra de nutrição e condicionamento.
          </p>
          <p className="mt-6 max-w-xl">
            A inscrição do Aulão Outubro Rosa, em 17 de outubro de 2026, foi 1 kg de açúcar, e toda a arrecadação foi destinada
            à Casa Rosa.
          </p>
          <a href="https://www.instagram.com/reel/DeAtw85BeQ0/" target="_blank" rel="noopener noreferrer" className="link-sublinhado mt-4 inline-block hover:!text-preto">
            Ver no Instagram
          </a>
        </div>
      </section>
    </div>
  );
}
