import Link from "next/link";
import { LogoCompleto } from "@/components/marca/Enso";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { marca } from "@/content/marca";

const PAGINAS = [
  { href: "/modalidades", rotulo: "Modalidades" },
  { href: "/horarios", rotulo: "Horários" },
  { href: "/criancas", rotulo: "Crianças" },
  { href: "/mulheres", rotulo: "Mulheres" },
  { href: "/competicao", rotulo: "Competição" },
  { href: "/mural", rotulo: "Mural" },
  { href: "/planos", rotulo: "Planos" },
  { href: "/contato", rotulo: "Contato" },
];

export function Rodape() {
  return (
    <footer className="bg-preto pb-10 pt-20 md:pt-28">
      <div className="moldura grid gap-14 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-10">
        <div>
          <LogoCompleto className="w-[min(100%,20rem)] text-branco" />
        </div>
        <div className="grid gap-12 sm:grid-cols-2">
          <div>
            <h2 className="font-medium">Onde treinar</h2>
            <address className="mt-3 not-italic">
              {marca.endereco.linha}
              <br />
              {marca.endereco.bairro}, {marca.endereco.cidade}, {marca.endereco.uf}
            </address>
            <a href={marca.endereco.mapa} target="_blank" rel="noopener noreferrer" className="link-sublinhado mt-3 inline-block">
              Abrir no Google Maps
            </a>
            <h2 className="mt-8 font-medium">Fale com a gente</h2>
            <ul className="mt-3 space-y-1">
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
                <a href={marca.avaliacao.url} target="_blank" rel="noopener noreferrer" className="link-sublinhado">
                  Avaliar no Google
                </a>
              </li>
            </ul>
          </div>
          <nav aria-label="Rodapé">
            <h2 className="font-medium">Páginas</h2>
            <ul className="mt-3 space-y-1">
              {PAGINAS.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="link-sublinhado">
                    {p.rotulo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="moldura mt-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <p className="cartaz text-[clamp(1.75rem,3vw,2.5rem)]">{marca.lema.texto}</p>
        <BotaoWhatsapp />
      </div>
    </footer>
  );
}
