import type { Metadata } from "next";
import { Mural } from "@/components/mural/Mural";
import { marca } from "@/content/marca";
import { obterMural } from "@/lib/conteudo";

export const metadata: Metadata = {
  title: "Mural",
  description: "Técnicas, treinos e histórias da Black Belt Center.",
};

export default async function PaginaMural() {
  const itens = await obterMural();
  return (
    <div className="bg-preto pb-20 pt-[4.5rem]">
      <div className="moldura flex flex-col justify-between gap-6 pb-10 pt-10 md:flex-row md:items-end md:pt-16">
        <h1 className="cartaz text-[clamp(5rem,17vw,16rem)]">Mural</h1>
        <p className="max-w-sm pb-3">
          Técnicas, treinos e histórias do nosso dia a dia. Tem muito mais no{" "}
          <a href={marca.instagram.url} target="_blank" rel="noopener noreferrer" className="link-sublinhado">
            {marca.instagram.usuario}
          </a>
          .
        </p>
      </div>
      <Mural itens={itens} />
    </div>
  );
}
