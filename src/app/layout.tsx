import type { Metadata, Viewport } from "next";
import { Anton, Kanit } from "next/font/google";
import { Cabecalho } from "@/components/layout/Cabecalho";
import { Rodape } from "@/components/layout/Rodape";
import { marca } from "@/content/marca";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--fonte-anton", display: "swap" });
const kanit = Kanit({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin", "latin-ext"],
  variable: "--fonte-kanit",
  display: "swap",
});

const urlSite = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(urlSite),
  title: {
    default: "Black Belt Center | Estúdio de Lutas em Barra Mansa",
    template: "%s | Black Belt Center",
  },
  description:
    "Karatê, jiu-jitsu, muay thai, boxe, krav maga e taekwondo no Centro de Barra Mansa, RJ. Turmas para adultos, crianças a partir de 3 anos e aulas só para mulheres. Agende sua aula experimental.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Black Belt Center",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Black Belt Center, estúdio de lutas em Barra Mansa" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

const dadosEstruturados = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: marca.nome,
  description: marca.categoria,
  telephone: `+${marca.whatsapp.numero}`,
  email: marca.email.endereco,
  url: urlSite,
  image: `${urlSite}/og.jpg`,
  sameAs: [marca.instagram.url],
  address: {
    "@type": "PostalAddress",
    streetAddress: marca.endereco.linha,
    addressLocality: marca.endereco.cidade,
    addressRegion: marca.endereco.uf,
    addressCountry: "BR",
  },
  geo: { "@type": "GeoCoordinates", latitude: marca.endereco.lat, longitude: marca.endereco.lng },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${kanit.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="fixed left-3 top-3 z-[100] -translate-y-24 rounded-full bg-branco px-5 py-3 font-medium text-preto focus:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        <Cabecalho />
        <main id="conteudo">{children}</main>
        <Rodape />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados) }}
        />
      </body>
    </html>
  );
}
