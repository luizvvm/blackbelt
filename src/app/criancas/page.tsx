import type { Metadata } from "next";
import Image from "next/image";
import { NotaFonte, PilulasLinha } from "@/components/horarios/Pilulas";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { ClipeEnso } from "@/components/ui/ClipeEnso";
import { Foto } from "@/components/ui/Foto";
import { capa } from "@/content/midia";
import { obterInfantil, obterTurmas } from "@/lib/conteudo";

export const metadata: Metadata = {
  title: "Crianças",
  description: "Karatê Baby a partir de 3 anos, Karatê, Jiu-Jitsu e Muay Thai Infantil na Black Belt Center, em Barra Mansa.",
};

const MENSAGEM = "Olá! Vim pelo site e quero agendar uma aula experimental para meu filho na Black Belt Center.";

/* Cores amostradas dos bambolês usados nas aulas; a pista segue a perspectiva do tatame */
const VERMELHO = "#d2232a";
const AZUL = "#2d6cb5";
const AMARELO = "#e8b923";
const VERDE = "#3a9a4b";
const PISTA = [
  { x: 37, y: 6, w: 17, cor: AMARELO },
  { x: 63, y: 6, w: 17, cor: VERMELHO },
  { x: 27, y: 21, w: 24, cor: VERDE },
  { x: 73, y: 21, w: 24, cor: AZUL },
  { x: 15, y: 44, w: 31, cor: VERMELHO },
  { x: 85, y: 44, w: 31, cor: AMARELO },
  { x: 15, y: 72, w: 34, cor: AZUL },
  { x: 85, y: 72, w: 34, cor: VERDE },
  { x: 27, y: 97, w: 44, cor: AMARELO },
  { x: 73, y: 97, w: 44, cor: VERMELHO },
];

export default async function Criancas() {
  const [{ programasInfantis, frasesInfantis }, turmas] = await Promise.all([obterInfantil(), obterTurmas()]);

  return (
    <div className="bg-tatame text-preto">
      <section className="relative overflow-clip pt-[4.5rem]">
        <div className="moldura relative grid items-center gap-x-10 gap-y-14 pb-20 pt-10 md:pt-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="cartaz text-[clamp(4rem,10.2vw,10rem)]">{frasesInfantis.titulo.texto}</h1>
            <p className="texto-corrido mt-6">{frasesInfantis.valores.texto}</p>
            <BotaoWhatsapp rotulo="Agendar aula para meu filho" mensagem={MENSAGEM} className="botao botao-belt mt-8" />
          </div>
          <div className="lg:col-span-5">
            <div className="relative mx-auto aspect-square w-full max-w-[40rem]">
              {PISTA.map((b, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className="absolute aspect-square rounded-full border-[clamp(7px,0.85vw,13px)]"
                  style={{
                    left: `${b.x}%`,
                    top: `${b.y}%`,
                    width: `${b.w}%`,
                    borderColor: b.cor,
                    transform: "translate(-50%, -50%) scaleY(0.42)",
                  }}
                />
              ))}
              <div className="absolute left-1/2 top-1/2 w-[72%] -translate-x-1/2 -translate-y-1/2">
                <ClipeEnso src="/midia/clipes/criancas.mp4" capa="/midia/clipes/criancas.webp" rotulo="Karatê Baby" className="!text-preto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Turmas infantis">
        {programasInfantis.map((programa, i) => {
          const turma = turmas.find((t) => t.id === programa.id)!;
          const invertido = i % 2 === 1;
          return (
            <article key={programa.id} className={`relative overflow-clip ${i % 2 === 0 ? "bg-preto text-branco" : "bg-faixa text-branco"}`}>
              <div className="moldura grid items-end md:grid-cols-12">
                <div className={`py-12 md:col-span-6 md:py-20 ${invertido ? "md:order-2 md:col-start-7" : ""}`}>
                  {turma.idade && <p className="text-[1.05rem] font-normal">{turma.idade}</p>}
                  <h2 className="cartaz mt-2 text-[clamp(3.5rem,8vw,7.75rem)]">{programa.nome}</h2>
                  <p className="texto-corrido mt-5">{programa.texto}</p>
                  <div className="mt-6">
                    <PilulasLinha turma={turma} />
                  </div>
                  <NotaFonte turma={turma} className="mt-3" />
                </div>
                <div className={`flex justify-center md:col-span-6 ${invertido ? "md:order-1 md:col-start-1" : ""}`}>
                  <Image
                    src={programa.recorte}
                    alt={programa.alt}
                    width={programa.recorteLargura}
                    height={programa.recorteAltura}
                    sizes="(max-width: 768px) 90vw, 44vw"
                    className="max-h-[34rem] w-auto"
                  />
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="py-20 md:py-28">
        <div className="moldura grid items-center gap-10 lg:grid-cols-12">
          <div className="grid grid-cols-3 gap-2 lg:col-span-7">
            <Foto src={capa("Db6XBFVJlsh").src} alt="Crianças de quimono sentadas no tatame diante do logo da Black Belt" sizes="(max-width: 1024px) 33vw, 20vw" className="col-span-2 aspect-[4/5]" posicao="center 30%" />
            <div className="flex flex-col gap-2">
              <Foto src={capa("DRiBuFrkTzH").src} alt="Duas crianças treinando chute com manopla no Muay Thai Infantil" sizes="(max-width: 1024px) 33vw, 20vw" className="aspect-[3/4]" />
              <Foto src={capa("DdohsIYxgzS").src} alt="Duas crianças de luvas sorrindo para a câmera" sizes="(max-width: 1024px) 33vw, 20vw" className="flex-1" posicao="center 30%" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <p className="cartaz text-[clamp(2.75rem,5.2vw,5rem)]">{frasesInfantis.provocacao.texto}</p>
            <a href={frasesInfantis.provocacao.fonte.url} target="_blank" rel="noopener noreferrer" className="link-sublinhado mt-5 inline-block">
              Ver no Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
