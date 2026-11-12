import type { Metadata } from "next";
import { Relogio } from "@/components/home/Relogio";
import { Grade } from "@/components/horarios/Grade";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { obterModalidades, obterTurmas } from "@/lib/conteudo";

export const metadata: Metadata = {
  title: "Horários",
  description: "Grade semanal de karatê, jiu-jitsu, muay thai, boxe, krav maga e taekwondo na Black Belt Center, em Barra Mansa.",
};

export default async function Horarios() {
  const [turmas, modalidades] = await Promise.all([obterTurmas(), obterModalidades()]);

  return (
    <div className="bg-preto pt-[4.5rem]">
      <section className="moldura grid items-end gap-10 pb-12 pt-10 md:pt-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <span className="pilula-dia font-serif text-[1.1rem] font-normal">Horários</span>
          <h1 className="cartaz mt-4 text-[clamp(4.5rem,13vw,12.5rem)]">A semana no tatame</h1>
        </div>
        <div className="lg:col-span-5">
          <Relogio turmas={turmas} />
        </div>
      </section>

      <section aria-label="Grade de aulas" className="moldura pb-16">
        <Grade turmas={turmas} modalidades={modalidades.map((m) => ({ slug: m.slug, nome: m.nome }))} />
        <p className="mt-8 max-w-2xl text-[0.98rem] text-branco/85">
          O Jiu-Jitsu também tem turmas pela manhã com o instrutor Rene: chame a gente no WhatsApp para saber o horário. Em
          feriados, avisamos as mudanças no nosso Instagram.
        </p>
      </section>

      <section className="border-t border-branco/15 py-14 md:py-20">
        <div className="moldura flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="cartaz max-w-[14ch] text-[clamp(2.75rem,6vw,5.5rem)]">Primeira vez por aqui?</h2>
          <div className="max-w-md">
            <p>A gente ajuda você a escolher a melhor turma e o melhor horário para começar.</p>
            <BotaoWhatsapp
              rotulo="Falar pelo WhatsApp"
              mensagem="Olá! Vim pelo site e quero ajuda para escolher uma turma na Black Belt Center."
              className="botao botao-belt mt-5"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
