import Link from "next/link";
import { Enso } from "@/components/marca/Enso";

export default function NaoEncontrada() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-clip bg-preto pt-[4.5rem]">
      <Enso className="absolute -right-[8vw] top-1/2 w-[min(80vw,48rem)] -translate-y-1/2 text-parede" />
      <div className="moldura relative">
        <h1 className="cartaz text-[clamp(3.25rem,13vw,12.5rem)]">Página não encontrada</h1>
        <p className="texto-corrido mt-5">O endereço pode ter mudado. Volte para o início ou veja os horários.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="botao botao-belt">
            Ir para o início
          </Link>
          <Link href="/horarios" className="botao botao-linha text-branco">
            Ver horários
          </Link>
        </div>
      </div>
    </section>
  );
}
