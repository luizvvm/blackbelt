import type { Metadata } from "next";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { marca } from "@/content/marca";
import { obterPlanosIlustrativos } from "@/lib/conteudo";

export const metadata: Metadata = {
  title: "Planos",
  description: "Planos da Black Belt Center e TotalPass categoria TP3.",
};

function SeloIlustrativo() {
  return (
    <span className="inline-block -rotate-3 border-2 border-belt px-2.5 py-0.5 text-[0.82rem] font-medium uppercase tracking-wide text-belt">
      Ilustrativo
    </span>
  );
}

export default async function Planos() {
  const planos = await obterPlanosIlustrativos();

  return (
    <div className="bg-tatame text-preto">
      <section className="pt-[4.5rem]">
        <div className="moldura pb-14 pt-10 md:pt-16">
          <h1 className="cartaz text-[clamp(5rem,17vw,16rem)]">Planos</h1>
          <p className="texto-corrido mt-4">
            Fale com a gente para receber os valores atuais de cada modalidade. Se você usa TotalPass, já pode treinar aqui na categoria TP3.
          </p>
        </div>
      </section>

      <section className="bg-preto py-16 text-branco md:py-20">
        <div className="moldura grid items-center gap-8 md:grid-cols-12">
          <p className="cartaz text-[clamp(7rem,20vw,18rem)] !leading-[0.85] text-belt md:col-span-5">TP3</p>
          <div className="md:col-span-7">
            <h2 className="cartaz text-[clamp(2.5rem,5vw,4.5rem)]">Aceitamos TotalPass</h2>
            <p className="texto-corrido mt-4">{marca.totalpass.texto}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="titulo-planos" className="py-20 md:py-28">
        <div className="moldura">
          <div className="flex flex-wrap items-center gap-4">
            <h2 id="titulo-planos" className="cartaz text-[clamp(3rem,6.6vw,6.25rem)]">
              Mensalidades
            </h2>
            <SeloIlustrativo />
          </div>
          <p className="mt-4 max-w-2xl font-normal">
            Valores ilustrativos. Chame a gente no WhatsApp para receber os valores atuais.
          </p>
          <ul className="mt-10 border-t-2 border-preto">
            {planos.map((p) => (
              <li key={p.id} className="grid gap-x-8 gap-y-3 border-b border-preto/25 py-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto]">
                <div>
                  <h3 className="cartaz text-[clamp(2.25rem,3.4vw,3.25rem)]">{p.nome}</h3>
                  <p className="mt-1">{p.para}</p>
                </div>
                <ul>
                  {p.inclui.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <div className="md:text-right">
                  <p className="cartaz text-[clamp(2.25rem,3.4vw,3.25rem)] text-preto/45">{p.valor}</p>
                  <p className="text-[0.95rem]">{p.periodo}, ilustrativo</p>
                </div>
              </li>
            ))}
          </ul>
          <BotaoWhatsapp
            rotulo="Pedir valores pelo WhatsApp"
            mensagem="Olá! Vim pelo site e quero saber os valores dos planos da Black Belt Center."
            className="botao botao-belt mt-10"
          />
        </div>
      </section>
    </div>
  );
}
