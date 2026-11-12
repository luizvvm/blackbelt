import type { Metadata } from "next";
import { Relogio } from "@/components/home/Relogio";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { marca } from "@/content/marca";
import { obterTurmas } from "@/lib/conteudo";

export const metadata: Metadata = {
  title: "Contato",
  description: "Agende sua aula experimental na Black Belt Center: R. São Sebastião, 161, Centro, Barra Mansa, RJ.",
};

export default async function Contato() {
  const turmas = await obterTurmas();
  return (
    <div className="bg-preto pt-[4.5rem]">
      <section className="moldura pb-16 pt-10 md:pt-14">
        <h1 className="cartaz text-[clamp(3rem,16.2vw,4.75rem)] sm:text-[12.4vw] 2xl:text-[11.5rem]">
          Agende sua aula <br className="hidden sm:block" />
          experimental
        </h1>
        <div className="mt-10 grid items-end gap-10 lg:grid-cols-2">
          <div className="flex flex-wrap gap-3">
            <BotaoWhatsapp />
            <a href={marca.endereco.mapa} target="_blank" rel="noopener noreferrer" className="botao botao-linha text-branco">
              Como chegar
            </a>
          </div>
          <div className="lg:justify-self-end">
            <Relogio turmas={turmas} />
          </div>
        </div>
      </section>

      <section aria-label="Localização" className="relative">
        <iframe
          title="Mapa da Black Belt Center em Barra Mansa"
          src={marca.endereco.mapaEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[56svh] min-h-96 w-full border-0 [filter:grayscale(1)_invert(.92)_contrast(.92)]"
        />
      </section>

      <section className="py-16 md:py-24">
        <div className="moldura grid gap-12 md:grid-cols-3">
          <div>
            <h2 className="cartaz text-[2.5rem]">Endereço</h2>
            <address className="mt-3 not-italic">
              {marca.endereco.linha}
              <br />
              {marca.endereco.bairro}, {marca.endereco.cidade}, {marca.endereco.uf}
            </address>
            <a href={marca.endereco.mapa} target="_blank" rel="noopener noreferrer" className="link-sublinhado mt-3 inline-block">
              Abrir no Google Maps
            </a>
          </div>
          <div>
            <h2 className="cartaz text-[2.5rem]">Canais</h2>
            <ul className="mt-3 space-y-1.5">
              <li>
                <a href={`https://wa.me/${marca.whatsapp.numero}`} target="_blank" rel="noopener noreferrer" className="link-sublinhado">
                  WhatsApp {marca.whatsapp.exibicao}
                </a>
              </li>
              <li>
                <a href={marca.instagram.url} target="_blank" rel="noopener noreferrer" className="link-sublinhado">
                  Instagram {marca.instagram.usuario}
                </a>
              </li>
              <li>
                <a href={`mailto:${marca.email.endereco}`} className="link-sublinhado break-all">
                  {marca.email.endereco}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="cartaz text-[2.5rem]">Treina aqui?</h2>
            <p className="mt-3">Sua avaliação ajuda outras pessoas a nos encontrarem.</p>
            <a href={marca.avaliacao.url} target="_blank" rel="noopener noreferrer" className="link-sublinhado mt-3 inline-block">
              Avaliar no Google
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
